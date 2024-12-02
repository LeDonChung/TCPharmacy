package vn.edu.iuh.fit.pharmacy.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import vn.edu.iuh.fit.pharmacy.service.SMSService;


@Service
@Slf4j
public class SMSServiceImpl implements SMSService {
    @Autowired
    private RestTemplate restTemplate;


    @Value("${SMS_API_KEY}")
    private String SMS_API_KEY;


    @Override
    public void sendSMS(String phoneNumber, String txt) {

        log.info("Send SMS to {} with message: {}", phoneNumber, txt);

        // Chuyển 0 -> +84
        if (phoneNumber.startsWith("0")) {
            phoneNumber = "+84" + phoneNumber.substring(1);
        }
        // Tạo map dữ liệu cần gửi
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("phone", phoneNumber);
        map.add("message", txt);
        map.add("key", SMS_API_KEY);

        // Tạo HTTP entity với dữ liệu và header

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        // Gửi POST request và nhận phản hồi
        String url = "https://textbelt.com/text";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        // In ra kết quả
        log.info("Response Send SMS: {}", response.getBody());

    }
}
