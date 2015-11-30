package controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import flexjson.JSONSerializer;
import models.Chusheng;
import models.DatagridJson;
import models.JsonObj;
import models.Organization;
import models.Power;
import models.Role;
import models.User;
import play.mvc.Controller;

public class ChushengCtl extends Controller {
	//列表
	public static void page() {		
		render();
    }
	
	// get.json
	public static void get(int rows,int page,String username, String fullname) {
		if(username==null) {
			username="";
		}
		if(fullname==null) {
			fullname="";
		}
		List<User> users = User.find("username like ? and fullname like ?", "%"+username+"%", "%"+fullname+"%").from(rows*(page-1)).fetch(rows*page);
		int count = User.find("username like ? and fullname like ?", "%"+username+"%", "%"+fullname+"%").fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(users);
		renderJSON(json);
	}
	
	//
	public static void userview_get(int rows,int page,String name, String userid) {
		if(name==null) {
			name="";
		}
		if(userid == null) {
			userid="";
		}
		List<Chusheng> chushenglist = Chusheng.find("name like ? and user.id = ?", "%"+name+"%", userid).from(rows*(page-1)).fetch(rows*page);
		int count = Chusheng.find("name like ? and user.id = ?", "%"+name+"%", userid).fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(chushenglist);
		renderJSON(json);
	}
	
	//查看某户户主的出生证
	public static void userview(String userid) {
		render(userid);
	}
	
	public static void edit(String id, String userid) {
		Chusheng chusheng = new Chusheng();
		if(id!=null) {
			chusheng = Chusheng.findById(id);
			userid = chusheng.user.id;
		}
		render(chusheng,userid);
    }
	
	public static void save(Chusheng chusheng, String userid) {
		if(chusheng.id == null || chusheng.id.equals("")) {
			chusheng.id = null;
		}
		User user = User.findById(userid);
		chusheng.user = user;
		chusheng.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}
}
