package com.example.Immersiveproject.entities;

import jakarta.persistence.*;

@Table(name = "states")
@Entity
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;

    @Column(unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private StateEnum name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public StateEnum getName() {
        return name;
    }

    public void setName(StateEnum name) {
        this.name = name;
    }
}
