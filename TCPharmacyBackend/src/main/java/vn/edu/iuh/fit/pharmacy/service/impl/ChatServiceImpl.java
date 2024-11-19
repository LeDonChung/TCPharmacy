package vn.edu.iuh.fit.pharmacy.service.impl;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
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
import java.util.Objects;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Value("${chatgpt.assistants}")
    private String CHATGPT_ASSISTANTS_URL;

    @Value("${chatgpt.threads}")
    private String CHATGPT_THREADS_URL;


    @Value("${chatgpt.assistant.id}")
    private String CHATGPT_ASSISTANT_ID;

    private final Gson gson = new Gson();

    @Value("${chatgpt.key}")
    private String CHATGPT_KEY;

    public Map<String, Object> createThread() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("OpenAI-Beta", "assistants=v2");
        headers.add("Authorization", "Bearer " + CHATGPT_KEY);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL,
                HttpMethod.POST,
                new HttpEntity<>(headers),
                new ParameterizedTypeReference<>() {
                }
        );
        return response.getBody();
    }

    public Map<String, Object> runThreadToAssistant(String threadId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("OpenAI-Beta", "assistants=v2");
        headers.add("Authorization", "Bearer " + CHATGPT_KEY);

        List<Map<String, Object>> tools = List.of(
                Map.of("type", "code_interpreter"),
                Map.of("type", "file_search")
        );
        ThreadRunRequest threadRunRequest = new ThreadRunRequest(CHATGPT_ASSISTANT_ID, tools);
        String body = gson.toJson(threadRunRequest);
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/runs",
                org.springframework.http.HttpMethod.POST,
                new HttpEntity<>(body, headers),
                new ParameterizedTypeReference<>() {
                }
        );
        return response.getBody();
    }

    public MessageResponse getMessageLast(String threadId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("OpenAI-Beta", "assistants=v2");
        headers.add("Authorization", "Bearer " + CHATGPT_KEY);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/messages?order=desc&limit=1",
                org.springframework.http.HttpMethod.GET,
                new HttpEntity<>(headers),
                new ParameterizedTypeReference<>() {
                }
        );
        Map<String, Object> body = response.getBody();
        //Extract data array from response
        List<Map<String, Object>> dataList = (List<Map<String, Object>>) body.get("data");
        if (dataList != null && !dataList.isEmpty()) {
            //Get first element of data array
            Map<String, Object> firstData = dataList.get(0);
            String role = (String) firstData.get("role");
            List<Map<String, Object>> contentList = (List<Map<String, Object>>) firstData.get("content");
            if (contentList != null && !contentList.isEmpty()) {
                Map<String, Object> textContent = contentList.get(0); // Get the first content item
                Map<String, Object> text = (Map<String, Object>) textContent.get("text");
                String value = (String) text.get("value"); // Extract "value"

                return MessageResponse
                        .builder()
                        .role(role)
                        .content(value)
                        .build();
            }
        }
        return MessageResponse
                .builder()
                .role("assistant")
                .content("Anh/chị vui lòng đợi em ít phút, em sẽ phản hồi ngay. Em cảm ơn anh/chị.")
                .build();
    }

    public Map<String, Object> retrieveRunForThread(String threadId, String runId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("OpenAI-Beta", "assistants=v2");
        headers.add("Authorization", "Bearer " + CHATGPT_KEY);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/runs/" + runId,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                new ParameterizedTypeReference<>() {
                }
        );
        return response.getBody();
    }

    @Override
    public MessageResponse sendMessage(Long userId, MessageRequest message) {
        try {
            // Get user by userId
            User user = userRepository.findById(userId).orElse(null);

            assert user != null;

            //get threadId from user
            String threadId = user.getThread();

            // If threadId is null, create new thread
            if (threadId == null) {
                Map<String, Object> threadResponse = createThread();
                threadId = (String) threadResponse.get("id");
                if (threadId == null) {
                    throw new RuntimeException("Cannot create thread");
                }
                user.setThread(threadId);
                // Save threadId to user
                userRepository.save(user);
            }

            //create message request
            MessageRequestOpenAI messageRequest = MessageRequestOpenAI
                    .builder()
                    .role("user")
                    .content(message.getMessage())
                    .build();
            // convert message request to json
            String body = gson.toJson(messageRequest);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json");
            headers.add("OpenAI-Beta", "assistants=v2");
            headers.add("Authorization", "Bearer " + CHATGPT_KEY);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    CHATGPT_THREADS_URL + "/" + threadId + "/messages",
                    HttpMethod.POST,
                    new HttpEntity<>(body, headers),
                    new ParameterizedTypeReference<>() {
                    }
            );
            String messageId = (String) Objects.requireNonNull(response.getBody()).get("id");
            if (messageId == null) {
                throw new RuntimeException("Cannot send message");
            }
            String runId = runThreadToAssistant(threadId).get("id").toString();
            boolean completed = false;
            int loppCount = 0;
            do {
                loppCount++;
                Map<String, Object> runStatus = retrieveRunForThread(threadId, runId);
                if (runStatus.get("status").equals("completed")) {
                    completed = true;
                    break;
                }
                if (loppCount > 30) {
                    break;
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            } while (true);
            if (completed) {
                return getMessageLast(threadId);
            } else {
                return MessageResponse
                        .builder()
                        .role("assistant")
                        .content("Anh/chị vui lòng đợi em ít phút, em sẽ phản hồi ngay. Em cảm ơn anh/chị.")
                        .build();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return MessageResponse
                    .builder()
                    .role("assistant")
                    .content("Anh/chị vui lòng đợi em ít phút, em sẽ phản hồi ngay. Em cảm ơn anh/chị.")
                    .build();
        }
    }

    public List<MessageResponse> getMessages(String threadId) {
        List<MessageResponse> responses = new ArrayList<>();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("OpenAI-Beta", "assistants=v2");
        headers.add("Authorization", "Bearer " + CHATGPT_KEY);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                CHATGPT_THREADS_URL + "/" + threadId + "/messages?order=asc&limit=100",
                org.springframework.http.HttpMethod.GET,
                new HttpEntity<>(headers),
                new ParameterizedTypeReference<>() {
                }
        );
        // get body from response
        Map<String, Object> body = response.getBody();
        //Extract data array from response
        List<Map<String, Object>> dataList = (List<Map<String, Object>>) body.get("data");
        if (dataList != null && !dataList.isEmpty()) {
            for (int i = 0; i < dataList.size(); i++) {
                //Get first element of data array
                Map<String, Object> firstData = dataList.get(i);
                String role = (String) firstData.get("role");
                List<Map<String, Object>> contentList = (List<Map<String, Object>>) firstData.get("content");
                if (contentList != null && !contentList.isEmpty()) {
                    Map<String, Object> textContent = contentList.get(0); // Get the first content item
                    Map<String, Object> text = (Map<String, Object>) textContent.get("text");
                    String value = (String) text.get("value"); // Extract "value"

                    responses.add(MessageResponse
                            .builder()
                            .role(role)
                            .content(value)
                            .build());
                }
            }
        }

        return responses;
    }


    @Override
    public List<MessageResponse> getMessages(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        assert user != null;
        String threadId = user.getThread();
        if(threadId == null){
            Map<String, Object> threadResponse = createThread();
            threadId = (String) threadResponse.get("id");
            if (threadId == null) {
                throw new RuntimeException("Cannot create thread");
            }
            user.setThread(threadId);
            // Save threadId to user
            userRepository.save(user);
        }
        return getMessages(threadId);
    }
}
