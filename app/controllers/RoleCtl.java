package controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import flexjson.JSONSerializer;
import models.DatagridJson;
import models.JsonObj;
import models.Power;
import models.Role;
import play.mvc.Controller;

public class RoleCtl extends Controller {
	
	//列表
	public static void page() {
		render();
    }
	
	//编辑
	public static void edit(String id) {
		Role role = new Role();
		if(id!=null) {
			role = Role.findById(id);
		}
		render(role);
	}
	
	//删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if(id!=null) {
			Role role = Role.findById(id);
			if(role!=null) {
				role.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}
	
	// save.json
	public static void save(Role role, String powerIds[]) {
		if(role.id == null || role.id.equals("")) {
			role.id = null;
		}
		List<Power> powers = new ArrayList<Power>();
		if(powerIds!=null) {
			for(String id : powerIds) {
				Power p = Power.findById(id);
				powers.add(p);
			}
		}
		role.powers = null;
		role.powers = powers;
		role.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}
	
	// get.json
	public static void get(int rows,int page,String name) {
		if(name==null) {
			name="";
		}
		List<Role> roles = Role.find("name like ?", "%"+name+"%").from(rows*(page-1)).fetch(rows*page);
		int count = Role.find("name like ?", "%"+name+"%").fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(roles);
		JSONSerializer serializer = new JSONSerializer();
		renderJSON(serializer.include("rows").serialize(json));
	}

	// comboboxjson
	public static void comboboxjson(String roleId) {
		List<Power> role_powers = new ArrayList<Power>();
		if(roleId!=null) {
			Role role = Role.findById(roleId);
			if(role!=null) {
				role_powers = role.powers;
			}
		}
		List<Object> json = new ArrayList<Object>();
		//找到根节点下所有的子节点
		List<Power> powers = Power.find("parent_id=null").fetch();
		for(Power power : powers) {
			//默认最多有两级
			List<Power> ps = power.children;
			for(Power p : ps) {
				Map<String, Object> model = new HashMap<String, Object>();
				model.put("group", power.name);
				model.put("id", p.id);
				model.put("value", p.name);
				for(Power pow : role_powers) {
					if(pow.id.equals(p.id)) {
						model.put("selected", true);
						break;
					}
				}
				json.add(model);
			}
		}
		JSONSerializer serializer = new JSONSerializer();
		renderJSON(serializer.serialize(json));
	}
	
}
