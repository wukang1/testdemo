package com.kk.testdemo.mapper;

import com.kk.testdemo.model.PubRegion;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/27
 * Time: 9:55
 */
public interface PubRegionJPA extends JpaRepository<PubRegion,Integer> {
}
