
//格式化操作栏
function opera(value, row, index) {
	return '<a href="#" style="color:rgb(0,125,220)" onclick="openEditRoleDialog('
			+ row.roleId
			+ ',\''
			+ row.roleName
			+ ' \',\''
			+ row.roleDescription
			+ '\','
			+ row.roleLevel
			+ ',\''
			+ row.roleResourceIds
			+ '\''
			+ ')">编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;'
			+ '<a href="#" style="color:red" onclick="deleteOneRole('
			+ row.roleId + ',\'  ' + row.roleDescription + ' \')">删除</a>';
}
//打开添加的窗口
//todo
function openAddRoleDialog() {
/*	$('#add_dialog_userName').textbox('setValue', '');
	$('#add_dialog_userRole').combobox('setValue', 1);
	$('#add_dialog_userPsd').textbox('setValue', '');
	$('#readd_dialog_userPsd').textbox('setValue', '');
	$('#add_dialog_userCompany').textbox('setValue', '');
	$('#add_dialog_userAddress').combobox('setValue', 0);*/
	$('#add_dlg').dialog('open');
}
//打开编辑的窗口
function openEditRoleDialog(roleId, roleName, roleDescription, roleLevel, roleResourceIds) {
	$('#edit_dialog_roleName').textbox('textbox').attr('disabled', true); //设置输入框为禁用
	$('#edit_dialog_roleLevel').textbox('textbox').attr('disabled', true); //设置输入框为禁用
	$('#edit_dialog_roleId').textbox('textbox').attr('disabled', true); //设置输入框为禁用

	$('#edit_dialog_roleId').textbox('setValue', roleId);
	$('#edit_dialog_roleName').textbox('setValue', roleName);
	$('#edit_dialog_roleDescription').textbox('setValue', roleDescription);
	$('#edit_dialog_roleLevel').textbox('setValue', roleLevel);
	$('#edit_dialog_roleResourceIds').textbox('setValue', roleResourceIds);

	$('#dlg').dialog('open');
}

//删除单个角色  
function deleteOneRole(roleId, roleDescription) {
	$.messager.confirm('删除', '您确认想要删除' + roleDescription + '角色吗？', function(r) {
		if (r) {
			$.ajax({
				type : "POST",
				url : "deleteOneRole.json",
				data : {
					"roleId" : roleId
				},
				dataType : "json",
				traditional : true,//防止深度序列化
				success : function(data) {
					//ajax成功后返回的数据是json对象，但是easyui的form表单返回时是json字符串，需要转化成json对象
					var msg = data;
					if (msg.code == 200) {
						$.messager.alert('提示', msg.msg);
						//刷新数据
						$('#dg').datagrid('reload');
					} else {
						$.messager.alert('提示', msg.msg);
					}
				},
				error : function(err) {
					$.messager.alert('提示', "删除" + userName + "失败！");
				}
			});
		}
	});
}
//批量删除角色 
function deleteListRole() {

	var ids = [];
	var rows = $('#dg').datagrid('getSelections');
	for (var i = 0; i < rows.length; i++) {
		ids.push(rows[i].roleId);
	}
	var idss = ids.join(',');
	$.messager.confirm('删除', '您确认想要删除"' + idss + '"这' + rows.length + '条用户吗？',
			function(r) {
				if (r) {
					$.ajax({
						type : "POST",
						url : "deleteListRole.json",
						data : {
							"ids" : ids
						},
						dataType : "json",
						traditional : true,//防止深度序列化
						success : function(data) {
							//ajax成功后返回的数据是json对象，但是easyui的form表单返回时是json字符串，需要转化成json对象
							var msg = data;
							if (msg.code == 200) {
								$.messager.alert('提示', msg.msg);
								//刷新数据
								$('#dg').datagrid('reload');
							} else {
								$.messager.alert('提示', msg.msg);
							}
						},
						error : function(err) {
							$.messager.alert('提示', "删除失败！");
						}
					});
				}
			});
}

//新增用户
function addRole() {
		$('#add_dlg_f').form('submit', {
			url : "insertRole.json",
			success : function(data) {
				//ajax成功后返回的数据是json对象，但是easyui的form表单返回时是json字符串，需要转化成json对象
				var msg = $.parseJSON(data);
				if (msg.code == 200) {
					$.messager.alert('提示', msg.msg);
					//关闭窗口 刷新数据
					$('#add_dlg').dialog('close');
					$('#dg').datagrid('reload');
				} else {
					$.messager.alert('提示', msg.msg);
				}
			},
			onLoadError : function() {
				$.messager.alert('提示', "添加失败！");
			}
		});

}
//编辑用户
//todo
function editRole() {

	$('#edit_dlg_f').form('submit', {
		url : "updateRole.json",
		success : function(data) {
			//ajax成功后返回的数据是json对象，但是easyui的form表单返回时是json字符串，需要转化成json对象
			var msg = $.parseJSON(data);
			if (msg.code == 200) {
				$.messager.alert('提示', msg.msg);
				//关闭窗口 刷新数据
				$('#dlg').dialog('close');
				$('#dg').datagrid('reload');
			} else {
				$.messager.alert('提示', msg.msg);
			}
		},
		onLoadError : function() {
			$.messager.alert('提示', "编辑失败！");
		}
	});
}

//添加权限进text
function editResourcesToText(){
	$('#edit_dialog_roleResourceIds').textbox('setValue', getChecked1());
}
//获取选中的项 （已做合并）并返回
function getChecked1(){
	var nodes = $('#edit_roleResourceIdsTree').tree('getChecked');
	var resultnodes = new Array();
	var resultnodestNum = 0;
	var menulist = new Array();
	var menulistNum = 0;
	var s = '';

	//获取选中的大项-page
	for(var i=0; i<nodes.length; i++){
		if(nodes[i].id < 1000 && nodes[i].id > 99){
			resultnodes[resultnodestNum] = nodes[i].id;
			resultnodestNum++;
		}
	}
	//获取所有的小项-button
	for(var i=0; i<nodes.length; i++){
		if(nodes[i].id > 999){
			//从button中获取menu  如果从page中取 ，如果当都是不完整的时候 将无法获取
			var menuid = Math.floor(nodes[i].id / 100);
			//记录menulist中已有menu的数量
			var eachTimeMenuidnum = 0 ;
			for(var j = 0 ; j < menulist.length; j ++ ){
				if(menulist[j] == menuid){
					eachTimeMenuidnum++;
				}
			}
			if(eachTimeMenuidnum == 0){
				menulist[menulistNum] = menuid;
				menulistNum++;
			}
			//淘汰在page中已经存在的button
			var buttonInPage= 0;//大于0说明此次的button在page中已经存在了
			for(var j = 0 ;  j < resultnodes.length;j ++){
				if(resultnodes[j] == Math.floor(nodes[i].id / 10)){
					buttonInPage++;
				}
			}
			if(buttonInPage == 0){
				resultnodes[resultnodestNum] = nodes[i].id;
				resultnodestNum++;
			}
		}
	}
	for(var i=0; i<menulist.length; i++){
		resultnodes[resultnodestNum] = menulist[i];
		resultnodestNum++;
	}
	return resultnodes;
}




//添加权限进text
function addResourcesToText(){
	$('#add_dialog_roleResourceIds').textbox('setValue', getChecked());
}

//获取选中的项 （已做合并）并返回
function getChecked(){
	var nodes = $('#roleResourceIdsTree').tree('getChecked');
	var resultnodes = new Array();
	var resultnodestNum = 0;
	var menulist = new Array();
	var menulistNum = 0;
	var s = '';

	//获取选中的大项-page
	for(var i=0; i<nodes.length; i++){
		if(nodes[i].id < 1000 && nodes[i].id > 99){
			resultnodes[resultnodestNum] = nodes[i].id;
			resultnodestNum++;
		}
	}
	//获取所有的小项-button
	for(var i=0; i<nodes.length; i++){
		if(nodes[i].id > 999){
			//从button中获取menu  如果从page中取 ，如果当都是不完整的时候 将无法获取
			var menuid = Math.floor(nodes[i].id / 100);
			//记录menulist中已有menu的数量
			var eachTimeMenuidnum = 0 ;
			for(var j = 0 ; j < menulist.length; j ++ ){
				if(menulist[j] == menuid){
					eachTimeMenuidnum++;
				}
			}
			if(eachTimeMenuidnum == 0){
				menulist[menulistNum] = menuid;
				menulistNum++;
			}
			//淘汰在page中已经存在的button
			var buttonInPage= 0;//大于0说明此次的button在page中已经存在了
			for(var j = 0 ;  j < resultnodes.length;j ++){
				if(resultnodes[j] == Math.floor(nodes[i].id / 10)){
					buttonInPage++;
				}
			}
			if(buttonInPage == 0){
				resultnodes[resultnodestNum] = nodes[i].id;
				resultnodestNum++;
			}
		}
	}
	for(var i=0; i<menulist.length; i++){
		resultnodes[resultnodestNum] = menulist[i];
		resultnodestNum++;
	}
	return resultnodes;
}