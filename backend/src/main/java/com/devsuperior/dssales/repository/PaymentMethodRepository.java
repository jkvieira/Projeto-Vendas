package com.devsuperior.dssales.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dssales.entities.PaymentMethod;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod,Long> {
	
}
