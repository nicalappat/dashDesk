package com.accelerate.dash.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Testing")
public class Test {
	@Id
	private String mob;
	private String name;
	
	
	public Test() {
		}
	
	public Test(String mob, String name) {
		this.mob = mob;
		this.name = name;
	}
	
	
	public String getMob() {
		return mob;
	}

	public void setMob(String mob) {
		this.mob = mob;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
