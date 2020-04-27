package com.kk.testdemo;

import org.junit.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootTest
@MapperScan("com.kk.testdemo.mapper")
@EnableTransactionManagement
@EnableAspectJAutoProxy
class TestdemoApplicationTests {

	@Test
	void contextLoads() {
	}

}
