
(function(shost){
	var getGlobal = function(){ return this || (1, eval)('this'); };
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var global = getGlobal();
	if(global.b5m && global.b5m.host) return false; // 已经单独加载或定义过对象，不需要再执行
	//var reg_test_cdn = /cdn0[1234]\.b5mcdn/;
	var ahost = shost.split('.').reverse();
	var host_map = {
		'stage': 1,
		'prod': 1,
		'b5cai': 1
	};
	// global._b5m_env_ = 'stage';
	global.b5m = {};
	b5m.env = global._b5m_env_ || ahost[1];
	b5m.env = b5m.env in host_map && b5m.env || shost;
	b5m.getHost = function(host, env){//{{{
        if(env && (new RegExp("b5cai.com$").test((window.location || document.location).hostname)||new RegExp("10.80.9.56$").test((window.location || document.location).hostname) || new RegExp("10.80.9.55$").test((window.location || document.location).hostname)) && env.match(/stage|prod/)){
            //避免把stage 或者prod带入线上环境
            env = '';
        }
        // if(new RegExp("http://172.16.11.16$").test((window.location || document.location).hostname) || new RegExp("http://127.0.0.1$").test((window.location || document.location).hostname)){
        // }
        // else{
         //    //避免把stage 或者prod带入线上环境
         //    env = '';//避免把stage 或者prod带入线上环境
		// }
		env = env || b5m.env;
		if(env in {stage:1, prod:1}){ // stage上测试
			//host = host.replace(/\.b5m(cdn)?\./, '.'+env+'.');
			
			host.indexOf(env) > -1 || (host = host.replace(/\.b5cai(cdn)?\./, '.b5cai.' + env + '.'));
		}
		if(host.slice(0, 4) !== 'http'){ // 如果是https就写死吧，如"https://cdn01.b5mcdn.com"
			host = 'http://' + host;
		}
		return host;
	};
	if(b5m.env=="b5cai" || b5m.env=="localhost:3000" ||  b5m.env=="stage" ){
        if(b5m.env in host_map){
            global.cdn = b5m.env === 'b5cai' ? 'st.b5cai.com' : (b5m.env in host_map ? 'b5cstatic.'+b5m.env+'.com' : '');
        }
        else{
            global.cdn = b5m.env;
		}
	}
	else{
		global.cdn = "st.b5cai.com";
	}
	b5m.host = {
		'cdn'       : global.cdn,
		'www'       : 'www.b5cai.com',
		'b5caiapi'	: 'b5caiapi.b5cai.com',
		'c'			: 'm.b5cai.com',
		'ucenter'   : 'http://ucenter.stage.com'
	};
	b5m.getInterface = function(is, site, env){
		if(b5m.env.indexOf(/localhost/)>-1){
			b5m.env = 'stage';
		}
		var i;
		env = env || b5m.env;
//		console.log(is, site, env)
		if(!site && !(env in host_map)){
			for(i in is){
				if(hasOwnProperty.call(is, i)){
					is[i] = b5m.getHost(shost, site, env) + is[i];
				}
			}
			return is;
		}
		for(i in is){
			if(b5m.host[site] && hasOwnProperty.call(b5m.host, site)){
				is[i] = b5m.getHost(b5m.host[site], env) + is[i];
			}
		}
		return is;
	};
	// console.log(b5m.getInterface({a:'/test', b:'/list'}));
	// console.log(b5m.getInterface({a:'/test', b:'/list'}, 'ucenter'));
	// console.log(b5m.getInterface({a:'/test', b:'/list'}, 'ucenter', 'stage'));

	for(var k in b5m.host){
		if(hasOwnProperty.call(b5m.host, k)){
			b5m.host[k] = b5m.getHost(b5m.host[k]);
		}
	}
	
})((function(){ try{ return location.host; }catch(e){ return 'localhost'; } })());
//$(function(){
//	// console.log(b5m.host);
//	var westHot=0
//	$(".menu-lists li .nav-tit").each(function(){
//		if($(this).hasClass("west-hot")){
//			westHot=1;
//		}
//	});
//	if(westHot==0){
//		$(".menu-lists li .nav-tit").css("padding","0 28px !important");
//	}
//	else if(westHot==1){
//		$(".menu-lists li .nav-tit").css("padding","0 28px !important");
//	}
//})
(function (window, undefined) {
	require.config({
		baseUrl: b5m.host.cdn,
		urlArgs: 'v=' + document.getElementById('requirejs').getAttribute('data-version'),
		map: {'*': {'css': 'public/js/require-css.min'}},
		paths: {
			'jQ': 'public/js/jquery-1.9.1.min',
			'common': 'common/js/b5c_common_min'

		},
		shim: {
			'common': {deps: ['jQ']}

		}
	});
	require(['common'], function () {
		//
		// $cart_list = $('.cart-list');
		// $cart_list.on('change', '.choose', function () {
		// 	$cart_list.find('.choose-img input').prop('checked', this.checked);
		// });
		
        $(".rec-refresh").on('click', function () {
            var leng = $(".goods").length;
            for(var i=0;i<leng;i++){
                if($(".tab"+i).css("display")=="block"){
                    if(i!=(leng-1)){
                        var $this=$(".tab"+i);
                        i=i+1;
                        var $thos=$(".tab"+i); 
                    }else{
                        var $this=$(".tab"+(leng-1));
                        var $thos=$(".tab0");  
                    }
                    $this.css("display","none");
                    $thos.fadeIn();
                    return;
                }
            }
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
	})
})(window);
