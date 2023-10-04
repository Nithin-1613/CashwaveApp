package com.example.Natwest.cashwavebackend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Transaction")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public String id;
    public String accountHolderName;
    public String accountNo;
    public double amount;
    public String description;
    public String fromAccount;
   @DBRef
    Users user;
}
