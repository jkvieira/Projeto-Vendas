package com.devsuperior.dssales.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dssales.dto.PaymentMethodDTO;
import com.devsuperior.dssales.services.PaymentMethodService;

@RestController
@RequestMapping(value = "/paymentMethods")
public class PaymentMethodController {
    @Autowired
	private PaymentMethodService service;
    
    @GetMapping(value = "/list-paymentMethod")
	public ResponseEntity<List<PaymentMethodDTO>> allPaymentMethod() {
    	List<PaymentMethodDTO> list = service.findAllPaymentMethod();
		return ResponseEntity.ok(list);
    }
}
