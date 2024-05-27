package com.example.Immersiveproject.repositories;


import com.example.Immersiveproject.entities.OrderForm;
import com.example.Immersiveproject.entities.OrderHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderFormRepository extends CrudRepository<OrderForm, Integer> {
}
