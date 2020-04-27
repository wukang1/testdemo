var rootPath;
$(function () {
	rootPath=$('#absolutePath').val();
	//console.log(rootPath);
	createAccordion();
	createTree();
	$('#exit').click(function() {
		$.messager.confirm('确认','您确认退出吗？',function(r){  
			if(r){
				location.href=rootPath+"userAction_exit.action";
			}
		});
	});
});

//1.通过Ajax动态创建Accordion分类组件
function createAccordion() {
	$.ajax({
		url:rootPath+'moduleAction_queryModule.action',
		data:{'right_parent_code':'-1'},
		dataType:'json',
		type:'post',
		async:false,
		success:function(data){
//			console.log(data);
			$.each(data,function(idx,elem){
				$('#menu').accordion('add', {
					title: elem.text,
					content: '<ul style="padding:6px 0px;" id="'+elem.right_code+'" alt="'+elem.text+'" class="easyui-tree"></ul>  ',
					selected: false
				});
			});
		}
	});
}

//2.根据Accordion分类组件的Id属性，查找子类信息，Tree
function createTree() {
	$('#menu').accordion({
		onSelect:function(title,index){
//			console.log(title+","+index);
			var treeObj=$('ul[alt='+title+']');
			var nodes=treeObj.tree('getRoots');
//			console.log(nodes);
			if(nodes.length>0){
				//console.log('已加载');
				return;
			}else{
				//console.log('第一次加载');
				var pid=treeObj.attr('id');
//				console.log(pid);
				treeObj.tree({    
				    url:rootPath+'moduleAction_queryModule.action?right_parent_code='+pid, 
				    onSelect:function(node){
//				    	console.log(node);
				    	createTabs(node);
				    }
				}); 
			}
		  }
	});
}

//3.点击Tree的节点弹出页面
function createTabs(node) {
	var iframe="<iframe frameborder='0' src='"+rootPath+node.right_url+"' scrolling='hidden' style='width:100%;height:100%;'></iframe>";
	var isOpen=$('#tabs').tabs('exists',node.text);
	//.log(iframe);
	if(isOpen){ 
		$('#tabs').tabs('select',node.text);
	}else{
		$('#tabs').tabs('add',{    
		    title:node.text,    
		    //href:node.url, 
		    content:iframe,
		    closable:true
		});  
	}
}


