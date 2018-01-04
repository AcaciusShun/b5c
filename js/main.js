(function (window, undefined) {
	require.config({
		// baseUrl: b5m.host.cdn,
		// urlArgs: 'v=' + document.getElementById('requirejs').getAttribute('data-version'),
		// map: {'*': {'css': 'public/js/require-css.min'}},
		paths: {
			'jQ': 'jquery-1.9.1.min',
			'jQPlugins': 'jquery-unslider',
			'common': 'common_min'
		},
		shim: {
			'jQPlugins': {deps: ['jQ']},
			'common': {deps: ['jQ']}
		}
	});
	require(['jQPlugins','common'], function () {
		//banner 中间广告位滑动块
		$('.middle-unslider').unslider({
			speed: 200,
			delay: 4000,
			autoplay: true,
			pause: true,
			touchRatio : 0.5,
			dots: true,
			loop:true,
			arrows: false,
			prev: '',
			next: '',
		});
		//banner添加轮播图的悬浮效果
		$(".middle-unslider .dot").on({
         	mouseenter: function() {
            	$(this).click(),
            	$(".middle-unslider .unslider .unslider-img").trigger("appear")
       		}
    	})
        $(window).resize(function(){
            $('.middle-unslider').css("width",$(window).width()+"px");
            $('.unslider-item').css("width",$(window).width()+"px");          
        });
        
        $(window).scroll(function(){  
            if ($(window).scrollTop()>196){  
                // $(".return_top").fadeIn(500);
                $('.topnavinner-bg').css({"opacity":1,"top":0});
            }
            else  
            {  
            	$('.topnavinner-bg').css({"opacity":0,"top":"-48px"});  
                // $(".return_top").fadeOut(500);
            }  
        });  
        //当点击跳转链接后，回到页面顶部位置  
        $(".return_top").click(function(){  
            $('body,html').animate({scrollTop:0},500);  
            return false;  
        }); 
        $(".new-goods .g-style .g-item .g-img a img").mouseover(function(){
        	$(this).animate({"opacity":"0.8"},"slow",function(){
        		$(this).css({"opacity":"1"});
        	})
        })







	})
})(window);