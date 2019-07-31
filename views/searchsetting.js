	if(window.XMLHttpRequest){
   		xhr3=new XMLHttpRequest();
    }else{
        xhr3=new ActiveXObject("Microsoft","XMLHTTP");
    }
    xhr3.open("get","date",true);
    xhr3.onreadystatechange=function(){
        if(xhr3.readyState==4&&xhr3.status==200){
			var year=JSON.parse(xhr3.responseText).year;
			var month=JSON.parse(xhr3.responseText).month;
			var day=JSON.parse(xhr3.responseText).date-1;
			var date;
			document.getElementById("startdate").innerHTML="<option value=*>所有售票日期</option>";
			for(var i=0;i<7;i++){
				day++;
				if(day>31&&(month==1||month==3||month==5||month==7||month==8||month==10||month==12)||
					(day>30&&(month==4||month==6||month==9||month==11))){
						month++;
						day=1;
				}else if(month==2){
					if((day>29&&((year%100!=0&&year%4==0)||(year%400==0)))||
						(day>28&&year%4!=0)){
						month++;
						day=1;
					}
				}
				if(month>12){
					year++;
					month=1;
				}
				date=year+"-";
				if(month<10){
					date+="0";
				}
				date+=month+"-";
				if(day<10){
					date+="0";
				}
				date+=day;	
				document.getElementById("startdate").innerHTML+="<option value="+date+">"+date+"</option>";
			}
        }
    }
    xhr3.send(null);
	document.getElementById("start").innerHTML="<option value=*>全部</option>"+
								"<option value=城南客运站>城南客运站</option>"+
								"<option value=城北客运站>城北客运站</option>"+
								"<option value=城西客运站>城西客运站</option>"+
								"<option value=纺织城客运站>纺织城客运站</option>";

	document.getElementById("starttime").innerHTML="<option value=*>所有时段</option>"+
								"<option value=06:00>06:00后</option>"+
								"<option value=07:00>07:00后</option>"+
								"<option value=08:00>08:00后</option>"+
								"<option value=09:00>09:00后</option>"+
								"<option value=10:00>10:00后</option>"+
								"<option value=11:00>11:00后</option>"+
								"<option value=12:00>12:00后</option>"+
								"<option value=12:00>13:00后</option>"+
								"<option value=12:00>14:00后</option>"+
								"<option value=12:00>15:00后</option>"+
								"<option value=12:00>16:00后</option>"+
								"<option value=12:00>17:00后</option>"+
								"<option value=12:00>18:00后</option>"+
								"<option value=12:00>19:00后</option>"+
								"<option value=12:00>20:00后</option>";

	function linesearch(){
		if(document.getElementById("destination").value==""){
			alert("目的地不能为空");
		}else{
			window.location="book.html"
		}
	}
	function onlinesearch(){
		if(document.getElementById("destination").value==""){
			alert("目的地不能为空");
		}else{
			var xhr;
			var form=document.getElementById("bookform").children[0].children[0];
			form.innerHTML="<tr id=header><th>编号</th><th>目的地</th><th>发车日期</th><th>发车时间</th><th>线路名</th><th>乘车站</th><th>余票</th><th>车型</th><th>票价</th><th>备注</th><th>选择</th></tr>";
			    if(window.XMLHttpRequest){
		            xhr=new XMLHttpRequest();
		        }else{
		            xhr=new ActiveXObject("Microsoft","XMLHTTP")
		        }
		        var str="line?start="+document.getElementById("start").options[document.getElementById("start").selectedIndex].value
					+"&startdate="+document.getElementById("startdate").options[document.getElementById("startdate").selectedIndex].value
					+"&starttime="+document.getElementById("starttime").options[document.getElementById("starttime").selectedIndex].value
					+"&end="+document.getElementById("destination").value
					+"&skip=false&online=true";
				xhr.open("get",str,true);
				xhr.onreadystatechange=function(){
					if(xhr.readyState==4&&xhr.status==200){
					 	datalist=JSON.parse(xhr.responseText);
					 	if(datalist.length==0){
					 		form.innerHTML+="<tr class=null><td colspan=10>无 查 询 结 果</td></tr>";
					 	}else{
					 		for(var i=0;i<datalist.length;i++){
					 			var str="";
					 			str+="<tr><td>"+datalist[i].id+"</td><td>"+datalist[i].end+"</td><td>"+datalist[i].date+"</td><td>"+datalist[i].time+"</td><td>"+datalist[i].line+"</td><td>"+datalist[i].start+
					 			"</td><td>"+datalist[i].ticket+"</td><td>"+datalist[i].type+"</td><td>"+datalist[i].price+"</td><td>";
					 			if(datalist[i].notice==null){str+="无</td><td>";}else{str+=datalist[i].notice+"</td><td>";}
					 			if(datalist[i].onlinesale=="是"){str+="<button class=book type=button>预订</button></td></tr>";}
					 			else{str+="不支持网上售票</td></tr>"}
					 			form.innerHTML+=str;
					 		}
					 	}
						if(form.children[1].className!="null"){
							for(var i=1;i<form.children.length;i++){
								form.children[i].children[10].children[0].onclick=function(){
									if (getstorage("user")=="") {
										alert("订票时请先登录");
										window.location="login.html#login";
								}else{
									var bid=this.parentNode.parentNode.children[0].innerHTML;
									var xhr2;
									if(window.XMLHttpRequest){
							           		xhr2=new XMLHttpRequest();
							        }else{
							            xhr2=new ActiveXObject("Microsoft","XMLHTTP");
							        }
							        xhr2.open("post","book",true);
							        xhr2.setRequestHeader("content-type","application/x-www-form-urlencoded");
							        xhr2.onreadystatechange=function(){
							            if(xhr2.readyState==4&&xhr2.status==200){
											if(xhr2.responseText=="1"){
												alert("订票成功");
												window.location.href=window.location.href;
											}else{
												alert("订票失败，请稍后再试");
											}
							            }
							        }
							   	 	xhr2.send("user="+getstorage("user")+"&bid="+bid);
								}
							}
						}
						}
					}
				}
				xhr.send();
			}
		}
	function offlinesearch(){
		if(document.getElementById("destination").value==""){
			alert("目的地不能为空");
		}else{
			var xhr;
			var form=document.getElementById("bookform").children[0].children[0];
			form.innerHTML="<tr id=header><th>编号</th><th>目的地</th><th>发车日期</th><th>发车时间</th><th>线路名</th><th>乘车站</th><th>余票</th><th>车型</th><th>票价</th><th>备注</th><th>选择</th></tr>";
			    if(window.XMLHttpRequest){
		            xhr=new XMLHttpRequest();
		        }else{
		            xhr=new ActiveXObject("Microsoft","XMLHTTP")
		        }
		        var str="line?start="+document.getElementById("start").options[document.getElementById("start").selectedIndex].value
					+"&startdate="+document.getElementById("startdate").options[document.getElementById("startdate").selectedIndex].value
					+"&starttime="+document.getElementById("starttime").options[document.getElementById("starttime").selectedIndex].value
					+"&end="+document.getElementById("destination").value;
					+"&skip=false&online=false";
				xhr.open("get",str,true);
				xhr.onreadystatechange=function(){
					if(xhr.readyState==4&&xhr.status==200){
					 	datalist=JSON.parse(xhr.responseText);
					 	if(datalist.length==0){
					 		form.innerHTML+="<tr class=null><td colspan=10>无 查 询 结 果</td></tr>";
					 	}else{
					 		for(var i=0;i<datalist.length;i++){
					 			var str="";
					 			if(datalist[i].onlinesale=="是"){str+="<tr class=onlinetag><td>";}else{str+="<tr><td>";}
					 			str+=datalist[i].id+"</td><td>"+datalist[i].end+"</td><td>"+datalist[i].date+"</td><td>"+datalist[i].time+"</td><td>"+datalist[i].line+"</td><td>"+datalist[i].start+
					 			"</td><td>"+datalist[i].ticket+"</td><td>"+datalist[i].type+"</td><td>"+datalist[i].price+"</td><td>";
					 			if(datalist[i].notice==null){str+="无</td><td>";}else{str+=datalist[i].notice+"</td><td>";}
					 			if(datalist[i].onlinesale=="是"){str+="<button class=book type=button>预订</button></td></tr>";}
					 			else{str+="不支持网上售票</td></tr>"}
					 			form.innerHTML+=str;
					 		}
					 		for(var i=1;i<form.children.length;i++){
								if(form.children[i].className=="onlinetag"){
									form.children[i].children[10].children[0].onclick=function(){
										if (getstorage("user")=="") {
											alert("订票时请先登录");
											window.location="login.html#login";
										}else{
											var bid=this.parentNode.parentNode.children[0].innerHTML;
											var xhr2;
											if(window.XMLHttpRequest){
									           		xhr2=new XMLHttpRequest();
									        }else{
									            xhr2=new ActiveXObject("Microsoft","XMLHTTP");
									        }
									        xhr2.open("post","book",true);
									        xhr2.setRequestHeader("content-type","application/x-www-form-urlencoded");
									        xhr2.onreadystatechange=function(){
									            if(xhr2.readyState==4&&xhr2.status==200){
													if(xhr2.responseText=="1"){
														alert("订票成功");
														window.location.href=window.location.href;
													}else{
														alert("订票失败，请稍后再试");
														window.location.reload();
													}
									            }else if(xhr.status==0){
											            	alert("订票失败，请检查网络连接或稍后再试");
											    }
									        }
									   	 	xhr2.send("user="+getstorage("user")+"&bid="+bid);
										}
									}
								}
							}
					 	}
					}
				}
				xhr.send();
			}
		}