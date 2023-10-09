package com.example.Natwest.cashwavebackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class logincred {
    private String emailid;
    private String security_PIN;

    public String getEmailid() {
        return emailid;
    }

    public String getSecurity_PIN() {
        return security_PIN;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public void setSecurity_PIN(String security_PIN) {
        this.security_PIN = security_PIN;
    }
}
