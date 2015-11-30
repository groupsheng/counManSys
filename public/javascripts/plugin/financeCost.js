//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.financeCost = {
	name : '财务开支',
	group : '文书档案',
	init : null,
	refresh : null,
	url : null
};
conf.financeCost.url = {
	page : '/houtai/financeCost/page',
	edit : '/houtai/financeCost/edit',
	save : '/houtai/financeCost/save',
	deleteObj : '/houtai/financeCost/deleteObj'
};
conf.financeCost.$pageDom = null;
conf.financeCost.$datagrid = null;
conf.financeCost.$form = null;
conf.financeCost.editor = null;
conf.financeCost.init = function() {
	var $this = this;
	$('#financeCost-page-add').click(function() {
		var financeCost_edit_dlg = $('#financeCost_edit_dlg');
		if (financeCost_edit_dlg.size() == 0) {
			$('<div id="financeCost_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#financeCost_edit_dlg');
		mis_page.dialog({
			title : '新增任职公告',
			width : 800,
			height : 600,
			modal : true
		});
		$.messager.progress({
			msg : '加载中...'
		});
		$.ajax({
			type : "GET",
			url : $this.url.edit,
			success : function(htm) {
				mis_page.html(htm);

				$.parser.parse(mis_page);
				$this._bindClick();
				$.messager.progress('close');
			},
			error : function() {
				$.messager.progress('close');
				$.messager.alert('提示', '请求失败', 'error');
			}
		});
	});
	conf.financeCost.$datagrid = $this.$pageDom.find('#financeCost-page-table');
};
conf.financeCost._bindClick = function() {
	var $this = this;
	$this.editor = KindEditor.create('textarea[name="financeCost.main_text"]',
			{
				urlType : 'absolute',
				cssPath : '/public/kindeditor/plugins/code/prettify.css',
				uploadJson : '/filemanager/upload_json',
				fileManagerJson : '/filemanager/filemanager_json',
				allowFileManager : true
			});
	$('#financeCost_edit_dlg').find('#financeCost-edit-save').click(function() {
		$.messager.progress({
			msg : '加载中...'
		});
		if (!$this.$form.form('validate')) {
			$.messager.progress('close');
			return;
		}
		$this.editor.sync();
		var data = $('#financeCost_edit_dlg').find('form').serialize();
		$.ajax({
			type : "POST",
			url : $this.url.save,
			data : data,
			success : function(msg) {
				if (msg.type == 'success') {
					$.messager.alert('提示', '添加成功', 'info');
					$('#financeCost_edit_dlg').dialog("close");
				} else {
					$.messager.alert('提示', '添加失败', 'error');
				}
				$.messager.progress('close');
				$this.$datagrid.datagrid('reload');
			},
			error : function() {
				$.messager.progress('close');
				$.messager.alert('提示', '请求失败', 'error');
			}
		});
	});
	$('#financeCost_edit_dlg').find('#financeCost-edit-cancel').click(
			function() {
				$('#financeCost_edit_dlg').dialog("close");
			});
	$this.$form = $('#financeCost_edit_dlg').find('form');
};
conf.financeCost.search = function() {
	this.$datagrid.datagrid('load', {
		title : $('#search-financeCost-page input[name="title"]').eq(0).val(),
	});
};
conf.financeCost.edit = function(id) {
	var $this = this;
	var financeCost_edit_dlg = $('#financeCost_edit_dlg');
	if (financeCost_edit_dlg.size() == 0) {
		$('<div id="financeCost_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#financeCost_edit_dlg');
	mis_page.dialog({
		title : '新增财务公示',
		width : 800,
		height : 600,
		modal : true
	});
	$.messager.progress({
		msg : '加载中...'
	});
	$.ajax({
		type : "POST",
		data : {
			id : id
		},
		url : $this.url.edit,
		success : function(htm) {
			mis_page.html(htm);

			$.parser.parse(mis_page);
			$this._bindClick();
			$.messager.progress('close');
		},
		error : function() {
			$.messager.progress('close');
			$.messager.alert('提示', '请求失败', 'error');
		}
	});
};
conf.financeCost.deleteObj = function(id) {
	var $this = this;
	$.messager.progress({
		msg : '加载中...'
	});
	$.ajax({
		type : "POST",
		data : {
			id : id
		},
		url : $this.url.deleteObj,
		success : function(json) {
			$.messager.progress('close');
			$.messager.alert('提示', json.data, 'info');
			$this.$datagrid.datagrid('reload');
		},
		error : function() {
			$.messager.progress('close');
			$.messager.alert('提示', '删除失败', 'error');
		}
	});
};
conf.financeCost.format = function(val, row) {
	return '<a href="javascript:conf.financeCost.edit(\''
			+ row.id
			+ '\');">编辑</a><span style=\"margin-left:5px;margin-right:5px;\">|</span><a href="javascript:conf.financeCost.deleteObj(\''
			+ row.id + '\');">删除</a>';
};