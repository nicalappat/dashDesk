package com.accelerate.dash.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Enquiry_Channel")
public class EnquiryChannel {

	@Id
	private String name;
	private String des;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	
	public EnquiryChannel(String name, String des) {
		this.name = name;
		this.des = des;
	}
	
	public EnquiryChannel() {}
	
	
}
