package com.kk.testdemo.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 15:44
 */
@Data
public class PubRegionDTO {
    private String ownerName;
    private String id;
    private String nm;
    private String cityCode;//id
    private String parentCode;//父id
    private String name;//名字
    private String mergerName;
    private String shortName;
    private String mergerShortName;
    private String level;
    private String levelType;
    private BigDecimal area;//面积
    private String nameArr;
}
