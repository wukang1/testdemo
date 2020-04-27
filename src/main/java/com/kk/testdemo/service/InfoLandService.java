package com.kk.testdemo.service;

import com.kk.testdemo.mapper.InfoLandMapper;
import com.kk.testdemo.model.InfoLand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 12:54
 */
@Service
public class InfoLandService {

    @Autowired
    private InfoLandMapper infoLandMapper;

    public List<InfoLand> getAll(){
        List<InfoLand> infoLands = infoLandMapper.selectAll();
        return infoLands;
    }


}
