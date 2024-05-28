package com.example.Immersiveproject.dtos;

import com.example.Immersiveproject.entities.OrderForm;
import com.example.Immersiveproject.entities.Products;
import jakarta.persistence.*;

public class OrderDetailsDto {
    private Products products;
    private Integer quantity;

    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}