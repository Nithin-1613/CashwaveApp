package com.example.Natwest.cashwavebackend.Service;

import com.example.Natwest.cashwavebackend.DTO.AccountRequest;
import com.example.Natwest.cashwavebackend.Entity.Accounts;
import com.example.Natwest.cashwavebackend.Entity.Users;
import com.example.Natwest.cashwavebackend.Repository.AccountRepository;
import com.example.Natwest.cashwavebackend.Repository.UserRepository;
import com.mongodb.client.result.UpdateResult;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    MongoTemplate mongoTemplate;


    public ResponseEntity<?> addAccount(String userId, AccountRequest newAccountdetails) {
        // Find the user by ID
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        // Validate the account details
        if (newAccountdetails.getAccountNo() == null || newAccountdetails.getAccountNo().isEmpty()) {
            return ResponseEntity.badRequest().body("Account number is required.");
        }

        if (newAccountdetails.getAccountBalance() == null) {
            return ResponseEntity.badRequest().body("Account balance is required.");
        }

        boolean accountExists = accountRepository.existsByAccountNo(newAccountdetails.getAccountNo());

        if (accountExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account number already exists.");
        }

        Accounts newAccount = new Accounts();
        newAccount.setAccountBalance(Double.parseDouble(newAccountdetails.getAccountBalance()));
        newAccount.setAccountNo(newAccountdetails.getAccountNo());
        newAccount.setAccountBankName(newAccountdetails.getAccountBankName());

        // Set the user reference in the new account
        newAccount.setUser(user);

        // Save the new account to the Accounts collection
        accountRepository.save(newAccount);

        return ResponseEntity.status(HttpStatus.CREATED).body(newAccount);
    }

    public List<Accounts> listAccount(String userId) {
        return accountRepository.findByUser_Id(userId);
    }

    public ResponseEntity<String> updateAccountBalance(String accountNo, double newBalance) {
        Query query = new Query(Criteria.where("accountNo").is(accountNo));
        Update update = new Update().set("accountBalance", newBalance);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Accounts.class);

        if (updateResult.getModifiedCount() > 0) {
            // The account balance was updated successfully
            return ResponseEntity.status(HttpStatus.OK).body("Account balance updated successfully.");
        } else {
            // No matching account was found, or the balance was not modified
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found or balance not modified.");
        }
    }
}
