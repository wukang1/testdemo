package com.kk.testdemo.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/24
 * Time: 22:28
 */
@Data
public class TreeDTO {
    private String cityCode;
    private String parentCode;
    private String name;
    private String nameArr;
    private List<TreeDTO> children;
    private String state;
    private BigDecimal area;
    private String id;
    private Boolean isLeaf;
}
