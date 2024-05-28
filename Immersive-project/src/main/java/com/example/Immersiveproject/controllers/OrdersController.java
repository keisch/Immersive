package com.example.Immersiveproject.controllers;

import com.example.Immersiveproject.dtos.*;
import com.example.Immersiveproject.entities.OrderHistory;
import com.example.Immersiveproject.entities.User;
import com.example.Immersiveproject.services.OrderHistoryService;
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

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<OrderFormDto> getAllUserOrders(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return orderHistoryService.getAllUserOrders(currentUser.getId());
    }

    @GetMapping("/details")
    @PreAuthorize("isAuthenticated()")
    public List<OrderDetailsDto> getUserOrderDetails(@RequestParam Integer orderFormId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return orderHistoryService.getUserOrderDetails(orderFormId);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderFormDto> getAllOrders(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return orderHistoryService.getAllOrders();
    }

    @PostMapping()
    @PreAuthorize("isAuthenticated()")
    public boolean addUserOrder(@RequestBody OrderDataDto orderDataDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return orderHistoryService.addUserOrder(currentUser.getId(), orderDataDto);
    }

    @PutMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public boolean changeOrderState(@RequestBody ChangeOrderStateDto input){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return orderHistoryService.getChangeOrderState(input);
    }
}