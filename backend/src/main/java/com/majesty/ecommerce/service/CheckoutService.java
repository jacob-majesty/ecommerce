package com.majesty.ecommerce.service;

import com.majesty.ecommerce.dto.Purchase;
import com.majesty.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
