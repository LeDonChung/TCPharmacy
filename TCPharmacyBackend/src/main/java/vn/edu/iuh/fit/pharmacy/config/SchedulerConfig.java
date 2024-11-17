package vn.edu.iuh.fit.pharmacy.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import vn.edu.iuh.fit.pharmacy.service.RecommendService;

import java.io.IOException;

@Component
public class SchedulerConfig {

    @Autowired
    private RecommendService recommendService;

//    @Scheduled(cron = "*/2 * * * * ?") // Mỗi 2p
    @Scheduled(cron = "0 0 0 * * *") // Lập lịch chạy lúc 0h mỗi ngày
//    @Scheduled(cron = "0 0/2 * * * ?") // Mỗi 2 phút
    public void runDailyTask() {
        try {
            recommendService.buildModel();
            System.out.println("Generated successfully at " + new java.util.Date());
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to generate: " + e.getMessage());
        }
    }
}
