package com.example.Immersiveproject.repositories;

import com.example.Immersiveproject.entities.OrderHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderHistoryRepository extends CrudRepository<OrderHistory, Integer> {
}
