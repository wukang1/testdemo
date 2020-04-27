<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<%@ include file="show.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/index.js"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:true" style="height:75px; line-height: 60px;padding-left: 10px;font-size: 30px;font-family: cursive;">

   	<span style="float: right; font-size: 13px;margin-right: 10px;margin-top: 8px;"><a href="javascript:void(0)" id="exit"></a></span>
    </div>   
    <div data-options="region:'south',split:true" style="height:40px;line-height: 30px;text-align: center;overflow: y;">
    	© 2018 Wu All Rights Reserved 
    </div>   
    <div data-options="region:'west',title:'导航菜单',split:true," style="width:200px;font-family: cursive;">
    	<div id="menu"  class="easyui-accordion" data-options="fit:true,border:false">
        </div>
    </div>   
    <div data-options="region:'center'">
   <div id="tabs" class="easyui-tabs" data-options="fit:true,border:false">   
    <div title="首页" style="padding:20px;display:none;">   
        tab1    
    </div>   
</div>  
    </div>   
	
</body> 
</html>