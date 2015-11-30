/**
 * 
 */
package models;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import play.db.jpa.GenericModel;

/**
 * @author Coffee 
 * 
 * @date 2015/11/28
 * 
 * @table 村大事记实体类（档案编研究）
 */

public class Dashiji extends GenericModel {
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 标题
	public String title;
	
	// 备注
	public String remark;
	
	// 正文
	public String main_text;
		
	// 发布日期--默认当前时间
	public String post_date;
	
	// 作者--默认当前登陆文书 
	public String author;
		
	// 组织机构
	public String organization;
		
	// 附件
	public String appendix;
}
