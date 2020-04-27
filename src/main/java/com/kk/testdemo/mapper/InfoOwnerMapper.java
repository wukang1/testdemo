package com.kk.testdemo.mapper;

import com.kk.testdemo.dto.TreeDTO;
import com.kk.testdemo.model.InfoOwner;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 12:53
 */
@Repository
public interface InfoOwnerMapper extends Mapper<InfoOwner>{

    List<Map<String,Object>> getAllInfoOwner(@Param("searchKey") String searchKey);

    Integer getMaxId();

    String getNameArr(@Param("region")String region);


    List<TreeDTO> getInfoOwnerByCode(@Param("cityCode") String cityCode);
}
