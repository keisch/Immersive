package com.example.Immersiveproject.repositories;

import com.example.Immersiveproject.entities.Role;
import com.example.Immersiveproject.entities.RoleEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
    Optional<Role> findByName(RoleEnum name);
}