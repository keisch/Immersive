package com.example.Immersiveproject.repositories;

import com.example.Immersiveproject.dtos.OrderDetailsDto;
import com.example.Immersiveproject.entities.OrderHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHistoryRepository extends CrudRepository<OrderHistory, Integer> {
    List<OrderHistory> findProductIdAndQuantityByOrderFormId(Integer orderFormId);
}