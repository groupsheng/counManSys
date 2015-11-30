/**
 * 
 */
package controllers;

import java.util.List;

import models.CunRongCunMao;
import models.DatagridJson;
import models.Gongzikaizhi;
import models.GroupHonor;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 * 
 */
public class GroupHonorCtl extends Controller {

	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		GroupHonor groupHonor = new GroupHonor();
		if (id != null) {
			groupHonor = GroupHonor.findById(id);
		}
		render(groupHonor);
	}

	// 删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if (id != null) {
			GroupHonor groupHonor = GroupHonor.findById(id);
			if (groupHonor != null) {
				groupHonor.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}

	// save.json
	public static void save(GroupHonor groupHonor) {
		if (groupHonor.id == null || groupHonor.id.equals("")) {
			groupHonor.id = null;
		}
		groupHonor.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}

	// get.json
	public static void get(int rows, int page, String title) {
		if (title == null) {
			title = "";
		}
		List<GroupHonor> groupHonors = GroupHonor
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = GroupHonor.find("title like ? ", "%" + title + "%").fetch()
				.size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(groupHonors);
		renderJSON(json);
	}

}
