package com.kk.testdemo.util;


import java.io.Serializable;

/**
 * 分页实体
 * @author QiYuXiang
 * @date:  2015年12月18日
 */
public class PageDTO implements Serializable {

	private static final long serialVersionUID = 7754159643145458588L;

	/**当前页*/
	private Integer page;
	
	/**查询数量*/
	private Integer rows;
	
	/**排序字段*/
	private String orderBy;


	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public Integer getPage() {
		return page == null ? 0 : page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getRows() {
		return rows == null ? 10 : rows;
	}


	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}
}
