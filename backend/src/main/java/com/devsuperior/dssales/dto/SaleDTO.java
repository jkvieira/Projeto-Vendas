package com.devsuperior.dssales.dto;

import java.io.Serializable;
import java.time.LocalDate;
import com.devsuperior.dssales.entities.PaymentMethod;
import com.devsuperior.dssales.entities.Sale;
import com.devsuperior.dssales.entities.Store;

public class SaleDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private LocalDate date;
	private Integer volume;
	private Double total;
	private Store store;
	private PaymentMethod paymentMethod;
		
	public SaleDTO(LocalDate date, Integer volume, Double total, Store store, PaymentMethod paymentMethod) {
		this.date = date;
		this.volume = volume;
		this.total = total;
		this.store = store;
		this.paymentMethod = paymentMethod;
	}

	public SaleDTO(Sale entity) {
		id = entity.getId();
		date = entity.getDate();
		volume = entity.getVolume();
		total = entity.getTotal();
		store = entity.getStore();
		paymentMethod = entity.getPaymentMethod();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Integer getVolume() {
		return volume;
	}

	public void setVolume(Integer volume) {
		this.volume = volume;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	

}
