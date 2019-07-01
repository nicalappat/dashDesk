package com.accelerate.dash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accelerate.dash.model.EnquiryChannel;
import com.accelerate.dash.model.EnquirySource;

public interface EnquiryChannelRepository extends JpaRepository <EnquiryChannel, String> {

	public List<EnquiryChannel> getByName(String name);
}
