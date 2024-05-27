package com.example.Immersiveproject.bootstrap;

import com.example.Immersiveproject.entities.Role;
import com.example.Immersiveproject.entities.RoleEnum;
import com.example.Immersiveproject.entities.State;
import com.example.Immersiveproject.entities.StateEnum;
import com.example.Immersiveproject.repositories.RoleRepository;
import com.example.Immersiveproject.repositories.StateRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

@Component
public class StateSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final StateRepository stateRepository;

    public StateSeeder(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.loadStates();
    }

    private void loadStates() {
        StateEnum[] stateNames = new StateEnum[] { StateEnum.PENDING, StateEnum.COMPLETED, StateEnum.CANCELLED };

        Arrays.stream(stateNames).forEach((stateName) -> {
            Optional<State> optionalState = stateRepository.findByName(stateName);

            optionalState.ifPresentOrElse(System.out::println, () -> {
                State stateToCreate = new State();
                stateToCreate.setName(stateName);
                stateRepository.save(stateToCreate);
            });
        });
    }
}