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
 * 实物指标-权属人
 * Date: 2020/4/23
 * Time: 12:43
 */
@Data
@Entity
@Table(name = "t_info_owner")
@FieldNameConstants()
public class InfoOwner extends BaseEntity{


    @Column(name = "region")
    private String region;//行政区

    @Column(name = "name")
    private String name;//姓名
}
