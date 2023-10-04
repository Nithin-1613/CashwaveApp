package com.example.Natwest.cashwavebackend.Repository;

import com.example.Natwest.cashwavebackend.Entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends MongoRepository<Accounts,String> {
    List<Accounts> findByUser_Id(String Id);

    Accounts findByAccountNo(String accountNo);

    Boolean existsByAccountNo(String accountNo);

}
