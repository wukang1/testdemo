<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<script type="text/javascript" src="js/add.js"></script>
<form id="ff" method="post">
    <input type="hidden" id="landId" name="landId">
    <input type="hidden" id="ownerId" name="ownerId">
    <table class="query_form_table1">
        <tr>
            <th>行政区</th>
            <td>
                <select  class="easyui-combobox" id="region1" name="region1" style="width:280px"required ="required" prompt="请选择行政区"/>
            </td>
            <th>权属人</th>
            <td>
                <select  class="easyui-combobox" id="owner" name="owner" style="width:280px"required ="required" prompt="请选择权属人"/>
            </td>
        </tr>
        <tr>
            <th>面积</th>
            <td><input class="easyui-textbox" id="area" name="area" style="width:280px" required ="required"></td>
        </tr>
    </table>
</form>
