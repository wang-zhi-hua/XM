window.onload=function(){


//banner轮播
var bannerimg=$(".bannerimg");
var btn=$(".btn");
var num=1;
function move(){
	if(num==5){
		num=0;
	}
	for (var i = 0; i < bannerimg.length; i++) {
		bannerimg[i].style.zIndex=2;
		btn[i].style.cssText="border-color:#857D7D;background:#4E4442;";
	}
	bannerimg[num].style.zIndex=3;
	btn[num].style.cssText="border-color:#838187;background:#fff;";
	num++;
}

var a=setInterval(move,2000);
for (var i = 0; i < btn.length; i++) {
	btn[i].index=i;
	hover(btn[i],function(){
		clearInterval(a);
		for (var j = 0; j < bannerimg.length; j++) {
			bannerimg[j].style.zIndex=2;
			btn[j].style.cssText="border-color:#857D7D;background:#4E4442;";
	}
		bannerimg[this.index].style.zIndex=3;
	    btn[this.index].style.cssText="border-color:#838187;background:#fff;";
	},function(){
		a=setInterval(move,2000);
		num=this.index;
	})
};



var strbtn=$(".strbtn");
for (var i = 0; i < strbtn.length; i++) {
	strbtn[i].index=i;
	hover(strbtn[i],function(){
		strbtn[this.index].style.color="#ff6700";
		strbtn[this.index].style.fontWeight="bold";
	},function(){
		if(this.index==1){
			strbtn[this.index].style.color="#999";
		    strbtn[this.index].style.fontWeight="bold";
		}else{
			strbtn[this.index].style.color="#ccc";
		    strbtn[this.index].style.fontWeight="normal";
	    }
	})
};







}