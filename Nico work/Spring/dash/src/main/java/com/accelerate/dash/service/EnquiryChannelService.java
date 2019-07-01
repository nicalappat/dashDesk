package com.accelerate.dash.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accelerate.dash.model.EnquiryChannel;
import com.accelerate.dash.repository.EnquiryChannelRepository;

@Service
public class EnquiryChannelService {

	@Autowired
	private EnquiryChannelRepository enquirychannelRepository;

	public List<EnquiryChannel> getAll(){
		return enquirychannelRepository.findAll();
	}

	
	public void deleteAll() {
		enquirychannelRepository.deleteAll();
		
	}

	public void delete(String name) {
		enquirychannelRepository.deleteById(name);
		
	}


	public EnquiryChannel addEnquiryChannel(EnquiryChannel enquirychannel) {
		enquirychannelRepository.save(enquirychannel);
		return enquirychannel;
	}


	public List<EnquiryChannel> findEnquiryChannel(String name) {
		return enquirychannelRepository.getByName(name);
	}


	


}
