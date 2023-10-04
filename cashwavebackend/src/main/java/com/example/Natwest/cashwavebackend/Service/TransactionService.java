package com.example.Natwest.cashwavebackend.Service;

import com.example.Natwest.cashwavebackend.DTO.AccountRequest;
import com.example.Natwest.cashwavebackend.DTO.TransactionRequest;
import com.example.Natwest.cashwavebackend.Entity.Accounts;
import com.example.Natwest.cashwavebackend.Entity.Transaction;
import com.example.Natwest.cashwavebackend.Entity.Users;
import com.example.Natwest.cashwavebackend.Repository.AccountRepository;
import com.example.Natwest.cashwavebackend.Repository.TransactionRepository;
import com.example.Natwest.cashwavebackend.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public Transaction addTransaction(String userId, TransactionRequest transactiondetails, String fromAccount) {
        Transaction transaction=new Transaction();
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        if(accountRepository.findByAccountNo(fromAccount)!=null)
        {
            transaction.setUser(user);
            transaction.setAmount(Double.parseDouble(transactiondetails.getAmount()));
            transaction.setDescription(transactiondetails.getDescription());
            transaction.setAccountHolderName(transactiondetails.getAccountHolderName());
            transaction.setAccountNo(transactiondetails.getAccountNo());
            transaction.setFromAccount(fromAccount);
            return transactionRepository.save(transaction);
        }
        return null;
    }

    public List<Transaction> listTransaction(String user_id)
    {
        return transactionRepository.findByUser_Id(user_id);
    }


        public ResponseEntity<?> transferAmount(String user_id, TransactionRequest transactiondetails, String fromAccount) {
        try {
            double amount = Double.parseDouble(transactiondetails.getAmount());
            Accounts toAccount = accountRepository.findByAccountNo(transactiondetails.getAccountNo());
            Accounts fromAccount1 = accountRepository.findByAccountNo(fromAccount);

            if (toAccount == null || fromAccount1 == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("One or both accounts not found");
            }

            if (amount > fromAccount1.getAccountBalance()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Insufficient balance for the transfer");
            }

            // query to update the from account
            Query query = new Query(Criteria.where("accountNo").is(fromAccount1.getAccountNo()));
            Update update = new Update().set("accountBalance", fromAccount1.getAccountBalance() - amount);
            mongoTemplate.updateFirst(query, update, Accounts.class);

            // query to update the to account
            Query query1 = new Query(Criteria.where("accountNo").is(toAccount.getAccountNo()));
            Update update1 = new Update().set("accountBalance", toAccount.getAccountBalance() + amount);
            mongoTemplate.updateFirst(query1, update1, Accounts.class);

            Transaction transaction = addTransaction(user_id, transactiondetails, fromAccount);
            return ResponseEntity.status(HttpStatus.OK).body(transaction);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid amount format");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the transaction");
        }
    }


    }

