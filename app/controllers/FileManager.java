package controllers;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;
import java.util.UUID;

import models.Path;
import play.Play;
import play.libs.Files;
import play.mvc.Controller;
import valueobject.Message;
import valueobject.Result;
import util.CoreConstantUtil;
import util.NameComparator;
import util.SizeComparator;
import util.TypeComparator;

public class FileManager extends Controller{

	/**
     * 文件上传
     * 
     * @author Chen zhiqiang
     * 
     * @param imgFile     上传文件
     * @param dir  		     上传类型
     */
	public static void upload_json(File imgFile,String dir){

    	Message message;//回调信息
    	
    	if(!Arrays.<String>asList(CoreConstantUtil.dirTypes).contains(dir)){
    		message=new Message(1,"上传类型错误","xxx");
    		renderJSON(message);
		}
    	
    	String _type=imgFile.getName().substring(imgFile.getName().lastIndexOf('.')).toLowerCase();
    	
    	if("image".equals(dir)){
    		//最大文件大小
        	if(imgFile.length() > CoreConstantUtil.IMAGE_MAX_SIZE){
        		message=new Message(1,"上传图片大小超过限制！不能超过2M!","xxx");
        		renderJSON(message);
    		}
        	
        	if(!Arrays.<String>asList(CoreConstantUtil.imageTypes).contains(_type)){
        		message=new Message(1,"图片格式错误，只允许.gif/.jpg/.jepg/.png/.bmp","xxx");
        		renderJSON(message);
    		}
        	
    	}
    	
    	if("flash".equals(dir)){
    		
    		//最大文件大小
        	if(imgFile.length() > CoreConstantUtil.FILE_MAX_SIZE){
        		message=new Message(1,"上传文件大小超过限制！不能超过100M!","xxx");
        		renderJSON(message);
    		}
        	
    		if(!Arrays.<String>asList(CoreConstantUtil.flashTypes).contains(_type)){
        		message=new Message(1,"flash格式错误，只允许.swf","xxx");
        		renderJSON(message);
    		}
    	}
    	
    	if("media".equals(dir)){
    		//最大文件大小
        	if(imgFile.length() > CoreConstantUtil.FILE_MAX_SIZE){
        		message=new Message(1,"上传文件大小超过限制！不能超过100M!","xxx");
        		renderJSON(message);
    		}
        	
        	if(!Arrays.<String>asList(CoreConstantUtil.mediaTypes).contains(_type)){
        		message=new Message(1,"音频格式错误，只允许.mp3/.wav/.midi/.png/.bmp","xxx");
        		renderJSON(message);
    		}
    	}
    	
    	if("file".equals(dir)){
    		//最大文件大小
        	if(imgFile.length() > CoreConstantUtil.FILE_MAX_SIZE){
        		message=new Message(1,"上传文件大小超过限制！不能超过100M!","xxx");
        		renderJSON(message);
    		}
        	
        	if(!Arrays.<String>asList(CoreConstantUtil.fileTypes).contains(_type)){
        		message=new Message(1,"文件格式错误，只允许.zip/.rar/.doc/.xls/.ppt/.txt/.docx/.xlsx/.pptx","xxx");
        		renderJSON(message);
    		}
    	}
    
    	Path SystemPath= Path.findById(1L);
    	UUID uuid = UUID.randomUUID();                           //图片UUID
		String fileNewName=uuid+_type;
		String path=SystemPath.copyPath+dir+"/"+fileNewName;//"http://"+Request.current().host+"/public/kupload/"+dir+"/"+fileNewName;      //图片保存路径		
		Files.copy(imgFile,Play.getFile("public/kindeditor/attached/"+dir+"/"+fileNewName));          //拷贝图片至指定目录
		message=new Message(0,"上传成功",path);
		response.setContentTypeIfNotSet("text/html");
		renderJSON(message);
    }
	
	
	/**
     * 文件管理器
     * 
     * @author Chen Zhiqiang
     * 
     * @param path     目录路径
     * @param order    排序方式
     * @param dir  	       文件类型
     */
    public static void filemanager_json(String path,String order,String dir){
    	
    	//String currentPath = "../public/kindeditor/attached/";
    	Path SystemPath= Path.findById(1L);
    	String currentUrl =SystemPath.currentUrl; //"../public/kindeditor/attached/" ;
    	String picUrl=Play.applicationPath+SystemPath.copyPath;//SystemPath.picUrl;//"train/public/kupload/";
    	if(path!=null){
    		//currentPath += path;
    		currentUrl += path;
    		picUrl += path;
    		
    	}
    	if (dir != null) {
    		if(!Arrays.<String>asList(new String[]{"image", "flash", "media", "file"}).contains(dir)){
    			return;
    		}
    		//currentPath += dir + "/";
    		currentUrl += dir + "/";
    		picUrl+= dir + "/";
    	}
    	String currentDirPath =path;
    	String moveupDirPath = "";
    	
    	if (!path.equals("")) {
    		String str = currentDirPath.substring(0, currentDirPath.length() - 1);
    		moveupDirPath = str.lastIndexOf("/") >= 0 ? str.substring(0, str.lastIndexOf("/") + 1) : "";
    	}
    	
    	File currentPathFile = new File(picUrl);
    	String[] fileTypes = new String[]{"gif", "jpg", "jpeg", "png", "bmp"};
    	if(!currentPathFile.isDirectory()){
    		System.out.println("Directory does not exist!!!");
    		Message result_message = new Message(1,"当前服务器文件目录下暂还没有文件，请先上传！","error");
    		//response.setContentTypeIfNotSet("text/html");
    		renderJSON(result_message);
    		//return;
    	}
    	else{
    		List<Hashtable> fileList = new ArrayList<Hashtable>();
    		if(currentPathFile.listFiles() != null) {
    			for (File file : currentPathFile.listFiles()) {
    				Hashtable<String, Object> hash = new Hashtable<String, Object>();
    				String fileName = file.getName();
    				if(file.isDirectory()) {
    					hash.put("is_dir", true);
    					hash.put("has_file", (file.listFiles() != null));
    					hash.put("filesize", 0L);
    					hash.put("is_photo", false);
    					hash.put("filetype", "");
    				} else if(file.isFile()){
    					String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    					hash.put("is_dir", false);
    					hash.put("has_file", false);
    					hash.put("filesize", file.length());
    					hash.put("is_photo", Arrays.<String>asList(fileTypes).contains(fileExt));
    					hash.put("filetype", fileExt);
    				}
    				hash.put("filename", fileName);
    				hash.put("datetime", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(file.lastModified()));
    				fileList.add(hash);
    			}
    		}
    		if ("SIZE".equals(order)) {
    			Collections.sort(fileList, new SizeComparator());
    		} else if ("TYPE".equals(order)) {
    			Collections.sort(fileList, new TypeComparator());
    		} else {
    			Collections.sort(fileList, new NameComparator());
    		}
    		
    		Result result=new Result();
    		result.moveup_dir_path=moveupDirPath;
    		result.current_dir_path=currentDirPath;
    		result.current_url=currentUrl;
    		result.total_count=fileList.size();
    		result.file_list=fileList;
    		renderJSON(result);
    	}
    }
	
}
