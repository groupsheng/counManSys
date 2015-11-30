package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;
@Entity
public class Chusheng extends GenericModel {
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	/**
	 * 姓名
	 */
	public String name;
	
	/**
	 * 性别
	 */
	public String sex;
	
	/**
	 * 生日
	 */
	public String birthday;
	
	/**
	 * 所属用户
	 */
	@OneToOne
	public User user;
	

	public Chusheng() {
		
	}

}
