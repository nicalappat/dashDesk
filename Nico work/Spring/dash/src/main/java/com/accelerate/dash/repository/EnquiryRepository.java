package com.accelerate.dash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accelerate.dash.model.Enquiry;

public interface EnquiryRepository extends JpaRepository<Enquiry,String> {
	public List<Enquiry> getByName(String name);
	public List<Enquiry> getByMob(String mob);
	public List<Enquiry> getByEmail(String email);
	public List<Enquiry> getByType(int type);
	public List<Enquiry> getByChannel(int channel);
	public List<Enquiry> getBySource(int source);
	public Enquiry findByUid(long uid);
	public List<Enquiry> getByStatus(boolean status);

}
