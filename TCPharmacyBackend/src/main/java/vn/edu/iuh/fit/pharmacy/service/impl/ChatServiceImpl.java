package vn.edu.iuh.fit.pharmacy.service.impl;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import vn.edu.iuh.fit.pharmacy.POJOs.User;
import vn.edu.iuh.fit.pharmacy.api.MessageRequest;
import vn.edu.iuh.fit.pharmacy.api.MessageRequestOpenAI;
import vn.edu.iuh.fit.pharmacy.api.MessageResponse;
import vn.edu.iuh.fit.pharmacy.api.ThreadRunRequest;
import vn.edu.iuh.fit.pharmacy.repositories.UserRepository;
import vn.edu.iuh.fit.pharmacy.service.ChatService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Value("${chatgpt.threads}")
    private String CHATGPT_THREADS_URL;

    @Value("${chatgpt.assistant.id}")
    private String CHATGPT_ASSISTANT_ID;

    private final Gson gson = new Gson();

    private final String CHATGPT_KEY = "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";

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("OpenAI-Beta", "assistants=v2");
        headers.add("Authorization", "Bearer " + CHATGPT_KEY);
        return headers;
    }

    public Map<String, Object> createThread() {
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL,
                HttpMethod.POST,
                new HttpEntity<>(createHeaders()),
                new ParameterizedTypeReference<>() {
                }
        );
        return response.getBody();
    }

    @Async
    public CompletableFuture<Map<String, Object>> runThreadToAssistant(String threadId) {
        List<Map<String, Object>> tools = List.of(
                Map.of("type", "code_interpreter"),
                Map.of("type", "file_search")
        );
        ThreadRunRequest threadRunRequest = new ThreadRunRequest(CHATGPT_ASSISTANT_ID, tools);
        String body = gson.toJson(threadRunRequest);
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/runs",
                HttpMethod.POST,
                new HttpEntity<>(body, createHeaders()),
                new ParameterizedTypeReference<>() {
                }
        );
        return CompletableFuture.completedFuture(response.getBody());
    }

    public MessageResponse getMessageLast(String threadId) {
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/messages?order=desc&limit=1",
                HttpMethod.GET,
                new HttpEntity<>(createHeaders()),
                new ParameterizedTypeReference<>() {
                }
        );
        Map<String, Object> body = response.getBody();
        if (body != null) {
            List<Map<String, Object>> dataList = (List<Map<String, Object>>) body.get("data");
            if (dataList != null && !dataList.isEmpty()) {
                Map<String, Object> firstData = dataList.get(0);
                String role = (String) firstData.get("role");
                List<Map<String, Object>> contentList = (List<Map<String, Object>>) firstData.get("content");
                if (contentList != null && !contentList.isEmpty()) {
                    Map<String, Object> textContent = contentList.get(0);
                    Map<String, Object> text = (Map<String, Object>) textContent.get("text");
                    String value = (String) text.get("value");

                    return MessageResponse.builder().role(role).content(value).build();
                }
            }
        }
        return defaultMessageResponse();
    }

    private MessageResponse defaultMessageResponse() {
        return MessageResponse
                .builder()
                .role("assistant")
                .content("Anh/chị vui lòng đợi em ít phút, em sẽ phản hồi ngay. Em cảm ơn anh/chị.")
                .build();
    }

    public Map<String, Object> retrieveRunForThread(String threadId, String runId) {
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/runs/" + runId,
                HttpMethod.GET,
                new HttpEntity<>(createHeaders()),
                new ParameterizedTypeReference<>() {
                }
        );
        return response.getBody();
    }

    @Override
    public MessageResponse sendMessage(Long userId, MessageRequest message) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

            String threadId = user.getThread();
            if (threadId == null) {
                threadId = createNewThreadForUser(user);
            }

            sendUserMessage(threadId, message);
            String runId = runThreadToAssistant(threadId).get(10, TimeUnit.SECONDS).get("id").toString();

            return awaitRunCompletion(threadId, runId);
        } catch (Exception e) {
            e.printStackTrace();
            return defaultMessageResponse();
        }
    }

    private String createNewThreadForUser(User user) {
        Map<String, Object> threadResponse = createThread();
        String threadId = (String) threadResponse.get("id");
        if (threadId == null) throw new RuntimeException("Cannot create thread");
        user.setThread(threadId);
        userRepository.save(user);
        return threadId;
    }

    private void sendUserMessage(String threadId, MessageRequest message) {
        MessageRequestOpenAI messageRequest = MessageRequestOpenAI
                .builder()
                .role("user")
                .content(message.getMessage())
                .build();
        String body = gson.toJson(messageRequest);
        restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/messages",
                HttpMethod.POST,
                new HttpEntity<>(body, createHeaders()),
                new ParameterizedTypeReference<>() {
                }
        );
    }

    private MessageResponse awaitRunCompletion(String threadId, String runId) throws InterruptedException {
        int loopCount = 0;
        while (loopCount < 30) {
            Map<String, Object> runStatus = retrieveRunForThread(threadId, runId);
            if ("completed".equals(runStatus.get("status"))) {
                return getMessageLast(threadId);
            }
            loopCount++;
            Thread.sleep(1000);
        }
        return defaultMessageResponse();
    }

    @Override
    public List<MessageResponse> getMessages(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        String threadId = user.getThread();
        if (threadId == null) {
            threadId = createNewThreadForUser(user);
        }
        return getMessages(threadId);
    }

    public List<MessageResponse> getMessages(String threadId) {
        List<MessageResponse> responses = new ArrayList<>();
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/messages?order=asc&limit=100",
                HttpMethod.GET,
                new HttpEntity<>(createHeaders()),
                new ParameterizedTypeReference<>() {
                }
        );
        Map<String, Object> body = response.getBody();
        if (body != null) {
            List<Map<String, Object>> dataList = (List<Map<String, Object>>) body.get("data");
            if (dataList != null && !dataList.isEmpty()) {
                dataList.forEach(firstData -> {
                    String role = (String) firstData.get("role");
                    List<Map<String, Object>> contentList = (List<Map<String, Object>>) firstData.get("content");
                    if (contentList != null && !contentList.isEmpty()) {
                        Map<String, Object> textContent = contentList.get(0);
                        Map<String, Object> text = (Map<String, Object>) textContent.get("text");
                        String value = (String) text.get("value");
                        responses.add(MessageResponse.builder().role(role).content(value).build());
                    }
                });
            }
        }
        return responses;
    }
}
