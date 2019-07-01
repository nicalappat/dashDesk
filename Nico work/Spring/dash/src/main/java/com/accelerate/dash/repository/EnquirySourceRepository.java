package com.accelerate.dash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accelerate.dash.model.EnquirySource;

public interface EnquirySourceRepository extends JpaRepository <EnquirySource, String>{
	
	public List<EnquirySource> getByName(String name);

}
