package com.majesty.ecom.service;

import com.majesty.ecom.dto.Purchase;
import com.majesty.ecom.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}