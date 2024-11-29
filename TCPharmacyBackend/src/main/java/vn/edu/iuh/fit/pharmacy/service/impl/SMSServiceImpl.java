package vn.edu.iuh.fit.pharmacy.service.impl;

import com.vonage.client.VonageClient;
import com.vonage.client.sms.MessageStatus;
import com.vonage.client.sms.SmsSubmissionResponse;
import com.vonage.client.sms.messages.TextMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.pharmacy.service.SMSService;

@Service
@Slf4j
public class SMSServiceImpl implements SMSService {
    @Autowired
    private VonageClient client;
    @Override
    public void sendSMS(String phoneNumber, String txt) {

        log.info("Send SMS to {} with message: {}", phoneNumber, txt);

        // 0 - > 84
        if (phoneNumber.startsWith("0")) {
            phoneNumber = phoneNumber.replaceFirst("0", "84");
        }
        // Send SMS
        TextMessage message = new TextMessage("TC Pharmacy",
                phoneNumber,
                txt
        );

        SmsSubmissionResponse response = client.getSmsClient().submitMessage(message);

        if (response.getMessages().get(0).getStatus() == MessageStatus.OK) {
            log.info("Message sent successfully.");
        } else {
            log.error("Message failed with error: {}", response.getMessages().get(0).getErrorText());
            throw new RuntimeException("Gửi tin nhắn thất bại. Vui lòng thử lại sau.");
        }

    }
}
