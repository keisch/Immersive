package com.example.Immersiveproject.controllers;

import com.example.Immersiveproject.dtos.*;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.services.WishListService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/wishList")
@RestController
public class WishListController {

    private final WishListService wishListService;

    public WishListController(WishListService wishListService) {
        this.wishListService = wishListService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<ShoppingCartDto> getShoppingCart(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return wishListService.getWishList(currentUser.getId());    
    }

    @GetMapping("/values")
    @PreAuthorize("isAuthenticated()")
    public List<WishListQuantityDto> getShoppingCartValues(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return wishListService.getShoppingCartValues(currentUser.getId());
    }

    @PostMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean addShoppingCart(@RequestBody PostProductDto postProductDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return wishListService.addItem(currentUser.getId(), postProductDto);
    }

    @PutMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean editShoppingCart(@RequestBody PutProductsDto putProductsDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return wishListService.editItem(currentUser.getId(), putProductsDto);
    }

    @DeleteMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean deleteShoppingCart(@RequestParam Integer product){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return wishListService.deleteItem(currentUser.getId(), product);
    }

}