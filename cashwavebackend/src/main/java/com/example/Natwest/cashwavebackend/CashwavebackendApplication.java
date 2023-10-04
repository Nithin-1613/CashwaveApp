package com.example.Natwest.cashwavebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class CashwavebackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CashwavebackendApplication.class, args);
	}

}
