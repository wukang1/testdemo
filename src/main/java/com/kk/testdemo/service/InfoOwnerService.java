package com.kk.testdemo.service;

import com.kk.testdemo.mapper.InfoLandMapper;
import com.kk.testdemo.mapper.InfoOwnerMapper;
import com.kk.testdemo.mapper.PubRegionMapper;
import com.kk.testdemo.model.InfoLand;
import com.kk.testdemo.model.InfoOwner;
import com.kk.testdemo.model.PubRegion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import tk.mybatis.mapper.entity.Example;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/24
 * Time: 9:40
 */
@Service
public class InfoOwnerService {

    @Autowired
    private InfoOwnerMapper infoOwnerMapper;
    @Autowired
    private PubRegionMapper pubRegionMapper;
    @Autowired
    private InfoLandMapper infoLandMapper;

    public List<Map<String, Object>> getAllInfoOwner(String serachKey){
        List<Map<String, Object>> allInfoOwner = infoOwnerMapper.getAllInfoOwner(serachKey);
        return allInfoOwner;
    }

    public  List<InfoOwner> getAllInfoOwnerSelect(String name){
        Example example=new Example(InfoOwner.class);
        if(!StringUtils.isEmpty(name)){
            example.createCriteria().andLike(InfoOwner.Fields.name,name);
        }
        List<InfoOwner> infoOwners = infoOwnerMapper.selectByExample(example);
        return infoOwners;
    }



    @Transactional(rollbackFor = Exception.class)
    public Integer add(String region1, String owner, BigDecimal area,String name,String nm){
        Example example=new Example(InfoLand.class);
        example.createCriteria().andEqualTo(InfoLand.Fields.ownerNm,owner)
                .andEqualTo(InfoLand.Fields.region,region1);
        int i = infoLandMapper.selectCountByExample(example);
        if(i>0){
            return 0;
        }
        InfoOwner infoOwner=new InfoOwner();
        infoOwner.setName(name);
        infoOwner.setRegion(region1);
        infoOwner.setNm(nm.equals(owner)?getInfoOwnerNm():nm);
        int insert1 = infoOwnerMapper.insert(infoOwner);
        InfoLand infoLand=new InfoLand();
        infoLand.setArea(area);
        infoLand.setOwnerNm(infoOwner.getNm());
        infoLand.setRegion(region1);
        infoLand.setNm(getInfoLandNm());
        int insert = infoLandMapper.insert(infoLand);
        if(insert1+insert<1){
            throw new RuntimeException();
        }
        return insert+insert1;
    }

    public String getInfoLandNm(){
        Integer maxId = infoLandMapper.getMaxId()+1;
        return "gd"+maxId;
    }

    public String getInfoOwnerNm(){
        Integer maxId = infoOwnerMapper.getMaxId()+1;
        return "a"+maxId;
    }


    @Transactional(rollbackFor = Exception.class)
    public Integer del(Integer regionId, Integer ownerId){
        int i1 = infoOwnerMapper.deleteByPrimaryKey(ownerId);
        int i = infoLandMapper.deleteByPrimaryKey(regionId);
        if(i1<1||i<1){
            throw new RuntimeException();
        }
        return 1;
    }


    @Transactional(rollbackFor = Exception.class)
    public Integer update(Integer landId, Integer ownerId,
                          String region1, String owner,
                          BigDecimal area,String name){
        InfoLand infoLand=new InfoLand();
        infoLand.setId(landId);
        infoLand.setArea(area);
        infoLand.setOwnerNm(owner);
        infoLand.setRegion(region1);
        int i = infoLandMapper.updateByPrimaryKeySelective(infoLand);
        InfoOwner infoOwner=new InfoOwner();
        infoOwner.setId(ownerId);
        infoOwner.setRegion(region1);
        int i1 = infoOwnerMapper.updateByPrimaryKeySelective(infoOwner);
        if(i<1||i1<1){
            throw new RuntimeException();
        }else{
            return 1;
        }
    }
}
