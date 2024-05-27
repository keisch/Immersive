package com.example.Immersiveproject.services;

import com.example.Immersiveproject.dtos.*;
import com.example.Immersiveproject.entities.Products;
import com.example.Immersiveproject.entities.ShoppingCart;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.entities.WishList;
import com.example.Immersiveproject.repositories.ProductRepository;
import com.example.Immersiveproject.repositories.ShoppingCartRepository;
import com.example.Immersiveproject.repositories.UserRepository;
import com.example.Immersiveproject.repositories.WishListRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class WishListService {

    @Autowired
    WishListRepository wishListRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    public WishListService(WishListRepository wishListRepository){this.wishListRepository = wishListRepository;}

    public List<ShoppingCartDto> getWishList(Integer userId){
        List<ShoppingCartDto> shoppingCartDto = new ArrayList<>();


        wishListRepository.findProductIdsByUserId(userId).forEach(element -> {
            shoppingCartDto.add(modelMapper.map(element, ShoppingCartDto.class));
        });

        return shoppingCartDto;
    }

    public boolean addItem(Integer userId, PostProductDto productId){

        if (wishListRepository.findByUserIdAndProductsId(userId,productId.getProducts()).isEmpty()){
            Products product = productRepository.findById(productId.getProducts()).orElseThrow(() -> new RuntimeException("Error: Product not found"));
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Error: User not found"));
            var wishList = new WishList();
            wishList.setUser(user);
            wishList.setProducts(product);
            wishList.setQuantity(1);

            wishListRepository.save(wishList);
            return true;
        }
        WishList wishList = wishListRepository.findByUserIdAndProductsId(userId,productId.getProducts()).orElseThrow(() -> new RuntimeException("Error: ShoppingCart not found"));
        wishList.setQuantity(wishList.getQuantity() + 1);
        wishListRepository.save(wishList);
        return false;
    }

    public List<WishListQuantityDto> getShoppingCartValues(Integer userId) {
        List<WishListQuantityDto> shoppingCartValuesDtoList = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();

        wishListRepository.findProductIdsByUserId(userId).forEach(shoppingCart -> {
            WishListQuantityDto dto = modelMapper.map(shoppingCart, WishListQuantityDto.class);
            dto.setQuantity(shoppingCart.getQuantity());
            shoppingCartValuesDtoList.add(dto);
        });

        return shoppingCartValuesDtoList;
    }


    public boolean editItem(Integer userId, PutProductsDto putProductsDto ){

        if (wishListRepository.findByUserIdAndProductsId(userId, putProductsDto.getProducts()).isEmpty()) {
            return false;
        }
        if (putProductsDto.getQuantity() <= 0){
            return false;
        }
        WishList wishList = wishListRepository.findByUserIdAndProductsId(userId,putProductsDto.getProducts()).orElseThrow(() -> new RuntimeException("Error: ShoppingCart not found"));
        wishList.setQuantity(putProductsDto.getQuantity());
        wishListRepository.save(wishList);
        return true;
    }

    public boolean deleteItem(Integer userId, Integer productId){

        if (wishListRepository.findByUserIdAndProductsId(userId, productId).isEmpty()) {
            return false;
        }
        WishList wishList = wishListRepository.findByUserIdAndProductsId(userId,productId).orElseThrow(() -> new RuntimeException("Error: ShoppingCart not found"));
        wishListRepository.delete(wishList);
        return true;
    }

}
