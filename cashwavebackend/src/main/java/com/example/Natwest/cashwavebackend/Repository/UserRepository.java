package com.example.Natwest.cashwavebackend.Repository;

import com.example.Natwest.cashwavebackend.Entity.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<Users,String> {
}
