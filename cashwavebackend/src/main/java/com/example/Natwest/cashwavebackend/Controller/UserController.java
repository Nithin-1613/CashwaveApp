package com.example.Natwest.cashwavebackend.Controller;

import com.example.Natwest.cashwavebackend.DTO.AccountRequest;
import com.example.Natwest.cashwavebackend.DTO.CreditCardRequest;
import com.example.Natwest.cashwavebackend.DTO.TransactionRequest;
import com.example.Natwest.cashwavebackend.DTO.TransferRequest;
import com.example.Natwest.cashwavebackend.Entity.Accounts;
import com.example.Natwest.cashwavebackend.Entity.CreditCard;
import com.example.Natwest.cashwavebackend.Entity.Transaction;
import com.example.Natwest.cashwavebackend.Entity.Users;
import com.example.Natwest.cashwavebackend.Service.AccountService;
import com.example.Natwest.cashwavebackend.Service.CreditCardService;
import com.example.Natwest.cashwavebackend.Service.TransactionService;
import com.example.Natwest.cashwavebackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cashwave")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AccountService accountService;

    @Autowired
    TransactionService transactionService;

    @Autowired
    CreditCardService creditCardService;


    @PostMapping("/addUser")
    public Users addUser(@RequestBody Users user)
    {
        return userService.addUser(user);
    }

   @PostMapping("/{user_id}/addAccount")
    public ResponseEntity<?> addAccount(@RequestBody AccountRequest account, @PathVariable String user_id){
        return accountService.addAccount(user_id,account);
   }

//   @PostMapping("/addTransaction")
//    public Transaction addTransaction(@RequestBody Transaction transaction)
//   {
//       return transactionService.addTransaction(transaction);
//   }

    @GetMapping("/{user_id}/listAccounts")
    public ResponseEntity<List<Accounts>> listAccount(@PathVariable String user_id)
    {
        return new ResponseEntity<>(accountService.listAccount(user_id),HttpStatus.OK);
    }

    @PostMapping("/{user_id}/addTrans")
    public ResponseEntity<Transaction> addTransaction(@PathVariable String user_id, @RequestBody TransactionRequest transactionRequest,@RequestBody String fromAccount)
    {
        return new ResponseEntity<>(transactionService.addTransaction(user_id,transactionRequest,fromAccount),HttpStatus.OK);
    }

    @GetMapping("/{user_id}/listTrans")
    public ResponseEntity<List<Transaction>> listTransactions(@PathVariable String user_id)
    {
        return new ResponseEntity<>(transactionService.listTransaction(user_id),HttpStatus.OK);
    }

    @PutMapping("/{user_id}/makeTransfer")
    public ResponseEntity<?> makeTransfer(@PathVariable String user_id, @RequestBody TransferRequest transferRequest)
    {
        try {
            TransactionRequest transactionRequest = transferRequest.getTransactionRequest();
            String fromAccount = transferRequest.getFromAccountNo();
            return transactionService.transferAmount(user_id, transactionRequest, fromAccount);
        } catch (Exception e) {
            // Handle any unexpected exceptions here and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the request");
        }
    }

    @PostMapping("/{user_id}/addCreditCard")
    public ResponseEntity<?> addCreditCard(@PathVariable String user_id, @RequestBody CreditCardRequest creditCardRequest)
    {
        return creditCardService.addCreditCard(user_id,creditCardRequest);
    }

    @GetMapping("/{user_id}/listCreditCard")
    public ResponseEntity<?> listCreditCard(@PathVariable String user_id)
    {
        return creditCardService.listCreditCards(user_id);
    }
}
