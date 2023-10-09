package com.example.Natwest.cashwavebackend.Repository;

import com.example.Natwest.cashwavebackend.Entity.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<Users,String> {
    Users findByEmailid(String emailid);
    Optional<Users> findByResetToken(String resetToken);

}
