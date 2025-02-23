package com.majesty.ecom.dto;

import java.util.Set;

import com.majesty.ecom.entity.Address;
import com.majesty.ecom.entity.Customer;
import com.majesty.ecom.entity.Order;
import com.majesty.ecom.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}