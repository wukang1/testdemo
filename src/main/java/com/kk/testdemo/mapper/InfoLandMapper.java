package com.kk.testdemo.mapper;


import com.kk.testdemo.model.InfoLand;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 12:44
 */
@Repository
public interface InfoLandMapper extends Mapper<InfoLand>{

    BigDecimal queryArea(@Param("cityCode") String cityCode);

    List<Map<String,Object>> queryAllInfoLand();

    Integer getMaxId();
}
