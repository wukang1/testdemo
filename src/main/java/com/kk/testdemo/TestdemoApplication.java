package com.kk.testdemo;

import com.kk.testdemo.mapper.PubRegionJPA;
import com.kk.testdemo.model.PubRegion;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@MapperScan("com.kk.testdemo.mapper")
@EnableTransactionManagement
@EnableAspectJAutoProxy
public class TestdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestdemoApplication.class, args);
	}


//	public TestdemoApplication(PubRegionJPA pubRegionJPA){
//        PubRegion one = pubRegionJPA.findOne(1);
//        System.out.println(one);
//    }

}
