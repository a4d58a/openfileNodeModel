		var db=openDatabase("onlinesale","1.0","售票点",3*1024*1024);
		var city=document.getElementById("city");
		var town=document.getElementById("town");
		var search=document.getElementById("search");
		db.transaction(function(db){db.executeSql('DROP TABLE position');});
		db.transaction(function(db){db.executeSql('CREATE TABLE IF NOT EXISTS position (city,town)');});
		db.transaction(function(db){db.executeSql("INSERT INTO position VALUES (?,?)",["A市", "A1区"]);});
		db.transaction(function(db){db.executeSql("INSERT INTO position VALUES (?,?)",["A市", "A2区"]);});
		db.transaction(function(db){db.executeSql("INSERT INTO position VALUES (?,?)",["A市", "A3区"]);	});
		db.transaction(function(db){db.executeSql("INSERT INTO position VALUES (?,?)",["B市", "B1区"]);});
		db.transaction(function(db){db.executeSql("INSERT INTO position VALUES (?,?)",["B市", "B2区"]);});

				city.innerHTML="<option value=*>全部</option>";
				city.innerHTML+="<option value=A市>A市</option>";
				city.innerHTML+="<option value=B市>B市</option>";
		city.onchange=function(){
			var cinfo;
			var einfo;
			town.innerHTML="<option value=*>全部</option>";
			if(this.options[this.selectedIndex].value!="*"){
				db.transaction(function(db){
					db.executeSql("SELECT town FROM position WHERE city=?",[city.options[city.selectedIndex].value],function(db,results){
						if(results.rows.length>0){
							for(var i=0;i<results.rows.length;i++){
								town.innerHTML+="<option value="+results.rows.item(i).town+">"+results.rows.item(i).town+"</option>";
							}
						}else{
							alert("获取所属区出错");
						}
					},function(db,error){
						alert('获取所属区失败');
					});
				});
			}
		};