// organization
conf.organization = {
		name:'组织机构管理',
		group:'后台管理',
		init:null,
		refresh: null,
		url: null
};
conf.organization.url = {
		page: '/houtai/organization/page',
		edit: '/houtai/organization/edit',
		save: '/houtai/organization/save',
		deleteObj: '/houtai/organization/deleteObj'
};
conf.organization.$pageDom = null;
conf.organization.$datagrid = null;
conf.organization.init = function(){
	var $this = this;
	$('#organization-page-add').click(function(){
		var organization_edit_dlg = $('#organization_edit_dlg');
		if(organization_edit_dlg.size()==0) {
			$('<div id="organization_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#organization_edit_dlg');
		mis_page.dialog({
			title:'新增机构',
			width:400,
			height:300,
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
	conf.organization.$datagrid = $this.$pageDom.find('#organization-page-table');
};
conf.organization._bindClick = function(){
	var $this = this;
	$('#organization_edit_dlg').find('#organization-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#organization_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success') {
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#organization_edit_dlg').dialog("close");
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
	$('#organization_edit_dlg').find('#organization-edit-cancel').click(function(){
		$('#organization_edit_dlg').dialog("close");
	});
};
conf.organization.search = function(){
	 this.$datagrid.datagrid('load', {
		 name: $('#search-organization-page input[name="name"]').eq(0).val(),
		 code: $('#search-organization-page input[name="code"]').eq(0).val()
	 });
};
conf.organization.edit = function(id){
	var $this = this;
	var organization_edit_dlg = $('#organization_edit_dlg');
	if(organization_edit_dlg.size()==0) {
		$('<div id="organization_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#organization_edit_dlg');
	mis_page.dialog({
		title:'编辑机构',
		width:400,
		height:300,
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
}
conf.organization.deleteObj = function(id) {
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
conf.organization.format = function(val, row){
	return '<a href="javascript:conf.organization.edit(\'' + row.id + '\');">编辑</a><span style=\"margin-left:5px;margin-right:5px;\">|</span><a href="javascript:conf.organization.deleteObj(\'' + row.id + '\');">删除</a>';
};

conf.organization.editParentFormatter = function(row) {
	var html = '<div>'+row.name+'</div>';
	return html;
};
