package vn.edu.iuh.fit.pharmacy.service;

import vn.edu.iuh.fit.pharmacy.api.MessageRequest;
import vn.edu.iuh.fit.pharmacy.api.MessageResponse;

import java.util.List;
import java.util.Map;

public interface ChatService {
    MessageResponse sendMessage(Long userId, MessageRequest message);
    List<MessageResponse> getMessages(Long userId);
}
