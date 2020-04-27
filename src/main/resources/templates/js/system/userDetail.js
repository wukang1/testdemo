$(function () {
	//初始服务类型
	$('#usr_role_id').combobox({    
	    url:'roleAction_queryRole.action',    
	    valueField:'role_id',    
	    textField:'role_name',
	    loadFilter:function(data){
	    	var obj={};
	    	obj.role_id='';
	    	obj.role_name='---请选择角色---';
	    	data.splice(0,0,obj)//在数组0位插入obj元素不删除原来的元素
	    	return data;
	    }
	}); 
});
