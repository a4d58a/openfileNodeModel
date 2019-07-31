function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	{
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
}
function getstorage(sname){
	if(localStorage.getItem(sname)){
		return localStorage.getItem(sname);
	}else{
		return "";
	}
}
function headloading(){
	if(getstorage("user")!=""){
		document.getElementById("headuser").children[0].innerHTML+=getstorage("user");
		document.getElementById("headlogin").style.display="none";
		document.getElementById("headbox").style.display="inline-block";
	}
	document.getElementById("headexit").onclick=function(){
		localStorage.setItem("user","");
		window.location.href=window.location.href;
	};
}
function tagloading(){
	var main=document.getElementById("maindiv");
	var tag=document.getElementById("tag");
	if(location.hash!=""){
			for(var i=1;i<tag.children.length;i++){
					tag.children[i].children[0].children[0].className="";
			}
			for(var i=0;i<main.children.length;i++){
				if("#"+main.children[i].id==location.hash){
					tag.children[i+1].children[0].children[0].className="chosen";
				}
			}
	}else{
		tag.children[1].children[0].children[0].className="chosen";
		
	}
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}