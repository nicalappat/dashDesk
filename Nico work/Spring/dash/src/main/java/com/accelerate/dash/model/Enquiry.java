package com.accelerate.dash.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Enquiry")
public class Enquiry {
	
	//make a date stamp?
	//connect to mongodatabase?
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long uid;
	private String name,mob,address,email;
	private int type,channel,source;
	private String contenthead;
	private boolean status;
	private String responsecontent,responseadmin,reference,comments;
	
	public Enquiry() {}
	
	
	
	
	
	public Enquiry(String name, String mob, String address, String email, int type, int channel, int source,
			String contenthead, boolean status, String responsecontent, String responseadmin, String reference,
			String comments) {
		this.name = name;
		this.mob = mob;
		this.address = address;
		this.email = email;
		this.type = type;
		this.channel = channel;
		this.source = source;
		this.contenthead = contenthead;
		this.status = status;
		this.responsecontent = responsecontent;
		this.responseadmin = responseadmin;
		this.reference = reference;
		this.comments = comments;
	}





	public String getContenthead() {
		return contenthead;
	}





	public void setContenthead(String contenthead) {
		this.contenthead = contenthead;
	}





	public boolean isStatus() {
		return status;
	}





	public void setStatus(boolean status) {
		this.status = status;
	}





	public String getResponsecontent() {
		return responsecontent;
	}





	public void setResponsecontent(String responsecontent) {
		this.responsecontent = responsecontent;
	}





	public String getResponseadmin() {
		return responseadmin;
	}





	public void setResponseadmin(String responseadmin) {
		this.responseadmin = responseadmin;
	}





	public String getReference() {
		return reference;
	}





	public void setReference(String reference) {
		this.reference = reference;
	}





	public String getComments() {
		return comments;
	}





	public void setComments(String comments) {
		this.comments = comments;
	}





	public long getUid() {
		return uid;
	}
	public void setUid(long uid) {
		this.uid = uid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMob() {
		return mob;
	}
	public void setMob(String mob) {
		this.mob = mob;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getChannel() {
		return channel;
	}
	public void setChannel(int channel) {
		this.channel = channel;
	}
	public int getSource() {
		return source;
	}
	public void setSource(int source) {
		this.source = source;
	}
	
	
	
	
		
	
}

