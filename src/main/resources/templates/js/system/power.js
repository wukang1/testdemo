var zTreeObj;
$(function() {
	initDataGrid();
	initZtree();
	$('#saveRole').click(function(){
		saveRole();
	});
});

//1.初始化DataGrid数据表格
function initDataGrid() {
	$('#tb').datagrid({    
	      url :'roleAction_queryRolePager.action', 			// 初始化请求路径
	      fitcolumns : false, 	// 列宽自适应
	      singleSelect : true, 	// 是否选中单行
	      checkOnSelect : true, // 点击行选中时该checkbox选中或取消选中
	      rownumbers:true,	    // 行号
	      fit : true, 			// 高宽自适应父容器
	      border : false, 	    // 是否显示边框
	      title : '角色列表', 	// datagrid标题
	      striped : true, 	    // 显示斑马线效果
	      columns:[[    
	    	    {field:'',checkbox:true,width:'25px'},
	    	    {field:'role_name',title:'角色名称',width:'20%',editor:'textbox',align:'center',
	    	    	formatter:function(value,row,index){
	    	    		return "<a href='javascript:queryModule(\""+row.role_id+"\");'>"+value+"</a>"
	    	    }},
	    	    {field:'role_desc',title:'角色说明',width:'50%',editor:'textbox',align:'center',
	    	    	formatter:function(value,row,index){
	    	    		if(row.role_desc.length>50){
	    	    			return row.role_desc.substring(0,50)+"......";
	    	    		}else{
	    	    			return row.role_desc
	    	    		}
	    	    	}
	    	    }
	    	]],
	    	pagination:true,	// 是否分页
	    	pageNumber:1,		// 初始化页码
	    	pageSize:10,		// 初始化每页显示条数
	    	toolbar: '#tbar',
	    	/*//双击编辑
	    	onDblClickRow:function(index){    //双击进行操作的方法
	    		var row = $('#tb').datagrid('getSelected');
	    		//console.log(row);
	    		$('#tb').datagrid('beginEdit', index);
	    		if (!row)                //为防止意外情况可以选择加上此判断
	    		return;
	    	}*/
	});  
}

//根据Id查询对应的模块信息
function queryModule(roleid) {
	//取消所有选中状态的节点
    zTreeObj.checkAllNodes(false);
	$.ajax({
		url:'roleModuleAction_querModuleByRole.action',
	  	   data:{'rf_role_id':roleid},
	  	   dataType:'json',
	  	   type:'post',
	  	   async:false,
	  	   success:function(data){
//	  		 console.log(data);
	  		 //zTreeObj=$.fn.zTree.init($('#authTree'),setting,data);
	  		  //动态设置zTree中CheckBox为选中状态
		  		for(var i=0;i<data.length;i++){
		  		    //根据id属性的值获取zTree中对应的TreeNode节点
		  		    var node = zTreeObj.getNodeByParam("id",data[i]);
		  		    //设置该TreeNode节点为选中状态
		  		    zTreeObj.checkNode(node, true, false);
		  		}
	  	   }
	     }); 
}

//保存角色权限（模块信息）
function saveRole() {
	var row=$('#tb').datagrid('getSelected');
	if(null==row){
		$.messager.alert('警告','请选择角色');
		return false;
	}
	//获取zTree中CheckBox选中状态的节点
	//获取选中节点    getCheckedNodes：默认获取选中状态所有节点
	var nodes = zTreeObj.getCheckedNodes(); 
	//判断节点是否为空
	if(nodes.length>0){
	   var moduleid="";
	   //循环获取选中节点的id，并以，隔开
	   for(var i=0;i<nodes.length;i++){
	       moduleid+=nodes[i].id+",";
	   }
	   //将最后一个节点的,去除
	   moduleid=moduleid.substring(0,moduleid.length-1);
	   //console.log(moduleid);
	   $.ajax({
			url:'roleModuleAction_saveRoleModule.action',
		  	   data:{'rf_role_id':row.role_id,'rf_right_code':moduleid},
		  	   dataType:'json',
		  	   type:'post',
		  	   async:false,
		  	   success:function(data){
//		  		  console.log(data);
		  		  if(data.success){
		  			$.messager.alert('警告',data.message);
		  			//取消所有选中状态的节点
		  			  zTreeObj.checkAllNodes(false);
		  			//刷新列表
		  			$('#tb').datagrid('reload');
		  		  }
		  		 //zTreeObj=$.fn.zTree.init($('#authTree'),setting,data);
		  	   }
		     }); 
	}else{
		$.messager.alert('警告','请选择角色权限信息');
	}
}


var setting={
    check:{
        enable: true, //每个节点上是否显示 CheckBox
        chkStyle:"checkbox", // 添加生效
        chkboxType :{ "Y" : "p", "N" : "s" } //Y:勾选（参数：p:影响父节点），N：不勾（参数s：影响子节点）[p 和 s 为参数]
    },
    data: {
        simpleData: {//简单数据模式
            enable:true,
        }
    }
};

//初始化zTree插件
function initZtree() {
	$.ajax({
		url:'moduleAction_queryModuleList.action',
	  	   data:{"1":1},
	  	   dataType:'json',
	  	   type:'post',
	  	   async:false,
	  	   success:function(data){
	  		   //console.log(data);
	  		 zTreeObj=$.fn.zTree.init($('#authTree'),setting,data);
	  	   }
	     }); 
}


//4.实现增删改查
//打开新增窗口
function openAddDialog() {
	$('#openRoleDetail').dialog({    
		width : 500,
		height : 261,
		modal : true,
		draggable : true,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		title : '新增角色信息',
		buttons:"#dlg-buttons",
		href:'roleDetail.jsp',
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
	$('#openRoleDetail').dialog({    
		width : 500,
		height : 261,
		modal : true,
		draggable : true,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		title : '编辑角色信息',
		buttons:"#dlg-buttons",
		href:'roleDetail.jsp',
		onLoad:function(){
		   //赋值
		   $('#ff').form('load',row);
		}
	});    
}

//保存
function dialogSave() {
	var option=$('#openRoleDetail').dialog('options');
	var url="roleAction_addRole.action";
	if(option.title=='编辑角色信息'){
		url="roleAction_updateRole.action";
	}
	$('#ff').form('submit',{    
	    url:url,    
	    onSubmit: function(){    
	        return $(this).form('validate');    
	    },    
	    success:function(data){   
	        var result=JSON.parse(data);
	        if(result.success){
	             $.messager.alert('警告',result.message);
	        	 dialogClose();
	        	 $('#tb').datagrid('reload');
	        }else{
	        	$.messager.alert('警告',result.message);
	        }
	    }    
	});    
}

//关闭
function dialogClose() {
	$('#openRoleDetail').dialog("close");
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
	    	   url:'roleAction_delRole.action',
	    	   data:{'role_id':row.role_id},
	    	   dataType:'json',
	    	   type:'post',
	    	   async:false,
	    	   success:function(data){
			        if(data.success){
			        	 $('#tb').datagrid('reload');
			        }else{
			        	$.messager.alert('警告',data.message);
			        }
	    	   }
	       }); 
	    }    
	});  

}
