package vn.edu.iuh.fit.pharmacy;

import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@SpringBootApplication
@EnableScheduling
public class TcPharmacyBackendApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(TcPharmacyBackendApplication.class, args);
	}

}
