package com.accelerate.dash.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.accelerate.dash.model.EnquiryResponse;

public interface EnquiryResponseRepository extends MongoRepository<EnquiryResponse, String>{

	public List<EnquiryResponse> getByUid(long uid);
}
