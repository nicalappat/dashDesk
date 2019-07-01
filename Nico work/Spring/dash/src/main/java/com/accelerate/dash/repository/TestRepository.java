package com.accelerate.dash.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accelerate.dash.model.Test;

public interface TestRepository extends JpaRepository<Test, String> {

	public Test findByMob(String mob);
}
