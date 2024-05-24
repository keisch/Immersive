package com.example.Immersiveproject.controllers;

import com.example.Immersiveproject.dtos.RegisterUserDto;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/admins")
@RestController
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

//    @PostMapping
//    @PreAuthorize("hasRole('SUPER_ADMIN')")
//    public ResponseEntity<User> createAdministrator(@RequestBody RegisterUserDto registerUserDto) {
//        User createdAdmin = userService.createAdministrator(registerUserDto);
//
//        return ResponseEntity.ok(createdAdmin);
//    }
}