package com.example.Immersiveproject.repositories;

import com.example.Immersiveproject.entities.Role;
import com.example.Immersiveproject.entities.RoleEnum;
import com.example.Immersiveproject.entities.State;
import com.example.Immersiveproject.entities.StateEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StateRepository extends CrudRepository<State, Integer> {
    Optional<State> findByName(StateEnum name);
}