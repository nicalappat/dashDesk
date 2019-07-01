package com.accelerate.dash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.accelerate.dash.model.EnquiryResponse;
import com.accelerate.dash.service.EnquiryResponseService;

@RestController
public class EnquiryResponseController {


		@Autowired
		private EnquiryResponseService enquiryresponseService;
		
		@RequestMapping("/enquiryresponse")
		public List<EnquiryResponse> getAll() {
			return enquiryresponseService.getAll();
		}

		@RequestMapping("/enquiryresponseadd")
		public EnquiryResponse addEnquiryResponse(@RequestParam("uid") long uid,@RequestParam("contenthead")  String contenthead,@RequestParam("status")  boolean status,@RequestParam("responsecontent")  String responsecontent,@RequestParam("responseadmin")  String responseadmin,
				@RequestParam("reference") String reference,@RequestParam("comments")  String comments) {
			
			return enquiryresponseService.addEnquiryResponse(new EnquiryResponse(uid,contenthead,status,responsecontent,responseadmin,reference,comments));
		}
		
		@RequestMapping("/enquiryresponseuid")
		public List<EnquiryResponse> findEnquiryResponse(@RequestParam("uid") long uid){
			
			return enquiryresponseService.findEnquiryResponse(uid);
		}
		
		@RequestMapping("/enquiryresponsedelete")
		public String deleteEnquiryResponse(@RequestParam("uid") long uid){
			
			enquiryresponseService.deleteEnquiryResponse(uid);
			return "Deleted Entries with uid  "+uid;
		
		}
		
}
