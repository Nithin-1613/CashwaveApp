package com.example.Natwest.cashwavebackend.Service;

import com.example.Natwest.cashwavebackend.DTO.CreditCardRequest;
import com.example.Natwest.cashwavebackend.Entity.CreditCard;
import com.example.Natwest.cashwavebackend.Entity.Users;
import com.example.Natwest.cashwavebackend.Repository.CreditCardRepository;
import com.example.Natwest.cashwavebackend.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreditCardService {
    @Autowired
    CreditCardRepository creditCardRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<?> addCreditCard(String userId, CreditCardRequest creditCardRequest)
    {
        // Find the user by ID
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        if(creditCardRepository.existsByCreditCardNo(creditCardRequest.getCreditCardNo()))
            ResponseEntity.status(HttpStatus.CONFLICT).body("Credit card number already exists.");
        CreditCard newCreditCard = new CreditCard();
        newCreditCard.setCreditCardNo(creditCardRequest.getCreditCardNo());
        newCreditCard.setBankName(creditCardRequest.getBankName());
        newCreditCard.setCardHolderName(creditCardRequest.getCardHolderName());
        newCreditCard.setExpiryDate(creditCardRequest.getExpiryDate());
        newCreditCard.setUsers(user)  ;
        return new ResponseEntity<>(creditCardRepository.save(newCreditCard),HttpStatus.OK);
    }

    public ResponseEntity<?> listCreditCards(String userId)
    {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        return new ResponseEntity<>(creditCardRepository.findByUsers_Id(userId),HttpStatus.OK);
    }
}
