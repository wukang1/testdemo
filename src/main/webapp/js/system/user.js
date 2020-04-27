$(function () {
	initDataGrid();
	$('#btn_search').click(function() {
		query();
	});
});

//1.初始化DataGrid数据表格
function initDataGrid() {
	$('#tb').datagrid({    
	      url : '', 			// 初始化请求路径
	      fitcolumns : false, 	// 列宽自适应
	      singleSelect : true, 	// 是否选中单行
	      checkOnSelect : true, // 点击行选中时该checkbox选中或取消选中
	      rownumbers:true,	    // 行号
	      fit : true, 			// 高宽自适应父容器
	      border : false, 	    // 是否显示边框
	      title : '用户列表', 	// datagrid标题
	      striped : true, 	    // 显示斑马线效果
	      columns:[[    
	    	    {field:'',checkbox:true,width:'25px'},
	    	    {field:'usr_name',title:'用户名',width:'15%',editor:'textbox',align:'center'},
	    	    {field:'role_name',title:'用户角色',width:'15%',editor:'textbox',align:'center'},
	    	]],
	    	pagination:true,	// 是否分页
	    	pageNumber:1,		// 初始化页码
	    	pageSize:10,		// 初始化每页显示条数
	    	toolbar: '#tbar',
	});  
}

//2.实现点击查询
function query() {
	//1.修改datagrid请求路径
	var options=$('#tb').datagrid('options');
	options.url='userAction_queryUserPage.action';
	
	//2.设置请求参数
	var params={
	    'usr_name':$('#usr_name').val()
	};
	//3.点击查询分页
	$('#tb').datagrid('load',params);
}

//3.实现DataGrid分页效果

//4.实现增删改查
//打开新增窗口
function openAddDialog() {
	$('#openUserDetail').dialog({    
		width : 400,
		height : 220,
		modal : true,
		draggable : true,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		title : '新增用户信息',
		buttons:"#dlg-buttons",
		href:'userDetail.jsp',
		onLoad:function(){
		   //重置
		   $('#ff').form('reset');
		}
	});    
}

//打开修改窗口
function openEditDialog() {
	var row=$('#tb').datagrid('getSelected');
	if(null==row){
		$.messager.alert('警告','请选择要修改的行进行修改操作');
		return false;
	}
	$('#openUserDetail').dialog({    
		width : 400,
		height : 220,
		modal : true,
		draggable : true,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		title :'编辑用户信息',
		buttons:"#dlg-buttons",
		href:'userDetail2.jsp',
		onLoad:function(){
		   //赋值
		   $('#ff').form('load',row);
		}
	});    
}

//保存
function dialogSave() {
	var option=$('#openUserDetail').dialog('options');
	//console.log(option);
	var url="userAction_addUser.action";
	if(option.title=='编辑用户信息'){
		url="userAction_updateUser.action";
	}
	$('#ff').form('submit',{    
	    url:url,    
	    onSubmit: function(){    
	        return $(this).form('validate');    
	    },    
	    success:function(data){   
	        var result=JSON.parse(data);
	        if(result.success){
	        	query();
	        	dialogClose();
	        }else{
	        	$.messager.alert('警告',result.message);
	        }
	    }    
	});    
}

//关闭
function dialogClose() {
	$('#openUserDetail').dialog("close");
}

//执行删除方法
function del() {
	var row=$('#tb').datagrid('getSelected');
	if(null==row){
		$.messager.alert('警告','请选择要删除的行进行操作');
		return false;
	}
	$.messager.confirm('确认','您确认想要删除记录吗？',function(r){    
	    if (r){    
	       $.ajax({
	    	   url:'userAction_delUser.action',
	    	   data:{'usr_id':row.usr_id},
	    	   dataType:'json',
	    	   type:'post',
	    	   async:false,
	    	   success:function(data){
	    		   if(data.success){
	    			   query();
	    		   }else{
	    			   $.messager.alert('警告',result.message);
	    		   }
	    	   }
	       }); 
	    }    
	});  

}

