(function (window, undefined) {
	require.config({
		paths: {
			'jQ': 'jquery-1.9.1.min',
			'common': 'common_min'
		},
		shim: {
			'common': {deps: ['jQ']}
		}
	});
	require(['common'], function () {

		try{
            var $tab=$('.detail-tab');
            $tab.on('click','.tab-tit-item:not(.active)',function(){
				var $this=$(this),
					$index=$this.index();

				$this.addClass('active')
					.siblings('.tab-tit-item').removeClass('active');
				$tab.find('.tab-item').eq($index).show()
					.siblings().hide();
			});
			
		}catch (ex){
			window.console && console.log(ex);
		}

	    $cart_list = $('.sku-detail');
        $cart_list.on('click', '.opt-sku-select', function(){
            $(this).addClass('active')
                .siblings().removeClass('active');
        });
        $cart_list.on('click', '.buy-cart', function(){
            var $this=$('.buy-animation');
            var $cart=$('.buy-cart');
            $this.css('width','32px');
			x=$cart.offset().left;
            y=$cart.offset().top;            
            $this.css({'left': x+44,'top': y}).animate({'left': x-22,'top': 62},500);
            $this.animate({'width':'0px'},10);
            $this.animate({'left':x+44,'top':y},1);
		});
		$cart_list.on('click', '.buy-cart-df', function(){
            var $this=$('.buy-animation-df');
            var $cart=$('.buy-cart-df');
            $this.css('width','32px');
			x=$cart.offset().left;
            y=$cart.offset().top;            
            $this.css({'left': x+44,'top': y}).animate({'left': x-22,'top': 62},500);
            $this.animate({'width':'0px'},10);
            $this.animate({'left':x+44,'top':y},1);
		});
        
		var l=$(".scroll-part").children().length/2;
		if(l<=5){
			$(".scroll-part").css("height",40*l+"px");
			$('.detail-more').css("display","none");
		}else{
			$(".scroll-part").css("height","110px");
			$('.detail-more').css("display","block");
		}
		$('.detail-more').click(function(){
			if($(".scroll-part").css("height")=="110px"){
			var l=$(".scroll-part").children().length/2;
			$(".scroll-part").css("height",40*l+"px");
			$(".more").addClass('on');
			}
			else{
			$(".scroll-part").css("height","110px");
			$(".more").removeClass('on');	
			}

		});
		$('.select-button').click(function(){
			if($('.sku-price-num-list-flex').css('display')=='none'){
			$('.sku-price-num-list-flex').css('display','block');
			$('.sku-price-num-list-cover').css('display','block');
			$(this).addClass('on');				
			}else{
			$('.sku-price-num-list-flex').css('display','none');
			$('.sku-price-num-list-cover').css('display','none');
			$(this).removeClass('on');					
			}
		});
		$('.sku-price-num-list-cover').click(function(){
			$(this).css('display','none');
			$('.sku-price-num-list-flex').css('display','none');
		});
		//获取翻页input里面的值，输入值改变，value值也对应改变
		$(".myorder-page .page-go").on("change",function(){
			 var pageVal=Number($(this).val());
			 var pageMaxVal=Number($(this).prop("max"));
			 var pageMinVal=Number($(this).prop("min"));
			 if(pageVal>=pageMaxVal){
			 	$(this).val(pageMaxVal);
			 }
			 else if(pageVal<=pageMinVal){
			 	$(this).val(pageMinVal)
			 }
		})
		//翻页确定时，从a标签取href，字符串拼接跳转
		$(".myorder-page .page-go-btn").on("click",function(){
			var pageNum=$(this).parent().parent().find("li .page-go").val();
			var pageHref=$(this).prop("href");
            var pageStr=pageHref.split("=");
            var url="";
            for(var i=0;i<pageStr.length-1;i++){
            	if(i>0){
            	   url=url+"="+ pageStr[i];	
            	}
            	else{
            	   url=url+ pageStr[i];
            	}
            }
            var pageGo=url+"="+pageNum
			$(this).prop("href",pageGo)
            
		})
		
		var intDiff=$(".lastTime").attr("data-time");
		if(intDiff){
			intDiff=parseInt(intDiff);
			timer1(intDiff);
			timer(intDiff);
		}
	})
})(window);
//function DateToUnix(string) {
//	var f = string.split(' ', 2);
//	var d = (f[0] ? f[0] : '').split('-', 3);
//	var t = (f[1] ? f[1] : '').split(':', 3);
//	return (new Date(
//	parseInt(d[0], 10) || null,
//	(parseInt(d[1], 10) || 1) - 1,
//	parseInt(d[2], 10) || null,
//	parseInt(t[0], 10) || null,
//	parseInt(t[1], 10) || null,
//	parseInt(t[2], 10) || null
//	)).getTime()/1000;
//};
//	var endTime = DateToUnix("2017-1-3 23:59:59"); //结束日期事件
//	var date = new Date();
//	var nowTime = date.getTime() / 1000; //当前日期
//	var intDiff = parseInt(endTime - nowTime); //倒计时总秒数量
function timer(intDiff) {
    window.setInterval(function() {
		var day = 0,
		hour = 0,
		minute = 0,
		second = 0; //时间默认值
		if (intDiff > 0) {
			day = Math.floor(intDiff / (60 * 60 * 24));
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		}
		if (minute <= 9) minute = '0' + minute;
		if (second <= 9) second = '0' + second;
		$('.lastTime-day').html(day);
		$('.lastTime-hour').html(hour);
		$('.lastTime-minute').html(minute);
		$('.lastTime-second').html(second);
		intDiff--;
	}, 1000);
}
function timer1(intDiff) {
	var day = 0,
	hour = 0,
	minute = 0,
	second = 0; //时间默认值
	if (intDiff > 0) {
		day = Math.floor(intDiff / (60 * 60 * 24));
		hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
		minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
		second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	}
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;
	$('.lastTime-day').html(day);
	$('.lastTime-hour').html(hour);
	$('.lastTime-minute').html(minute);
	$('.lastTime-second').html(second);
	intDiff--;
}