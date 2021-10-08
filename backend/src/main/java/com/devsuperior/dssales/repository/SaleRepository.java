package com.devsuperior.dssales.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.dssales.dto.SaleDTO;
import com.devsuperior.dssales.dto.SalesByStoreAndYearDTO;
import com.devsuperior.dssales.dto.SalesByStoreDTO;
import com.devsuperior.dssales.entities.Sale;


public interface SaleRepository extends JpaRepository<Sale,Long> {
	
	@Query("SELECT new com.devsuperior.dssales.dto.SalesByStoreDTO(obj.store, SUM(obj.total)) "
			+ " FROM Sale AS obj "
			+ "GROUP BY obj.store")
	List<SalesByStoreDTO> salesByStore();
	
	@Query("SELECT new com.devsuperior.dssales.dto.SalesByStoreAndYearDTO(obj.store, SUM(obj.total),YEAR(obj.date)) "
			+ " FROM Sale AS obj "
			+ "GROUP BY obj.store, YEAR(obj.date)")
	List<SalesByStoreAndYearDTO> salesByStoreAndYear();
	
	Page<SaleDTO> findByStoreNameEquals(String name, Pageable pageable);
}
	
