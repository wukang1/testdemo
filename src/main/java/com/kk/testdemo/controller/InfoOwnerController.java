package com.kk.testdemo.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.kk.testdemo.mapper.InfoOwnerMapper;
import com.kk.testdemo.model.InfoLand;
import com.kk.testdemo.model.InfoOwner;
import com.kk.testdemo.model.PubRegion;
import com.kk.testdemo.service.InfoOwnerService;
import com.kk.testdemo.util.PageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.sound.midi.Soundbank;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/24
 * Time: 9:38
 */
@Controller
public class InfoOwnerController {

    @Autowired
    private InfoOwnerService infoOwnerService;

    @RequestMapping("/getAllInfoOwner")
    @ResponseBody
    public Map<String,Object> getAllInfoOwner(PageDTO pageDTO,String serachKey){
        PageHelper.startPage(pageDTO.getPage(),pageDTO.getRows());
        List<Map<String, Object>> allInfoOwner = infoOwnerService.getAllInfoOwner(serachKey);
        PageInfo pageInfo=new PageInfo(allInfoOwner);
        Map<String,Object> map=new HashMap<>();
        map.put("total", pageInfo.getTotal());
        map.put("rows", pageInfo.getList());
        return map;
    }

    @RequestMapping("/getAllInfoOwnerSelect")
    @ResponseBody
    public List<InfoOwner> getAllInfoOwnerSelect(String name){
        return infoOwnerService.getAllInfoOwnerSelect(name);
    }

    @RequestMapping("/add")
    @ResponseBody
    public Map<String, Object> add(String region1, String owner, BigDecimal area,String name,String nm){
        Map<String, Object> map=new HashMap<String, Object>();
        try {
            Integer add = infoOwnerService.add(region1, owner, area, name, nm);
            if(add > 1){
                map.put("success", true);
                map.put("message", "添加成功");
            }else if(add==0){
                map.put("success", false);
                map.put("message", "存在重复数据");
            }else{
                map.put("success", false);
                map.put("message", "添加失败");
            }
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("message", "添加失败");
            return map;
        }
    }


    @RequestMapping("/del")
    @ResponseBody
    public Map<String, Object> del(Integer landId, Integer ownerId){
        Map<String, Object> map=new HashMap<String, Object>();
        try {
            Integer add = infoOwnerService.del(landId,  ownerId);
            if(add>0){
                map.put("success", true);
                map.put("message", "删除成功");
            }else{
                map.put("success", false);
                map.put("message", "删除失败");
            }
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("message", "删除失败");
            return map;
        }
    }


    @RequestMapping("/update")
    @ResponseBody
    public Map<String, Object> update(Integer landId, Integer ownerId,
                                      String region1, String owner,
                                      BigDecimal area,String name){
        Map<String, Object> map=new HashMap<String, Object>();
        try {
            Integer update = infoOwnerService.update(landId, ownerId, region1, owner, area, name);
            if(update>0){
                map.put("success", true);
                map.put("message", "修改成功");
            }else{
                map.put("success", false);
                map.put("message", "修改失败");
            }
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("message", "修改失败");
            return map;
        }
    }


}
