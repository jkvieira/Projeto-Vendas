package com.devsuperior.dssales.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dssales.dto.SaleDTO;
import com.devsuperior.dssales.dto.SalesByStoreAndYearDTO;
import com.devsuperior.dssales.dto.SalesByStoreDTO;
import com.devsuperior.dssales.entities.Sale;
import com.devsuperior.dssales.repository.SaleRepository;

@Service
public class SaleService {
	@Autowired
	private SaleRepository saleRepository;
    
	/*busca paginada cujo filtro é o nome das lojas*/
	@Transactional(readOnly = true)
	public Page<SaleDTO> findByStoreNameEquals(String name, Pageable pageable){
		if(name.contentEquals("Todos") == true) {
			Page<Sale> result = saleRepository.findAll(pageable);
			return  result.map(x -> new SaleDTO(x));
		}
		return saleRepository.findByStoreNameEquals(name, pageable);
	}
	
	
	@Transactional(readOnly = true)
	public List<SalesByStoreDTO> searchByStore(){
		return saleRepository.salesByStore();
	}
	
	/* a resposta é uma lista de listas, onde cada elemento agrupa o total de vendas
	 *a cada ano para cada loja*/
	@Transactional(readOnly = true)
	public List<List<SalesByStoreAndYearDTO>> searchByStoreYear(){
		List<SalesByStoreAndYearDTO> list = saleRepository.salesByStoreAndYear();
		SalesByStoreAndYearDTO obj;
		List<List<SalesByStoreAndYearDTO>> result= new ArrayList<>();
		while(!list.isEmpty()){
			List<SalesByStoreAndYearDTO> listaux= new ArrayList<SalesByStoreAndYearDTO>();
			obj= list.remove(0);
		    listaux.add(obj);
		    while(!list.isEmpty() && obj.getStoreName() == list.get(0).getStoreName()) {
		        listaux.add(list.remove(0));
		    }
		    result.add(listaux);
		}
		return result;
	}
	
	
	@Transactional
	 public SaleDTO insert(SaleDTO dto){
				 Sale sale= new Sale(null, dto.getDate(), dto.getVolume(), dto.getTotal(), dto.getStore(), dto.getPaymentMethod());
				 sale = saleRepository.save(sale);
				 return new SaleDTO(sale);       
		
	}

}
