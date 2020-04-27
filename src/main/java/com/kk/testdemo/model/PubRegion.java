package com.kk.testdemo.model;

import com.kk.testdemo.util.BaseEntity;
import lombok.Data;
import lombok.experimental.FieldNameConstants;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * 中国行政地址信息表
 * Date: 2020/4/23
 * Time: 12:38
 */
@Data
@Entity
@Table(name = "pub_region")
@FieldNameConstants()
public class PubRegion extends BaseEntity {

    @Column(name = "city_code")
    private String cityCode;//行政区划id

    @Column(name = "parent_code")
    private String parentCode;//父级id

    @Column(name = "name")
    private String name;//行政区划全称

    @Column(name = "merger_name")
    private String mergerName;//省市区全称聚合

    @Column(name = "short_name")
    private String shortName;//行政区划简称

    @Column(name = "merger_short_name")
    private String mergerShortName;//省市区全称聚合

    @Column(name = "level")
    private String level;//行政区划级别country:国家,province:省份,city:市,district:区县,street:街道

    @Column(name = "level_type")
    private String levelType;//级别 0.国家，1.省(直辖市) 2.市 3.区(县),4.街道
}
