/**
 * 
 */
package controllers;

import java.util.List;

import play.mvc.Controller;

import models.DatagridJson;
import models.GuquanCooperation;
import models.JsonObj;
import models.FinanceCost;
import models.Zhengfubuzhu;

/**
 * @author Coffee
 * 
 */
public class ZhengfubuzhuCtl extends Controller {
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		Zhengfubuzhu zhengfubuzhu = new Zhengfubuzhu();
		if (id != null) {
			zhengfubuzhu = zhengfubuzhu.findById(id);
		}
		render(zhengfubuzhu);
	}

	// 删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if (id != null) {
			Zhengfubuzhu zhengfubuzhu = Zhengfubuzhu.findById(id);
			if (zhengfubuzhu != null) {
				zhengfubuzhu.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}

	// save.json
	public static void save(Zhengfubuzhu zhengfubuzhu) {
		if (zhengfubuzhu.id == null || zhengfubuzhu.id.equals("")) {
			zhengfubuzhu.id = null;
		}
		zhengfubuzhu.save();
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
		List<Zhengfubuzhu> zhengfubuzhus = Zhengfubuzhu
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Zhengfubuzhu.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(zhengfubuzhus);
		renderJSON(json);
	}

}
