package com.accelerate.dash.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accelerate.dash.model.Test;
import com.accelerate.dash.repository.TestRepository;

@Service
public class TestService {

	@Autowired
	private TestRepository testRepository;

	public List<Test> getAll() {
		return testRepository.findAll();
	}

	public void deleteAll() {
		testRepository.deleteAll();
		
	}

	public Test addTest(Test test) {
		return testRepository.save(test);
	}

	public Test findTest(String mob) {
		return testRepository.findByMob(mob);
	}

	public void deleteTest(String mob) {
		Test t = testRepository.findByMob(mob);
		testRepository.delete(t);
		
	}


	
}
