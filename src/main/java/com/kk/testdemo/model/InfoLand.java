package com.kk.testdemo.model;

import com.kk.testdemo.util.BaseEntity;
import lombok.Data;
import lombok.experimental.FieldNameConstants;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * 实物指标-土地表
 * Date: 2020/4/23
 * Time: 11:56
 */
@Data
@Entity
@Table(name = "t_info_land")
@FieldNameConstants()
public class InfoLand extends BaseEntity {

    @Column(name = "region")
    private String region;//行政区

    @Column(name = "owner_nm")
    private String ownerNm;//户主

    @Column(name = "land_nm")
    private String landNm;//地块

    @Column(name = "area")
    private BigDecimal area;//面积

    @Column(name = "type_one")
    private String typeOne;//一级分类

    @Column(name = "type_two")
    private String typeTwo;//二级分类

    @Column(name = "type_three")
    private String typeThree;//三级分类

    @Column(name = "all_type")
    private String allType;//大类

    @Column(name = "land_project_nm")
    private String landProjectNm;//大类



}
