package com.kk.testdemo.controller;

import com.kk.testdemo.dto.TreeDTO;
import com.kk.testdemo.model.PubRegion;
import com.kk.testdemo.service.PubRegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import tk.mybatis.mapper.entity.Example;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 15:31
 */
@Controller
public class PubRegionController {

    @Autowired
    private PubRegionService pubRegionService;

    @RequestMapping("/queryInfiniteClassification")
    @ResponseBody
    public List<TreeDTO> queryInfiniteClassification(){
        return pubRegionService.queryInfiniteClassification();
    }


    @RequestMapping("/getAllselect")
    @ResponseBody
    public List<PubRegion> getAllselect(String name){
        return pubRegionService.getAllselect(name);
    }

    @RequestMapping("/updatePubRegion")
    @ResponseBody
    public Map<String,Object> updatePubRegion(Integer id,String name){
        Integer integer = pubRegionService.updatePubRegion(id, name);
        Map<String, Object> map=new HashMap<String, Object>();
        if(integer > 0){
            map.put("success", true);
            map.put("message", "编辑成功");
        }else {
            map.put("success", false);
            map.put("message", "编辑失败");
        }
        return map;
    }


    @RequestMapping("/addPubRegion")
    @ResponseBody
    public Map<String,Object> addPubRegion(String parentCode,String name){
        Map<String, Object> map=new HashMap<String, Object>();
        Integer integer = pubRegionService.addPubRegion(parentCode, name);
        if(integer > 0){
            map.put("success", true);
            map.put("message", "添加成功");
        }else {
            map.put("success", false);
            map.put("message", "添加失败");
        }
        return map;
    }

    @RequestMapping("/delPubRegion")
    @ResponseBody
    public Map<String,Object> delPubRegion(Integer id){
        Map<String, Object> map=new HashMap<String, Object>();
        Integer integer = pubRegionService.delPubRegion(id);
        if(integer > 0){
            map.put("success", true);
            map.put("message", "删除成功");
        }else {
            map.put("success", false);
            map.put("message", "删除失败");
        }
        return map;
    }
}
