package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
    	String mTitle = "index";
    	render(mTitle);
    }
    
    public static void cunmin() {

    	render();
    }
    
    public static void cunqing() {

    	render();
    }
    
    public static void personHome() {
    	render();
    }
    
    public static void villagecadres(String type, String id) {
    	String mTitle = "villagecadres";
    	render(mTitle,type,id);
    }
    
    public static void livelihoodhotspots(String type,String id) {
    	String mTitle = "livelihoodhotspots";
    	if(type==null || type.equals("")) {
    		type="jianfang";
    	}
    	render(mTitle,type,id);
    }
    public static void publicannouncement(String type) {
    	String mTitle = "publicannouncement";
    	if(type==null || type.equals("")) {
    		type="renzhi";
    	}
    	render(mTitle,type);
    }
    public static void villagedynamic(String type) {
    	String mTitle = "villagedynamic";
    	if(type==null || type.equals("")) {
    		type="huodong";
    	}
    	render(mTitle,type);
    }
    public static void aboutus() {
    	String mTitle = "aboutus";
    	render(mTitle);
    }

}