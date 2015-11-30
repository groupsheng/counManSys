package util;

/**
 * Description:系统常量
 *
 * @author:    Chen Zhiqiang
 * @version:    1.0
 * Filename:    CoreConstantUtil.java
 * Create at:   2015-11-22
 *
 * Copyright:   Copyright (c)2015
 * Company:     Team sheng
 *
 * Modification History:
 * Date              Author      Version     Description
 * ------------------------------------------------------------------
 * 2015-11-22      Chen Zhiqiang    1.0       create
 */

public class CoreConstantUtil {
	// 上传图片的最大限制
	public static long IMAGE_MAX_SIZE = 2000000;
	
	// 上传文件的最大限制
	public static long FILE_MAX_SIZE = 100000000;
	
	//kindEditor上传插件允许的格式
	public static String[] dirTypes = new String[]{"image", "flash", "media", "file"};
	
	//kindEditor上传图片插件允许的格式
	public static String[] imageTypes = new String[]{".gif", ".jpg", ".jpeg", ".png", ".bmp"};

	//kindEditor上传flash插件允许的格式
	public static String[] flashTypes = new String[]{".swf"};

	//kindEditor上传media插件允许的格式
	public static String[] mediaTypes = new String[]{".mp3", ".wav", ".midi"};

	//kindEditor上传文件插件允许的格式
	public static String[] fileTypes  = new String[]{".zip", ".rar", ".doc", ".xls", ".ppt",".txt", ".docx", ".xlsx", ".pptx"};

	// 关于我们目录
	//public static String[] ABOUT_MENU = {"院长寄语", "学校简介", "学院简介", "中心简介"};
}
