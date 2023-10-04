package com.example.Natwest.cashwavebackend.Repository;

import com.example.Natwest.cashwavebackend.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction,Long> {
    List<Transaction> findByUser_Id(String userId);
}
