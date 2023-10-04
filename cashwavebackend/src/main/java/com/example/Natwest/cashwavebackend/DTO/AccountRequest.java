package com.example.Natwest.cashwavebackend.DTO;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountRequest {
    @Id
    @Field(name="id")
    private String accountNo;
    private String accountBankName;
    private String accountBalance;
}
