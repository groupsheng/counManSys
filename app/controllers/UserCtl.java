package controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import flexjson.JSONSerializer;
import models.DatagridJson;
import models.JsonObj;
import models.Organization;
import models.Power;
import models.Role;
import models.User;
import play.mvc.Controller;

public class UserCtl extends Controller {
	//列表
	public static void page() {		
		render();
    }
	
	//编辑
	public static void edit(String id) {
		User user = new User();
		if(id!=null) {
			user = User.findById(id);
		}
		render(user);
	}
	
	//删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if(id!=null) {
			User user = User.findById(id);
			if(user!=null) {
				user.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}
	
	// save.json
	public static void save(User user, String roleIds[],String orgId) {
		if(user.id == null || user.id.equals("")) {
			user.id = null;
		}
		List<Role> roles = new ArrayList<Role>();
		if(roleIds!=null) {
			for(String id : roleIds) {
				Role r = Role.findById(id);
				roles.add(r);
			}
		}
		user.roles = null;
		user.roles = roles;
		if(orgId!=null) {
			Organization org = Organization.findById(orgId);
			if(org!=null) {
				user.organization = org;
			}
		}
		user.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
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
	
	// comboboxjson
	public static void comboboxjson(String userId) {
		List<Role> user_roles = new ArrayList<Role>();
		if(userId!=null) {
			User user = User.findById(userId);
			if(user!=null) {
				user_roles = user.roles;
			}
		}
		List<Object> json = new ArrayList<Object>();
		
		List<Role> roles = Role.findAll();
		for(Role role : roles) {
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("id", role.id);
			model.put("value", role.name);
			for(Role r : user_roles) {
				if(r.id.equals(role.id)) {
					model.put("selected", true);
					break;
				}
			}
			json.add(model);
		}
		JSONSerializer serializer = new JSONSerializer();
		renderJSON(serializer.serialize(json));
	}
	
	public static void org_comboboxjson(){
		List<Organization> orgs = Organization.findAll();
		JSONSerializer serializer = new JSONSerializer();
		renderJSON(serializer.serialize(orgs));
	}
}
