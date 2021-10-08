package com.devsuperior.dssales.dto;

import java.io.Serializable;

import com.devsuperior.dssales.entities.PaymentMethod;

public class PaymentMethodDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private String description;
	
	public PaymentMethodDTO() {
		
	}

	public PaymentMethodDTO(Long id, String description) {
		this.id = id;
		this.description = description;
	}
	
	public PaymentMethodDTO(PaymentMethod entity) {
		id = entity.getId();
		description = entity.getDescription();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
}
