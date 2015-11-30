$.extend($.fn.datagrid.defaults, {
	idField: "id",
	resizeHandle: "both",
	resizable:true,
	fit: true,
	striped: true,
	multiSort: true,
	fitColumns: true,
	autoRowHeight: true,
	nowrap: true,
	rownumbers: true,
	checkOnSelect: false,
	selectOnCheck: false,
	singleSelect: true,
	ctrlSelect: true,
	pagination: true,
	pageSize: 20,
	pageList: [
			10, 20, 30, 40, 50, 100
	]
});
$.extend($.fn.dialog.defaults, {
	resizable:true,
	width:700,
	height:500,
	modal:true
});

$.extend($.fn.validatebox.defaults.rules, {
	password: {
		validator: function (value, param) {
			return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
		},
		message: '密码由字母和数字组成，至少6位'
	},
	qq: {
		validator: function (value, param) {
			return /^[1-9]\d{4,10}$/.test(value);
		},
		message: 'QQ号码不正确'
	},
	msn: {
		validator: function (value, param) {
			return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
		},
		message: 'MSN号码不正确'
	},
	mobile: {
		validator: function (value, param) {
			return /^(13|15|18|17)\d{9}$/i.test(value);
		},
		message: '手机号码不正确'
	},
	phone: {
		validator: function (value, param) {
			return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
		},
		message: '电话号码不正确'
	},
	loginName: {
		validator: function (value, param) {
			return /^[\u0391-\uFFE5\w]+$/.test(value);
		},
		message: '登录名称只允许汉字、英文字母、数字及下划线'
	},
	idcard: {
		validator: function (value, param) {
			return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
		},
		message: '请输入正确的身份证号码'
	},
	name: {
		validator: function (value, param) {
			return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
		},
		message: '请输入中文或英文'
	},
	trim: {
		validator: function (value, param) {
			return value.indexOf(" ") != 0 && value.lastIndexOf(" ") != value.length - 1;
		},
		message: "前后不能有空格"
	},
	nullvalue: {
		validator: function (value, param) {
			if (value) {
				var $value = $(this).next("input[type='hidden']");
				return $value.length > 0 && $value.val();
			} else {
				return true;
			}
		},
		message: "指定引用不存在"
	},
	specialChar: {
		validator: function (value) {
			var filterString = "?`~!@#$%^&*=！￥……";
			for (var i = 0, len = filterString.length; i < len; i++) {
				if (value.indexOf(filterString.charAt(i)) != -1) {
					return false;
				}
			}
			return true;
		},
		message: '不能含有非法字符串'
	},
	notNull: {
		validator: function (value) {
			if (value.replace(/(^\s*)|(\s*$)/g, "") === "") {
				return false;
			}
			return true;
		},
		message: '不能全是空格'
	},
	number: {
		validator: function (value) {
			return /^[0-9]*$/i.test(value);
		},
		message: '只能输入数字'
	}
});

/**
配置
*/
var conf = {};
conf.getPlugin = function(tab) {
	for(var plugin in conf) {
		if(conf[plugin].name == tab) {
			return conf[plugin];
		}
	}
	return null;
};