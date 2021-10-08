package com.devsuperior.dssales.dto;

import java.io.Serializable;

import com.devsuperior.dssales.entities.Store;

public class SalesByStoreAndYearDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private String storeName;
	private Integer year;
	private Double sum;
	
	public  SalesByStoreAndYearDTO() {
		
	}
	
	public SalesByStoreAndYearDTO(Store store, Double sum, Integer year) {
		this.storeName = store.getName();
		this.sum = sum;
		this.year = year;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public Double getSum() {
		return sum;
	}

	public void setSum(Double sum) {
		this.sum = sum;
	}	
	
}
