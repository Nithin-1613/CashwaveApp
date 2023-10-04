package com.example.Natwest.cashwavebackend.DTO;

import com.example.Natwest.cashwavebackend.Entity.Accounts;
import lombok.Data;

@Data
public class TransferRequest {
    public TransactionRequest transactionRequest;
    public String fromAccountNo;
}
