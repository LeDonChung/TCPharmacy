package vn.edu.iuh.fit.pharmacy.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.pharmacy.api.MessageRequest;
import vn.edu.iuh.fit.pharmacy.api.MessageResponse;
import vn.edu.iuh.fit.pharmacy.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {
    @Autowired
    private ChatService chatService;

    @PostMapping("/{userId}")
    public ResponseEntity<MessageResponse> sendMessage(
            @RequestBody MessageRequest messageRequest,
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(
                chatService.sendMessage(userId, messageRequest)
        );
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<MessageResponse>> getMessages(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(
                chatService.getMessages(userId)
        );
    }
}
