var checkpoint=true;
document.getElementById("pw1").onblur=function(){
	if(window.XMLHttpRequest){
           		xhr=new XMLHttpRequest();
        }else{
            xhr=new ActiveXObject("Microsoft","XMLHTTP");
        }
        xhr.open("post","pwcheck",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
				if(xhr.responseText!="1"){
					document.getElementById("ppw1").style.color="red";
					document.getElementById("pw1").pattern="";
				}else{
					document.getElementById("ppw1").style.color="gray";
					document.getElementById("pw1").pattern="([a-z]|[A-Z]|[0-9]){6,16}";	
				}
            }
        }
    xhr.send("pw="+this.value+"&user="+getstorage("user"));
}
function pwcheck(){
	if(document.getElementById("pw2").value!=document.getElementById("pw3").value){
		document.getElementById("ppw3").style.color="red";
		document.getElementById("pw3").pattern="";
	}else{
		document.getElementById("ppw3").style.color="gray";
		document.getElementById("pw3").pattern="([a-z]|[A-Z]|[0-9]){6,16}";	
	}
}
function oldcheck(){
	if(checkpoint==true){
		if(document.getElementById("pw2").value==document.getElementById("pw1").value){
			document.getElementById("ppw2").innerHTML="新密码不能与原密码一致";
			document.getElementById("ppw2").style.color="red";
			document.getElementById("pw2").pattern="";
		}else{
			document.getElementById("ppw2").style.color="gray";
			document.getElementById("ppw2").innerHTML="密码为6-16位字母与数字混合串,不可包含其他符号、空格及中文";
		}
	}
}
document.getElementById("pw3").onblur=pwcheck;
document.getElementById("pw2").onblur=function(){	
	document.getElementById("pw2").pattern="([a-z]|[A-Z]|[0-9]){6,16}"
	if(document.getElementById("pw2").validity.patternMismatch==true||document.getElementById("pw2").validity.valueMissing==true){
		checkpoint=false;
		document.getElementById("ppw2").innerHTML="密码为6-16位字母与数字混合串,不可包含其他符号、空格及中文";
		document.getElementById("ppw2").style.color="red";
	}else{
		document.getElementById("ppw2").style.color="gray";
		checkpoint=true;
	}
	oldcheck();
	pwcheck();
}
document.getElementById("passwordsubmit").onclick=function(){
	var form=document.getElementById("password").children[1];
	var x=false;
	for(var i=0;i<form.children.length;i+=2){
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
        xhr.open("post","pwedit",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
				if(xhr.responseText=="1"){
					alert("修改成功");
					window.location.reload();
				}else{
					alert("修改失败，请稍后再试");
				}
            }else if(xhr.status==0){
				alert("修改失败，请检查网络连接或稍后再试");
			}
        }
   		xhr.send("pw="+document.getElementById("pw2").value+"&user="+getstorage("user"));
	}
}