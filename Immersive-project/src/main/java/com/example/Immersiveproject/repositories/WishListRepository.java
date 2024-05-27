package com.example.Immersiveproject.repositories;

import com.example.Immersiveproject.entities.ShoppingCart;
import com.example.Immersiveproject.entities.WishList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishListRepository extends CrudRepository<WishList, Integer> {
    List<WishList> findByUserId(Integer userId);
    List<WishList> findProductIdsByUserId(Integer userId);
    Optional<WishList> findByUserIdAndProductsId(Integer userId, Integer productId);
}
