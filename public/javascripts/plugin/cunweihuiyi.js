//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.cunweihuiyi = {
	name : '村委会议',
	group : '文书档案',
	init : null,
	refresh : null,
	url : null
};
conf.cunweihuiyi.url = {
	page : '/houtai/cunweihuiyi/page',
	edit : '/houtai/cunweihuiyi/edit',
	save : '/houtai/cunweihuiyi/save',
	deleteObj : '/houtai/cunweihuiyi/deleteObj'
};
conf.cunweihuiyi.$pageDom = null;
conf.cunweihuiyi.$datagrid = null;
conf.cunweihuiyi.$form = null;
conf.cunweihuiyi.editor = null;
conf.cunweihuiyi.init = function() {
	var $this = this;
	$('#cunweihuiyi-page-add').click(function() {
		var cunweihuiyi_edit_dlg = $('#cunweihuiyi_edit_dlg');
		if (cunweihuiyi_edit_dlg.size() == 0) {
			$('<div id="cunweihuiyi_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#cunweihuiyi_edit_dlg');
		mis_page.dialog({
			title : '新增村委会议',
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
	conf.cunweihuiyi.$datagrid = $this.$pageDom.find('#cunweihuiyi-page-table');
};
conf.cunweihuiyi._bindClick = function() {
	var $this = this;
	$this.editor = KindEditor.create('textarea[name="cunweihuiyi.main_text"]',
			{
				urlType : 'absolute',
				cssPath : '/public/kindeditor/plugins/code/prettify.css',
				uploadJson : '/filemanager/upload_json',
				fileManagerJson : '/filemanager/filemanager_json',
				allowFileManager : true
			});
	$('#cunweihuiyi_edit_dlg').find('#cunweihuiyi-edit-save').click(function() {
		$.messager.progress({
			msg : '加载中...'
		});
		if (!$this.$form.form('validate')) {
			$.messager.progress('close');
			return;
		}

		$this.editor.sync();
		var data = $('#cunweihuiyi_edit_dlg').find('form').serialize();
		$.ajax({
			type : "POST",
			url : $this.url.save,
			data : data,
			success : function(msg) {
				if (msg.type == 'success') {
					$.messager.alert('提示', '添加成功', 'info');
					$('#cunweihuiyi_edit_dlg').dialog("close");
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
	$('#cunweihuiyi_edit_dlg').find('#cunweihuiyi-edit-cancel').click(
			function() {
				$('#cunweihuiyi_edit_dlg').dialog("close");
			});
	$this.$form = $('#cunweihuiyi_edit_dlg').find('form');
};
conf.cunweihuiyi.search = function() {
	this.$datagrid.datagrid('load', {
		meeting_title : $(
				'#search-cunweihuiyi-page input[name="meeting_title"]').eq(0)
				.val(),
	});
};
conf.cunweihuiyi.edit = function(id) {
	var $this = this;
	var cunweihuiyi_edit_dlg = $('#cunweihuiyi_edit_dlg');
	if (cunweihuiyi_edit_dlg.size() == 0) {
		$('<div id="cunweihuiyi_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#cunweihuiyi_edit_dlg');
	mis_page.dialog({
		title : '编辑会议',
		width : 800,
		height : 500,
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
conf.cunweihuiyi.deleteObj = function(id) {
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
conf.cunweihuiyi.format = function(val, row) {
	return '<a href="javascript:conf.cunweihuiyi.edit(\''
			+ row.id
			+ '\');">编辑</a><span style=\"margin-left:5px;margin-right:5px;\">|</span><a href="javascript:conf.cunweihuiyi.deleteObj(\''
			+ row.id + '\');">删除</a>';
};