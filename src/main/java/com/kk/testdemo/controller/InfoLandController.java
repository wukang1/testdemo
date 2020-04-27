package com.kk.testdemo.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.kk.testdemo.model.InfoLand;
import com.kk.testdemo.service.InfoLandService;
import com.kk.testdemo.util.PageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import tk.mybatis.mapper.entity.Example;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 12:55
 */
@Controller
public class InfoLandController {

    @Autowired
    private InfoLandService infoLandServices;

    @RequestMapping("/getAll")
    @ResponseBody
    public Map<String,Object> getAll(PageDTO pageDTO){
        PageHelper.startPage(pageDTO.getPage(),pageDTO.getRows());
        List<InfoLand> all = infoLandServices.getAll();
        PageInfo pageInfo=new PageInfo(all);
        Map<String,Object> map=new HashMap<>();
        map.put("total", pageInfo.getTotal());
        map.put("rows", pageInfo.getList());
        return map;
    }


    @RequestMapping("/moduleAction_queryModule.action")
    @ResponseBody
    public List moduleAction_queryModule(String right_parent_code){
        Map<String, Object> map = new HashMap<>();
        List list = new ArrayList();
        if(right_parent_code.equals("-1")) {
            map.put("right_code", 1);
            map.put("text", "列表");
            list.add(map);
        }else{
            map.put("right_code", 2);
            map.put("text", "中国行政地址信息表");
            map.put("right_url", "module.jsp");
            list.add(map);
//            map = new HashMap<>();
//            map.put("right_code", 3);
//            map.put("text", "实物指标-土地表");
//            map.put("right_url", "InfoLand.jsp");
//            list.add(map);
            map = new HashMap<>();
            map.put("right_code", 4);
            map.put("text", "实物指标-权属人");
            map.put("right_url", "InfoOwner.jsp");
            list.add(map);
        }
        return list;
    }




}
