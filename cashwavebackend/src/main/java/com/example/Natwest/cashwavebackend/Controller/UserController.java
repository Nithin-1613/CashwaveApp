package com.example.Natwest.cashwavebackend.Controller;

import com.example.Natwest.cashwavebackend.DTO.AccountRequest;
import com.example.Natwest.cashwavebackend.DTO.CreditCardRequest;
import com.example.Natwest.cashwavebackend.DTO.TransactionRequest;
import com.example.Natwest.cashwavebackend.DTO.TransferRequest;
import com.example.Natwest.cashwavebackend.Entity.Accounts;
import com.example.Natwest.cashwavebackend.Entity.CreditCard;
import com.example.Natwest.cashwavebackend.Entity.Transaction;
import com.example.Natwest.cashwavebackend.Entity.Users;
import com.example.Natwest.cashwavebackend.Repository.UserRepository;
import com.example.Natwest.cashwavebackend.Service.AccountService;
import com.example.Natwest.cashwavebackend.Service.CreditCardService;
import com.example.Natwest.cashwavebackend.Service.TransactionService;
import com.example.Natwest.cashwavebackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

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
    UserRepository UserRepository;

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
    @PostMapping("/register")
    public ResponseEntity<Users> registerUser(@RequestBody Users user) {
        try {

            Users registeredUser = userService.registerUser(user);
            return new ResponseEntity<>(registeredUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String emailid) {
        try {
            // Check if the email already exists in the database
            boolean isEmailUnique = userService.isUserEmailUnique(emailid);
            return ResponseEntity.ok(isEmailUnique);
        } catch (Exception e) {
            // Handle exceptions appropriately and return an error response if needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }

    }
    @PostMapping("/login")
    public ResponseEntity<Users> loginUser(@RequestBody com.example.Natwest.cashwavebackend.Dto.logincred loginreq) {
        String emailid = loginreq.getEmailid();
        String security_PIN = loginreq.getSecurity_PIN();
        return userService.loginUser(emailid, security_PIN);
    }
    @PutMapping("/update/{userId}")
    public ResponseEntity<Users> updateUser(@PathVariable String userId, @RequestBody Users updatedUserData) {
        try {
            // Call your UserService method to update the user data in the database
            Users updatedUser = userService.updateUser(userId, updatedUserData);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update_password/{userId}")
    public ResponseEntity<Users> updateUser_Password(@PathVariable String userId, @RequestBody Users updatedUserData) {
        try {
            // Call your UserService method to update the user data in the database
            Users updatedUser = userService.updateUser_Password(userId, updatedUserData);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> initiatePasswordReset(@RequestBody Map<String, String> request) {
        String email = request.get("emailid");

        // Check if the email exists in the database using UserRepository
        Users user = UserRepository.findByEmailid(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Initiate the password reset process using UserService
        userService.initiatePasswordReset(email);

        return ResponseEntity.status(HttpStatus.OK).body("Password reset initiated. Check your email.");
    }

    @GetMapping("/validate-reset-token")
    public ResponseEntity<String> validateResetToken(@RequestParam String token) {
        Optional<Users> optionalUser = UserRepository.findByResetToken(token);
        Users user = optionalUser.orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }

        Date resetTokenExpiryDate = user.getResetTokenExpiryDate();
        Date now = new Date();

        if (resetTokenExpiryDate == null || resetTokenExpiryDate.before(now)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expired token");
        }

        return ResponseEntity.ok("Token is valid");
    }
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        // Check if the token is valid and not expired
        Optional<Users> optionalUser = UserRepository.findByResetToken(token);
        Users user = optionalUser.orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }

        Date resetTokenExpiryDate = user.getResetTokenExpiryDate();
        Date now = new Date();

        if (resetTokenExpiryDate == null || resetTokenExpiryDate.before(now)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expired token");
        }

        // Update the user's password
        user.setSecurity_PIN(newPassword); // Use password hashing
        user.setResetToken(null);
        user.setResetTokenExpiryDate(null);
        UserRepository.save(user);

        return ResponseEntity.ok("Password reset successful");
    }
}

