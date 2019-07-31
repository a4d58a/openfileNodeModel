var p=document.getElementById("login");
document.getElementById("loginbutton").onclick=function(){
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject("Microsoft","XMLHTTP");
	}
	xhr.open("post","login",true);
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
			if(xhr.responseText=="1"){
				p.children[1].children[2].innerHTML="登录成功！"
				alert("登录成功，将跳转到上一个页面");
				localStorage.setItem("user",document.getElementById("name").value);
		if(getstorage("lasthref")!=""){window.location=getstorage("lasthref");}else{window.location="index.html"};
			}else{
				p.children[1].children[2].innerHTML="用户名或密码不正确！";
			}
        }
	}
	xhr.send("name="+document.getElementById("name").value+"&pw="+document.getElementById("pw").value);
}