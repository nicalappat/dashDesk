package com.accelerate.dash.model;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Enquiry_Response")
public class EnquiryResponse {
	
	//make a date stamp?
	//make offer additions?
	//connect to jpa database??
	
	@Id
	private long uid;
	private String contenthead;
	private boolean status;
	private String responsecontent,responseadmin,reference,comments;
	public long getUid() {
		return uid;
	}
	
	
	
	
	
	public EnquiryResponse(long uid, String contenthead, boolean status, String responsecontent, String responseadmin,
			String reference, String comments) {
		super();
		this.uid = uid;
		this.contenthead = contenthead;
		this.status = status;
		this.responsecontent = responsecontent;
		this.responseadmin = responseadmin;
		this.reference = reference;
		this.comments = comments;
	}





	public void setUid(long uid) {
		this.uid = uid;
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
	
	

}
