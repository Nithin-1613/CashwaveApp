package com.example.Natwest.cashwavebackend.Service;

import com.example.Natwest.cashwavebackend.Entity.Accounts;
import com.example.Natwest.cashwavebackend.Entity.Transaction;
import com.example.Natwest.cashwavebackend.Entity.Users;
import com.example.Natwest.cashwavebackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.mongodb.core.MongoTemplate;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    private final MongoTemplate mongoTemplate;

    public Users addUser(Users user)
    {
        return userRepository.save(user);
    }
    @Autowired
    public UserService(UserRepository userRepository, MongoTemplate mongoTemplate) {
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
    }
    @Autowired
    private JavaMailSender javaMailSender;

    public Users registerUser(Users user) {
        // Perform validation and other business logic if needed
        return userRepository.save(user);
    }
    public void updateResetToken(String email, String resetToken, Date resetTokenExpiration) {
        Query query = new Query(Criteria.where("emailid").is(email));
        Update update = new Update()
                .set("resetToken", resetToken)
                .set("resetTokenExpiration", resetTokenExpiration);

        mongoTemplate.updateFirst(query, update, Users.class);
    }

    private void sendPasswordResetEmail(Users user, String resetToken) {
        try {
            // Create a SimpleMailMessage
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Set the recipient email address
            mailMessage.setTo(user.getEmailid());

            // Set the subject of the email
            mailMessage.setSubject("Password Reset Request");

            // Construct the email message body with the reset token
            String resetLink = "http://your-reset-link.com?token=" + resetToken; // Replace with your actual reset link
            mailMessage.setText("To reset your password, click on the following link:\n" + resetLink);

            // Send the email
            javaMailSender.send(mailMessage);
        } catch (MailException e) {
            // Handle email sending errors
            e.printStackTrace();
            // You can log the error or take appropriate action here
        }
    }

    public boolean isUserEmailUnique(String emailid) {
        // Use your UserRepository to check if the email exists in the database
        Users existingUser = userRepository.findByEmailid(emailid);

        // If no user with the given email is found, it's unique
        return existingUser==null;
    }
    private String hashPassword(String password, String salt) {
        // You can use a secure hashing algorithm here (e.g., bcrypt)
        // For simplicity, let's assume you're using SHA-256
        String saltedPassword = password + salt;
        // Perform the hashing (you may want to use a more secure algorithm)
        return DigestUtils.sha256Hex(saltedPassword);
    }

    public ResponseEntity<Users> loginUser(String emailid, String password) {
        Users user = userRepository.findByEmailid(emailid);
        if (user != null) {
            String storedSalt = user.getSalt(); // Retrieve the salt from the user's record
            String storedHashedPIN = user.getSecurity_PIN();
            if (storedSalt != null && storedHashedPIN != null) {
                // Calculate the hash of the entered security PIN using the stored salt
                String calculatedHashedPIN = hashPassword(password, storedSalt);

                // Check if the calculated hash matches the stored hash
                if (calculatedHashedPIN.equals(storedHashedPIN)) {
                    return new ResponseEntity<>(user, HttpStatus.OK); // PIN is correct
                }
                else {
                    return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
                }
            }
            else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }
    public Users updateUser(String userId, Users updatedUserData) {
        // Find the user by ID in the database
        Users existingUser = userRepository.findById(userId).orElse(null);

        if (existingUser == null) {
            // User not found, return null or throw an exception
            return null;
        }

        // Update user information based on the provided updatedUserData
        // You can choose which fields are updatable and apply the changes accordingly
        // For example, if only the name and email are updatable:
        if (updatedUserData.getName() != null) {
            existingUser.setName(updatedUserData.getName());
        }
        if (updatedUserData.getEmailid() != null) {
            existingUser.setEmailid(updatedUserData.getEmailid());
        }
        if (updatedUserData.getAadharcardnumber() != null) {
            existingUser.setAadharcardnumber(updatedUserData.getAadharcardnumber());
        }
        if (updatedUserData.getMobilenumber() != null) {
            existingUser.setMobilenumber(updatedUserData.getMobilenumber());
        }
        if (updatedUserData.getSecurity_PIN() != null) {
            existingUser.setSecurity_PIN(updatedUserData.getSecurity_PIN());
        }
        if (updatedUserData.getSalt() != null) {
            existingUser.setSalt(updatedUserData.getSalt());
        }
        // Update other fields as needed

        // Save the updated user object back to the database
        Users updatedUser = userRepository.save(existingUser);

        return updatedUser;
    }
    public Users updateUser_Password(String userId, Users updatedUserData) {
        // Find the user by ID in the database
        Users existingUser = userRepository.findById(userId).orElse(null);

        if (existingUser == null) {
            // User not found, return null or throw an exception
            return null;
        }

        // Update user information based on the provided updatedUserData
        // You can choose which fields are updatable and apply the changes accordingly
        // For example, if only the name and email are updatable:
        if (updatedUserData.getName() != null) {
            existingUser.setName(updatedUserData.getName());
        }
        if (updatedUserData.getEmailid() != null) {
            existingUser.setEmailid(updatedUserData.getEmailid());
        }
        if (updatedUserData.getAadharcardnumber() != null) {
            existingUser.setAadharcardnumber(updatedUserData.getAadharcardnumber());
        }
        if (updatedUserData.getMobilenumber() != null) {
            existingUser.setMobilenumber(updatedUserData.getMobilenumber());
        }
        if (updatedUserData.getSecurity_PIN() != null) {
            existingUser.setSecurity_PIN(updatedUserData.getSecurity_PIN());
        }
        // Update other fields as needed

        // Save the updated user object back to the database
        Users updatedUser = userRepository.save(existingUser);

        return updatedUser;
    }
    public void initiatePasswordReset(String email) {
        Users user = userRepository.findByEmailid(email);

        if (user != null) {
            // Generate a unique reset token (you should implement this logic)
            String resetToken = generateResetToken(user);

            // Set the reset token and its expiration date in the user entity
            user.setResetToken(resetToken);
            user.setResetTokenExpiryDate(calculateExpiryDate());

            // Save the updated user entity back to the database
            userRepository.save(user);

            // Send a password reset email to the user's email address
            sendPasswordResetEmail(user, resetToken);
        }
    }
    public Date calculateExpiryDate() {
        // Create a Calendar instance to work with dates and times
        Calendar calendar = Calendar.getInstance();

        // Set the expiration time to one hour from the current time
        calendar.setTime(new Date()); // Set the calendar to the current time
        calendar.add(Calendar.HOUR_OF_DAY, 1); // Add one hour to the current time

        // Get the resulting date and time, which will be one hour from the current time
        return calendar.getTime();
    }


    public String generateResetToken(Users user) {
        String resetToken = UUID.randomUUID().toString();

        // Calculate expiration time as a java.util.Date (one hour from now)
        Date expirationTime = calculateExpiryDate();

        // Store resetToken and expirationTime in the user's document in MongoDB
        updateResetToken(user.getEmailid(), resetToken, expirationTime);

        return resetToken;
    }

}
