const qs = require('querystring');
const bodyParser=require('body-parser');
const express = require('express');
const mysql      = require('mysql');
var connection;

function conn(){
	connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	  database : 'webproject',
	  multipleStatements:true
	});
	connection.connect();
}

function login(req,res){
	console.log(req.body.name);
	console.log(req.body.pw);
	conn();
	connection.query("SELECT * FROM user WHERE name=? AND password=?",[req.body.name,req.body.pw], function (error, results, fields) {
	  if (error){throw error;
	  }else if(results.length>0){
	  	res.send("1");
	  }else{
	  	res.send("0");
	  }
	});
	connection.end();
}

function date(req,res){
	var now=new Date();
	var nowdate={
		"year":now.getYear()+1900,
		"month":now.getMonth( )+1,
		"date":now.getDate()
	}
	res.send(nowdate);
}

function ticket(req,res){
	conn();
	var data=new Array();
	var x;
	if(req.query.city=="*"){
		connection.query("SELECT * FROM ticket",function (error, results, fields) {
		  if (error){throw error;
		  }else{
		  	for(var i=0;i<results.length;i++){
		  		x={
		  			"name":results[i].name,
		  			"phone":results[i].phone,
		  			"address":results[i].address,
		  			"notice":results[i].notice
		  		}
		  		data.push(x);
		  	}
			console.log(data);
			res.send(data);
		  }
		});
	}else if(req.query.town=="*"){
		connection.query("SELECT * FROM ticket WHERE city=?",[req.query.city], function (error, results, fields) {
		  if (error){throw error;
		  }else{
		  	for(var i=0;i<results.length;i++){
		  		x={
		  			"name":results[i].name,
		  			"phone":results[i].phone,
		  			"address":results[i].address,
		  			"notice":results[i].notice
		  		}
		  		data.push(x);
		  	}
			json=JSON.stringify(data);
			console.log(json);
			res.send(json);		
		  }
		});
	}else{
		connection.query("SELECT * FROM ticket WHERE city=? AND town=?",[req.query.city,req.query.town], function (error, results, fields) {
		if (error){throw error;
		}else{
		  	for(var i=0;i<results.length;i++){
		  		x={
		  			"name":results[i].name,
		  			"phone":results[i].phone,
		  			"address":results[i].address,
		  			"notice":results[i].notice
		  		}
		  		data.push(x);
		  	}
			json=JSON.stringify(data);
			res.send(json);
			
		  }
		});
	}
	connection.end();
}

function regist(req,res){
	console.log(req.body);
	conn();
	connection.query("INSERT INTO user(id,name,password) VALUES(?,?,?)",[,req.body.name,req.body.password], function (error, results, fields) {
	  if (error){
	  	throw error;
	  	res.send("0");
	  }
	});

  	connection.query("INSERT INTO userinfo(id,name,state,phone,email,truename,cid) VALUES(?,?,?,?,?,?,?)",
  		[,req.body.name,"正常",req.body.phone
  		,req.body.email,req.body.truename,req.body.cid], function (error, results, fields) {
  			if(error){
  				throw error;
  				res.send("0");
  			}else{
  				res.send("1");
  			}
  	});
	connection.end();
}

function namerepeatcheck(req,res){
	console.log(req.body);
	conn();
	connection.query("SELECT name FROM userinfo WHERE name=?",[req.body.name], function (error, results, fields) {
	if (error){throw error;
	}else{
		if(results.length>0){res.send("1");}
		else{res.send("0");}	
	  }
	});
	connection.end();
}

function cidrepeatcheck(req,res){
	console.log(req.body);
	conn();
	connection.query("SELECT cid FROM userinfo WHERE cid=?",[req.body.cid], function (error, results, fields) {
	if (error){throw error;
	}else{
		if(results.length>0){res.send("1");}
		else{res.send("0");}	
	  }
	});
	connection.end();
}

function pwcheck(req,res){
	console.log(req.body);
	conn();
	connection.query("SELECT password FROM user WHERE password=? AND name=?",[req.body.pw,req.body.user], function (error, results, fields) {
	if (error){throw error;
	}else{
		if(results.length>0){res.send("1");}
		else{res.send("0");}	
	  }
	});
	connection.end();
}

function pwedit(req,res){
	console.log(req.body);
	conn();
	connection.query("UPDATE user SET password = ? WHERE name = ?",[req.body.pw,req.body.user], function (error, results, fields) {
	if (error){throw error;
	}else{
		res.send("1");
	  }
	});
	connection.end();
}


function infoload(req,res){
	conn();
	var data=new Array();
	var x;
	connection.query("SELECT * FROM userinfo where name=?",[req.body.user],function (error, results, fields) {
	  if (error){throw error;
	  }else{
	  		//console.log(results.length);
		  	for(var i=0;i<results.length&&i<1;i++){
		  		x={
		  			"name":results[i].name,
		  			"phone":results[i].phone,
		  			"cid":results[i].cid,
		  			"truename":results[i].truename,
		  			"state":results[i].state,
		  			"email":results[i].email,
		  		}
		  		data.push(x);
		  	}
		  	json=JSON.stringify(data);
			res.send(json);
	  }	  	
	});
	connection.end();
}

function authedit(req,res){
	//console.log(req.body);
	conn();
	connection.query("UPDATE userinfo SET phone=?,email=?,cid=?,truename=? WHERE name = ?",
		[req.body.phone,req.body.email,req.body.cid,req.body.truename,req.body.user], function (error, results, fields) {
	if (error){throw error;
	}else{
		res.send("1");
	  }
	});
	connection.end();
}

function cidrepeatcheckforuser(req,res){
	//console.log(req.body);
	conn();
	connection.query("SELECT cid FROM userinfo WHERE cid=? AND name!=?",[req.body.cid,req.body.user], function (error, results, fields) {
	if (error){throw error;
	}else{
		if(results.length>0){res.send("1");}
		else{res.send("0");}	
	  }
	});
	connection.end();
}

function timetreatment(x){
	var date;var year=x.getYear()+1900;var month=x.getMonth()+1;var day=x.getDate();
	date=year+"-";
	if(month<10){
		date+="0";
	}
	date+=month+"-";
	if(day<10){
		date+="0";
	}
	date+=day;
	return date;
}

function line(req,res){
	conn();
	var data=new Array();
	var x;
	//console.log(req.query);
	var condition="SELECT * FROM class WHERE ";
	var convalue=new Array();	
	condition+="end like ?";
	convalue.push("%"+req.query.end+"%");
	if(req.query.start!="*"){
		condition+=" AND start=?";
		convalue.push(req.query.start);
	}
	if(req.query.startdate!="*"){
		condition+=" AND date=?";
		convalue.push(req.query.startdate);
	}
	if(req.query.starttime!="*"){
		condition+=" AND time>=?";
		convalue.push(req.query.starttime);
	}
	if(req.query.online=="true"){
		condition+=" AND onlinesale=?";
		convalue.push("是");
	}
	connection.query(condition,convalue,function (error, results, fields) {
		  if (error){throw error;
		  }else{
		  	for(var i=0;i<results.length;i++){
		  		x={
		  			"id":results[i].id,
		  			"end":results[i].end,
		  			"date":timetreatment(results[i].date),
		  			"time":results[i].time,
		  			"line":results[i].line,
		  			"start":results[i].start,
		  			"ticket":results[i].ticket,
		  			"type":results[i].type,
		  			"price":results[i].price,
		  			"notice":results[i].notice,
		  			"onlinesale":results[i].onlinesale,
		  		}
		  		data.push(x);
		  	}
			json=JSON.stringify(data);
			res.send(json);		
		  }
	});
	connection.end();
}


function book(req,res){
		console.log(req.body);
		conn();
		var end;var date;var time;var line;var type;var price;var user;var start;
		connection.query("UPDATE class SET ticket=ticket-1 WHERE id = ?",[req.body.bid], function (error, results, fields) {
			  if (error){
			  	throw error;
			  	res.send("0");
			  }
			});
		connection.query("SELECT * FROM class where id=?",[req.body.bid], function (error, results, fields) {
		  if (error){
		  	throw error;
		  	res.send("0");
		  }else{
		  	end=results[0].end;
		  	date=timetreatment(results[0].date);
		  	time=results[0].time;
		  	line=results[0].line;
		  	type=results[0].type;
		  	price=results[0].price;
		  	user=results[0].user;
		  	start=results[0].start;
		  	console.log(date);
		  	connection.query("INSERT INTO book(id,start,state,date,end,time,line,type,price,user) VALUES(?,?,?,?,?,?,?,?,?,?)",
		  		[,start,"正常",date,end,time,line,type,price,req.body.user], function (error, results, fields) {
		  			if(error){
		  				throw error;
		  				res.send("0");
		  			}else{
		  				res.send("1");
		  				connection.end();
		  			}
	  		});	

		  }
		});
}


function bookinfoload(req,res){
	conn();
	var data=new Array();
	var x;
	connection.query("SELECT * FROM book where user=?",[req.body.user],function (error, results, fields) {
	  if (error){throw error;
	  }else{
	  		//console.log(results.length);
		  	for(var i=0;i<results.length;i++){
		  		x={
				  	"end":results[0].end,
				  	"date":timetreatment(results[0].date),
				  	"time":results[0].time,
				  	"line":results[0].line,
				  	"type":results[0].type,
				  	"price":results[0].price,
				  	"user":results[0].user,
				  	"id":results[0].id,
				  	"notice":results[0].notice,
				  	"state":results[0].state,
				  	"start":results[0].start
		  		}
		  		data.push(x);
		  	}
		  	json=JSON.stringify(data);
			res.send(json);
	  }	  	
	});
	connection.end();
}

function returnticket(req,res){
	conn();
	connection.query("UPDATE book SET state='待退款' WHERE id = ? AND user=?",[req.body.rid,req.body.user], function (error, results, fields) {
	  if (error){
	  	throw error;
	  	res.send("0");
	  }else{
	  	res.send("1");
	  }
	});
	connection.end();
}

module.exports = {
	login:login,
	date:date,
	ticket:ticket,
	regist:regist,
	namerepeatcheck:namerepeatcheck,
	cidrepeatcheck:cidrepeatcheck,
	pwcheck,pwcheck,
	pwedit,pwedit,
	infoload,infoload,
	authedit,authedit,
	cidrepeatcheckforuser,cidrepeatcheckforuser,
	line,line,
	book,book,
	bookinfoload,bookinfoload,
	returnticket,returnticket
};