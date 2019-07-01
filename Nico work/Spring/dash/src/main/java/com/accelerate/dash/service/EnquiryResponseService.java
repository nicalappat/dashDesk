package com.accelerate.dash.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accelerate.dash.model.EnquiryResponse;
import com.accelerate.dash.repository.EnquiryResponseRepository;

@Service
public class EnquiryResponseService {

	@Autowired
	private EnquiryResponseRepository enquiryresponseRepository;
	
	public List<EnquiryResponse> getAll() {
		return enquiryresponseRepository.findAll();
	}

	public EnquiryResponse addEnquiryResponse(EnquiryResponse enquiryResponse) {
		enquiryresponseRepository.save(enquiryResponse);
		return enquiryResponse;
		
	}

	public List<EnquiryResponse> findEnquiryResponse(long uid) {
		return enquiryresponseRepository.getByUid(uid);
	}

	public void deleteEnquiryResponse(long uid) {
		List <EnquiryResponse> t = enquiryresponseRepository.getByUid(uid);
		enquiryresponseRepository.deleteAll(t);
		
	}

}
