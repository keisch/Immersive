package com.example.Immersiveproject.services;

import com.example.Immersiveproject.dtos.RegisterUserDto;
import com.example.Immersiveproject.entities.Role;
import com.example.Immersiveproject.entities.RoleEnum;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.repositories.RoleRepository;
import com.example.Immersiveproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserService() {
    }

//    public User createAdministrator(RegisterUserDto input) {
//        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);
//
//        if (optionalRole.isEmpty()) {
//            return null;
//        }
//
//        var user = new User()
//                .setFullName(input.getFullName())
//                .setEmail(input.getEmail())
//                .setPassword(passwordEncoder.encode(input.getPassword()))
//                .setRole(optionalRole.get());
//
//        return userRepository.save(user);
//    }
}