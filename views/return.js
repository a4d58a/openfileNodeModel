var form=document.getElementById("returnform").children[0].children[0];
		form.innerHTML="<tr id=header><th>编号</th><th>状态</th><th>目的地</th><th>发车日期</th><th>发车时间</th><th>线路名</th><th>乘车站</th><th>车型</th><th>票价</th><th>备注</th><th>选择</th></tr>";
		var xhr;
		if(window.XMLHttpRequest){
           		xhr=new XMLHttpRequest();
        }else{
            xhr=new ActiveXObject("Microsoft","XMLHTTP");
        }
        xhr.open("post","bookinfoload",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
            	data=JSON.parse(xhr.responseText);
				if(data.length==0){
					form.innerHTML+="<tr class=null><td colspan=10>当 前 没 有 订 票 信 息</td></tr>";
				}else{
					var str="";
					for(var i=0;i<data.length;i++){
						if(data[i].state=="正常"){str+="<tr><td>"+data[i].id+"</td><td>";}else{
							str+="<tr><td>"+data[i].id+"</td><td class=abnormal>";
						}
						str+=data[i].state+"</td><td>"+data[i].end+"</td><td>"+data[i].date+"</td><td>"+data[i].time+"</td><td>"+data[i].line+"</td><td>"+data[i].start+"</td><td>"+data[i].type+"</td><td>"+data[i].price+"</td><td>";
						if(data[i].notice==null){str+="无";}else{str+=data[i].notice;}
						if(data[i].state=="正常"){str+="</td><td><button class='book caution' type=button>退票</button></td></tr>";}
						else{str+="</td><td></td></tr>";}
						form.innerHTML+=str;
					}
					for(var i=1;i<form.children.length;i++){
						if(form.children[i].children[1]=="正常"){
							form.children[i].children[10].children[0].onclick=function(){
								if (getstorage("user")=="") {
									alert("身份认证出现错误");
									window.location="login.html#login";
								}else{
									if(window.confirm("确认要退票吗")==true){
										var rid=this.parentNode.parentNode.children[0].innerHTML;
										var xhr2;
										if(window.XMLHttpRequest){
								           		xhr2=new XMLHttpRequest();
								        }else{
								            xhr2=new ActiveXObject("Microsoft","XMLHTTP");
								        }
								        xhr2.open("post","returnticket",true);
								        xhr2.setRequestHeader("content-type","application/x-www-form-urlencoded");
								        xhr2.onreadystatechange=function(){
								            if(xhr2.readyState==4&&xhr2.status==200){
												if(xhr2.responseText=="1"){
													alert("退票申请成功，请等待退款处理");
													window.location.reload();
												}else{
													alert("退票失败，请稍后再试");
												}
								            }
								        }
								   	 	xhr2.send("user="+getstorage("user")+"&rid="+rid);
									}
									
									
								}
							}
						}	
					}
				}
            }
        }
   	 	xhr.send("user="+getstorage("user"));