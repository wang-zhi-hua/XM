//兼容函数

//第一个获取类名函数
//ie8中不能兼容识别ClassName的函数
//getClass：函数体
//classname：要找到的类名
//obj：要找的类名的盒子范围
function getClass(classname,obj){
            var obj = obj || document;//判断输入的范围，如果没有输入的话就默认document在全文档中查找
            if(obj.getElementsByClassName){//判断能不能识别ClassName
                  return obj.getElementsByClassName(classname);//可以识别则返回classname的值
            }else{
                  var all=obj.getElementsByTagName("*");//获取obj里所有的标签
                  var arr=[];//声明一个新数组
                  for(var i=0;i<all.length;i++){//遍历all的所有元素
                        if(checkRel(all[i].className,classname)){//调用checkRel函数，找到需要的标签，其中str=all[i].className,也就是获取他的标签名
                              arr.push(all[i]);//将查找到的赋值进新数组里
                        }
                  }
                  return arr;//返回新数组
            }
}
      //“inner one”  ["inner","one"]
      function checkRel(str,val){//str的值是all的类名集合的字符串，val表示的是上面的函数输入的需要找到的类名，想找的类名
            var newarr=str.split(" ");//将字符串也就是all[i]的类名转换成数组
            for(var j=0;j<newarr.length;j++){//遍历这个新数组
                  if(newarr[j]==val){//如果新的newarr[j]值等于val也就是等于上面的classname
                        return true;//则返回真
                  }
            }
            return false;//当条件都不满足时，也就是没有找到类名时，则返回假。
      }







//可以获取与设置纯文本的兼容函数
//obj：那个对象用这个方法
//val:接受第二个实参，表示设置一个文本
//用的时候要保证文本中要有内容，包括&nbsp;
function getText(obj,val) {
      if (val==undefined) {//如果val为undefined，表示只有一个参数，这个函数实现的功能就是获取文本
      if(obj.innerText){//如果为真是IE8浏览器
           return obj.innerText;
      }else{//为w3c浏览器
            return obj.textContent;
      }
      }else{//如果val不是undefined，则表示要赋值
            if(obj.innerText||obj.innerText==""){//如果为真是IE8浏览器，当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本
           obj.innerText=val;
      }else{//为w3c浏览器
           obj.textContent=val;
      }
      }
}


//getText(box2,getText(box1));   将第一个的内容给了第二个，是属于函数外的点击按钮的方法




//获取通用样式

function getStyle(obj,attr){
      if(obj.currentStyle){//IE8
            return obj.currentStyle[attr];
      }else{//ff
            return getComputedStyle(obj,null)[attr];
      }
}



/*
     $(".box");类名
     $("#first");ID名
     $("div");标签名
      */
function $(select,obj) {
  var obj=obj||document;
      if(typeof select=="string"){
        //去掉字符串前后的空格
        select=select.replace(/^\s*|\s*$/g,"")
            if(select.charAt(0)=="."){//类名
                  return getClass(select.slice(1),obj);
            }else if(select.charAt(0)=="#"){//Id名
                  return obj.getElementById(select.slice(1));
            }else if(/^[a-z|1-6]{1,10}$/g.test(select)){//标签名
                return obj.getElementsByTagName(select);
            }
      }else if(typeof select=="function"){//表示是一个函数。
        window.onload=function(){
          select();
        }
      }
}



/*在外部调用时，要保存在一个变量里，类名需加下标来判断才能获取到，id是单只，不需要下标就直接可以获取到，标签名也是集合，访问其中一个需加下标
   var t=$(".box")[0];
   alert(getText(t));
   var t=$("#first");
   alert(getText(t));
   var t=$("div");
   alert(t.length);*/



/*
5.getChild(parent);
  获取元素子节点的兼容函数
  parent:要获取子元素的父容器
  arr：保存子元素的数组
  "a":获取元素子节点的兼容函数
  "b":获取元素+文本节点

  原理：先获取所有的儿子，然后根据节点的类型判断，如果为1，表示是元素节点，保存在数组里。
*/
function getChilds(parent,type){
  var type=type||"a";
  var childs=parent.childNodes;//获取所有的儿子
  var arr=[];
  for (var i = 0; i < childs.length; i++) {
    if(type=="a"){
      if(childs[i].nodeType==1){
      arr.push(childs[i]);
    }
  }else if(type=="b"){
    if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
          arr.push(childs[i]);
        }
  }
  }
  return arr;
}



/*
6.获得第一个子节点
*/
function getFirst (parent) {
    return getChilds(parent)[0];
}


//7.获得最后一个子节点
function getLast (parent) {
    return getChilds(parent)[getChilds(parent).length-1];
}



//8.获得指定子节点,num：下标为num的子节点
function getNum (parent,num) {
    return getChilds(parent)[num];
}



//9.获得下一个兄弟节点
function getNext (obj) {
  var next=obj.nextSibling;
  if(next==null){
    return false;
  }
  while(next.nodeType==3||next.nodeType==8){
    next=next.nextSibling;
    if(next==null){
      return false;
    }
  }
  return next;
}



//10.获得上一个兄弟节点
function getUp (obj) {
  var up=obj.previousSibling;
  if(up==null){
     return false;
  }
  while(up.nodeType==3||up.nodeType==8){
    up=up.previousSibling;
    if(up==null){
      return false;
    }
  }
  return up;
}




/*
11.插入到某个对象之后
插入到下一个对象之前
原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前（插入到下一个对象之前）
obj1:要插入的那个对象
obj2：被插入的那个对象
*/
Object.prototype.insertAfter=function  (obj1,obj2) {
  var next=getNext(obj2);
  if(next){
    this.insertBefore(obj1,next);
  }else{
    this.appendChild(obj1);
  }
}

// 调用方式：document.body.insertAfter(div,link);



/*
12.获取滚动条与页面顶部的距离
*/
function getScrollT(){
  var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
     return scrollT;
}


/*
13.同一个元素添加多个事件的兼容函数
 obj:给那个对象添加
 ev：什么事件
 fun：时间的处理程序
*/
function addEvent (obj,ev,fun) {
  if(obj.addEventListener){//火狐的处理
    return obj.addEventListener(ev,function(){
      fun.call(obj);
    },false);
  }
  else{
    return obj.attachEvent("on"+ev,function(){
      fun.call(obj);
    });//在IE8中，this，不指当前对象，值得是window。
  }
}




/*
14.同一个元素删除多个事件的兼容函数
 obj:给那个对象添加
 ev：什么事件
 fun：时间的处理程序
*/
function removeEvent (obj,ev,fun) {
  if(obj.removeEventListener){//火狐的处理
    return obj.removeEventListener(ev,function(){
      fun.call(obj);
    },false);
  }
  else{
    return obj.detachEvent("on"+ev,function(){
      fun.call(obj);
    });//在IE8中，this，不指当前对象，值得是window。
  }
}




/*************************************/
function getCW () {
  return document.documentElement.clientWidth;
}

/*************************************/
function getCH () {
  return document.documentElement.clientHeight;
}




/*
15.拖拽一个对象
cw:浏览器的宽
ch:浏览器的高
ow：对象的宽
oh：对象的高
ox：事件到事件源也就是obj的左边left的值
oy：事件到事件源也就是obj的上边top的值
cx：鼠标事件到浏览器左的距离
cy：鼠标事件到浏览器上的距离
*/

function drag(obj){
        var cw=getCW();
        var ch=getCH();
        var ow=obj.offsetWidth;
        var oh=obj.offsetHeight;

    obj.onmousedown=function(e){//当鼠标按下的时候
      var ev=e||window.event;//获取鼠标事件，解决了火狐与ie8的兼容问题
          var ox=ev.offsetX;//获取到事件到事件源也就是obj的左边left的值
          var oy=ev.offsetY;//获取到事件到事件源也就是obj的上边top的值

          //组织浏览器的默认行为：
          if (ev.preventDefault){
            ev.preventDefault();//阻止默认浏览器动作(W3C)
          }else{
            ev.returnValue = false;
          }
          //事件委托的思想
          document.onmousemove=function(e){//鼠标的移动事件
            var ev=e||window.event;
            var cx=ev.clientX;//获取鼠标事件到浏览器的距离
            var cy=ev.clientY;//获取鼠标事件到浏览器的距离
            var newx=cx-ox;//盒子移动的距离就是鼠标到浏览器的距离减去鼠标到事件源的距离
            var newy=cy-oy;
            if(newx<=0){
              newx=0;
            }
            if(newx>=(cw-ow)){
              newx=(cw-ow);
            }
            if(newy<=0){
              newy=0;
            }
            if(newy>=(ch-oh)){
              newy=(ch-oh);
            }
            obj.style.left=newx+"px";//将鼠标移动的距离也就是盒子要移动的距离赋值给盒子
            obj.style.top=newy+"px";

          }
    }
    obj.onmouseup=function(){
      document.onmousemove=null;
    }
}





//16.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/


/*
17.得到某个日期距今的倒计时差
*/
function getCha (news,now) {
      var arr=[];
      var cha=(news.getTime()-now.getTime())/1000;
      var day=parseInt(cha/(60*60*24));
      arr.push(day);
      cha%=(60*60*24);
      var hours=parseInt(cha/(60*60));
      arr.push(hours);
      cha%=(60*60);
      var minute=parseInt(cha/60);
      arr.push(minute);
      cha%=60;
      var sec=parseInt(cha);
      arr.push(sec);
      return arr;
}



/*18 obj--哪个对象添加滚轮事件 
upfun--- 处理滚轮向上的函数  
downfun---处理滚轮向下的函数*/
function mouseWheel(obj,upfun,downfun){
  if(obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
  }
  else if(obj.addEventListener){
    obj.addEventListener("mousewheel",scrollFn,false);
    //chrome,safari -webkit-
    obj.addEventListener("DOMMouseScroll",scrollFn,false);
    //firefox -moz-
  }
  function scrollFn(e){
    var ev=e||window.event;


    if (ev.preventDefault ){
      ev.preventDefault(); //阻止默认浏览器动作(W3C)
    }
    else{
         ev.returnValue = false;//IE中阻止函数器默认动作的方式
    }

    var num=ev.detail||ev.wheelDelta;
    if(num==(-3)||num==120){
      if(upfun){
        upfun();
      }
    }
     if(num==(3)||num==(-120)){
      if(downfun){
        downfun();
      }
    }

  }
  }




/*
19.选项卡的函数调用
选项卡内容布局，类名必须是title，con，下面是选项卡内容的js索要调用的函数如何调用是下一个注释
  
  <div class="tabbox" tab="true">
    <div class="titlebox">
      <div class="title" style="font-weight:bold">1111</div>
      <div class="title">2222</div>
      <div class="title">3333</div>
      <div class="title">4444</div>
    </div>
    <div class="conbox">
      <div class="con one">11111</div>
      <div class="con">22222</div>
      <div class="con">33333</div>
      <div class="con">44444</div>
    </div>
  </div>
*/
  function tab(obj){
      var title=$(".title",obj);
      var con=$(".con",obj);
      for (var i = 0; i < title.length; i++) {
        title[i].index=i;
        title[i].onclick=function(){
          for (var j = 0; j < con.length; j++) {
            con[j].style.display="none";
            title[j].style.fontWeight="normal";
          }
          title[this.index].style.fontWeight="bold";
          con[this.index].style.display="block";
        }
      }
    }

/*
选项卡函数的调用，tab是哪个盒子要用选项卡就加在最大的盒子外面  
    var all=document.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
      if(all[i].getAttribute("tab")=="true"){
        tab(all[i]);
      }
    }
*/

/*
20.不传参数的属性的获取和设置

attr("obj","aa");//获取
attr("obj","aa":"cc");//设置
attr("obj","aa","cc");//设置

*/
function attr(){
  var obj=arguments[0];
  if(arguments.length==2){
    if(typeof arguments[1]=="string"){
      return obj.getAttribute(arguments[1]);
    }else if(typeof arguments[1]=="object"){
      for (var i in arguments[1]) {
        if(i!="insertAfter"){
         obj.setAttribute(i,arguments[1][i]); 
        }
      }
    }
  }else if(arguments.length==3){
    obj.setAttribute(arguments[1],arguments[2]);
  }
}
