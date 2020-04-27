<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="show.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/easyui/treegrid-dnd.js"></script>
<script type="text/javascript" src="js/module.js"></script>
</head>

<body class="easyui-layout">   
	<div data-options="region:'center',border:false,fit:true"   style="width: 900px; height: 600px">
	    <table  id="tt" class="easyui-treegrid" >
	    <thead><tr></tr></thead>
	</table> 
    </div>  
    <!-- datagrid数据表格中的toolbar自定义工具栏 -->
	<div id="tbar">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'"onclick="saveEdit()">保存编辑</a> 
	    <%--<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="appendRoot()">新增根目录</a>--%>
	    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="append()">新增目录</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="removeIt()">删除</a>
	</div>
</body>
</html>