package controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import flexjson.JSONSerializer;
import models.DatagridJson;
import models.JsonObj;
import models.Organization;
import models.Power;
import play.mvc.Controller;

public class OrganizationCtl extends Controller {
	//列表
	public static void page() {		
		render();
    }
	
	//编辑
	public static void edit(String id) {
		Organization organization = new Organization();
		if(id!=null) {
			organization = Organization.findById(id);
		}
		render(organization);
	}
	
	//删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if(id!=null) {
			Organization organization = Organization.findById(id);
			if(organization!=null) {
				organization.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}
	
	// save.json
	public static void save(Organization organization, String parentId) {
		if(organization.id == null || organization.id.equals("")) {
			organization.id = null;
		}
		Organization parent = null;
		if(parentId!=null) {
			parent = Organization.findById(parentId);
		}
		organization.parent = parent;
		organization.save();
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
		List<Organization> organizations = Organization.find("name like ? and code like ?", "%"+name+"%", "%"+code+"%").from(rows*(page-1)).fetch(rows*page);
		int count = Organization.find("name like ? and code like ?", "%"+name+"%", "%"+code+"%").fetch().size();
		for(Organization organization : organizations) {
			organization.parent = null;
		}
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(organizations);		
		JSONSerializer serializer = new JSONSerializer();
		renderJSON(serializer.include("rows").serialize(json));
	}

	// comboboxjson
	public static void comboboxjson() {
		List<Organization> organizations = Organization.findAll();
		JSONSerializer serializer = new JSONSerializer();
		renderJSON(serializer.serialize(organizations));
	}
}
