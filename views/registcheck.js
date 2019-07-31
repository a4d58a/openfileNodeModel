function passwordcmp(){
	if(document.getElementById("pw1").value!=document.getElementById("pw2").value){
		document.getElementById("npw2").style.color="red";
		document.getElementById("pw2").pattern="";	
	}else{
		document.getElementById("npw2").style.color="gray";
		document.getElementById("pw2").pattern="([a-z]|[A-Z]|[0-9]){6,16}";	
	}
}
function patterncmp(){
	if(this.validity.patternMismatch==true||this.validity.valueMissing==true){
		document.getElementById("n"+this.id).style.color="red";
	}else{
		document.getElementById("n"+this.id).style.color="gray";
	}
}
var form=document.getElementById("registform");
for(var i=0;i<form.children.length-2;i+=2){
	form.children[i].children[1].onblur=patterncmp;
}	
document.getElementById("pw1").onblur=function(){
	if(this.validity.patternMismatch==true){
		document.getElementById("n"+this.id).style.color="red";
	}else{
		document.getElementById("n"+this.id).style.color="gray";
	}
	passwordcmp();
}
document.getElementById("pw2").onblur=passwordcmp;
document.getElementById("submit").onclick=function(){
	var x=false;
	for(var i=0;i<form.children.length-2;i+=2){
		if(form.children[i].children[1].validity.patternMismatch==true||form.children[i].children[1].validity.valueMissing==true){
			x=true;
			break;
		}
	}
	if(x==false){
		if(window.XMLHttpRequest){
           		xhr=new XMLHttpRequest();
        }else{
            xhr=new ActiveXObject("Microsoft","XMLHTTP");
        }
        xhr.open("post","regist",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        //以键值对传输的表单数据
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
				if(xhr.responseText=="1"){
					alert("注册成功，即将跳转到上一个页面");
					localStorage.setItem("user",document.getElementById("registuser").value);
					if(getstorage("lasthref")!=""){window.location=getstorage("lasthref");}else{window.location="index.html"};
				}else{
					alert("注册失败，请稍后再试");
				}
            }else if(xhr.status==0){
            	alert("注册失败，请检查网络连接或稍后再试");
          	}
        }
        xhr.send("name="+document.getElementById("registuser").value+
        	"&password="+document.getElementById("pw1").value+
        	"&truename="+document.getElementById("truename").value+
        	"&cid="+document.getElementById("cid").value+
        	"&phone="+document.getElementById("phonenumber").value+
        	"&email="+document.getElementById("email").value);
	}else{
		alert("有不符合要求的项目，请注意检查");
	}
}

document.getElementById("registuser").onblur=function(){
	id=this.id;
	var x=false;
	document.getElementById(id).pattern="([a-z]|[A-Z]|[0-9]){5,20}";
	if(this.validity.patternMismatch==true||this.validity.valueMissing==true){
		document.getElementById("n"+this.id).style.color="red";
		document.getElementById("n"+this.id).innerHTML="5-20个数字与字母组成的字符串，注册后不能修改。"
		x=false;
	}else{
		document.getElementById("n"+this.id).style.color="gray";
		x=true;
	}
	if(x==true){
		if(window.XMLHttpRequest){
           		xhr=new XMLHttpRequest();
        }else{
            xhr=new ActiveXObject("Microsoft","XMLHTTP");
        }
        xhr.open("post","namerepeatcheck",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
				if(xhr.responseText=="1"){
					document.getElementById("n"+id).innerHTML=("用户名已被使用");
					document.getElementById("n"+id).style.color="red";
					document.getElementById(id).pattern="";
				}else{
					document.getElementById("n"+id).innerHTML=("用户名可用");
				}
            }
        }
        xhr.send("name="+document.getElementById("registuser").value);
	}
}

document.getElementById("cid").onblur=function(){
	id=this.id;
	var x=false;
	document.getElementById(id).pattern="[0-9]{10}((01|03|05|07|08|10|12)(0[1~9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1~9]|[1-2][0-9]|30)|2(0[1~9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)";
	if(this.validity.patternMismatch==true||this.validity.valueMissing==true){
		document.getElementById("n"+this.id).style.color="red";
		x=false;
	}else{
		document.getElementById("n"+this.id).style.color="gray";
		x=true;
	}
	if(x==true){
		if(window.XMLHttpRequest){
           		xhr=new XMLHttpRequest();
        }else{
            xhr=new ActiveXObject("Microsoft","XMLHTTP");
        }
        xhr.open("post","cidrepeatcheck",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
				if(xhr.responseText=="1"){
					document.getElementById("n"+id).innerHTML=("身份证已被使用");
					document.getElementById("n"+id).style.color="red";
					document.getElementById(id).pattern="";
				}else{
					document.getElementById("n"+id).innerHTML=("身份证可用");
				}
            }
        }
        xhr.send("cid="+document.getElementById("cid").value);
	}
}