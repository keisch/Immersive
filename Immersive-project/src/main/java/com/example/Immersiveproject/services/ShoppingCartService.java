package com.example.Immersiveproject.services;

import com.example.Immersiveproject.dtos.ShoppingCartDto;
import com.example.Immersiveproject.entities.Products;
import com.example.Immersiveproject.entities.ShoppingCart;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.repositories.ProductRepository;
import com.example.Immersiveproject.repositories.ShoppingCartRepository;
import com.example.Immersiveproject.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingCartService {
    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository){this.shoppingCartRepository = shoppingCartRepository;}

    public List<ShoppingCartDto> getShoppingCart(Integer userId){
        List<ShoppingCartDto> shoppingCartDto = new ArrayList<>();


        shoppingCartRepository.findProductIdsByUserId(userId).forEach(element -> {
            shoppingCartDto.add(modelMapper.map(element, ShoppingCartDto.class));
        });

        return shoppingCartDto;
    }

    public boolean addItem(Integer userId, Integer productId, Integer quantity){

        if (shoppingCartRepository.findByUserIdAndProductsId(userId,productId).isEmpty()){
            Products product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Error"));
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Error"));
            var shoppingCart = new ShoppingCart();
            shoppingCart.setUser(user);
            shoppingCart.setProducts(product);
            shoppingCart.setQuantity(quantity);

            shoppingCartRepository.save(shoppingCart);
            return true;
        }
        ShoppingCart shoppingCart = shoppingCartRepository.findByUserIdAndProductsId(userId,productId).orElseThrow(() -> new RuntimeException("Error"));;
        shoppingCart.setQuantity(quantity);
        return false;
    }

}
