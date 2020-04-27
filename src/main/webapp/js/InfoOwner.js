$(function(){
	initDataGrids();
	$('#btn').click(function(){
		query();
	});
});
//初始化
function initDataGrids(){
		$('#tabs').datagrid({
			  url : '', 		// 初始化请求路径
		      fitcolumns : false, 	// 列宽自适应
		      singleSelect : true, 	// 是否选中单行
		      checkOnSelect : true, 	// 点击行选中时该checkbox选中或取消选中
		      rownumbers:true,	        // 行号
		      fit : true, 		// 高宽自适应
		      border : false, 	        // 是否显示边框
		      title : '实物指标-权属人', 	// datagrid标题
		      striped : true, 	        // 显示斑马线效果
		      columns:[[    
		    	  	{field:'',checkbox:true,width:'20%'},
		    	    {field:'id',title:'编号',width:'14%', editor:'text'},
		    	    {field:'nm',title:'内码',width:'14%', editor:'text'},
		    	    {field:'regionName',title:'行政区',width:'14%', editor:'text'},
                  	{field:'region',title:'行政区编码',width:'14%', editor:'text'},
                  	{field:'area',title:'面积',width:'14%', editor:'text'},
		    	    {field:'ownerName',title:'姓名',width:'14%', editor:'text'}
		    	]],
		    	  //分页
		    	   pagination:true,	// 是否分页
		    	   pageNumber:1,	// 初始化页码
		    	   pageSize:10,		// 初始化每页显示条数
		    	   //拖把
		    	   toolbar:'#tbar'
		});
	}

//查询
function query(){
	var options=$('#tabs').datagrid('options');
	options.url='getAllInfoOwner';
	var params={
			'serachKey':$('#serachKey').val()
	};
	$('#tabs').datagrid('load',params);
}


//执行删除
function del(){
    var row = $('#tabs').datagrid('getSelected');
    if(null==row){
        $.messager.alert('警告','请选择要删除的行进行操作');
        return false;
    }
    $.messager.confirm('确认','确定删除记录吗？',function(r){
        if(r){
            $.ajax({
                url:'del',
                data:{'landId':row.landId,'ownerId':row.ownerId},
                dataType:'json',
                type:'post',
                async:false,
                success:function(data){
                    query();
                    $.messager.alert('警告',data.message);
                }
            });
        }
    });
}


function add(){
    //z-Index:1000;position:absolute/relative/fixed
    $('#openInfoDetail').dialog({
        title: '新增',
        width: 1000,
        height: 410,
        draggable : true,
        collapsible : false,
        closed: false,
        cache: false,
        minimizable : false,
        maximizable : false,
        buttons:'#dlg-buttons',
        href: 'add.jsp',
        modal: true,
        onLoad:function(){
            //重置
            $('#ff').form('reset');
        }

    });
}

//打开处理窗口
function edit() {
    var row=$('#tabs').datagrid('getSelected');
    if(null==row){
        $.messager.alert('警告','请选择要修改的行进行操作');
        return false;
    }
    $('#openInfoDetail').dialog({
        title: '修改',
        width: 1000,
        height: 410,
        draggable : true,
        collapsible : false,
        closed: false,
        cache: false,
        minimizable : false,
        maximizable : false,
        buttons:'#dlg-buttons',
        href: 'add.jsp',
        onLoad:function(){
            //赋值
            row.region1=row.region;
            row.owner=row.nm;
            $('#ff').form('load',row);
        }
    });
}

function dialogClose(){
    $('#openInfoDetail').dialog('close');
}

//保存
function dialogSave() {
    var option=$('#openInfoDetail').dialog('options');
    console.log(option);
    //console.log($("#dict_is_editable").switchbutton("options").checked);
    var url="add";
    if(option.title=='修改'){
        url="update";
    }
    $('#ff').form('submit',{
        url:url,
        onSubmit: function(){
            return $(this).form('validate');
        },
        onSubmit: function(param){
            param.name = $("#owner").combobox("getText");
            param.nm = $("#owner").combobox("getValue");
        },
        success:function(data){
            var result=JSON.parse(data);
            if(result.success){
                query();
                dialogClose();
                $.messager.alert('警告',result.message);
            }else{
                $.messager.alert('警告',result.message);
            }
        }
    });
}
