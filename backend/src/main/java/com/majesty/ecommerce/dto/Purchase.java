package com.majesty.ecommerce.dto;

import com.majesty.ecommerce.entity.Customer;
import com.majesty.ecommerce.entity.Address;
import com.majesty.ecommerce.entity.Order;
import com.majesty.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
