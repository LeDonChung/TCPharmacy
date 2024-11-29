package vn.edu.iuh.fit.pharmacy.service;

public interface SMSService {
    void sendSMS(String phoneNumber, String message);
}
