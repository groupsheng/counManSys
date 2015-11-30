/**
 * 
 */
package controllers;

import java.util.List;

import models.DatagridJson;
import models.BuildingApprovals;
import models.JsonObj;
import models.PensionHealth;
import play.mvc.Controller;

/**
 * @author Coffee
 * 
 */
public class BuildingApprovalsCtl extends Controller {
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		BuildingApprovals buildingApprovals = new BuildingApprovals();
		if (id != null) {
			buildingApprovals = BuildingApprovals.findById(id);
		}
		render(buildingApprovals);
	}

	// 删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if (id != null) {
			BuildingApprovals buildingApprovals = BuildingApprovals
					.findById(id);
			if (buildingApprovals != null) {
				buildingApprovals.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}

	// save.json
	public static void save(BuildingApprovals buildingApprovals) {
		if (buildingApprovals.id == null || buildingApprovals.id.equals("")) {
			buildingApprovals.id = null;
		}
		buildingApprovals.save();
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
		List<BuildingApprovals> buildingApprovalss = BuildingApprovals
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = BuildingApprovals.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(buildingApprovalss);
		renderJSON(json);
	}

}
