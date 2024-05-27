package com.example.Immersiveproject.controllers;

import com.example.Immersiveproject.dtos.*;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.services.OrderHistoryService;
import com.example.Immersiveproject.services.ShoppingCartService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/order")
@RestController
public class OrdersController {

    private final OrderHistoryService orderHistoryService;

    public OrdersController(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

//    @GetMapping
//    @PreAuthorize("isAuthenticated()")
//    public List<ShoppingCartDto> getShoppingCart(){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        User currentUser = (User) authentication.getPrincipal();
//
//        return shoppingCartService.getShoppingCart(currentUser.getId());
//    }

    @PostMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean addUserOrder(@RequestBody OrderDataDto orderDataDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return orderHistoryService.addUserOrder(currentUser.getId(), orderDataDto);
    }

}