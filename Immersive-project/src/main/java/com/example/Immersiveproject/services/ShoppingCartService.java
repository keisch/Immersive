package com.example.Immersiveproject.services;

import com.example.Immersiveproject.dtos.ShoppingCartDto;
import com.example.Immersiveproject.dtos.PostProductDto;
import com.example.Immersiveproject.dtos.PutProductsDto;
import com.example.Immersiveproject.dtos.ShoppingCartValuesDto;
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
import java.util.Optional;

@Service
public class ShoppingCartService {
    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    WishListRepository wishListRepository;

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

    public List<ShoppingCartValuesDto> getShoppingCartValues(Integer userId) {
        List<ShoppingCartValuesDto> shoppingCartValuesDtoList = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();

        shoppingCartRepository.findProductIdsByUserId(userId).forEach(shoppingCart -> {
            ShoppingCartValuesDto dto = modelMapper.map(shoppingCart, ShoppingCartValuesDto.class);
            dto.setPrice(shoppingCart.getProducts().getPrice());
            dto.setQuantity(shoppingCart.getQuantity());
            shoppingCartValuesDtoList.add(dto);
        });

        return shoppingCartValuesDtoList;
    }

    public boolean addItem(Integer userId, PostProductDto productId){

        if (shoppingCartRepository.findByUserIdAndProductsId(userId,productId.getProducts()).isEmpty()){
            Products product = productRepository.findById(productId.getProducts()).orElseThrow(() -> new RuntimeException("Error: Product not found"));
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Error: User not found"));
            var shoppingCart = new ShoppingCart();
            shoppingCart.setUser(user);
            shoppingCart.setProducts(product);
            shoppingCart.setQuantity(1);

            shoppingCartRepository.save(shoppingCart);
            return true;
        }
        ShoppingCart shoppingCart = shoppingCartRepository.findByUserIdAndProductsId(userId,productId.getProducts()).orElseThrow(() -> new RuntimeException("Error: ShoppingCart not found"));
        shoppingCart.setQuantity(shoppingCart.getQuantity() + 1);
        shoppingCartRepository.save(shoppingCart);
        return false;
    }

    public boolean addItemFromWish(Integer userId, PutProductsDto putProductsDto){

        if (shoppingCartRepository.findByUserIdAndProductsId(userId,putProductsDto.getProducts()).isEmpty()){
            Products product = productRepository.findById(putProductsDto.getProducts()).orElseThrow(() -> new RuntimeException("Error: Product not found"));
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Error: User not found"));
            var shoppingCart = new ShoppingCart();
            shoppingCart.setUser(user);
            shoppingCart.setProducts(product);
            shoppingCart.setQuantity(putProductsDto.getQuantity());

            shoppingCartRepository.save(shoppingCart);

        }
        return true;
    }

    private void updateExistingCart(ShoppingCart shoppingCart, WishList wishItem) {
        shoppingCart.setQuantity(shoppingCart.getQuantity() + wishItem.getQuantity());
        shoppingCartRepository.save(shoppingCart);
    }

    private void addNewProductToCart(Integer userId, WishList wishItem) {
        Products product = productRepository.findById(wishItem.getProducts().getId())
                .orElseThrow(() -> new RuntimeException("Error: Product not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: User not found"));

        ShoppingCart newCart = new ShoppingCart();
        newCart.setUser(user);
        newCart.setProducts(product);
        newCart.setQuantity(wishItem.getQuantity());

        shoppingCartRepository.save(newCart);
    }

    public boolean addAllFromWish(Integer userId) {
        List<WishList> wishListItems = wishListRepository.findByUserId(userId);
        wishListItems.forEach(wishItem -> {
            Integer productId = wishItem.getProducts().getId();
            Optional<ShoppingCart> existingCartOpt = shoppingCartRepository.findByUserIdAndProductsId(userId, productId);

            if (existingCartOpt.isPresent()) {
                updateExistingCart(existingCartOpt.get(), wishItem);
            } else {
                addNewProductToCart(userId, wishItem);
            }
            wishListRepository.delete(wishItem);
        });
        return true;
    }

    public boolean editItem(Integer userId, PutProductsDto putProductsDto){

        if (shoppingCartRepository.findByUserIdAndProductsId(userId, putProductsDto.getProducts()).isEmpty()) {
            return false;
        }
        if (putProductsDto.getQuantity() <= 0){
            return false;
        }
        ShoppingCart shoppingCart = shoppingCartRepository.findByUserIdAndProductsId(userId, putProductsDto.getProducts()).orElseThrow(() -> new RuntimeException("Error: ShoppingCart not found"));
        shoppingCart.setQuantity(putProductsDto.getQuantity());
        shoppingCartRepository.save(shoppingCart);
        return true;
    }

    public boolean deleteItem(Integer userId, Integer productId){

        if (shoppingCartRepository.findByUserIdAndProductsId(userId, productId).isEmpty()) {
            return false;
        }
        ShoppingCart shoppingCart = shoppingCartRepository.findByUserIdAndProductsId(userId,productId).orElseThrow(() -> new RuntimeException("Error: ShoppingCart not found"));
        shoppingCartRepository.delete(shoppingCart);
        return true;
    }

}
