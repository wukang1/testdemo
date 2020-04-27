package com.kk.testdemo.mapper;

import com.kk.testdemo.dto.PubRegionDTO;
import com.kk.testdemo.model.PubRegion;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 12:53
 */
@Repository
public interface PubRegionMapper extends Mapper<PubRegion>{

    List<PubRegionDTO> queryTopLevel();

    List<PubRegion> queryAllSelect();

    List<PubRegionDTO> queryTreeCount();
}
