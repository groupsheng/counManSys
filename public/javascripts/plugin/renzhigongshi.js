//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.renzhigongshi = {
	name : '任职公示',
	group : '文书档案',
	init : null,
	refresh : null,
	url : null
};
conf.renzhigongshi.url = {
	page : '/houtai/renzhigongshi/page',
	edit : '/houtai/renzhigongshi/edit',
	save : '/houtai/renzhigongshi/save',
	deleteObj : '/houtai/renzhigongshi/deleteObj'
};
conf.renzhigongshi.$pageDom = null;
conf.renzhigongshi.$datagrid = null;
conf.renzhigongshi.$form = null;
conf.renzhigongshi.editor = null;
conf.renzhigongshi.init = function() {
	var $this = this;
	$('#renzhigongshi-page-add').click(function() {
		var renzhigongshi_edit_dlg = $('#renzhigongshi_edit_dlg');
		if (renzhigongshi_edit_dlg.size() == 0) {
			$('<div id="renzhigongshi_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#renzhigongshi_edit_dlg');
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
	conf.renzhigongshi.$datagrid = $this.$pageDom
			.find('#renzhigongshi-page-table');
};
conf.renzhigongshi._bindClick = function() {
	var $this = this;
	$this.editor = KindEditor.create(
			'textarea[name="renzhigongshi.main_text"]', {
				urlType : 'absolute',
				cssPath : '/public/kindeditor/plugins/code/prettify.css',
				uploadJson : '/filemanager/upload_json',
				fileManagerJson : '/filemanager/filemanager_json',
				allowFileManager : true
			});
	$('#renzhigongshi_edit_dlg').find('#renzhigongshi-edit-save').click(
			function() {
				$.messager.progress({
					msg : '加载中...'
				});
				if (!$this.$form.form('validate')) {
					$.messager.progress('close');
					return;
				}
				$this.editor.sync();
				var data = $('#renzhigongshi_edit_dlg').find('form')
						.serialize();
				$.ajax({
					type : "POST",
					url : $this.url.save,
					data : data,
					success : function(msg) {
						if (msg.type == 'success') {
							$.messager.alert('提示', '添加成功', 'info');
							$('#renzhigongshi_edit_dlg').dialog("close");
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
	$('#renzhigongshi_edit_dlg').find('#renzhigongshi-edit-cancel').click(
			function() {
				$('#renzhigongshi_edit_dlg').dialog("close");
			});
	$this.$form = $('#renzhigongshi_edit_dlg').find('form');
};
conf.renzhigongshi.search = function() {
	this.$datagrid.datagrid('load', {
		renzhigongshi_title : $(
				'#search-renzhigongshi-page input[name="renzhigongshi_title"]')
				.eq(0).val(),
	});
};
conf.renzhigongshi.edit = function(id) {
	var $this = this;
	var renzhigongshi_edit_dlg = $('#renzhigongshi_edit_dlg');
	if (renzhigongshi_edit_dlg.size() == 0) {
		$('<div id="renzhigongshi_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#renzhigongshi_edit_dlg');
	mis_page.dialog({
		title : '新增用户',
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
}
conf.renzhigongshi.deleteObj = function(id) {
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
conf.renzhigongshi.format = function(val, row) {
	return '<a href="javascript:conf.renzhigongshi.edit(\''
			+ row.id
			+ '\');">编辑</a><span style=\"margin-left:5px;margin-right:5px;\">|</span><a href="javascript:conf.renzhigongshi.deleteObj(\''
			+ row.id + '\');">删除</a>';
};