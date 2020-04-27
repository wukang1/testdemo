<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head>
    <%@ include file="show.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <script type="text/javascript" src="js/InfoOwner.js"></script>
</head>
<body class="easyui-layout">
<div
        data-options="region:'north',title:'实物指标-权属人',split:true"
        style="height: 108px; font-family: cursive;">
    <table class="query_form_table1" height="53">
        <tr>
            <th height="28"></th>
            <td><input class="easyui-textbox" name="serachKey"
                       id="serachKey" style="width: 290px;" prompt="内码/行政区/姓名"></td>
            <%--<th height="28">行政区:</th>--%>
            <%--<td><input class="easyui-textbox" name="region"--%>
                       <%--id="region" style="width: 290px;"></td>--%>
            <%--<th height="28">姓名:</th>--%>
            <%--<td><input class="easyui-textbox" name="name"--%>
                       <%--id="name" style="width: 290px;"></td>--%>
            <th height="22">操作：</th>
            <td>
                <a id="btn" href="javascript:void(0);" class="easyui-linkbutton"
                   data-options="iconCls:'icon-search',plain:true"
                   style="background-color: skyblue; color: white; width: 80px">查询</a>
            </td>
        </tr>
    </table>
</div>

<div data-options="region:'center',border:false" style= "background:#eee;" class="table-responsive table2excel" data-tableName="Test Table 1">
    <table class="easyui-datagrid" id="tabs"></table>
</div>
<!-- datagrid数据表格中的toolbar自定义工具栏 -->
<div id="tbar">
    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="del()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="edit()">修改</a>
</div>

<div id="openInfoDetail" style="display:none;"></div>
<div id="dlg-buttons">
    <a href="javascript:void(0);" class="easyui-linkbutton"
       iconCls="icon-save" onclick="dialogSave();">保存</a> <a
        href="javascript:void(0);" class="easyui-linkbutton"
        iconCls="icon-cancel" onclick="dialogClose();">关闭</a>
</div>
</body>
</html>