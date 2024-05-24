package com.example.Immersiveproject.repositories;

import com.example.Immersiveproject.entities.ShoppingCart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends CrudRepository<ShoppingCart, Integer>{
    List<ShoppingCart> findProductIdsByUserId(Integer userId);
    Optional<ShoppingCart> findByUserIdAndProductsId(Integer userId, Integer productId);
}
