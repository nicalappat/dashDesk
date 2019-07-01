package com.accelerate.dash.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accelerate.dash.model.Enquiry;
import com.accelerate.dash.repository.EnquiryRepository;
import com.accelerate.dash.repository.TestRepository;

@Service
public class EnquiryService {
	
	@Autowired
	private EnquiryRepository enquiryRepository;

	public List<Enquiry> getAll() {
		return enquiryRepository.findAll();
	}

	public void deleteAll() {
		enquiryRepository.deleteAll();
		
	}
	
	public void deletebyname(String name) {
		List<Enquiry> t=enquiryRepository.getByName(name);
		enquiryRepository.deleteAll(t);
		
	}


	
	

	
	
	public List<Enquiry> findbyname(String name) {
		return enquiryRepository.getByName(name);
	}

	public List<Enquiry> findbymob(String mob) {
		return enquiryRepository.getByMob(mob);
	}

	public List<Enquiry> findbyemail(String email) {
		return enquiryRepository.getByEmail(email);
	}

	public List<Enquiry> findbytype(int type) {
		return enquiryRepository.getByType(type);
	}

	public List<Enquiry> findbychannel(int channel) {
		return enquiryRepository.getByChannel(channel);
	}

	public List<Enquiry> findbysource(int source) {
		return enquiryRepository.getBySource(source);
	}

	
	
	
	public String addEnquiry(Enquiry enquiry) {
		
		String op ="";
		int flag=0,v=0,f1=0;
		
		for(int i=0;i<enquiry.getName().length();i++) {
			if(enquiry.getName().charAt(i)==' ') {
				v=v+1;
			}
		}
		for(int i=0;i<enquiry.getEmail().length();i++) {
			if(enquiry.getEmail().charAt(i)=='@') {
				f1=1;
			}
		}
		
		if((enquiry.getName().length()-v)<3) {
			flag=1;
			op=op+" Invalid Name";
		}
		
		if(enquiry.getMob().length()!=10) {
			flag=1;
			op=op+" Invalid Mobile Number";
		}
		
		if(f1==0) {
			flag=1;
			op=op+" Invalid Email";
		}
		
		if(enquiry.getType()>2) {
			flag=1;
			op=op+" Invalid Type";
		}
		
		if(enquiry.getContenthead().length()<8) {
			flag=1;
			op=op+" Insufficient Contenthead";
		}
		
		if(enquiry.getResponsecontent().length()<12) {
			flag=1;
			op=op+" Insufficient ResponseContent";
		}
			
			
		
		if(flag==0) {
		enquiryRepository.save(enquiry);
		op=op+"New Entry has been made with given data";
		}
		return op;
	}

	
	
	
	
	public Enquiry findbyuid(long uid) {
		return enquiryRepository.findByUid(uid);
	}

	public void deletebyuid(long uid) {
		enquiryRepository.delete(enquiryRepository.findByUid(uid));
		
	}

	public List<Enquiry> findbystatus(boolean status) {
		return enquiryRepository.getByStatus(status);
	}
	
	



}
