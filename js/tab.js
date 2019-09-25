//绘制饼图
function drawCircle(canvasId, data_arr, color_arr, text_arr, total) {
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
 
    var radius = c.height / 2 - 15;
    var ox = radius + 20 + 0.5, oy = radius + 15 + 0.5;

    var width = 30, height = 10;
    var posX = ox * 2 + 20 + 0.5, posY = 70 + 0.5;
    var textX = posX + width + 5 + 0.5, textY = posY + 10 + 0.5;
 
    var startAngle = 0; 
    var endAngle = 0; 
    for (var i = 0; i < data_arr.length; i++){
        //绘制饼图
        endAngle = endAngle + data_arr[i] * Math.PI * 2; 
        ctx.fillStyle = color_arr[i];
        ctx.beginPath();
        ctx.moveTo(ox, oy); 
        ctx.arc(ox, oy, radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fill();
        startAngle = endAngle; 
 
        //绘制比例图及文字
        ctx.fillStyle = color_arr[i];
        ctx.fillRect(posX, posY + 20 * i, width, height);
//        ctx.moveTo(posX, posY + 20 * i);
        ctx.font = 'bold 18px 宋体';  
        ctx.fillStyle = color_arr[i]; 
        var percent = text_arr[i] + "：" + total * data_arr[i] + "G";
        ctx.fillText(percent, textX, textY + 20 * i);
    }
	if(canvasId == "canvas_ram"){
		ctx.font = 'bold 18px 宋体';  
		ctx.fillStyle = color_arr[0]; 
		ctx.fillText("内存使用情况:", textX-35.5, textY - 20);
	}else{
		ctx.font = 'bold 18px 宋体';  
		ctx.fillStyle = color_arr[0]; 
		ctx.fillText("硬盘使用情况:", textX-35.5, textY - 20);
	}
}
 //饼图数据填充
function setCircle(order,mobiletomec,statusofmec) {
    //获取基站与无人机数目
//	var storage = window.localStorage;
//	var numofmec = storage.getItem("numofmec");
	var numofmobile = 0;
	for (var i = 0; i < 5; i++) {
		if(mobiletomec[i] == (order+1)){
			numofmobile = 2;
		}
	}
    //比例数据和颜色
	var data_ram = [0.25, 0.25, 0.5];
	var data_rom = [0.2, 0.2, 0.6];
	if (numofmobile == 1){
		data_ram = [0.25, 0, 0.75];
		data_rom = [0.2, 0, 0.8];
	}
	if (numofmobile == 0){
		data_ram = [0, 0, 1];
		data_rom = [0, 0, 1];
	}
	if (statusofmec[order] == 0){
		data_ram = [0, 0, 1];
		data_rom = [0, 0, 1];
	}
    var color_arr = ["#31639c","#597bac","#9dadcd"];//"#bec8de"
    var text_arr = ["应用1","应用2", "空闲"];
	var sumofrom = 100;
	var sumofram = 8;
 
    drawCircle("canvas_ram", data_ram, color_arr, text_arr, sumofram);
	drawCircle("canvas_rom", data_rom, color_arr, text_arr, sumofrom);
}
//绘制上文字
function setText(order){
    var titlediv = document.getElementById("titleofmec");
	var titlea = titlediv.getElementsByTagName("a")[0];
	titlea.innerHTML = "MEC" +(order+1)+" 控制面板";
}
//绘制开关
function setSwitch(order,statusofmec){
    if(statusofmec[order] == 0){
		switch1.className = "close1";
		switch2.className = "close2";
	}else{
		switch1.className = "open1";
		switch2.className = "open2";
	}
}
//用于增加li的函数
function addli(ull,textofli) {
    var newli = document.createElement("li");
	newli.innerHTML = textofli;
	ull.appendChild(newli);
}
//绘制运行状况yun
function setTextofyun(order,mobiletomec,statusofmec){
    var yundiv = document.getElementById("yun");
	var ulofyun = yundiv.getElementsByTagName("ul")[0];
	ulofyun.innerHTML = "";
	if (statusofmec[order] == 1){
		var numofmobile = 0;
		for (var i = 0; i < 5; i++) {
			if(mobiletomec[i] == (order+1)){
				numofmobile++;
			}
		}
		if(numofmobile < 3 ){
			addli(ulofyun,"工作");
			var liofyun = ulofyun.getElementsByTagName("li")[0];
			liofyun.style.backgroundColor = "rgba(0,184,0,0.8)";
		}else{
			addli(ulofyun,"繁忙");
			var liofyun = ulofyun.getElementsByTagName("li")[0];
			liofyun.style.backgroundColor = "rgba(255, 46, 22, 1.0)";
		}
	}else{
		addli(ulofyun,"关机");
		var liofyun = ulofyun.getElementsByTagName("li")[0];
		liofyun.style.backgroundColor = "rgba(255,255,255,0.4)";
	}
}
//绘制协作状况coop
function setTextofcoop(order,mobiletomec,statusofmec){
    var coopdiv = document.getElementById("coop");
	var ulofcoop = coopdiv.getElementsByTagName("ul")[0];
	ulofcoop.innerHTML = "";
	if (statusofmec[order] == 1){
		var numofmobile = 0;
		for (var i = 0; i < 5; i++) {
			if(mobiletomec[i] == (order+1)){
				numofmobile++;
			}
		}
		if(numofmobile>2){
			for (var i = 0; i < 3; i++) {
				if(order != i){
					var textofcoop = "MEC" + (i+1);
					addli(ulofcoop,textofcoop);
				}
			}
		}
	}
}
//绘制应用详情app
function setTextofapp(order,mobiletomec,statusofmec){
    var appdiv = document.getElementById("app");
	var ulofapp = appdiv.getElementsByTagName("ul")[0];
	ulofapp.innerHTML = "";
	if (statusofmec[order] == 1){
		var numofmobile = 0;
		for (var i = 0; i < 5; i++) {
			if(mobiletomec[i] == (order+1)){
				numofmobile++;
			}
		}
		if(numofmobile == 0){
			addli(ulofapp,"自适应");
		}else{
			addli(ulofapp,"自适应");
			addli(ulofapp,"视频处理");
		}
	}
}
//绘制用户详情ue
function setTextofue(order,mobiletomec,statusofmec){
	
    var uediv = document.getElementById("ue");
	var ulofue = uediv.getElementsByTagName("ul")[0];
	ulofue.innerHTML = "";
	if (statusofmec[order] == 1){
		var numofmobile = 0;
		for (var i = 0; i < 5; i++) {
			if(mobiletomec[i] == (order+1)){
				addli(ulofue,"无人机"+(i+1));
			}
		}
	}
}
//更新选项卡的内容
function update(i,mobiletomec,statusofmec){
	setCircle(i,mobiletomec,statusofmec);
	setText(i);
	setSwitch(i,statusofmec);
	setTextofyun(i,mobiletomec,statusofmec);
	setTextofcoop(i,mobiletomec,statusofmec);
	setTextofapp(i,mobiletomec,statusofmec);
	setTextofue(i,mobiletomec,statusofmec);
}
//无人机动态图
function lineChart(o) {
	this.id = o.id;
	this.canvas = document.getElementById(o.id);
	this.color =  "#31639c";
	this.value = 0;
	this.canvas.width  = this.width = 300;//获取绑定宽度
	this.canvas.height = this.height = 250;//获取高度宽度 
	this.context = this.canvas.getContext("2d");
	this.values = [];
	this.last = this.width - 1;//最后一个值的索引
	for (var i = 0; i < this.width; i++) {//初始化值
		this.values.push(this.height);
	}
	this.draw = function (value) {
		this.value = value;//记录当前值
		this.context.clearRect(0, 0, this.width, this.height);//清空
		this.context.lineWidth = 2.0;
		this.context.beginPath();//开辟新的绘制路径
		this.context.moveTo(0,this.values[0]);//绘制起点 
		for (var i = 0; i < this.last; i++) {
			this.values[i] = this.values[i + 1];//移动索引值
			this.context.lineTo(i, this.values[i]);//结束位置
		}
		this.values[this.last] = this.height - value;//获取最后索引一个值
		this.context.lineTo(this.last, this.values[this.last]);//设置最后一个索引位置
		this.context.strokeStyle =  "#31639c";
		this.context.stroke();
	}
}

//获取statusofmec
function getstatusofmec(updatemec){
	var statusofmec = [0,0,0];
	if(updatemec == 3){
		statusofmec = [1,1,1];
	}else if(updatemec == 2){
		statusofmec = [1,1,0];
	}else if(updatemec == 1){
		statusofmec = [1,0,0];
	}else{
		statusofmec = [0,0,0];
	}
	return statusofmec;
}
//upgate myLi
function updatemyLi(myLi,id){
	if(id == null){
		var n = 0;
	}else{
		var n = id - "0";
	}
	var i = 0;
	while(i<n){
		myLi[i].style.display = "inline";
		i++;
	}
	while(i<myLi.length){
		myLi[i].style.display = "none";
		i++;
	}
}
//播放视频用
function play(i,myvideo){
	var list = ["video/1-3.mp4","video/1-2.mp4","video/1-1.mp4"]; 
	var num = myvideo.currentTime;
	myvideo.src = list[i];
	myvideo.load();
	myvideo.currentTime = num;
	myvideo.play();
	//console.log(num);
}
function fun(i){
	var myvideo = document.getElementById("myvideo"+i);
	myvideo.load();
	myvideo.play();
}
//选项卡切换和内容切换
window.onload = function() {

    for (var i = 0; i < myLi.length; i++) {
        myLi[i].index = i;
        myLi[i].onclick = function() {
            for (var j = 0; j < myLi.length; j++) {
                myLi[j].className = "off";
            }
            this.className = "on";
			var index = $(this).index();
			update(index,mobiletomec,statusofmec);
        }
    }
	
	var switch2=document.getElementById("switch2");
	var switch1=document.getElementById("switch1");
	switch1.onclick=function(){
		switch1.className=(switch1.className=="close1")?"open1":"close1";
		switch2.className=(switch2.className=="close2")?"open2":"close2";
		for (var j = 0; j < myLi.length; j++) {
            if(myLi[j].className == "on"){
				statusofmec[j] = (statusofmec[j]+1)%2;
				check(statusofmec);
				update(j,mobiletomec,statusofmec);
			}
        }
	}
	//无人机部分
	var demo11 = new lineChart({
		id: "demoofpage11",
		color: "#31639c",
	});
	var demo21 = new lineChart({
		id: "demoofpage21",
		color: "#31639c",
	});
	var demo31 = new lineChart({
		id: "demoofpage31",
		color: "#31639c",
	});
	var demo41 = new lineChart({
		id: "demoofpage41",
		color: "#31639c",
	});
	var demo51 = new lineChart({
		id: "demoofpage51",
		color: "#31639c",
	});
	var videochoice1 = 3;
	var videochoice2 = 3;
	var videochoice3 = 3;
	var videochoice4 = 3;
	var videochoice5 = 3;
	
	function judge(val){
		if(val < 100){
			return 1080;
		}else {
			if(val < 200){
				return 720;
			}else{
				return 360;
			}
		}
	}
	function judge2(val){
		if(val < 100){
			return '良好';
		}else {
			if(val < 200){
				return '一般';
			}else{
				return '较差';
			}
		}
	}
	setInterval(function () {
		//1
		var val11 = mobiledistance[0];
		var val110 = judge2(val11);
		if(val11!=0) document.getElementById('titleofpage11').innerHTML = `信道质量：${val110}`;
		demo11.draw(val11*0.5);
		var val12 = judge(val11);
		if(val11!=0) document.getElementById('titleofpage12').innerHTML = `上传视频码率(P)：${val12}`;
		var myvideo12 = document.getElementById("myvideo1");
		if( val11 != 0 && videochoice1 != (val12/360)-1){
			videochoice1 = (val12/360)-1;
			play(videochoice1,myvideo12);
		}
		//2
		var val21 = mobiledistance[1];
		var val210 = judge2(val21);
		if(val21!=0) document.getElementById('titleofpage21').innerHTML = `信道质量：${val210}`;
		demo21.draw(val21*0.5);
		var val22 = judge(val21);
		if(val21!=0) document.getElementById('titleofpage22').innerHTML = `上传视频码率(P)：${val22}`;
		var myvideo22 = document.getElementById("myvideo2");
		if( val21 != 0 && videochoice2 != (val22/360)-1){
			videochoice2 = (val22/360)-1;
			play(videochoice2,myvideo22);
		}
		//3
		var val31 = mobiledistance[2];
		var val310 = judge2(val31);
		if(val31!=0) document.getElementById('titleofpage31').innerHTML = `信道质量：${val310}`;
		demo31.draw(val31*0.5);
		var val32 = judge(val31);
		if(val31!=0) document.getElementById('titleofpage32').innerHTML = `上传视频码率(P)：${val32}`;
		var myvideo32 = document.getElementById("myvideo3");
		if( val31 != 0 && videochoice3 != (val32/360)-1){
			videochoice3 = (val32/360)-1;
			play(videochoice3,myvideo32);
		}
		//4
		var val41 = mobiledistance[3];
		var val410 = judge2(val41);
		if(val41!=0) document.getElementById('titleofpage41').innerHTML = `信道质量：${val410}`;
		demo41.draw(val41*0.5);
		var val42 = judge(val41);
		if(val41!=0) document.getElementById('titleofpage42').innerHTML = `上传视频码率(P)：${val42}`;
		var myvideo42 = document.getElementById("myvideo4");
		if( val41 != 0 && videochoice4 != (val42/360)-1){
			videochoice4 = (val42/360)-1;
			play(videochoice4,myvideo42);
		}
		//5
		var val51 = mobiledistance[4];
		var val510 = judge2(val51);
		if(val51!=0) document.getElementById('titleofpage51').innerHTML = `信道质量：${val510}`
		demo51.draw(val51*0.5);
		var val52 = judge(val51);
		if(val51!=0) document.getElementById('titleofpage52').innerHTML = `上传视频码率(P)：${val52}`
		var myvideo52 = document.getElementById("myvideo5");
		if( val51 != 0 && videochoice5 != (val52/360)-1){
			videochoice5 = (val52/360)-1;
			play(videochoice5,myvideo52);
		}
	}, 50);
	
    for (var i = 0; i < myLi2.length; i++) {
        myLi2[i].index = i;
        myLi2[i].onclick = function() {
            for (var j = 0; j < myLi2.length; j++) {
                myLi2[j].className = "off";
				var idofpage = "page"+(j+1);
				document.getElementById(idofpage).className = "off";
            }
            this.className = "on";
			var index2 = $(this).index();
			var idofpage = "page"+(index2+1);
			document.getElementById(idofpage).className = "on";
        }
    }
}