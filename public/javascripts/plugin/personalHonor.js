//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.personalHonor = {
		name:'个人荣誉',
		group:'荣誉档案',
		init:null,
		refresh: null,
		url: null
};
conf.personalHonor.url = {
		page: '/houtai/personalHonor/page',
		edit: '/houtai/personalHonor/edit',
		save: '/houtai/personalHonor/save',
		deleteObj: '/houtai/personalHonor/deleteObj'
};
conf.personalHonor.$pageDom = null;
conf.personalHonor.$datagrid = null;
conf.personalHonor.$form = null;
conf.personalHonor.editor = null;
conf.personalHonor.init = function(){
	var $this = this;
	$('#personalHonor-page-add').click(function(){
		var personalHonor_edit_dlg = $('#personalHonor_edit_dlg');
		if(personalHonor_edit_dlg.size()==0) {
			$('<div id="personalHonor_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#personalHonor_edit_dlg');
		mis_page.dialog({
			title:'新增个人荣誉',
			width:800,
			height:600,
			modal:true
		});
		$.messager.progress({
			msg:'加载中...'
		});
		$.ajax({
			type: "GET",
			url:$this.url.edit, 
			success: function(htm){
				mis_page.html(htm);
				
				$.parser.parse(mis_page);
				$this._bindClick();
				$.messager.progress('close');
			},
			error:function(){
				$.messager.progress('close');
				$.messager.alert('提示','请求失败','error');
			}
		});
	});
	conf.personalHonor.$datagrid = $this.$pageDom.find('#personalHonor-page-table');
};
conf.personalHonor._bindClick = function(){
	var $this = this;
	$this.editor = KindEditor.create('textarea[name="personalHonor.main_text"]',
			{
				urlType : 'absolute',
				cssPath : '/public/kindeditor/plugins/code/prettify.css',
				uploadJson : '/filemanager/upload_json',
				fileManagerJson : '/filemanager/filemanager_json',
				allowFileManager : true
			});
	$('#personalHonor_edit_dlg').find('#personalHonor-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		if (!$this.$form.form('validate')) {
			$.messager.progress('close');
			return;
		}
		$this.editor.sync();
		var data = $('#personalHonor_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#personalHonor_edit_dlg').dialog("close");
			     } else {
			    	 $.messager.alert('提示','添加失败','error');
			     }
			     $.messager.progress('close');
			     $this.$datagrid.datagrid('reload');
			   },
			   error:function(){
					$.messager.progress('close');
					$.messager.alert('提示','请求失败','error');
			}
		});
	});
	$('#personalHonor_edit_dlg').find('#personalHonor-edit-cancel').click(function(){
		$('#personalHonor_edit_dlg').dialog("close");
	});
	$this.$form = $('#personalHonor_edit_dlg').find('form');
};
conf.personalHonor.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-personalHonor-page input[name="title"]').eq(0).val(),
	 });
};
conf.personalHonor.edit = function(id){
	var $this = this;
	var personalHonor_edit_dlg = $('#personalHonor_edit_dlg');
	if(personalHonor_edit_dlg.size()==0) {
		$('<div id="personalHonor_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#personalHonor_edit_dlg');
	mis_page.dialog({
		title:'新增个人荣誉',
		width:800,
		height:600,
		modal:true
	});
	$.messager.progress({
		msg:'加载中...'
	});
	$.ajax({
		type: "POST",
		data: {id:id},
		url:$this.url.edit, 
		success: function(htm){
			mis_page.html(htm);
			$.parser.parse(mis_page);
			$this._bindClick();
			$.messager.progress('close');
		},
		error:function(){
			$.messager.progress('close');
			$.messager.alert('提示','请求失败','error');
		}
	});
};
conf.personalHonor.deleteObj = function(id) {
	var $this = this;
	$.messager.progress({
		msg:'加载中...'
	});
	$.ajax({
		type: "POST",
		data: {id:id},
		url:$this.url.deleteObj, 
		success: function(json){
			$.messager.progress('close');
			$.messager.alert('提示',json.data,'info');
			$this.$datagrid.datagrid('reload');
		},
		error:function(){
			$.messager.progress('close');
			$.messager.alert('提示','删除失败','error');
		}
	});
};
conf.personalHonor.format = function(val, row){
	return '<a href="javascript:conf.personalHonor.edit(\'' + row.id + '\');">编辑</a><span style=\"margin-left:5px;margin-right:5px;\">|</span><a href="javascript:conf.personalHonor.deleteObj(\'' + row.id + '\');">删除</a>';
};