/**
 * 
 */
package controllers;

import java.util.List;

import play.mvc.Controller;

import models.DatagridJson;
import models.Gongzikaizhi;
import models.Jitiliyi;
import models.JsonObj;
import models.FinanceCost;

/**
 * @author Coffee
 * 
 */
public class GongzikaizhiCtl extends Controller {

	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		Gongzikaizhi gongzikaizhi = new Gongzikaizhi();
		if (id != null) {
			gongzikaizhi = Gongzikaizhi.findById(id);
		}
		render(gongzikaizhi);
	}

	// 删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if (id != null) {
			Gongzikaizhi gongzikaizhi = Gongzikaizhi.findById(id);
			if (gongzikaizhi != null) {
				gongzikaizhi.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}

	// save.json
	public static void save(Gongzikaizhi gongzikaizhi) {
		if (gongzikaizhi.id == null || gongzikaizhi.id.equals("")) {
			gongzikaizhi.id = null;
		}
		gongzikaizhi.save();
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
		List<Gongzikaizhi> gongzikaizhis = Gongzikaizhi
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Gongzikaizhi.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(gongzikaizhis);
		renderJSON(json);
	}

}
