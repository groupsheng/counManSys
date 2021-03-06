/**
 * 
 */
package controllers;

import java.util.List;

import models.Butiekaizhi;
import models.CunGanBu;
import models.CunRongCunMao;
import models.DatagridJson;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 * 
 */
public class CunRongCunMaoCtl extends Controller {
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		CunRongCunMao cunRongCunMao = new CunRongCunMao();
		if (id != null) {
			cunRongCunMao = cunRongCunMao.findById(id);
		}
		render(cunRongCunMao);
	}

	// 删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if (id != null) {
			CunRongCunMao cunRongCunMao = CunRongCunMao.findById(id);
			if (cunRongCunMao != null) {
				cunRongCunMao.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}

	// save.json
	public static void save(CunRongCunMao cunRongCunMao) {
		if (cunRongCunMao.id == null || cunRongCunMao.id.equals("")) {
			cunRongCunMao.id = null;
		}
		cunRongCunMao.save();
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
		List<CunRongCunMao> cunRongCunMaos = CunRongCunMao
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = CunRongCunMao.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(cunRongCunMaos);
		renderJSON(json);
	}

}
