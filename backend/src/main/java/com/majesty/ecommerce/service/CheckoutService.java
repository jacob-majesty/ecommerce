package com.majesty.ecommerce.service;

import com.majesty.ecommerce.dto.PaymentInfo;
import com.majesty.ecommerce.dto.Purchase;
import com.majesty.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
