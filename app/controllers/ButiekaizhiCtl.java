/**
 * 
 */
package controllers;

import java.util.List;

import play.mvc.Controller;

import models.Butiekaizhi;
import models.DatagridJson;
import models.Gongzikaizhi;
import models.JsonObj;
import models.FinanceCost;

/**
 * @author Coffee
 * 
 */
public class ButiekaizhiCtl extends Controller {
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		Butiekaizhi butiekaizhi = new Butiekaizhi();
		if (id != null) {
			butiekaizhi = butiekaizhi.findById(id);
		}
		render(butiekaizhi);
	}

	// 删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if (id != null) {
			Butiekaizhi butiekaizhi = Butiekaizhi.findById(id);
			if (butiekaizhi != null) {
				butiekaizhi.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}

	// save.json
	public static void save(Butiekaizhi butiekaizhi) {
		if (butiekaizhi.id == null || butiekaizhi.id.equals("")) {
			butiekaizhi.id = null;
		}
		butiekaizhi.save();
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
		List<Butiekaizhi> butiekaizhis = Butiekaizhi
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Butiekaizhi.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(butiekaizhis);
		renderJSON(json);
	}

}
