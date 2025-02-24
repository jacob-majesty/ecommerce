package com.majesty.ecom.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majesty.ecom.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);
}
