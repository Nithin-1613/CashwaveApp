package com.example.Natwest.cashwavebackend.DTO;

import lombok.Data;

@Data
public class TransactionResponse {
    public String accountHolderName;
    public String accountNo;
    public String amount;
    public String description;
}
