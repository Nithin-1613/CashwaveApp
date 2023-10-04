package com.example.Natwest.cashwavebackend.DTO;

import lombok.Data;

@Data
public class TransactionRequest {

    public String accountHolderName;
    public String accountNo;
    public String amount;
    public String description;
}
