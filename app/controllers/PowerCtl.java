package controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import flexjson.JSONSerializer;
import models.DatagridJson;
import models.JsonObj;
import models.Power;
import play.mvc.Controller;

public class PowerCtl extends Controller {
	//列表
	public static void page() {		
		render();
    }
	
	//编辑
	public static void edit(String id) {
		Power power = new Power();
		if(id!=null) {
			power = Power.findById(id);
		}
		render(power);
	}
	
	//删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if(id!=null) {
			Power power = Power.findById(id);
			if(power!=null) {
				power.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}
	
	// save.json
	public static void save(Power power, String parentId) {
		if(power.id == null || power.id.equals("")) {
			power.id = null;
		}
		Power parent = null;
		if(parentId!=null) {
			parent = Power.findById(parentId);
		}
		power.parent = parent;
		power.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}
	
	// get.json
	public static void get(int rows,int page,String name, String code) {
		if(name==null) {
			name="";
		}
		if(code==null) {
			code="";
		}
		List<Power> powers = Power.find("name like ? and code like ?", "%"+name+"%", "%"+code+"%").from(rows*(page-1)).fetch(rows*page);
		int count = Power.find("name like ? and code like ?", "%"+name+"%", "%"+code+"%").fetch().size();
		for(Power p : powers) {
			p.parent = null;
		}
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(powers);		
		JSONSerializer serializer = new JSONSerializer();
		renderJSON(serializer.include("rows").serialize(json));
	}

	// comboboxjson
	public static void comboboxjson() {
		List<Power> powers = Power.findAll();
		JSONSerializer serializer = new JSONSerializer();
		renderJSON(serializer.serialize(powers));
	}
}
