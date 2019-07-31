var tag=document.getElementById("tag");
for(var i=1;i<tag.children.length;i++){
	tag.children[i].children[0].children[0].onclick=function(){
		for(var i=1;i<tag.children.length;i++){
					tag.children[i].children[0].children[0].className="";
		}
		this.className="chosen";
	}
}
window.onhashchange=function(){
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}