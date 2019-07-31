var ori=new Array();
document.getElementById("authedit").onclick=function(){
	document.getElementById("edit").style.display="none";
	document.getElementById("endedit").style.display="inline-block";
	for(var i=3;i<7;i++){
		document.getElementById("i"+i).readOnly=false;
		document.getElementById("i"+i).style.border="1px solid orange";
	}	
	for(var i=1;i<7;i++){
		ori[i-1]=document.getElementById("i"+i).value;
		document.getElementById("ni"+i).style.visibility="visible";
	}
}	

document.getElementById("quitedit").onclick=function(){
	for(var i=0;i<6;i++){
		document.getElementById("i"+(i+1)).value=ori[i];
		document.getElementById("i"+(i+1)).readOnly=true;
		document.getElementById("i"+(i+1)).style.border="";
	}
	for(var i=1;i<7;i++){
		document.getElementById("ni"+i).style.visibility="hidden";
	}
	document.getElementById("endedit").style.display="none";
	document.getElementById("edit").style.display="inline-block";
}

document.getElementById("saveedit").onclick=function(){
	var x=false;
	for(var i=0;i<6;i++){
		if(document.getElementById("i"+(i+1)).validity.patternMismatch==true||document.getElementById("i"+(i+1)).validity.valueMissing==true){
			x=true;
			break;
		}
	}	
	if(x==false){
			var xhr;
			if(window.XMLHttpRequest){
	           		xhr=new XMLHttpRequest();
	        }else{
	            xhr=new ActiveXObject("Microsoft","XMLHTTP");
	        }
	        xhr.open("post","authedit",true);
	        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	        xhr.onreadystatechange=function(){
	            if(xhr.readyState==4&&xhr.status==200){
					if(xhr.responseText=="1"){
						alert("修改成功");
						window.location.reload();
					}else{
						alert("修改失败，请稍后再试");
					}
	            }
	        }
	   	 	xhr.send("user="+getstorage("user")+
	   	 		"&phone="+document.getElementById("i3").value+
	   	 		"&email="+document.getElementById("i4").value+
	   	 		"&truename="+document.getElementById("i5").value+
	   	 		"&cid="+document.getElementById("i6").value
	   	 		);
		for(var i=0;i<6;i++){
			document.getElementById("i"+(i+1)).readOnly=true;
			document.getElementById("i"+(i+1)).style.border="";
		}
		for(var i=1;i<7;i++){
			document.getElementById("ni"+i).style.visibility="hidden";
		}
		document.getElementById("endedit").style.display="none";
		document.getElementById("edit").style.display="inline-block";
	}else{
		alert("有不合格式的修改");
	}
}

for(var i=1;i<7;i++){
	document.getElementById("i"+i).onblur=function(){
		if(this.readOnly==false){
			if(this.validity.patternMismatch==true||this.validity.valueMissing==true){
				this.style.border="1px solid red";
				document.getElementById("n"+this.id).style.color="red";

			}else{
				this.style.border="1px solid orange";
				document.getElementById("n"+this.id).style.color="gray";
			}
		}
	}
}

document.getElementById("i6").onblur=function(){
		var th=this;
		var x=false;
		if(this.readOnly==false){
			if(this.validity.patternMismatch==true||this.validity.valueMissing==true){
				this.style.border="1px solid red";
				document.getElementById("n"+this.id).style.color="red";
				x=true;
			}else{
				x=false;
				this.style.border="1px solid orange";
				document.getElementById("n"+this.id).style.color="gray";
			}
			if(x==false){
				var xhr;
				if(window.XMLHttpRequest){
		           		xhr=new XMLHttpRequest();
		        }else{
		            xhr=new ActiveXObject("Microsoft","XMLHTTP");
		        }
		        xhr.open("post","cidrepeatcheckforuser",true);
		        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
		        xhr.onreadystatechange=function(){
		            if(xhr.readyState==4&&xhr.status==200){
						if(xhr.responseText=="1"){
							th.style.border="1px solid red";
							document.getElementById("n"+th.id).style.color="red";
							document.getElementById("n"+th.id).innerHTML="同一个身份证不能重复使用";
						}else{
							document.getElementById("n"+th.id).innerHTML="身份证可用";
						}
		            }
		        }
		   	 	xhr.send("user="+getstorage("user")+"&cid="+document.getElementById("i6").value);
				}
		}
	}