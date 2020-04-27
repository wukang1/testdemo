$(function() {
	
});

//保存
function login() {
	$('#ff').form('submit',{    
	    url:"userAction_loginUser.action",    
	    onSubmit: function(){    
	        return $(this).form('validate');    
	    },
	    /*onSubmit: function(param){    
	    	param.sybm = $('#sybmid').val();    
	    },*/    
	    success:function(data){  
	    	var result=JSON.parse(data);
	    	if(result.success){
	  			  location.href="index.jsp";
	  		  }else{
	  			  $.messager.alert('警告',result.message);
	  		  }
	    }    
	});    
}