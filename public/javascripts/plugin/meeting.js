//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.meeting = {
	name : '会议',
	group : '声像档案',
	init : null,
	refresh : null,
	url : null
};
conf.meeting.url = {
	page : '/houtai/meeting/page',
	edit : '/houtai/meeting/edit',
	save : '/houtai/meeting/save',
	deleteObj : '/houtai/meeting/deleteObj'
};
conf.meeting.$pageDom = null;
conf.meeting.$datagrid = null;
conf.meeting.editor = null;
conf.meeting.$form = null;
conf.meeting.init = function() {
	var $this = this;
	$('#meeting-page-add').click(function() {
		var meeting_edit_dlg = $('#meeting_edit_dlg');
		if (meeting_edit_dlg.size() == 0) {
			$('<div id="meeting_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#meeting_edit_dlg');
		mis_page.dialog({
			title : '新增会议',
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
	conf.meeting.$datagrid = $this.$pageDom.find('#meeting-page-table');
};
conf.meeting._bindClick = function() {
	var $this = this;
	$this.editor = KindEditor.create('textarea[name="meeting.main_text"]', {
		urlType : 'absolute',
		cssPath : '/public/kindeditor/plugins/code/prettify.css',
		uploadJson : '/filemanager/upload_json',
		fileManagerJson : '/filemanager/filemanager_json',
		allowFileManager : true
	});
	$('#meeting_edit_dlg').find('#meeting-edit-save').click(function() {
		$.messager.progress({
			msg : '加载中...'
		});
		if (!$this.$form.form('validate')) {
			$.messager.progress('close');
			return;
		}
		$this.editor.sync();
		var data = $('#meeting_edit_dlg').find('form').serialize();
		$.ajax({
			type : "POST",
			url : $this.url.save,
			data : data,
			success : function(msg) {
				if (msg.type == 'success') {
					$.messager.alert('提示', '添加成功', 'info');
					$('#meeting_edit_dlg').dialog("close");
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
	$('#meeting_edit_dlg').find('#meeting-edit-cancel').click(function() {
		$('#meeting_edit_dlg').dialog("close");
	});
	$this.$form = $('#meeting_edit_dlg').find('form');
};
conf.meeting.search = function() {
	this.$datagrid.datagrid('load', {
		title : $('#search-meeting-page input[name="title"]').eq(0).val(),
	});
};
conf.meeting.edit = function(id) {
	var $this = this;
	var meeting_edit_dlg = $('#meeting_edit_dlg');
	if (meeting_edit_dlg.size() == 0) {
		$('<div id="meeting_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#meeting_edit_dlg');
	mis_page.dialog({
		title : '新增会议',
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
conf.meeting.deleteObj = function(id) {
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
conf.meeting.format = function(val, row) {
	return '<a href="javascript:conf.meeting.edit(\''
			+ row.id
			+ '\');">编辑</a><span style=\"margin-left:5px;margin-right:5px;\">|</span><a href="javascript:conf.meeting.deleteObj(\''
			+ row.id + '\');">删除</a>';
};