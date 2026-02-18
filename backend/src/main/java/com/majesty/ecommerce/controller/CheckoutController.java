package com.majesty.ecommerce.controller;

import com.majesty.ecommerce.dto.Purchase;
import com.majesty.ecommerce.dto.PurchaseResponse;
import com.majesty.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${allowed.origins}")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return checkoutService.placeOrder(purchase);
    }
}
