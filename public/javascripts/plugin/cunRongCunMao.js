//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.cunRongCunMao = {
	name : '村容村貌',
	group : '声像档案',
	init : null,
	refresh : null,
	url : null
};
conf.cunRongCunMao.url = {
	page : '/houtai/cunRongCunMao/page',
	edit : '/houtai/cunRongCunMao/edit',
	save : '/houtai/cunRongCunMao/save',
	deleteObj : '/houtai/cunRongCunMao/deleteObj'
};
conf.cunRongCunMao.$pageDom = null;
conf.cunRongCunMao.$datagrid = null;
conf.cunRongCunMao.editor = null;
conf.cunRongCunMao.$form = null;
conf.cunRongCunMao.init = function() {
	var $this = this;
	$('#cunRongCunMao-page-add').click(function() {
		var cunRongCunMao_edit_dlg = $('#cunRongCunMao_edit_dlg');
		if (cunRongCunMao_edit_dlg.size() == 0) {
			$('<div id="cunRongCunMao_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#cunRongCunMao_edit_dlg');
		mis_page.dialog({
			title : '新增村容村貌',
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
	conf.cunRongCunMao.$datagrid = $this.$pageDom
			.find('#cunRongCunMao-page-table');
};
conf.cunRongCunMao._bindClick = function() {
	var $this = this;
	$this.editor = KindEditor.create(
			'textarea[name="cunRongCunMao.main_text"]', {
				urlType : 'absolute',
				cssPath : '/public/kindeditor/plugins/code/prettify.css',
				uploadJson : '/filemanager/upload_json',
				fileManagerJson : '/filemanager/filemanager_json',
				allowFileManager : true
			});
	$('#cunRongCunMao_edit_dlg').find('#cunRongCunMao-edit-save').click(
			function() {
				$.messager.progress({
					msg : '加载中...'
				});
				if (!$this.$form.form('validate')) {
					$.messager.progress('close');
					return;
				}
				$this.editor.sync();
				var data = $('#cunRongCunMao_edit_dlg').find('form')
						.serialize();
				$.ajax({
					type : "POST",
					url : $this.url.save,
					data : data,
					success : function(msg) {
						if (msg.type == 'success') {
							$.messager.alert('提示', '添加成功', 'info');
							$('#cunRongCunMao_edit_dlg').dialog("close");
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
	$('#cunRongCunMao_edit_dlg').find('#cunRongCunMao-edit-cancel').click(
			function() {
				$('#cunRongCunMao_edit_dlg').dialog("close");
			});
	$this.$form = $('#cunRongCunMao_edit_dlg').find('form');
};
conf.cunRongCunMao.search = function() {
	this.$datagrid.datagrid('load',
			{
				title : $('#search-cunRongCunMao-page input[name="title"]').eq(
						0).val(),
			});
};
conf.cunRongCunMao.edit = function(id) {
	var $this = this;
	var cunRongCunMao_edit_dlg = $('#cunRongCunMao_edit_dlg');
	if (cunRongCunMao_edit_dlg.size() == 0) {
		$('<div id="cunRongCunMao_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#cunRongCunMao_edit_dlg');
	mis_page.dialog({
		title : '新增村容村貌',
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
conf.cunRongCunMao.deleteObj = function(id) {
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
conf.cunRongCunMao.format = function(val, row) {
	return '<a href="javascript:conf.cunRongCunMao.edit(\''
			+ row.id
			+ '\');">编辑</a><span style=\"margin-left:5px;margin-right:5px;\">|</span><a href="javascript:conf.cunRongCunMao.deleteObj(\''
			+ row.id + '\');">删除</a>';
};