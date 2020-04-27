var datas=[];
var rowEditor = undefined;
$(function() {
	$('#win').window('close');
	inittreegrid();
});
function inittreegrid(){
	$('#tt').treegrid({
		url : 'queryInfiniteClassification',
		idField : 'cityCode',
		treeField : 'name',
		height : "100%",
		method : 'post',
		dataType : 'json',
        columns : [ [{
            title : '行政区',
            field : 'name',
            width : "30%",
            editor : 'text'
        }, {
			title : '面积',
			field : 'area',
			width : "10%"
		}, {
            title : '权属人',
            field : 'nameArr',
            width : "30%"
        }
        ] ],
		onDblClickCell:function(index,row){//双击单元格时进行内容编辑
			editOne(row);
   		},onAfterEdit:function (index, row, changes) {
   			saveEdit();
   		},onClickCell:function (index,row) {
            $('#tt').treegrid('endEdit',rowEditor);
        },
		toolbar : "#tbar",
        // onLoadSuccess: function(row){
        //    //启用拖动排序
        //     enableDnd($('#tt'));
        // }
	});
    // {
    //     title : 'id',
    //         field : 'cityCode',
    //     width : "10%",
    //     align : "center"
    // }, {
    //     title : '父id',
    //         field : 'parentCode',
    //         width : "10%",
    //         align : "center"
    // },

}
function editOne(row){
	// $('#tt').treegrid('beginEdit',row.id);
	var row = $("#tt").datagrid("getSelected");
	console.log(row);
	if (null == row) {
		$.messager.alert('警告', '请选择你要编辑的行');
		return false;
	}
	if (row) {
		editingId = row.cityCode;
        rowEditor=editingId;
		$('#tt').treegrid('beginEdit', editingId);
		 // var eds = $('#tg').treegrid('getEditors',editingId); for(var i=0;i<eds.length;i++){
		 // $(eds[i].target).bind('mousedown',function(e){ e.stopPropagation();
		 // }); }
		$(".datagrid-row-editing input").each(function() {
			$(this).bind('mousedown', function(e) {
				e.stopPropagation();
			});
		});
	}

}

function saveEdit(){
	var row=$('#tt').treegrid('getSelected');
	console.log(row);
	$('#tt').treegrid('endEdit',row.cityCode);
	var param={
		'cityCode':row.cityCode,
		'name':row.name,
		'id':row.id
	};
	$.ajax({
		url:'updatePubRegion',
		data:param,
		dataType:'json',
		type:'post',
		async:'false',
		success:function(data) {
            if (data.success) {
            	$("#tt").treegrid("reload");
        	}
		}
	});
}
function append(){
	var row=$("#tt").treegrid("getSelected");
	if(null==row){
		$.messager.alert('警告', '请选择你要加入的根目录');
	}else{
		var param={
			'parentCode':row.cityCode,
			'name':"新建节点",
		};
        $.ajax({
            url:'addPubRegion',
            data:param,
            dataType:'json',
            type:'post',
            async:'false',
            success:function(data){
                if(data.success){
                    $("#tt").treegrid("reload");
                }
            }
        });
	};
}
function appendRoot(){
	$.ajax({
		url:'moduleAction_addComm.action',
		data:{
			'right_parent_code':'-1',
			'text':"新建模块",
			'right_url':"",
		},
		dataType:'json',
		type:'post',
		async:'false',
		success:function(data){
			if(data.success){
				$("#tt").treegrid("reload");
			}
		}
	});
}

//是否删除

function removeIt() {
	var row=$("#tt").treegrid("getSelected");
      $.messager.confirm("确认", "确定要删除吗？", function (r) {
      	if(row.isLeaf){
            $.messager.alert('警告', '请删除子节点再操作');
            return false;
		}else {
            if (r) {
                //请求
                $.ajax({
                    url: 'delPubRegion?id=' + row.id,
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        window.location.reload();
                        // if (data) {
                        //     $('#tt').treegrid('reload');
                        // }
                        // else
                        //     alert("faile");
                    }
                });
            }
        }
      });
      return false;
  }
function enableDnd(t) {
	var nodes = t.treegrid('getPanel').find('tr[node-id]');
	nodes.find('span.tree-hit').bind('mousedown.treegrid', function() {
		return false;
	});
	nodes
			.draggable(
					{
						disabled : false,
						revert : true,
						cursor : 'pointer',
						proxy : function(source) {
							var p = $(
									'<div class="tree-node-proxy tree-dnd-no"></div>')
									.appendTo('body');
							p.html($(source).find('.tree-title').html());
							p.hide();
							return p;
						},
						deltaX : 15,
						deltaY : 15,
						onBeforeDrag : function() {
							$(this).next('tr.treegrid-tr-tree').find(
									'tr[node-id]').droppable({
								accept : 'no-accept'
							});
						},
						onStartDrag : function() {
							$(this).draggable('proxy').css({
								left : -10000,
								top : -10000
							});
						},
						onDrag : function(e) {
							$(this).draggable('proxy').show();
							this.pageY = e.pageY;
						},
						onStopDrag : function() {
							$(this).next('tr.treegrid-tr-tree').find(
									'tr[node-id]').droppable({
								accept : 'tr[node-id]'
							});
						}
					})
			.droppable(
					{
						accept : 'tr[node-id]',
						onDragOver : function(e, source) {
							var pageY = source.pageY;
							var top = $(this).offset().top;
							var bottom = top + $(this).outerHeight();
							$(source).draggable('proxy').removeClass(
									'tree-dnd-no').addClass('tree-dnd-yes');
							$(this)
									.removeClass(
											'row-append row-top row-bottom');
							if (pageY > top + (bottom - top) / 2) {
								if (bottom - pageY < 5) {
									$(this).addClass('row-bottom');
								} else {
									$(this).addClass('row-append');
								}
							} else {
								if (pageY - top < 5) {
									$(this).addClass('row-top');
								} else {
									$(this).addClass('row-append');
								}
							}
						},
						onDragLeave : function(e, source) {
							$(source).draggable('proxy').removeClass(
									'tree-dnd-yes').addClass('tree-dnd-no');
							$(this)
									.removeClass(
											'row-append row-top row-bottom');
						},
						onDrop : function(e, source) {
							var action, point;
							if ($(this).hasClass('row-append')) {
								action = 'append';
							} else {
								action = 'insert';
								point = $(this).hasClass('row-top') ? 'top'
										: 'bottom';
							}
							$(this)
									.removeClass(
											'row-append row-top row-bottom');
							var src = t.treegrid('find', $(source).attr(
									'node-id'));
							var dest = t.treegrid('find', $(this).attr(
									'node-id'));
							if (src) {
								t.treegrid('remove', src.right_code);
							}
							if (action == "append") {
								src.parent = {};
								src.parent.id = dest.right_code;
								t.treegrid('append', {
									parent : dest.right_code,
									data : [ src ]
								});
							} else if (action == "insert") {
								src.parent = dest.parent;
								var obj = {
									before : dest.right_code,
									after : dest.right_code,
									data : src
								}
								if (point == "top") {
									delete obj.after;
								} else {
									delete obj.before;
								}
								t.treegrid('insert', obj);
							}
							if (src.id > 0) {
								$
										.ajax({
											url :'moduleAction_updateComm.action',
											data : {
												"right_code" : src.right_code,
												"right_parent_code" : src.parent.id,
											},
											dataType : 'json',
											type : 'post',
											async : false,
											success : function(data) {
												console.log(data.success);
												if (!data.success)
													$.messager.alert('警告',
															data.message);
												else
													$('#tt').treegrid("reload");
											}
										});
							}
							enableDnd(t);
						}
					});
}
