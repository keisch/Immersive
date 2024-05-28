package com.example.Immersiveproject.services;

import com.example.Immersiveproject.dtos.ChangeOrderStateDto;
import com.example.Immersiveproject.dtos.OrderDataDto;
import com.example.Immersiveproject.dtos.OrderDetailsDto;
import com.example.Immersiveproject.dtos.OrderFormDto;
import com.example.Immersiveproject.entities.*;
import com.example.Immersiveproject.repositories.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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


    public List<OrderFormDto> getAllOrders() {
        List<OrderFormDto> orderFormDtoList = new ArrayList<>();
        List<OrderForm> orderFormList = new ArrayList<>();

        orderFormRepository.findAll().forEach(orderFormList::add);

        for (OrderForm orderForm : orderFormList) {
            OrderFormDto orderFormDto = new OrderFormDto();
            orderFormDto.setId(orderForm.getId());
            orderFormDto.setState(orderForm.getState());
            orderFormDto.setCity(orderForm.getCity());
            orderFormDto.setProvince(orderForm.getProvince());
            orderFormDto.setEmail(orderForm.getUser().getEmail());
            orderFormDto.setDate(orderForm.getDate());
            orderFormDtoList.add(orderFormDto);
            }
        return orderFormDtoList;
    }

    public List<OrderDetailsDto> getUserOrderDetails(Integer orderFormId) {
        List<OrderDetailsDto> orderDetailsDto = new ArrayList<>();
        List<OrderHistory> orderDetailslist = orderHistoryRepository.findProductIdAndQuantityByOrderFormId(orderFormId);
        for (OrderHistory orderHistory : orderDetailslist){
            OrderDetailsDto orderDetailsElement= new OrderDetailsDto();
            orderDetailsElement.setProducts(orderHistory.getProducts());
            orderDetailsElement.setQuantity(orderHistory.getQuantity());
            orderDetailsDto.add(orderDetailsElement);
        }
        return orderDetailsDto;
    }

    public boolean getChangeOrderState(ChangeOrderStateDto input) {
        State state = stateRepository.findById(input.getStateId()).orElseThrow(() -> new RuntimeException("Error: User not found"));
        OrderForm orderForm = orderFormRepository.findById(input.getOrderFormId()).orElseThrow(() -> new RuntimeException("Error: User not found"));
        orderForm.setState(state);
        orderFormRepository.save(orderForm);
        return true;
    }

    public List<OrderFormDto> getAllUserOrders(Integer userId) {
        List<OrderFormDto> orderFormDtoList = new ArrayList<>();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Error: User not found"));

        List<OrderForm> orderForms = orderFormRepository.findByUserId(userId);

        for (OrderForm orderForm : orderForms) {
            OrderFormDto orderFormDto = new OrderFormDto();
            orderFormDto.setId(orderForm.getId());
            orderFormDto.setState(orderForm.getState()); // Assuming State has a getName() method
            orderFormDto.setCity(orderForm.getCity());
            orderFormDto.setProvince(orderForm.getProvince());
            orderFormDto.setEmail(user.getEmail());
            orderFormDto.setDate(orderForm.getDate());
            orderFormDtoList.add(orderFormDto);
        }

        return orderFormDtoList;
    }

    public boolean addUserOrder(Integer userId, OrderDataDto orderDto){
        Optional<State> optionalState = stateRepository.findByName(StateEnum.PENDING);
        DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = LocalDate.now().format(DATE_FORMATTER);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Error: User not found"));

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
        orderForm.setState(optionalState.get());
        orderForm.setTotalPrice(orderDto.getTotalPrice());
        orderForm.setDate(formattedDate);
        orderForm.setUser(user);
        orderFormRepository.save(orderForm);


        shoppingCartRepository.findProductIdsByUserId(userId).forEach(element -> {
            OrderHistory orderHistory = new OrderHistory();
            orderHistory.setProducts(element.getProducts());
            orderHistory.setQuantity(element.getQuantity());
            orderHistory.setOrderForm(orderForm);
            orderHistoryRepository.save(orderHistory);
            shoppingCartRepository.delete(element);
        });
        return true;
    }
}
