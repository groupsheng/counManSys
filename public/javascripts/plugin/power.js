// Power
conf.power = {
		name:'权限管理',
		group:'后台管理',
		init:null,
		refresh: null,
		url: null
};
conf.power.url = {
		page: '/houtai/power/page',
		edit: '/houtai/power/edit',
		save: '/houtai/power/save',
		deleteObj: '/houtai/power/deleteObj'
};
conf.power.$pageDom = null;
conf.power.$datagrid = null;
conf.power.$form = null;
conf.power.init = function(){
	var $this = this;
	$('#power-page-add').click(function(){
		var power_edit_dlg = $('#power_edit_dlg');
		if(power_edit_dlg.size()==0) {
			$('<div id="power_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#power_edit_dlg');
		mis_page.empty();
		mis_page.dialog({
			title:'新增权限',
			width:300,
			height:250
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
	conf.power.$datagrid = $this.$pageDom.find('#power-page-table');
};
conf.power._bindClick = function(){
	var $this = this;
	$('#power_edit_dlg').find('#power-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		if(!$this.$form.form('validate')){
			$.messager.progress('close');
			return;
		}
		var data = $('#power_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success') {
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#power_edit_dlg').dialog("close");
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
	$('#power_edit_dlg').find('#power-edit-cancel').click(function(){
		$('#power_edit_dlg').dialog("close");
	});
	$this.$form = $('#power_edit_dlg').find('form');
};
conf.power.search = function(){
	 this.$datagrid.datagrid('load', {
		 name: $('#search-power-page input[name="name"]').eq(0).val(),
		 code: $('#search-power-page input[name="code"]').eq(0).val()
	 });
};
conf.power.edit = function(id){
	var $this = this;
	var power_edit_dlg = $('#power_edit_dlg');
	if(power_edit_dlg.size()==0) {
		$('<div id="power_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#power_edit_dlg');
	mis_page.empty();
	mis_page.dialog({
		title:'编辑权限',
		width:300,
		height:250
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
}
conf.power.deleteObj = function(id) {
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
conf.power.format = function(val, row){
	return '<a href="javascript:conf.power.edit(\'' + row.id + '\');">编辑</a><span style=\"margin-left:5px;margin-right:5px;\">|</span><a href="javascript:conf.power.deleteObj(\'' + row.id + '\');">删除</a>';
};

conf.power.editParentFormatter = function(row) {
	var html = '<div>'+row.name+'</div>';
	return html;
};
