package com.accelerate.dash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.accelerate.dash.model.Enquiry;
import com.accelerate.dash.service.EnquiryService;


//name,mob,address,email,type,channel,source,contenthead,status,responsecontent,responseadmin,reference,comments

@RestController
public class EnquiryController {

	@Autowired
	private EnquiryService enquiryService;
	
	@RequestMapping("/enquiry")
	public List<Enquiry> getAll() {
		return enquiryService.getAll();
	}
	
	@PostMapping("/enquiry")
	public String addEnquiry(@RequestBody Enquiry enquiry) {
		return enquiryService.addEnquiry(enquiry);
	}
	
	@DeleteMapping("/enquiry")
	public String deleteAll() {
		enquiryService.deleteAll();
		return "Deleted All";
	}
	
	@DeleteMapping("/enquiryname/{name}")
	public String deletebyname(@PathVariable String name) {
		enquiryService.deletebyname(name);
		return "Deleted Entry with Name "+name;
	}
	
	@DeleteMapping("/enquiryuid/{uid}")
	public String deletebyuid(@PathVariable long uid) {
		enquiryService.deletebyuid(uid);
		return "Deleted Entry with Uid "+uid;
	}
	
	
	
	
	//search methods
	@RequestMapping("/enquiryuid/{uid}")
	public Enquiry findbyuid(@PathVariable long uid) {
		return enquiryService.findbyuid(uid);
	}
	
	
	@RequestMapping("/enquiryname/{name}")
	public List<Enquiry> findbyname(@PathVariable String name) {
		return enquiryService.findbyname(name);
	}
	
	@RequestMapping("/enquirymob/{mob}")
	public List<Enquiry> findbymob(@PathVariable String mob) {
		return enquiryService.findbymob(mob);
	}
	
	@RequestMapping("/enquiryemail/{email}")
	public List<Enquiry> findbyemail(@PathVariable String email) {
		return enquiryService.findbyemail(email);
	}
	
	@RequestMapping("/enquirytype/{type}")	
	public List<Enquiry> findbyname(@PathVariable int type) {
		return enquiryService.findbytype(type);
	}
	
	@RequestMapping("/enquirychannel/{channel}")
	public List<Enquiry> findbychannel(@PathVariable int channel) {
		return enquiryService.findbychannel(channel);
	}
	
	@RequestMapping("/enquirysource/{source}")
	public List<Enquiry> findbysource(@PathVariable int source) {
		return enquiryService.findbysource(source);
	}
	
	@RequestMapping("/enquirystatus/{status}")
	public List<Enquiry> findbystatus(@PathVariable boolean status) {
		return enquiryService.findbystatus(status);
	}
	
}
