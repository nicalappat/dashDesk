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
import com.accelerate.dash.service.EnquiryChannelService;


@RestController
public class EnquiryChannelController {

	@Autowired
	private EnquiryChannelService enquirychannelService;
	
	@RequestMapping("/enquirychannel")
	public List<EnquiryChannel> getAll(){
		return enquirychannelService.getAll();
	}
	
	@PostMapping("/enquirychannel")
	public EnquiryChannel addEnquiryChannel(@RequestBody EnquiryChannel enquirychannel){
		return enquirychannelService.addEnquiryChannel(enquirychannel);
	}
	
	
	
	@DeleteMapping("/enquirychannel")
	public String deleteAll(){
		enquirychannelService.deleteAll();
		return "Deleted All Entries";
	}
	
	@RequestMapping("/enquirychannel/{name}")
	public List <EnquiryChannel> findEnquiryChannel(@PathVariable String name){
		return enquirychannelService.findEnquiryChannel(name);
		}
		
		@DeleteMapping("/enquirychannel/{name}")
		public String delete(@PathVariable String name){
			enquirychannelService.delete(name);
			return "Deleted Entry with name  "+name;
			}
	
}
