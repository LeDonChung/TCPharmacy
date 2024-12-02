package vn.edu.iuh.fit.pharmacy.service;

import org.codehaus.jettison.json.JSONException;

public interface SMSService {
    void sendSMS(String phoneNumber, String message);
}
