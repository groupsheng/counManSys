//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.chusheng = {
		name:'出生证',
		group:'户籍证明',
		init:null,
		refresh: null,
		url: null
};
conf.chusheng.url = {
		page: '/houtai/chusheng/page',
		userview: '/houtai/chusheng/userview',
		edit: '/houtai/chusheng/edit',
		save: '/houtai/chusheng/save'
};
conf.chusheng.$pageDom = null;
conf.chusheng.$datagrid = null;//page层的datagrid
conf.chusheng.$chusheng_datagrid = null; //dialog层的datagrid
conf.chusheng.init = function(){
	var $this = this;
	$this.$datagrid = $this.$pageDom.find('#chusheng-page-table');
};

conf.chusheng.search = function(){
	 this.$datagrid.datagrid('load', {
		 username: $('#search-chusheng-page input[name="username"]').eq(0).val(),
		 fullname: $('#search-chusheng-page input[name="fullname"]').eq(0).val()
	 });
};
conf.chusheng.userview_search = function(){
	 this.$chusheng_datagrid.datagrid('load', {
		 userid: $('#search-chusheng-dlg input[name="userid"]').eq(0).val(),
		 name: $('#search-chusheng-dlg input[name="name"]').eq(0).val()
	 });
};
conf.chusheng.format = function(val, row){
	return '<a href="javascript:conf.chusheng.userviewDialog(\'' + row.id + '\',\'' + row.fullname + '\');">查看</a>';
};
conf.chusheng.userview_format = function(val, row) {
	return '<a href="javascript:conf.chusheng.edit(\'' + row.id + '\');">编辑</a>';
};
conf.chusheng.edit = function(id){
	var $this = this;
	$this.openDialog(
			{id:id},
			'编辑出生证',
			'chusheng_edit_dlg',
			$this.url.edit,
			500,
			400,
			null,
			function(){
				$this._bindClick();
			}
	);
};
//打开某户户主的所有出生证
conf.chusheng.userviewDialog = function(id, name) {
	var $this = this;
	$this.openDialog(
			{userid:id}, 
			name+'户主的出生证',
			'chusheng_userview_dlg',
			$this.url.userview,
			900,
			600,
			[{
				text:'新增',
				iconCls: 'icon-add',
				handler:function(){
					$this.openDialog(
						{userid:id},
						'新增出生证',
						'chusheng_edit_dlg',
						$this.url.edit,
						500,
						400,
						null,
						function(){
							$this._bindClick();
						}
					);
				}
			},{
				text:'关闭',
				iconCls: 'icon-cancel',
				handler:function(){
					$('#chusheng_userview_dlg').dialog("close");
				}
			}],
			function(){
				$this.$chusheng_datagrid = $('#chusheng-dlg-table');
			}
	);
};
conf.chusheng._bindClick = function(){
	var $this = this;
	$('#chusheng_edit_dlg').find('#chusheng-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		if(!$this.$form.form('validate')){
			$.messager.progress('close');
			return;
		}
		var data = $('#chusheng_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success') {
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#chusheng_edit_dlg').dialog("close");
			     } else {
			    	 $.messager.alert('提示','添加失败','error');
			     }
			     $.messager.progress('close');
			     $this.$chusheng_datagrid.datagrid('reload');
			   },
			   error:function(){
					$.messager.progress('close');
					$.messager.alert('提示','请求失败','error');
			}
		});
	});
	$('#chusheng_edit_dlg').find('#chusheng-edit-cancel').click(function(){
		$('#chusheng_edit_dlg').dialog("close");
	});
	$this.$form = $('#chusheng_edit_dlg').find('form');
};
conf.chusheng.openDialog = function(data, title, dlgId, url, width, height, buttons, callback){
	var $this = this;
	var dlg = $('#'+dlgId);
	if(dlg.size()==0) {
		$('<div id="'+dlgId+'"></div>').appendTo('body');
	}
	var mis_page = $('#'+dlgId);
	mis_page.empty();
	mis_page.dialog({
		title:title,
		width:width ? width : 530,
		height:height ? height : 250,
		buttons:buttons
	});
	$.messager.progress({
		msg:'加载中...'
	});
	$.ajax({
		type: "GET",
		url: url,
		data: data,
		success: function(htm){
			mis_page.html(htm);
			$.parser.parse(mis_page);
			callback(mis_page);
			$.messager.progress('close');
		},
		error:function(){
			$.messager.progress('close');
			$.messager.alert('提示','请求失败','error');
		}
	});
};

