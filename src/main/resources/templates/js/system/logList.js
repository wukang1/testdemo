$(function() {
	initDataGrid();
	//点击查询
	$('#btn_search').click(function() {
		query();
	})
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
	      title : '日志列表', 	// datagrid标题
	      striped : true, 	    // 显示斑马线效果
	      columns:[[ 
	    	    {field:'',checkbox:true,width:'25px'},
	    	    {field:'username',title:'姓名',width:'7%',
		    	    	align:'center',  
	                    styler: function(value,row,index){  
	                            return 'vertical-align:middle;';  
	                    }  
	    	    }, 
	    	    {field:'ip',title:'访问IP',width:'10%',editor:'textbox',
		    	    	align:'center',  
	                    styler: function(value,row,index){  
	                            return 'vertical-align:middle;';  
	                    }  
	    	    },
	    	    {field:'createdate',title:'操作时间',width:'13%',editor:'textbox',
		    	    	formatter:function(value,row,index){
		    	    		return formatterDate(value);
		    	    	},
		    	    	align:'center',  
	                    styler: function(value,row,index){  
	                            return 'vertical-align:middle;';  
	                    } 
	    	    },
	    	    {field:'text',title:'模块',width:'7%',editor:'textbox',
		    	    	align:'center',  
	                    styler: function(value,row,index){  
	                            return 'vertical-align:middle;';  
	                    }  
	    	    },
	    	    {field:'content',title:'操作内容',width:'60%',editor:'textbox',
	    	    		align:'center',  
                        styler: function(value,row,index){  
                            return 'vertical-align:middle;';  
                        }  
	    	    },
	    	]],
	    	pagination:true,	// 是否分页
	    	pageNumber:1,		// 初始化页码
	    	pageSize:10,		// 初始化每页显示条数
	    	toolbar: '#tbar',
	    	//双击编辑
	    	onDblClickRow:function(index){    //双击进行操作的方法
	    		var row = $('#tb').datagrid('getSelected');
	    		console.log(row);
	    		$('#tb').datagrid('beginEdit', index);
	    		if (!row)                //为防止意外情况可以选择加上此判断
	    		return;
	    	}
		   
	});  

}

//2.实现点击查询
function query() {
	//1.修改datagrid请求路径
	var options=$('#tb').datagrid('options');
	options.url='logAction_queryLogPager.action';
	//2.设置请求参数
	var params={
	    'begintime':$('#dd1').val(),
	    'endtime':$('#dd2').val()
	};
	//3.点击查询分页
	$('#tb').datagrid('load',params);
}

//3.实现DataGrid分页效果

//4.实现增删改查
//打开新增窗口
function openAddDialog() {
	$('#openLogDetail').dialog({    
		width : 400,
		height : 600,
		modal : true,
		draggable : true,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		title : '新增订单信息',
		buttons:"#dlg-buttons",
		href:'orderDetail.jsp',
		onLoad:function(){
		   //重置
		   $('#ff').form('reset');
		}
	});    
}

//打开修改窗口
function openEditDialog() {
	var row=$('#tb').datagrid('getSelected');
	console.log(row);
	if(null==row){
		$.messager.alert('警告','请选择要修改的行进行修改操作');
		return false;
	}
	$('#openLogDetail').dialog({    
		width : 400,
		height : 400,
		modal : true,
		draggable : true,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		title : '编辑书本信息',
		buttons:"#dlg-buttons",
		href:'orderEdit.jsp',
		onLoad:function(){
		   //赋值
		   $('#ff').form('load',row);
		}
	});    
}

//保存
function dialogSave() {
	var option=$('#openLogDetail').dialog('options');
	//console.log(option);
	var url="orderAction_addBook.action";
	if(option.title=='编辑订单信息'){
		url="orderAction_update.action";
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
	        	$.messager.alert('警告',data.message);
	        }
	    }    
	});    
}

//关闭
function dialogClose() {
	$('#openLogDetail').dialog("close");
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
	    	   url:rootPath+'bookAction_delBook.action',
	    	   data:{'book_id':row.book_id},
	    	   dataType:'json',
	    	   type:'post',
	    	   async:false,
	    	   success:function(data){
	    		   if(data.success){
	    			   query();
	    		   }else{
	    			   $.messager.alert('警告',data.message);
	    		   }
	    	   }
	       }); 
	    }    
	});  

}

//发货
function fh() {
	var row=$('#tb').datagrid('getSelected');
	if(null==row){
		$.messager.alert('警告','请选择要发货的操作');
		return false;
	}
	 $.ajax({
	  	   url:rootPath+'orderAction_fh.action',
	  	   data:{'order_id':row.order_id,'order_state':row.order_state},
	  	   dataType:'json',
	  	   type:'post',
	  	   async:false,
	  	   success:function(data){
	  		   if(data.success){
	  			   query();
	  		   }else{
	  			   $.messager.alert('警告',data.message);
	  		   }
	  	   }
	     }); 
	
}

//开始编辑
function editOne(index) {
	$('#tb').datagrid('beginEdit', index);
}

//保存
function saveOne(index) {
	 $('#tb').datagrid('endEdit', index);
	 var row = $('#tb').datagrid('getSelected');
	 var params={
			 id:row.id,
			 bookname:row.bookname,
			 price:row.price,
			 booktype:row.booktype
	 };
	 $.ajax({
  	   url:rootPath+'bookAction_editBook.action',
  	   data:params,
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



