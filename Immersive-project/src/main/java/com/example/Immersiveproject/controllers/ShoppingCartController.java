package com.example.Immersiveproject.controllers;

import com.example.Immersiveproject.dtos.ShoppingCartDto;
import com.example.Immersiveproject.entities.ShoppingCart;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.services.ShoppingCartService;
import com.example.Immersiveproject.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cart")
@RestController
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<ShoppingCartDto> getShoppingCart(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return shoppingCartService.getShoppingCart(currentUser.getId());
    }

    @PostMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean addShoppingCart(@RequestParam Integer product,
                                   @RequestParam Integer quantity){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return shoppingCartService.addItem(currentUser.getId(), product, quantity);
    }

}