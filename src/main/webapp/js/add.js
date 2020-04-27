$(function() {
    $('#region1').combobox({
        url:'getAllselect',
        valueField:'cityCode',
        textField:'name',
        loadFilter:function(data){
//	    	var obj={};
//	    	obj.dict_type='';
//	    	obj.dict_type='---请选择资产状态---';
//	    	data.splice(0,0,obj)//在数组0位插入obj元素不删除原来的元素
            return data;
        }
    });
    $('#owner').combobox({
        url:'getAllInfoOwnerSelect',
        valueField:'nm',
        textField:'name',
        loadFilter:function(data){
//	    	var obj={};
//	    	obj.dict_type='';
//	    	obj.dict_type='---请选择资产状态---';
//	    	data.splice(0,0,obj)//在数组0位插入obj元素不删除原来的元素
            return data;
        }
    });
});