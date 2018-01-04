$(function() {
	//全部品牌    分类排序和字母排序点击切换效果      主页部分nav导航栏
	$(".all-sort1").on("click", "span", function() {
			$(this).siblings().removeClass("sort-active")
			$(this).addClass("sort-active");
			var span1 = $(".all-sort1 .sort-fenlei1");
			if(span1.hasClass("sort-active")) {
				$(".sort-main-11").show();
				$(".sort-main-21").hide();

			} else {
				$(".sort-main-21").show();
				$(".sort-main-11").hide();
			}
		})
		//全部品牌    分类排序和字母排序点击切换效果      网页滚动悬浮部分nav导航栏
	$(".all-sort2").on("click", "span", function() {
			$(this).siblings().removeClass("sort-active")
			$(this).addClass("sort-active");
			var span1 = $(".all-sort2 .sort-fenlei2");
			if(span1.hasClass("sort-active")) {
				$(".sort-main-12").show();
				$(".sort-main-22").hide();

			} else {
				$(".sort-main-22").show();
				$(".sort-main-12").hide();
			}
		})
		//分类排序 子菜单  点击加载相应品牌类
	$(".menu-unslider-all .child-category").on("click", function() {
		$(this).siblings().removeClass("sort-main-ul-active");
		$(this).addClass("sort-main-ul-active");
		var child_category_input = $(this).find("input").val();
		var alt = $(this).find("input").attr("alt");
		var url = "";
		var html = "";
		url = "/category/all?cat=" + child_category_input;
		$.ajax({
			url: url,
			success: function(r) {
				if(r) {
					html = "<span class=sort-main-brand-classified " + ">" + alt + "</span>" + r;
					$(".sort-main-brand").html(html);
				}
			}
		});
	});
	//分类排序，调取接口，下拉菜单展示数据
	function ajaxLoadGuds() {
		//url = "/category/all?cat=hufu";
		$.ajax({
			url: "/category/all?cat=hufu",
			success: function(r) {
				if(r) {
					html = "<span class=sort-main-brand-classified" + ">" + "护肤" + "</span>" + r;
					$(".sort-main-brand").html(html);
				}
			}
		});
	}
	//鼠标悬浮全部品牌 ，调取接口展示下拉菜单
	$(".topnav .menu-lists .menu-item span").on("mouseover", function() {
			ajaxLoadGuds();
		})
		//点击事件分类排序 ，调取接口展示下拉菜单
	$(".menu-unslider-all .all-sort1 .sort-fenlei1,.menu-unslider-all .all-sort2 .sort-fenlei2").click(function() {
		ajaxLoadGuds();
	})
	var brand_classified = $(".sort-main-brand-classified").html();
	$(".sort-main-ul .child-category").each(function() {
			var child_category = $(this).find("input").attr("alt");
			if(child_category == brand_classified) {
				$(this).addClass("sort-main-ul-active");
			}
		})
		//字母排序，调取接口，下拉菜单展示数据
	$(".menu-unslider-all .child-zimu").on("click", function() {
		$(this).siblings().removeClass("sort-letter-ul-active");
		$(this).addClass("sort-letter-ul-active");
		var child_zimu_input = $(this).find("input").val();
		var alt = $(this).find("input").attr("alt");
		var url = "";
		var html = "";
		url = "/category/letter?letter=" + child_zimu_input;
		$.ajax({
			url: url,
			success: function(data) {
				$(".sort-letter-brand").html("");
				if(data) {
					html = "<span class=sort-letter-brand-letter" + ">" + child_zimu_input + "</span>" + data;
					$(".sort-letter-brand").html(html);
				}
			}
		});
		// console.info(child_zimu_input)
	});

	function ajaxLoadLetter() {
		//url = "/category/all?cat=hufu";
		$.ajax({
			url: "/category/letter?letter=A_D",
			success: function(data) {
				if(data) {
					html = "<span class=sort-letter-brand-letter" + ">" + "A_D" + "</span>" + data;
					$(".sort-letter-brand").html(html);
				}
			}
		});
	}
	$(".menu-unslider-all .all-sort .sort-zimu").click(function() {
		ajaxLoadLetter()
	})
	var letter_classified = $(".sort-letter-brand-letter").html();
	$(".sort-letter-ul .child-zimu").each(function() {
			var child_category = $(this).find("input").attr("alt");
			if(child_category == letter_classified) {
				$(this).addClass("sort-letter-ul-active");
			}
		})
		//底部，友情链接显示隐藏操作。
	$(".friendly-link-more").on("click", function() {
		$(".friendly-link-other").css("display", "block")
		$(".friendly-link-more").css("display", "none")
	});
	//nav导航栏部分，对应页面类目，样式对应变化
	var pageName = $(".detail-b .detail-menu-title .navHoverColor a").html();
	var data_mps = $("body").attr("data-mps");
	if(pageName) {
		$(".topnav .menu-lists .menu-item .nav-tit,.menu-item2 .nav-tit ").each(function() {
			if($(this).html() == pageName) {
				$(this).addClass("active");
				$(this).parent().removeClass("active");
			}
		})
	}
	if(data_mps) {
		if(data_mps == "PA5001") {
			$(".menu-item .nav-tit").removeClass("active")
			$(".hovercat").each(function() {
				if($(this).html() == "关于帮5采") {
					$(this).addClass("active")
				}
			})
		} else if(data_mps == "PA5002") {
			$(".menu-item .nav-tit").removeClass("active");
			$(".nav-tit-home").addClass("active");
			$(".nav-tit-home-float a").addClass("active");
		}
	}
})