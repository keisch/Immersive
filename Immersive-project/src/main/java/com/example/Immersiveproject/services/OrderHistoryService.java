package com.example.Immersiveproject.services;

import com.example.Immersiveproject.dtos.OrderDataDto;
import com.example.Immersiveproject.dtos.ProductListDto;
import com.example.Immersiveproject.dtos.ShoppingCartDto;
import com.example.Immersiveproject.entities.*;
import com.example.Immersiveproject.repositories.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderHistoryService {
    @Autowired
    OrderHistoryRepository orderHistoryRepository;

    @Autowired
    OrderFormRepository orderFormRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private StateRepository stateRepository;

    public OrderHistoryService(OrderHistoryRepository orderHistoryRepository){this.orderHistoryRepository = orderHistoryRepository;}

//    public List<ShoppingCartDto> getAllUserOrders(Integer userId){
//
//
//        shoppingCartRepository.findProductIdsByUserId(userId).forEach(element -> {
//            shoppingCartDto.add(modelMapper.map(element, ShoppingCartDto.class));
//        });
//
//        return shoppingCartDto;
//    }

    public boolean addUserOrder(Integer userId, OrderDataDto orderDto){
        Optional<State> optionalState = stateRepository.findByName(StateEnum.PENDING);

        var orderForm = new OrderForm();
        orderForm.setAddress1(orderDto.getAddress1());
        orderForm.setAddress2(orderDto.getAddress2());
        orderForm.setCity(orderDto.getCity());
        orderForm.setProvince(orderDto.getProvince());
        orderForm.setZipCode(orderDto.getZipCode());
        orderForm.setCardNumber(orderDto.getCardNumber());
        orderForm.setCardHolderName(orderDto.getCardHolderName());
        orderForm.setCardExpiryDate(orderDto.getCardExpiryDate());
        orderForm.setCardCVV(orderDto.getCardCVV());
        orderFormRepository.save(orderForm);

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Error: User not found"));
        shoppingCartRepository.findProductIdsByUserId(userId).forEach(element -> {
            OrderHistory orderHistory = new OrderHistory();
            orderHistory.setUser(element.getUser());
            orderHistory.setProducts(element.getProducts());
            orderHistory.setQuantity(element.getQuantity());
            orderHistory.setOrderForm(orderForm);
            orderHistory.setUser(user);
            orderHistory.setState(optionalState.get());
            orderHistoryRepository.save(orderHistory);
            shoppingCartRepository.delete(element);
        });
        return true;
    }
}
