			var xhr2;
			if(window.XMLHttpRequest){
	           		xhr2=new XMLHttpRequest();
	        }else{
	            xhr2=new ActiveXObject("Microsoft","XMLHTTP");
	        }
	        xhr2.open("post","infoload",true);
	        xhr2.setRequestHeader("content-type","application/x-www-form-urlencoded");
	        xhr2.onreadystatechange=function(){
	            if(xhr2.readyState==4&&xhr2.status==200){
	            	data=JSON.parse(xhr2.responseText);
					if(data.length!=0){
						document.getElementById("i1").value=data[0].name;
						document.getElementById("i2").value=data[0].state;
						document.getElementById("i3").value=data[0].phone;
						document.getElementById("i4").value=data[0].email;
						document.getElementById("i5").value=data[0].truename;
						document.getElementById("i6").value=data[0].cid;
					}
	            }
	        }
	   	 	xhr2.send("user="+getstorage("user"));