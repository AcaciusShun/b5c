(function ($, undefined) {
	var b5c = b5c || {};
	//图评加载
	b5c.imgload= function(){
		if(window.require){
			require(['http://st.b5cai.com/public/js/jquery-lazyload.js'],function(){
				$('img[data-src]').lazyload({
					data_attribute: 'data-src',
					effect: 'fadeIn',
					threshold: 200,
					skip_invisible: false   
				});
			});
		}
	};
	b5c.imgload();
	//menu 头部ui
	b5c.ui={
		init: function(){
			b5c.ui.$topvav=$('.topnav');

			this.bindEvent();
		},
		//event bind
		bindEvent: function(){
			b5c.ui.$topvav.on('mouseenter','.menu-item', b5c.ui.navMenuDisplay);
			b5c.ui.$topvav.on('mouseleave', b5c.ui.navMenuNotDisplay);
			//b5c.ui.$topvav.on('mouseover', b5c.ui.imgLoad);
		},
		//nav 头部菜单
		navMenuDisplay: function(){
			var $this = $(this),
				$index=$this.index();
			if($index=="0"){
				b5c.ui.$topvav.find('.menu-unslider').show()
				.children('.menu-brand-lists').hide().eq($index).hide();
			}
			else{
				b5c.ui.$topvav.find('.menu-unslider').show()
				.children('.menu-brand-lists').hide().eq($index).show();
			}
				
		},
		navMenuNotDisplay: function(){
			b5c.ui.$topvav.find('.menu-unslider').hide()
		}
		/*imgLoad: function(){
			if(!b5c.ui.$topvav.imgLoad){
				b5c.ui.$topvav.find('.menu-unslider').find('img[data-src]').lazyload();
				b5c.ui.$topvav.imgLoad = true;
			}
		}*/
	};
	//是否有菜单->
	if($('.topnav').length > 0){
		b5c.ui.init();
	}
    
    //menu 头部ui
	b5c.uiinner={
		init: function(){
			b5c.uiinner.$topvav2=$('.topnav2');

			this.bindEvent();
		},
		//event bind
		bindEvent: function(){
			b5c.uiinner.$topvav2.on('mouseenter','.menu-item2', b5c.uiinner.navMenuDisplay);
			b5c.uiinner.$topvav2.on('mouseleave', b5c.uiinner.navMenuNotDisplay);
			//b5c.ui.$topvav.on('mouseover', b5c.ui.imgLoad);
		},
		//nav 头部菜单
		navMenuDisplay: function(){
			var $this = $(this),
				$index=$this.index();
			b5c.uiinner.$topvav2.find('.menu-unslider2').show()
				.children('.menu-brand-lists2').hide().eq($index).show();
		},
		navMenuNotDisplay: function(){
			b5c.uiinner.$topvav2.find('.menu-unslider2').hide()
		}
		/*imgLoad: function(){
			if(!b5c.ui.$topvav.imgLoad){
				b5c.ui.$topvav.find('.menu-unslider').find('img[data-src]').lazyload();
				b5c.ui.$topvav.imgLoad = true;
			}
		}*/
	};
	//是否有菜单->
	if($('.topnav2').length > 0){
		b5c.uiinner.init();
	}
})(jQuery);


