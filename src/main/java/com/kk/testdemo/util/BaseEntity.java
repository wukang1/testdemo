package com.kk.testdemo.util;

import lombok.Data;
import lombok.experimental.FieldNameConstants;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 11:58
 */
@Data
@FieldNameConstants()
public class BaseEntity implements Serializable {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "nm")
    private String nm;

}
