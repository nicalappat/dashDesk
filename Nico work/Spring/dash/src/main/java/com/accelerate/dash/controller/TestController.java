package com.accelerate.dash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.accelerate.dash.model.Test;
import com.accelerate.dash.service.TestService;

@RestController
public class TestController {

	@Autowired
	private TestService testService;
	
	@RequestMapping("/test")
	public List<Test> getAll() {
		return testService.getAll();
	}
	
	@RequestMapping("/testadd")
	public Test addTest(@RequestParam("mob") String mob,@RequestParam("name") String name) {
		Test t = testService.addTest(new Test(mob,name));
		return t;
	}
	
	
	@RequestMapping("/testfind")
	public Test findTest(@RequestParam("mob") String mob) {
		return testService.findTest(mob);
	}
	
	
	@RequestMapping("/testdeleteall")
	public String deleteAll() {
		testService.deleteAll();
		return "Deleted All";
	}
	
	@RequestMapping("/testdelete")
	public String deleteTest(@RequestParam("mob") String mob) {
		testService.deleteTest(mob);
		return "Deleted with Mobile "+mob;
	}
	
	
}
