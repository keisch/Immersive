package com.example.Immersiveproject.bootstrap;

import com.example.Immersiveproject.dtos.RegisterUserDto;
import com.example.Immersiveproject.entities.Role;
import com.example.Immersiveproject.entities.RoleEnum;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.repositories.RoleRepository;
import com.example.Immersiveproject.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    public AdminSeeder(
            RoleRepository roleRepository,
            UserRepository  userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.createAdministrator();
    }

    private void createAdministrator() {
        RegisterUserDto userDto = new RegisterUserDto();
        userDto.setName("Admin").setLastName("AdminLast").setEmail("admin@email.com").setPassword("123456");

        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalRole.isEmpty() || optionalUser.isPresent()) {
            return;
        }

        var user = new User()
                .setName(userDto.getName())
                .setLastName(userDto.getLastName())
                .setEmail(userDto.getEmail())
                .setPassword(passwordEncoder.encode(userDto.getPassword()))
                .setRole(optionalRole.get());

        userRepository.save(user);
    }
    @PostConstruct
    public void init() {
        this.createAdministrator();
    }
}