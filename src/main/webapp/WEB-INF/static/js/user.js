//格式化日期栏
function dateFormatter(value) {
	var date = new Date(value);
	var year = date.getFullYear().toString();
	var month = (date.getMonth() + 1);
	var day = date.getDate().toString();
	var hour = date.getHours().toString();
	var minutes = date.getMinutes().toString();
	var seconds = date.getSeconds().toString();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":"
			+ seconds;
}
//格式化角色栏
function toRole(value) {
	var role = "";
	if (value == 3) {
		role = "超级管理员";
	} else if (value == 2) {
		role = "管理员";
	} else {
		role = "普通用户";
	}
	return role;
}
//格式化地址栏
function toAddress(value) {
	var city = "其他,北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,"
			+ "河南省,湖北省,湖南省,广东省,海南省,广西壮族自治区,甘肃省,陕西省,新疆维吾尔自治区,青海省,宁夏回族自治区,重庆市,四川省,"
			+ "贵州省,云南省,西藏自治区,台湾省,澳门特别行政区,香港特别行政区,海外";
	var citys = city.split(',');
	return citys[value];
}
//格式化操作栏
function opera(value, row, index) {
	return '<a href="#" style="color:rgb(0,125,220)" onclick="openEditUserDialog('
			+ row.userId
			+ ',\''
			+ row.userName
			+ ' \','
			+ row.userCode
			+ ','
			+ row.userRole
			+ ',\''
			+ row.userCompany
			+ '\','
			+ row.userAddress
			+ ','
			+ row.userCreateTime
			+ ')">编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;'
			+ '<a href="#" style="color:red" onclick="deleteOneUser('
			+ row.userId + ',\'  ' + row.userName + ' \')">删除</a>';
}
//打开添加用户的窗口
function openAddUserDialog() {
	$('#add_dialog_userName').textbox('setValue', '');
	$('#add_dialog_userRole').combobox('setValue', 1);
	$('#add_dialog_userPsd').textbox('setValue', '');
	$('#readd_dialog_userPsd').textbox('setValue', '');
	$('#add_dialog_userCompany').textbox('setValue', '');
	$('#add_dialog_userAddress').combobox('setValue', 0);
	$('#add_dlg').dialog('open');
}
//打开编辑用户的窗口
function openEditUserDialog(userId, userName, userCode, userRole, userCompany,
		userAddress, userCreateTime) {
	$('#dialog_userId').textbox('textbox').attr('disabled', true); //设置输入框为禁用
	$('#dialog_userName').textbox('textbox').attr('disabled', true); //设置输入框为禁用
	$('#dialog_userCode').textbox('textbox').attr('disabled', true); //设置输入框为禁用
	$('#dialog_userRole').textbox('textbox').attr('disabled', true); //设置输入框为禁用
	$('#dialog_userCreateTime').textbox('textbox').attr('disabled', true); //设置输入框为禁用

	$('#dialog_userId').textbox('setValue', userId);
	$('#dialog_userName').textbox('setValue', userName);
	$('#dialog_userCode').textbox('setValue', userCode);
	$('#dialog_userRole').textbox('setValue', toRole(userRole));
	$('#dialog_userCompany').textbox('setValue', userCompany);
	$('#dialog_userAddress').combobox('setValue', userAddress);
	$('#dialog_userCreateTime').textbox('setValue',dateFormatter(userCreateTime));
	$('#dlg').dialog('open');
}
//删除单个角色  
function deleteOneUser(userId, userName) {
	$.messager.confirm('删除', '您确认想要删除' + userName + '用户吗？', function(r) {
		if (r) {
			$.ajax({
				type : "POST",
				url : "deleteOneUser.json",
				data : {
					"userId" : userId
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
function deleteListUser() {
	var ids = [];
	var rows = $('#dg').datagrid('getSelections');
	for (var i = 0; i < rows.length; i++) {
		ids.push(rows[i].userId);
	}
	var idss = ids.join(',');
	$.messager.confirm('删除', '您确认想要删除"' + idss + '"这' + rows.length + '条用户吗？',
			function(r) {
				if (r) {
					$.ajax({
						type : "POST",
						url : "deleteListUser.json",
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
function addUser() {
	var userPsd = $('#add_dialog_userPsd').textbox('getValue');
	var reuserPsd = $('#readd_dialog_userPsd').textbox('getValue');
	if (userPsd == reuserPsd) {
		$('#add_dlg_f').form('submit', {
			url : "insertUser.json",
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
	} else {
		$.messager.alert('警告', "两次密码不一致！");
	}
}
//编辑用户
function editUser() {
	$('#dlg_f').form('submit', {
		url : "updateUser.json",
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
//通过用户名 或者编号所搜
function searcher(value, name) {
	value = value.replace(/\s+/g, "");
	$('#dg').datagrid('load', {
		"value" : value,
		"name" : name,
	});
}
//通过地址搜索
function searchByAddress() {
	var address = $('#searchByAddress').combobox('getValue');
	if (address == null || address == '') {
		address = '0';
	}
	$('#dg').datagrid('load', {
		"value" : address,
		"name" : "userAdress",
	});
}
//通过角色搜索
function searchByRole() {
	var role = $('#searchByRole').combobox('getValue');
	if (role == null || role == '') {
		role = '1';
	}
	$('#dg').datagrid('load', {
		"value" : role,
		"name" : "userRole",
	});
}
//重置数据
function reloaddata() {
	$('#dg').datagrid('load', {
		"value" : '',
		"name" : '',
	});
}
// 打印函數
function CreateFormPage(strPrintName, printDatagrid) {// strPrintName 打印任务名   printDatagrid 要打印的datagrid
	var tableString = '<table cellspacing="0" class="pb">';
	var frozenColumns = printDatagrid.datagrid("options").frozenColumns; // 得到frozenColumns对象
	var columns = printDatagrid.datagrid("options").columns; // 得到columns对象
	var nameList = '';
	// 载入title
	if (typeof columns != 'undefined' && columns != '') {
		$(columns)
				.each(
						function(index) {
							tableString += '\n<tr>';
							if (typeof frozenColumns != 'undefined'
									&& typeof frozenColumns[index] != 'undefined') {
								for (var i = 0; i < frozenColumns[index].length; ++i) {
									if (!frozenColumns[index][i].hidden) {
										tableString += '\n<th width="'
												+ frozenColumns[index][i].width
												+ '"';
										if (typeof frozenColumns[index][i].rowspan != 'undefined'
												&& frozenColumns[index][i].rowspan > 1) {
											tableString += ' rowspan="'
													+ frozenColumns[index][i].rowspan
													+ '"';
										}
										if (typeof frozenColumns[index][i].colspan != 'undefined'
												&& frozenColumns[index][i].colspan > 1) {
											tableString += ' colspan="'
													+ frozenColumns[index][i].colspan
													+ '"';
										}
										if (typeof frozenColumns[index][i].field != 'undefined'
												&& frozenColumns[index][i].field != '') {
											nameList += ',{"f":"'
													+ frozenColumns[index][i].field
													+ '", "a":"'
													+ frozenColumns[index][i].align
													+ '"}';
										}
										tableString += '>'
												+ frozenColumns[0][i].title
												+ '</th>';
									}
								}
							}
							for (var i = 0; i < columns[index].length; ++i) {
								if (!columns[index][i].hidden) {
									tableString += '\n<th width="'
											+ columns[index][i].width + '"';
									if (typeof columns[index][i].rowspan != 'undefined'
											&& columns[index][i].rowspan > 1) {
										tableString += ' rowspan="'
												+ columns[index][i].rowspan
												+ '"';
									}
									if (typeof columns[index][i].colspan != 'undefined'
											&& columns[index][i].colspan > 1) {
										tableString += ' colspan="'
												+ columns[index][i].colspan
												+ '"';
									}
									if (typeof columns[index][i].field != 'undefined'
											&& columns[index][i].field != '') {
										nameList += ',{"f":"'
												+ columns[index][i].field
												+ '", "a":"'
												+ columns[index][i].align
												+ '"}';
									}
									tableString += '>'
											+ columns[index][i].title + '</th>';
								}
							}
							tableString += '\n</tr>';
						});
	}
	// 载入内容
	var rows = printDatagrid.datagrid("getRows"); // 这段代码是获取当前页的所有行
	var nl = eval('([' + nameList.substring(1) + '])');
	for (var i = 0; i < rows.length; ++i) {
		tableString += '\n<tr>';
		$(nl).each(function(j) {
			var e = nl[j].f.lastIndexOf('_0');

			tableString += '\n<td';
			//調整格式
			if (nl[j].a != 'undefined' && nl[j].a != '') {
				tableString += ' style="text-align:' + nl[j].a + ';"';
			}
			tableString += '>';

			if (e + 2 == nl[j].f.length) {
				tableString += rows[i][nl[j].f.substring(0, e)];
			} else { //======================自己添加的判斷===========================
				if (nl[j].f == 'userCreateTime') {
					tableString += dateFormatter(rows[i][nl[j].f]);
				} else if (nl[j].f == 'userRole') {
					tableString += toRole(rows[i][nl[j].f]);
				} else if (nl[j].f == 'userAddress') {
					tableString += toAddress(rows[i][nl[j].f]);
				} else if (nl[j].f == 'opera') {
					tableString += '';
				} else {
					tableString += rows[i][nl[j].f];
				} //======================自己添加的判斷===========================
			}
			tableString += '</td>';
		});
		tableString += '\n</tr>';
	}

	sessionStorage.setItem("sent", tableString);
	tableString += '\n</table>';
	window
			.open(
					"../../print.page",
					strPrintName,
					"location:No;status:No;help:No;dialogWidth:800px;dialogHeight:600px;scroll:auto;");
}
