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

import com.accelerate.dash.model.EnquiryChannel;
import com.accelerate.dash.model.EnquirySource;
import com.accelerate.dash.service.EnquirySourceService;

@RestController
public class EnquirySourceController {

	@Autowired
	private EnquirySourceService enquirysourceService;
	
	@RequestMapping("/enquirysource")
	public List<EnquirySource> getAll(){
		return enquirysourceService.getAll();
	}
	
	@PostMapping("/enquirysource")
	public EnquirySource addEnquirySource(@RequestBody EnquirySource enquirysource){
		return enquirysourceService.addEnquirySource(enquirysource);
	}
	
	@DeleteMapping("/enquirysource")
	public String deleteAll(){
		enquirysourceService.deleteAll();
		return "Deleted All Entries";
	}
		
		@RequestMapping("/enquirysource/{name}")
		public List <EnquirySource> findEnquirySource(@PathVariable String name){
			return enquirysourceService.findEnquirySource(name);
			}
		
		@DeleteMapping("/enquirysource/{name}")
		public String deleteEnquirySource(@PathVariable String name){
			enquirysourceService.delete(name);
			return "Deleted Entry with name  "+name;
			}
}

