package com.example.Natwest.cashwavebackend.Entity;


import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "creditcard")
@Data
public class CreditCard {
    @Id
    @Field(name="_id")
    public String creditCardNo;
    public String bankName;
    public String cardHolderName;
    public String expiryDate;
    @DBRef
    private Users users;
}
