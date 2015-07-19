window.onload = initPage;
function initPage(){
    var imgs=document.getElementsByTagName('img');
    for(var i=0;i<imgs.length;i++){
      imgs[i].onclick=function(){
        var imgDetail=document.getElementById('itemDetail');
        imgDetail.src="images/"+this.title+"-detail.jpg";
        getDetails(this.title);
        //this.title必须传入,getDetails和initPage都是全局的
      }
    }  
}
function getDetails(itemName){
	//request是全局变量，若设为局部变量，则displayDetail访问不到。
	 request=createRequest();
	if(request==null){
		alert("不能创建请求对象");
		return;
	}
	var url="getDetails.php?ImageID="+escape(itemName);
	//escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： * @ - _ + . / 。其他所有的字符都会被转义序列替换。
	request.open("GET",url,true);
	request.onreadystatechange=displayDetails;
	request.send(null);
}
//回调函数
function displayDetails(){
	if(request.readyState==4){
		if(request.status==200){
			var detailDiv=document.getElementById('description');
			detailDiv.innerHTML=request.responseText;
		}
	}
}
//创建请求对象
function createRequest(){
	var request;
  try{
  	request=new XMLHttpRequest(); 
  }catch(tryMS){
  	try{
  		request=new ActiveXObject('Msxml12.XMLHTTP');
  	}catch(otherMS){
  		try{
  			request=new ActiveXObject('Microsoft.XMLHTTP');
  		}catch(failed){
  			request=null;
  		}
  	}
  }
  return request;
}