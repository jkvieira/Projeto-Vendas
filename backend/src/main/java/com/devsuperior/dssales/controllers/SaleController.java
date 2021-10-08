package com.devsuperior.dssales.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dssales.dto.SaleDTO;
import com.devsuperior.dssales.dto.SalesByStoreAndYearDTO;
import com.devsuperior.dssales.dto.SalesByStoreDTO;
import com.devsuperior.dssales.services.SaleService;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {
    @Autowired
	private SaleService service;
    
    @GetMapping(value = "/find-sales")
   	public ResponseEntity<Page<SaleDTO>> findByStoreNameEquals(String name, Pageable pageable) {
       	Page<SaleDTO> list = service.findByStoreNameEquals(name, pageable);
   		return ResponseEntity.ok(list);
       }
    
    
    @GetMapping(value = "/by-store")
	public ResponseEntity<List<SalesByStoreDTO>> salesByStore() {
    	List<SalesByStoreDTO> list = service.searchByStore();
		return ResponseEntity.ok(list);
    }
    
    @GetMapping(value = "/by-store-year")
  	public ResponseEntity<List<List<SalesByStoreAndYearDTO>>> salesByStoreYear() {
      	List<List<SalesByStoreAndYearDTO>> list = service.searchByStoreYear();
  		return ResponseEntity.ok(list);
      }
    
    @PostMapping("/new-sale")
    public ResponseEntity<SaleDTO> insert(@RequestBody SaleDTO dto){
    	 dto = (SaleDTO) service.insert(dto);
    	 URI uri= ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();	 
    	 return ResponseEntity.created(uri).body(dto);
    }
  
}
