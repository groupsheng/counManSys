/**
 * 
 */
package controllers;

import java.util.List;

import models.Activity;
import models.Butiekaizhi;
import models.DatagridJson;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 * 
 */
public class ActivityCtl extends Controller {
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		Activity activity = new Activity();
		if (id != null) {
			activity = activity.findById(id);
		}
		render(activity);
	}

	// 删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if (id != null) {
			Activity activity = Activity.findById(id);
			if (activity != null) {
				activity.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}

	// save.json
	public static void save(Activity activity) {
		if (activity.id == null || activity.id.equals("")) {
			activity.id = null;
		}
		activity.save();
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
		List<Activity> activities = Activity
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Activity.find("title like ? ", "%" + title + "%").fetch()
				.size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(activities);
		renderJSON(json);
	}

}
