/**
 * 
 */
package controllers;

import java.util.List;

import models.Contract;
import models.Cunweihuiyi;
import models.DatagridJson;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 * @category 合同协议控制类
 */
public class ContractCtl extends Controller {

	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		Contract contract = new Contract();
		if (id != null) {
			contract = Contract.findById(id);
		}
		System.out.println(" it is a test  " + contract.main_text);
		render(contract);
	}

	// 删除
	public static void deleteObj(String id) {
		JsonObj json = new JsonObj();
		json.type = "failed";
		json.data = "记录不存在";
		if (id != null) {
			Contract contract = Contract.findById(id);
			if (contract != null) {
				contract.delete();
				json.type = "success";
				json.data = "删除成功";
			}
		}
		renderJSON(json);
	}

	// save.json
	public static void save(Contract contract) {
		if (contract.id == null || contract.id.equals("")) {
			contract.id = null;
		}
		contract.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}

	// get.json
	public static void get(int rows, int page, String contract_title) {
		if (contract_title == null) {
			contract_title = "";
		}
		List<Contract> contracts = Contract
				.find("contract_title like ? ", "%" + contract_title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Contract
				.find("contract_title like ? ", "%" + contract_title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(contracts);
		renderJSON(json);
	}

}
