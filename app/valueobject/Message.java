package valueobject;

/**
 * Description:kindEditor上传后消息VO
 *
 * @author:    Chen Zhiqiang
 * @version:    1.0
 * Filename:    Message.java
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

public class Message {
	public int error;        //成功标识
	public String message;   //消息     
	public String url;       //文件url    
	
	public Message(int error,String message,String url){
		this.error=error;
		if(error!=0){
			this.message="上传失败！"+message;
		}
		else{
			this.message="上传成功！";
		}
		this.url=url;
	}
}
