package com.example.Natwest.cashwavebackend.Service;

import com.example.Natwest.cashwavebackend.Entity.Accounts;
import com.example.Natwest.cashwavebackend.Entity.Transaction;
import com.example.Natwest.cashwavebackend.Entity.Users;
import com.example.Natwest.cashwavebackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public Users addUser(Users user)
    {
        return userRepository.save(user);
    }


}
