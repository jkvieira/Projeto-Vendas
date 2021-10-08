package com.devsuperior.dssales.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dssales.dto.PaymentMethodDTO;
import com.devsuperior.dssales.entities.PaymentMethod;
import com.devsuperior.dssales.repository.PaymentMethodRepository;

@Service
public class PaymentMethodService {
	  @Autowired
	  private PaymentMethodRepository paymentMethodRepository;
	  
		@Transactional(readOnly = true)
		public List<PaymentMethodDTO> findAllPaymentMethod(){
			List<PaymentMethod> list = paymentMethodRepository.findAll();
			return list.stream().map(x -> new PaymentMethodDTO(x)).collect(Collectors.toList());
		}
         
}
