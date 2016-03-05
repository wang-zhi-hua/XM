$(function(){
	var bannerimg=$(".bannerimg");
	var btn=$(".btn");
	var index=0;
	function demo(type){
		if(type=="right"){
			index++;
			if(index>=bannerimg.length){
				index=0;
			}
		}else if(type=="left"){
			index--;
			if(index<=-1){
				index=bannerimg.length-1;
			}
		}
		bannerimg.hide();
		bannerimg.eq(index).fadeIn();
		btn.css({background:"#4e4442"});
		btn.eq(index).css({background:"#fff"});
	}

	var t=setInterval(function(){
		demo("right")
	},2000);

$(".bannerimg").hover(function(){
	clearInterval(t);
},function(){
	t=setInterval(function(){
		demo("right")
	},2000);
})

$(".leftbtn").hover(function(){
	clearInterval(t);
})
$(".leftbtn").click(function(){
	demo("left");
})

$(".rightbtn").hover(function(){
	clearInterval(t);
})
$(".rightbtn").click(function(){
	demo("right");
})

btn.each(function(){
    var aa=$(this).index();
    btn.eq(aa).hover(function(){
        btn.eq(aa).each(function(){
          clearInterval(t);
        bannerimg.hide();
        btn.css("background","#c4a349");
      })
      btn.eq(aa).css("background","#fff");
      bannerimg.eq(aa).fadeIn();
    },function(){
       t=setInterval(function(){
        demo("right");
      },2000);
    })  
  })




var as=$(".words");
as.hover(function(){
	$(this).find("div").stop();
	$(this).find("div").slideDown(200);
},function(){
	$(this).find("div").stop();
	$(this).find("div").slideUp(200);
})


var bannerpf=$(".banner-bottonbox");
bannerpf.hover(function(){
	$(this).find(".rigpf").css({display:"block"});
},function(){
	$(this).find(".rigpf").css({display:"none"});
})


var starconebox=$(".starconebox");
var num=0;
function move(){
		num++;
		if(num==2){
			starconebox.animate({left:(-1226)*num},function(){
				starconebox.css({left:0});
			})
			num=0;
		}else{
			starconebox.animate({left:(-1226)*num});
		}
}
var s=setInterval(move,5000);


var s2=$(".s2");
var s1=$(".s1");
var strbtn=$(".strbtn");
function mol(ty){
	if (ty=="left") {
		if(num==1){
			num--;
			starconebox.animate({left:(-1226)*num});
			strbtn.css({color:"#ccc",fontWeight:"normal"});
			s1.css({color:"#ff6700",fontWeight:"bold"});
		}
	}
	if (ty=="right") {
		if(num==0){
			num++;
			starconebox.animate({left:(-1226)*num});
			strbtn.css({color:"#ccc",fontWeight:"normal"});
			s2.css({color:"#ff6700",fontWeight:"bold"});
		}
	}

}

s2.click(function(){
	clearInterval(s);
	mol("left");
})
s1.click(function(){
	clearInterval(s);
	mol("right");
})

var dapxx=$(".dapei-con-ri1");
var zblink=$(".zblink");
var dptitleright=$(".f1 .dptitleright");
 dptitleright.each(function(i,obj){
    var aa=$(this).index();
    dptitleright.eq(aa).mouseover(function(){
    	dapxx.each(function(j,obj){
    		dapxx.css({zIndex:"2"});
    		zblink.css({color:"#333",borderBottom:"none"});
     	})
    	zblink.eq(aa).css({color:"#ff6700",borderBottom:"2px solid #ff6700"});
    	dapxx.eq(aa).css({zIndex:"3"});
    })
   })




})