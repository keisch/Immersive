package com.example.Immersiveproject.controllers;

import com.example.Immersiveproject.dtos.ShoppingCartDto;
import com.example.Immersiveproject.dtos.PostProductDto;
import com.example.Immersiveproject.dtos.PutProductsDto;
import com.example.Immersiveproject.dtos.ShoppingCartValuesDto;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.services.ShoppingCartService;
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

    @GetMapping("/values")
    @PreAuthorize("isAuthenticated()")
    public List<ShoppingCartValuesDto> getShoppingCartValues(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return shoppingCartService.getShoppingCartValues(currentUser.getId());
    }

    @PostMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean addShoppingCart(@RequestBody PostProductDto postProductDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return shoppingCartService.addItem(currentUser.getId(), postProductDto);
    }

    @PostMapping("/fromWish")
    @PreAuthorize("isAuthenticated()")
    public boolean addShoppingCartFromWish(@RequestBody PutProductsDto putProductsDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return shoppingCartService.addItemFromWish(currentUser.getId(), putProductsDto);
    }

    @PostMapping("/allFromWish")
    @PreAuthorize("isAuthenticated()")
    public boolean addAllFromWish(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return shoppingCartService.addAllFromWish(currentUser.getId());
    }

    @PutMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean editShoppingCart(@RequestBody PutProductsDto putProductsDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return shoppingCartService.editItem(currentUser.getId(), putProductsDto);
    }

    @DeleteMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean deleteShoppingCart(@RequestParam Integer product){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return shoppingCartService.deleteItem(currentUser.getId(), product);
    }

}