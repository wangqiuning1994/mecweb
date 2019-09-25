$(document).ready(function(){
	var i = 0;
	var clone = $(".bannerContainer .img li").first().clone();//克隆第一张图片
	$(".bannerContainer .img").append(clone);//复制到列表最后
	var size = $(".bannerContainer .img li").size();
   
	for (var j = 0; j < size-1; j++) {
		$(".bannerContainer .num").append("<li></li>");
	}
	$(".bannerContainer .num li").first().addClass("on");

	/*自动轮播*/
	var t = setInterval(function () { i++; move();},3000);
	
	/* /*鼠标悬停事件*/
	$(".bannerContainer").hover(function () {
		clearInterval(t);//鼠标悬停时清除定时器
	}, function () {
		t = setInterval(function () { i++; move(); }, 3000); //鼠标移出时清除定时器
	});

	/*鼠标滑入原点事件*/

	$(".bannerContainer .num li").hover(function () {
		var index = $(this).index();//获取当前索引值
		i = index;
		$(".bannerContainer .img").stop().animate({ left: -index * 1100 }, 500);
		$(this).addClass("on").siblings().removeClass("on");
	});

	/*向左按钮*/
	$(".bannerContainer .btn_l").click(function () {
		i--;
		move();
	})

	/*向右按钮*/
	$(".bannerContainer .btn_r").click(function () {
		i++;
		move();
	}) 

	/*移动事件*/
	function move() {
		if (i == size) {
			$(".bannerContainer .img").css({ left: 0 });
			i = 1;
		}
		if (i == -1) {
			$(".bannerContainer .img").css({ left: -(size - 1) * 1100 });
			i = size - 2;
		}
		$(".bannerContainer .img").stop().animate({ left: -i * 1100 }, 500);
		if (i == size - 1) {
			$(".bannerContainer .num li").eq(0).addClass("on").siblings().removeClass("on");
		} else {
			$(".bannerContainer .num li").eq(i).addClass("on").siblings().removeClass("on");
		}
	}
});

