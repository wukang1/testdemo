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
		      title : '实物指标-土地表', 	// datagrid标题
		      striped : true, 	        // 显示斑马线效果
		      columns:[[    
		    	  	{field:'',checkbox:true,width:'20%'},
		    	    {field:'id',title:'编号',width:'14%', editor:'text'},
		    	    {field:'nm',title:'内码',width:'14%', editor:'text'},
		    	    {field:'regionName',title:'行政区',width:'14%', editor:'text'},
		    	    {field:'name',title:'姓名',width:'14%', editor:'text'}
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
	options.url='getAll';
	var params={
			'nm':$('#nm').val(),
			'regionName':$('#regionName').val(),
			'name':$('#name').val()

	};
	$('#tabs').datagrid('load',params);
}
