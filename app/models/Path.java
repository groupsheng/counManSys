package models;

import javax.persistence.Entity;
import javax.persistence.Table;

import play.db.jpa.Model;

/**
 * Description:系统路径
 *
 * @author:    Chen Zhiqiang
 * @version:    1.0
 * Filename:    Path.java
 * Create at:   2015-11-22
 *
 * Copyright:   Copyright (c)2015
 *
 * Modification History:
 * Date              Author      Version     Description
 * ------------------------------------------------------------------
 * 2015-11-22      Chen Zhiqiang    1.0       create
 * 
 */

@Entity
@Table(name="counmansys_path")
public class Path extends Model {
	public String copyPath;
	public String currentUrl;
	public String picUrl;
	public String domain;
	public Integer visitor;
}
