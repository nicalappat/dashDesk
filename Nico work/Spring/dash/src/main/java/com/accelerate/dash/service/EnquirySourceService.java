package com.accelerate.dash.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accelerate.dash.model.EnquiryChannel;
import com.accelerate.dash.model.EnquirySource;
import com.accelerate.dash.repository.EnquirySourceRepository;

@Service
public class EnquirySourceService {
	
	@Autowired
	private EnquirySourceRepository enquirysourceRepository;

	public List<EnquirySource> getAll(){
		return enquirysourceRepository.findAll();
	}
	
	
	public void deleteAll() {
		enquirysourceRepository.deleteAll();
		
	}

	public void delete(String name) {
		enquirysourceRepository.deleteById(name);
		
	}


	public EnquirySource addEnquirySource(EnquirySource enquirysource) {
		enquirysourceRepository.save(enquirysource);
		return enquirysource;
	}


	public List<EnquirySource> findEnquirySource(String name) {
		return enquirysourceRepository.getByName(name);
	}


	
}
