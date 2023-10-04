package com.example.Natwest.cashwavebackend.Entity;

import com.example.Natwest.cashwavebackend.Entity.Users;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Accounts")
@Data
public class Accounts {
        @Id
        @Field(name = "_id")
        private String accountNo;
        private String accountBankName;
        private double accountBalance;

        @DBRef
        private Users user;
}
