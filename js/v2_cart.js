$(function(){
	var goodsList=$(".cart-list");
	$(window).scroll(function(){
		if(goodsList.length>1){
			dzcgPurchaseNow();
			yjdfPurchaseNow();	
		}
	})
	if(goodsList.length>1){
			dzcgPurchaseNow();
			yjdfPurchaseNow();
	}
	// inputCheck();
	goodsTipDisplay();
	dzcgBuyInput();
	cartList = $('#option1 .cart-list');
	if($('#option1').find(".cart-list").length == 1){
		$(".buy-way").removeClass("on");
		cartList = $('#option2 .cart-list');
		$("#option1").css("display","none");
		$("#option2").css("display","block");
		$("#buy-is-dzcg").val('2');
		$("#tab-yjdf").addClass("on");
	}else{
		$("#buy-is-dzcg").val('1');
	}
	$(".buy-way").click(function(event) {
		if($("#option2").css("display")=="none" && !$(this).hasClass("on")){
			$("#option1").css("display","none");
			$("#option2").css("display","block");
			// kuCunNum();
			cartList = $('#option2 .cart-list');
			$("#buy-is-dzcg").val('2');
		} else if($("#option1").css("display")=="none" && !$(this).hasClass("on")){
			cartList = $('#option1 .cart-list');
			
			$("#option1").css("display","block");
			$("#option2").css("display","none");
			$("#buy-is-dzcg").val('1');
		}else{
			return false;
		}
		$(".buy-way").removeClass("on");
		$(this).addClass("on");
	});
	//一件代发全选
	// $('#option2 .choose-all').on('click', '.choose', function () {
	// 	var $this=$(this);
	// 	cartList.find('.choose-spu-cart').prop('checked', $this.prop("checked"));
	// 	cartList.find(".choose-spu-cart").each(function(){
	// 		var tg = $(this).data("ot");
	// 		cartList.find(".select-guds-sku-"+tg).prop('checked', $this.prop("checked"));
	// 		countGuds(tg);
	// 		inputCheck();
	// 	});
	// 	if($(this).prop("checked")){
	// 		$("#option2 .choose-all .choose").prop("checked",true);
	// 	}else{
	// 		$("#option2 .choose-all .choose").prop("checked",false);
	// 	}
	// 	showImg();
	// 	showBuywaY();
	// });
	//大宗采购全选
	$('#option1 .dzcg-choose').on('click',  function () {
		var $this=$(this);
		var tg="";
		cartList.find('.choose-spu-cart').prop('checked', $this.prop("checked"));
		cartList.find(".choose-spu-cart").each(function(){
			tg = $(this).data("ot");
			cartList.find(".select-guds-sku-"+tg).prop('checked', $this.prop("checked"));		
		});
		countGuds(tg);
		dzcgBuyInput()
		if($(this).prop("checked")){
			$("#option1 .dzcg-choose").prop("checked",true);
		}else{
			$("#option1 .dzcg-choose").prop("checked",false);
		}
	});
	//一件代发选择商品
	// $("#option2 .choose-spu-cart").on("change",function(){
	// 	var tg = $(this).data("ot");
	// 	$(".select-guds-sku-"+tg).prop('checked', $(this).prop("checked"));
	// 	if($(this).prop("checked")){
	// 		$(".select-guds-cart-"+tg).prop("checked",true);
			
	// 	}else {
	// 		$(".select-guds-cart-"+tg).prop("checked",false);
	// 		$(".choose-guds-sku-"+tg).prop("checked",false);
	// 		$("#option2 .choose-all .choose").prop("checked",false)
	// 	}
	// 	countGuds(tg);
	// 	inputCheck()
	// 	showImg();
	// 	allCheckedBox();
	// 	showBuywaY();
	// 	goodsTipDisplay()
	// });
	//一件代发选择属性
// 	$("#option2 .choose-guds-sku").on("click",function(){
// 		var tg = $(this).data("ot");
// 		if($(this).prop("checked")){
// //			$(".select-guds-cart-"+tg).prop("checked",true);
// //			$(".choose-guds-sku-"+tg).prop("checked",true);
// 		}else{
//             $("#option2 .choose-all .choose").prop("checked",false)
// 		}
//         skuInputCheck()
// 		inputCheck()
// 		showImg();
// 		showBuywaY();
// 		allCheckedBox()
// 		goodsTipDisplay()
// 	});
	//大宗采购选择商品
	$("#option1 .choose-spu-cart").on("change",function(){
		var tg = $(this).data("ot");
		$(".select-guds-sku-"+tg).prop('checked', $(this).prop("checked"));
		if($(this).prop("checked")){
			$(".select-guds-cart-"+tg).prop("checked",true);
			
		}else {
			$(".select-guds-cart-"+tg).prop("checked",false);
			$(".choose-guds-sku-"+tg).prop("checked",false);
			$("#option1 .choose-all .choose").prop("checked",false)
            $("#option1 .dzcg-choose").prop("checked",false)
		}
		countGuds(tg);
		allCheckedBox()
		goodsTipDisplay()
		dzcgBuyInput();
	});
	//大宗采购选择属性
	$("#option1 .choose-guds-sku").on("click",function(){
		var tg = $(this).data("ot");
		if($(this).prop("checked")){
		}else{
            $("#option1 .choose-all .choose").prop("checked",false)
            $("#option1 .dzcg-choose").prop("checked",false)
		}
        skuInputCheck()
		goodsTipDisplay()
		countGuds(tg);
		dzcgBuyInput();
		countGudsAll();
		allCheckedBox();
	});
	//单个的删除 大宗采购和一件代发通用
	$("#option1 .g-delete").on("click",function(){
		var $this = $(this),target = $this.data("target"),data={};
		if($this.hasClass(".guds")){
			data.sllrId = gudsDetail[target].sllrId;
			data.gudsId = gudsDetail[target].gudsId;
		}else{
			data.sllrId = gudsDetail[target].sllrId;
			data.gudsId = gudsDetail[target].gudsId;
			data.gudsOptId = $this.data("ids");
		}
		if($("#option2").css("display")=="none"){
			data.type = 0;
		}else{
			data.type = 1;
		}
		Showbo.Msg.confirm('您确定删除这条记录吗？',function(flag){
			if(flag =='yes'){
				$.ajax({
					"url":"/cart/del",
					"type":"post",
					"data":data,
					"dataType":"json",
					"success":function(r){
						if(r.success){
							var tr = $this.parents("tr"),num = parseInt($(".cart-num-in-topnav").html());
							//删除商品或sku
							if(tr.hasClass("guds-show-cart")){
								num = num - $(".guds-sku-"+target).length;
								$(".guds-table-"+target).remove();
							}else{
								num = num - 1;
								tr.remove();
							}
							//商品属性全部被删除
							if($(".guds-sku-"+target).length < 1){
								$(".select-guds-cart-"+target).prop("checked",false);
								$(".guds-table-"+target).remove();
							}
							countGuds(target);
							//0为大宗采购，
							if(data.type == 0){
								if($("#option1").find(".cart-list").length == 1){
									$(".total-money-1").html("￥0.00");
								}
							}else{
								if($("#option2").find(".cart-list").length == 1){
									$(".total-money-2").html("￥0.00");
								}
							}
							//购物车商品删没了
							if($(".cart-list").length == 2){
								window.location.href="";
							}
							$('.cart-num-in-topnav').text(num);
							
						}else{
							Showbo.Msg.alert(r.message);
						}
				    }
				});
			}else if( flag == 'no'){
				return false;
			}
		},'确认', '取消');
	});
    //删除选中的商品  大宗采购和一件代发通用
    $("#option1 .delete-choose").on("click",function(){
    	if($(this).hasClass("yjdf-delete-choose")){
    		deleteGoodsChoose("#option2 .choose-spu-cart");
    	}else if($(this).hasClass("dzcg-delete-choose")){
    		deleteGoodsChoose("#option1 .choose-spu-cart");
    	}
    })
	//单个spu中input框内修改数量
	$("#option1 .g-num input").on("blur",function(){
		var $input=$(this)
		num = parseInt($input.val());
		if(num <= 0){
			$input.val(1);
			Showbo.Msg.alert('采购数量不能小于1');
		}
		if($("#option2").css("display")=="none"){
			if(num >= 1000000){
				$input.val(1000000);
				Showbo.Msg.alert('采购数量不能大于100W');
			}
		}else{
			var tg = $input.data("target");
			if(num > gudsDetail[tg].maxBuyNum){
				$input.val(gudsDetail[tg].maxBuyNum);
				Showbo.Msg.alert('采购数量不能大于最大订购量');
			}
		}
		fixNum($input);
		inputCheck()
		dzcgBuyInput();
		goodsTipDisplay()
	});
	//单个spu加减修改数量
	$("#option1 .fix-num-cart").on("click",function(){
		var $this=$(this),$input=$this.siblings('input'),
			num = parseInt($input.val());
		if($this.hasClass("g-num-sub") && num > 1){
			$input.val(num-1);
		}
		if($("#option2").css("display")=="none"){
			if($this.hasClass("g-num-add") && num < 1000000){
				$input.val(num+1);
			}
		}else{
			var tg = $input.data("target");
			if($this.hasClass("g-num-add") && num < gudsDetail[tg].maxBuyNum){
				$input.val(num+1);
			}
		}
		fixNum($input);    
        inputCheck()
        dzcgBuyInput();
        goodsTipDisplay();

	});
	/**********修改数量结束**********/
		//立即购买
	$("#option1 .buy-now-in-cart").on("click",function(){
	    showBuywaY();
		inputCheck();
		var type=0;
		var inputs ='',i=0;
		var is_yijiandaifa=false;
		if($(this).hasClass('dzcg')){
			var table=$("#option1"),type=1;
			is_yijiandaifa=false;
		}else{
			var table=$("#option2"),type=2;
			alert('no');
			return false;
		}
		var goodsNum=0;
		table.find(".choose-item").each(function(){
		    var target=$(this).data("ot"),spuNum = 0;
		    $(".guds-num-"+target).each(function(){
		        var ch = $(this).parents("td").siblings(".guds-propty").find(".choose-guds-sku").prop("checked");
		    	if(ch){
			        i++;
			    	var opt = $(this).data("ids")+"-"+$(this).data("opt")+"-"+$(this).val();
				    inputs += '<input type="hidden" name="cartbuy['+i+'][sllrId]" value="'+gudsDetail[target].sllrId+'">'+
						'<input type="hidden" name="cartbuy['+i+'][gudsId]" value="'+gudsDetail[target].gudsId+'">'+
						'<input type="hidden" name="cartbuy['+i+'][opts]" value="'+opt+'">';
			  		spuNum = spuNum + parseInt($(this).val());
				}
		    });
		    if(1 == type){
		    	if(spuNum < (gudsDetail[target].highPriceXnum * gudsDetail[target].minQty)){
			  		if($(this).prop("checked")){
			   			$(".guds-table-"+target).addClass("error");
						table.find(".error-tip").show();
						goodsNum=1;
			  		}else{
						$(".guds-table-"+target).removeClass("error");
			  		}
				}else{
			  		$(".guds-table-"+target).removeClass("error");
				}
		    }else{
		    	if(spuNum > gudsDetail[target].maxBuyNum){
			  		if($(this).prop("checked")){
						$(".guds-table-"+target).addClass("error");
						table.find(".error-tip").show();
			  		}else{
						$(".guds-table-"+target).removeClass("error");
			  		}
				}else{
			 		$(".guds-table-"+target).removeClass("error");
				}
				is_yijiandaifa=true;   
		  	}
		});
		if(is_yijiandaifa && type==2){
		    showImg();
		    var cangkuName=[];
		    $("#option2 table tbody .choose-img .choose-item").each(function(){
		    	if($(this).prop("checked")){
		      		var cangKu = $(this).attr("name");
		      		cangkuName.push(cangKu)
		    	}
		    })
		  	var hanguoNum=0,ningboNum=0,guoneiNum=0;
		    $("#option2 .choose-img .choose-item").each(function(){
		    	if($(this).prop("checked")){
		     		for (var i=0;i<cangkuName.length;i++) {
		        		if(cangkuName[i]=="hanguo"){
		          			hanguoNum=10;
		        		}else if(cangkuName[i]=="ningbo"){
		          			ningboNum=10;
		        		}else if(cangkuName[i]=="guonei"){
		          			guoneiNum=10;
		        		}
		      		}
		    	}    	
		    })
		  	//如果含有宁波保税仓走这条支付路线
		  	if(ningboNum==10){
		  		//判断是否含有国内仓或者韩国仓，或者两者都有
		    	if(hanguoNum==10 || guoneiNum==10){
				 	$("#option2 .pay-group .total-goods-money-pay").css("display","none")
				  	$(".store-list").css("display","block");
				 	$(".total-goods-money-tip").css("display","block")			  	
			 		return false;						
				}else{
			  		baoshuicangCheck()
			  		return false;
		    	}
		  	}
		  	//如果含有国内仓，从以下支付路线
		  	else if(guoneiNum==10){
				$(".cart-all-store-button-guo").css({"background":"#eb1151","color":"white"})
				$(".cart-all-store-button-guo").html("立即付款")
				$(".cart-all-store-button").css({"background":"#fff","color":"black","border":"1px solid #dedede"})
				$(".cart-all-store-button").html("+展开");
				if(hanguoNum==10){
					$("#option2 .pay-group .total-goods-money-pay").css("display","none")
					$(".store-list").css("display","block");
					$(".total-goods-money-tip").css("display","block")
			  	    showImg()
			  		return false;	
				}
       			//如果仅仅只有国内仓，则走一下支付路线
				else{
					goodsGoBuy("guoneicang","guonei")
			 		$("#cart-form-buy").submit();
			  		return false;
				}			
		  	}
		  	//如果仅仅只有韩国仓，则走一下支付路线
		  	else if(hanguoNum==10){
				goodsGoBuy("hanguocang","hanguo")
	        	$("#cart-form-buy").submit();
		  	}
		}
		if(i == 0){
			Showbo.Msg.alert('请选择商品');
			return false;
		}
		if(table.find(".error").length > 0){
			return false;
		}
		if(type==1){
			if(goodsNum>0){
	      		return false;
	       }else if(goodsNum==0){
	       	 	$("#cart-form-buy").append(inputs);
	       	 	$("#cart-form-buy input").each(function(){
	    			var alt=$(this).attr("alt");
	    			if(alt=="ningbo" || alt=="hanguo" ||alt=="guonei"){
	    				$(this).remove();
	    			}
				})
		     	$("#cart-form-buy").submit();
		     	return false;
	      	}
		}
	});
// //库存数量
// kuCunNum()

	$(".cart-all .cart-all-store").on("click",".cartImgShow",function(){
		if($(this).hasClass("cart-all-store-button")){
			goodsGoBuy("baoshuicang","ningbo");
			baoshuicangCheck();
		}
		else if($(this).hasClass("cart-all-store-button-guo")){
			goodsGoBuy("guoneicang","guonei");
			$("#cart-form-buy").submit();
			
		}
		else if($(this).hasClass("cart-all-store-button-collap")){
			goodsGoBuy("hanguocang","hanguo");
			$("#cart-form-buy").submit();
		}
	})
	
});
//修改数量
function fixNum($input){
	var target = $input.data("target"),data={};
	data.sllr = gudsDetail[target].sllrId;
	data.guds = gudsDetail[target].gudsId;
	data.gudsOptId = $input.data("ids");
	data.num = parseInt($input.val());
	data.count = $input.data("num");
	if($("#option2").css("display")=="none"){
		data.type = 0;
	}else{
		data.type = 1;
	}
	$.ajax({
		"url":"/cart/fixnum",
		"type":"post",
		"data":data,
		"dataType":"json",
		"success":function(r){
			if(r.success){
				countGuds(target);
				$input.data("num",data.num);
			}else{
				Showbo.Msg.alert(r.message);
			}
		}
	});
}
//页面数据计算
function countGuds(target){
	var num = price = skuNum = 0,guds = gudsDetail[target];
	cartList.find(".guds-num-"+target).each(function(){
		var ch = $(this).parents("td").siblings(".guds-propty").find(".choose-guds-sku").prop("checked");
		if(ch){
			num = num + parseInt($(this).val());
		}
	});
	cartList.find(".total-num").find("span[data-ot="+target+"]").text(num);

	if(num >= guds.lowPriceXnum * guds.minQty){
		if(guds.lowPriceYn){
			price = guds.lowPrice;
		}else if(guds.midPriceYn){
			price = guds.midPrice;
		}else if(guds.highPriceYn){
			price = guds.highPrice;
		}else{
			price = 0;
		}
	}else if(num >= guds.midPriceXnum * guds.minQty){
		if(guds.midPriceYn){
			price = guds.midPrice;
		}else if(guds.lowPriceYn){
			price = guds.lowPrice;
		}else if(guds.highPriceYn){
			price = guds.highPrice;
		}else{
			price = 0;
		}
	}else{
		if(guds.highPriceYn){
			price = guds.highPrice;
		}else if(guds.midPriceYn){
			price = guds.midPrice;
		}else if(guds.lowPriceYn){
			price = guds.lowPrice;
		}else {
			price = 0;
		}
	}
	if($("#option1").css("display") == 'none'){
		price = guds.belowPrice;
	}
//	price = (price/rate).toFixed(2);
	var show = '',gudsAll=0,spuNum = 0;
	cartList.find(".guds-num-"+target).each(function(){
		var ch = $(this).parents("td").siblings(".guds-propty").find(".choose-guds-sku").prop("checked");
		skuNum = parseInt($(this).val());
		if(0 == price){
			show = '￥0.00';
		}else{
			show =price * skuNum;
			if(ch){
				spuNum = spuNum + skuNum;
				gudsAll = show + gudsAll;
			}
			show =fmoney(show,2);
			show = '￥'+ show;
		}
		$(this).parents(".sku-num").siblings(".sku-price").find(".g-price-piece").text(show);
		$(".guds-sku-"+target+" .g-price-now").html(show);
		goodsTipDisplay();
	});
	if(spuNum >= (gudsDetail[target].highPriceXnum * gudsDetail[target].minQty)){
		$(".guds-table-"+target).removeClass("error");
		$(".error-tip").hide();
	}
	if(spuNum >= (gudsDetail[target].lowPriceXnum * gudsDetail[target].minQty)){
		$(".show-on-"+target+" .g-price-list").removeClass("on");
		$(".guds-num-low-"+target).addClass("on");
	}else if(spuNum >= (gudsDetail[target].midPriceXnum * gudsDetail[target].minQty) && spuNum < (gudsDetail[target].lowPriceXnum * gudsDetail[target].minQty)){
		$(".show-on-"+target+" .g-price-list").removeClass("on");
		$(".guds-num-mid-"+target).addClass("on");
	}else {
		$(".show-on-"+target+" .g-price-list").removeClass("on");
		$(".guds-num-high-"+target).addClass("on");
	}
	cartList.find(".guds-prices-"+target).text("￥"+fmoney(gudsAll,2));
	//购物车总计和tips
	countGudsAll();
}
//购物车总计和tips
function countGudsAll(){
	var totalPrice = 0,fee=0,cartFix=[];
	cartList.find(".g-price-now").each(function(){
		var tg = $(this).data("ot"),
			ch = $(".select-guds-cart-"+tg).prop("checked");
		if(ch && $(".guds-sku-"+tg).length > 0){
			var wz=$(this).text(),
				price=wz.substring(1),
				arr = price.split(",");
			price = arr.join("");
			totalPrice = parseFloat(price) + totalPrice,
				gudsNum = cartList.find(".total-num").find("span[data-ot="+tg+"]").text(),
				gudsAllData = {'gudsId':gudsDetail[tg].gudsId,'sllrId':gudsDetail[tg].sllrId,'ordGudsQty':gudsNum}
			cartFix.push(gudsAllData);
		}
	});
	if($("#option2").css("display")=="none"){
		$(".total-money-1").text("￥"+fmoney(totalPrice));
	}else{
		$.ajax({
			"url":"/cart/getfee",
			"type":"post",
			"data":{data:cartFix},
			"dataType":"json",
			"success":function(r){
				var fee = parseFloat(r.data);
				$(".total-money-2 b").html("￥"+fmoney(totalPrice));
				$("#fee-in-cart").text(fee.toFixed(2));
				inputCheck();
			}
		});
	}	
}
// 千分位分割
function fmoney(s, n){
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(),
		r = s.split(".")[1];
	t = "";
	for(i = 0; i < l.length; i ++ )
	{
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}
//一件代发操作sku单选框
function inputCheck(){
	//三种仓库各自总价钱
	var ningboTotalMoney=0;
	var hanguoTotalMoney=0;
	var guoneiTotalMoney=0;
	//三种仓库各自总数量
	var ningboTotalMount=0;
	var hanguoTotalMount=0;
	var guoneiTotalMount=0;
	//三种仓库各自总商品的种类
	var ningboTotalClass=0;
	var hanguoTotalClass=0;
	var guoneiTotalClass=0;
	//获取各自仓库商品的图片
	var ningboSrcImg="";
	var hanguoSrcImg="";
	var guoneiSrcImg="";
	//循环遍历sku单选框
	$("#option2 .cart-list-flag .choose-guds-sku").each(function(){
		//判断sku单选框是否选中
		if($(this).prop("checked")){
			//获取该商品的价格
			var thisPrice=$(this).parent().parent().parent().parent().find("td .g-price .g-price-piece").html();
			var point=thisPrice.indexOf("￥");
			thisPrice=thisPrice.substring(point+1,thisPrice.length);
			//获取该商品的购买数量
			var thisMount=$(this).parent().parent().parent().parent().find("td .g-num input").val();
			//获取该商品仓库地址
			var storePlace=$(this).parent().parent().parent().parent().parent().find("tr td .choose-img .store-place").html();
			//如果该商品属于宁波保税仓的时候
			if(storePlace=="宁波保税仓"){
				thisPrice=thisPrice.replace(/\,/g, "")
				ningboTotalMoney+=Number(thisPrice);
				ningboTotalMount+=parseInt(thisMount);
			}
			//如果该商品属于韩国仓时
			else if(storePlace=="韩国仓"){
				thisPrice=thisPrice.replace(/\,/g, "")
				hanguoTotalMoney+=Number(thisPrice);
				hanguoTotalMount+=parseInt(thisMount);
			}
			else if(storePlace=="国内仓"){
				thisPrice=thisPrice.replace(/\,/g, "")
				guoneiTotalMoney+=Number(thisPrice);
				guoneiTotalMount+=parseInt(thisMount);
			}
		}
	})
	$("#option2 .cart-list-flag .choose-item").each(function(){
		var srcImg=$(this).parent().find(".g-img a img").attr("src");
		if($(this).prop("checked")){
			if($(this).hasClass("baoshuicang")){
				ningboTotalClass++;
				ningboSrcImg+='<img src="'+srcImg+'" alt="">';
			}else if($(this).hasClass("hanguocang")){
				hanguoTotalClass++;
				hanguoSrcImg+='<img src="'+srcImg+'" alt="">';
			}else if($(this).hasClass("guoneicang")){
				guoneiTotalClass++;
				guoneiSrcImg+='<img src="'+srcImg+'" alt="">';
			}			
		}
	})
	//购物车所有商品的数量
	var carTotalMount=ningboTotalMount+hanguoTotalMount+guoneiTotalMount;
	//购物车所有商品的种类
	var carTotalClass=ningboTotalClass+hanguoTotalClass+guoneiTotalClass;
	//购物车总价格
	var carTotalMoney=(ningboTotalMoney+hanguoTotalMoney+guoneiTotalMoney).toFixed(2);
    //将以上数据放入到对应位置
	$("#option2 .car_mount_type").html(carTotalClass);
	$("#option2 .car_mount_total").html(carTotalMount);
	$("#option2 .store-list .cart-all-store_left .cart-all-store-name .red").html(hanguoTotalClass);
	$("#option2 .store-list .right .cart-all-store-name .red").html(ningboTotalClass);
	$("#option2 .store-list .middle .cart-all-store-name .red").html(guoneiTotalClass);
	$("#option2 .cart-all-store_left .cart-all-store-money").html("￥"+fmoney(hanguoTotalMoney));
	$("#option2 .right .cart-all-store-money").html("￥"+fmoney(ningboTotalMoney));
	$("#option2 .middle .cart-all-store-money").html("￥"+fmoney(guoneiTotalMoney));
	$("#option2 .total-money-2 b").html("￥"+fmoney(carTotalMoney));
	//宁波保税仓悬浮切换时
//	$("#option2 .cart-all-store-button").mouseenter(function(){
//		$(".cartImgShow").css({"background":"#fff","color":"black","border":"1px solid #dedede"})
//		$(".cartImgShow").html("+展开");
//		$(this).css({"background":"#eb1151","color":"white"})
//		$(this).html("立即付款");
//		$(".cart-all-goods").html(ningboSrcImg);
//		$(this).click(function(){
//		    goodsGoBuy("baoshuicang","ningbo");
//		    baoshuicangCheck();
//		})     
//	})
//	//韩国仓悬浮切换时
//	$(".cart-all-store-button-collap").mouseenter(function(){
//		$(".cartImgShow").css({"background":"#fff","color":"black","border":"1px solid #dedede"})
//		$(".cartImgShow").html("+展开");
//		$(this).css({"background":"#eb1151","color":"white"})
//		$(this).html("立即付款")
//		$(".cart-all-goods").html(hanguoSrcImg);
//		$(this).click(function(){
//		    goodsGoBuy("hanguocang","hanguo");
//		    $("#cart-form-buy").submit();
//	    })
//	})
//	//国内仓悬浮切换时
//	$(".cart-all-store-button-guo").mouseenter(function(){
//		$(".cartImgShow").css({"background":"#fff","color":"black","border":"1px solid #dedede"})
//		$(".cartImgShow").html("+展开");
//		$(this).css({"background":"#eb1151","color":"white"})
//		$(this).html("立即付款");
//		$(".cart-all-goods").html(guoneiSrcImg);
//		$(this).click(function(){
//		    goodsGoBuy("guoneicang","guonei")
//          $("#cart-form-buy").submit();
//		}) 
//	})
    $(".cartImgShow").mouseenter(function(){
    	$(".cartImgShow").css({"background":"#fff","color":"black","border":"1px solid #dedede"})
		$(".cartImgShow").html("+展开");
		$(this).css({"background":"#eb1151","color":"white"})
		$(this).html("立即付款");
		if($(this).hasClass("cart-all-store-button")){
			$(".cart-all-goods").html(ningboSrcImg);
		}
		else if($(this).hasClass("cart-all-store-button-guo")){
			$(".cart-all-goods").html(guoneiSrcImg);
		}
		else if($(this).hasClass("cart-all-store-button-collap")){
			$(".cart-all-goods").html(hanguoSrcImg);
		}
    })
    
}
//sku选框变动时，让购买商品图片列表变动显示
function showImg(){
	var hanguoState=$("#option2 .cart-all-store-button-collap").html();
	var ningboState=$("#option2 .cart-all-store-button").html();
	var guoneiState=$("#option2 .cart-all-store-button-guo").html();
	if(hanguoState=="立即付款"){
		showImgNext("hanguocang");
	}else if(ningboState=="立即付款"){
		showImgNext("baoshuicang");
	}else if(guoneiState=="立即付款"){
		showImgNext("guoneicang");
	}
}
function showImgNext(cangkuName){
	var cangku_html="";
		$("#option2 .choose-spu-cart").each(function(){
			var srcImg=$(this).parent().find(".g-img a img").attr("src");
			if($(this).prop("checked")){
				if($(this).hasClass(cangkuName)){
					cangku_html+= '<img src="'+srcImg+'" alt="">';
				}
			}
		})
		$("#option2 .cart-all-goods").html(cangku_html);
}
//一件代发多种仓库点击购买
function goodsGoBuy(cangkuName,placeName){
    $("#cart-form-buy input").each(function(){
        var alt=$(this).attr("alt");
        if(alt==placeName){
            $(this).remove();
        }
    });
	var Inputs=""
 	var i=0;
  	$("#option2 .choose-spu-cart").each(function(){
  	 	if($(this).prop("checked")){
  	 		if($(this).hasClass(cangkuName)){	
  	 			/*
  	 			i++;
	  	 	 	var dataIds=$(this).parent().parent().parent().parent().find("tr .sku-num .g-num input").attr("data-ids");
	  	 	 	var gudsId=dataIds.substring(0,dataIds.length-2);
	  	 		var dataSllrid=$(this).attr("data-sllrid");
	  	 	 	var dataOpt=$(this).parent().parent().parent().parent().find("tr .sku-num .g-num input").attr("data-opt");
	  	 		var dataNum=$(this).parent().parent().parent().parent().find("tr td .total-num .kind-number").html();
	  	 		Inputs+='<input type="hidden" name="cartbuy['+i+'][sllrId]" value="'+dataSllrid+'" alt="'+placeName+'">'+
						'<input type="hidden" name="cartbuy['+i+'][gudsId]" value="'+gudsId+'" alt="'+placeName+'">'+
						'<input type="hidden" name="cartbuy['+i+'][opts]" value="'+dataIds+'-'+dataOpt+'-'+dataNum+'" alt="'+placeName+'">';
				*/
                var dataSllrid_prev=$(this).attr("data-sllrid");
                $(this).parent().parent().parent().parent().find("tr .sku-num .g-num input").each(function(){
                    // check choose
                    var obj_one = $(this).parent().parent().parent().find('.choose-guds-sku').eq(0);
                    if(obj_one.prop('checked')){
                    }else{
                        return ;
                    }
                    ++i;
                    var dataIds=$(this).attr('data-ids');
                    var gudsId=dataIds.substring(0,dataIds.length-2);
                    var dataSllrid=dataSllrid_prev;
                    var dataOpt=$(this).attr("data-opt");
                    var dataNum=$(this).val();
                    Inputs+='<input type="hidden" name="cartbuy['+i+'][sllrId]" value="'+dataSllrid+'" alt="'+placeName+'">'+
                            '<input type="hidden" name="cartbuy['+i+'][gudsId]" value="'+gudsId+'" alt="'+placeName+'">'+
                            '<input type="hidden" name="cartbuy['+i+'][opts]" value="'+dataIds+'-'+dataOpt+'-'+dataNum+'" alt="'+placeName+'">';
                });
  	 		}
  	 	}
  	})
  	$("#cart-form-buy").append(Inputs);
  	var place1="";
  	var place2="";
    if(placeName=="ningbo"){
        place1="hanguo";
  		place2="guonei";
    }else if(placeName=="hanguo"){
        place1="ningbo";
  		place2="guonei";
    }else if(placeName=="guonei"){
        place1="ningbo";
  		place2="hanguo";
    }
  	$("#cart-form-buy input").each(function(){
	    var alt=$(this).attr("alt");
	    if(alt==place1||alt==place2){
	    	$(this).remove()
	    }
	})	
}
//大宗采购购物车选框计算。
function dzcgBuyInput(){
	var carTotalMount=0;
	var carTotalClassfy=0;
	var carTotalMoney=0;
	$("#option1 .choose-spu-cart").each(function(){
		if($(this).prop("checked")){
			var carMount=$(this).parent().parent().parent().parent().find("tr td .total-num span:last-child").html();
			var carClassfy=$(this).parent().parent().parent().parent().find("tr td .total-num span:first-child").html();
			var carMoney=$(this).parent().parent().parent().parent().find("tr td .g-price .g-price-now").html();
			carMoney=carMoney.substring(1,carMoney.length);
			carMoney=carMoney.replace(/\,/g, "")
			carTotalClassfy +=Number(carClassfy);
			carTotalMoney+=Number(carMoney);
			carTotalMount+=parseInt(carMount);
		}
	});
	$("#option1 .dzcg-total-goods b").html(carTotalClassfy);
	$("#option1 .dzcg-total-goods .number").html(carTotalMount);
	$("#option1 .dzcg-total-goods-money b").html(fmoney(carTotalMoney))
}
//一件代发中，显示隐藏三种仓库
function showBuywaY(){
	var guonei=0;
	var baoshuicang=0;
	var hanguocang=0;
	$("#option2 .choose-spu-cart").each(function(){
		if($(this).prop("checked")){
			//将保税仓的归纳到一起
		    if($(this).hasClass("baoshuicang")){
		        baoshuicang++;		    			
		    }
		    //将韩国仓的归纳到一起
			else if($(this).hasClass("hanguocang")){
		    	hanguocang++;    			
			}
			//将国内仓的归纳到一起
			else if($(this).hasClass("guoneicang")){
		    	guonei++;    			
			}
		}
	})
	//三中仓库的商品都有时，让左边显示该仓库所有要购商品的图片区，图片展示区对应宽度变化
	if(baoshuicang>0 && guonei>0 && hanguocang>0){
		if(baoshuicang>7 || guonei>7 || hanguocang>7){
	    	$(".cart-all-goods").css({"width":"650px","overflow-x":"scroll","overflow-y":"hidden"})			
		}else{
			$(".cart-all-goods").css({"width":"650px","overflow":"hidden"})	
		}
	}else{
		if(baoshuicang>9 || guonei>9 || hanguocang>9){
	    	$(".cart-all-goods").css({"width":"650px","overflow-x":"scroll","overflow-y":"hidden"})			
		}else{
			$(".cart-all-goods").css({"width":"820px","overflow":"hidden"})			
		}
	}
	//以下，如果该仓库中有被选中的要购买的商品则展示，没有则该仓库隐藏，图片展示区对应宽度变化
	if(guonei==0){
		$("#option2 .cart-all .middle").hide();
	}else{
		$("#option2 .cart-all .middle").show();
	}
	if(baoshuicang==0){
		$("#option2 .cart-all .right").hide();
	}else{
		$("#option2 .cart-all .right").show();
	}
	if(hanguocang==0){
		$("#option2 .cart-all .left").hide();
	}else{
		$("#option2 .cart-all .left").show();
	}
	//图片多的话，对图片展示区进行左右滚动展示
	$("#option2 .cartImgShow").mouseenter(function(){
		var className=0;
		if($(this).hasClass("cart-all-store-button")){
			 className=baoshuicang;
		}else if($(this).hasClass("cart-all-store-button-guo")){
			 className=guonei;
		}else if($(this).hasClass("cart-all-store-button-collap")){
			 className=hanguocang;
		}
		if(className>9){
			$("#option2 .cart-all-goods").css({"overflow-x":"scroll","overflow-y":"hidden"})
		}else{
			$("#option2 .cart-all-goods").css({"overflow":"hidden"})
			if((guonei>0 && hanguocang>0 && baoshuicang>0)&& className>7){
			    $("#option2 .cart-all-goods").css({"overflow-x":"scroll","overflow-y":"hidden"})
	     }else{
			    $("#option2 .cart-all-goods").css({"overflow":"hidden"})
		    }
		}
	})
}
//判断宁波保税仓购买数是否大于库存数
function baoshuicangCheck(){
	var baoshuicangNum=0;
	kuCunNum();
	//一件代发循环遍历所有的商品的spu
	$("#option2 .choose-img .choose-item").each(function(){
		if($(this).prop("checked")){
	 		if($(this).hasClass("baoshuicang")){ 
          		$(this).parent().parent().parent().parent().find(".g-num input").each(function(){
          			var bsVal=0; var bsMax=0;
          			bsVal=$(this).val();
          			bsVal=Number(bsVal);
          			bsMax=$(this).prop("max");
          			bsMax=Number(bsMax);
          			if(bsVal>bsMax){
          	  			baoshuicangNum++;
          	   			$(this).parent().parent().parent().parent().addClass("error")
          	 			Showbo.Msg.alert("商品超过库存，无法下单，请再次确认！");
          	 			//如果修改sku下的加减和input值后，则进行下面的函数
          	  			$(this).parent().click(function(){
           	   	 			kuCunNum();
          	   	   			var bsVal_two=0;var bsMax_two=0;
          	   	   			bsVal_two=$(this).find("input").val();
          	   	   			bsVal_two=Number(bsVal_two);
          	   	    		bsMax_two=$(this).find("input").prop("max");
          	   	   			bsMax_two=Number(bsMax_two);
          	   	    		if(bsVal_two>bsMax_two){
		 	         			baoshuicangNum++;
		 	         			return false;
		 	        		}else{
		 	         			$(this).parent().parent().parent().removeClass("error");
		 	         			baoshuicangNum--;
		 	         			return false;
		 	         		}
          	   			})
          			}else{
		        		$(this).parent().parent().parent().removeClass("error");
		        		return false;
		 	 		}
         	 	})
			}	
		}
 	})
 	if(baoshuicangNum==0){
 	 	goodsGoBuy("baoshuicang","ningbo")
   		$("#cart-form-buy").submit();
 	 	return false;
 	}
}
//单个商品中小计的页面展示。
function goodsTipDisplay(){
	$(".cart-list-flag").each(function(){
		//小计总数目
		var goodsTipNum=0;
		//小计总价格
		var goodsTipPrice=0;
		//小计sku种类数
		var goodsTipClassify=0;
		$(this).find(".g-num").each(function(){
			var checked=$(this).parent().parent().find(".choose-guds-sku").prop("checked");
		  	if(checked){
		   		var goodsNum=$(this).find("input").val();
				goodsTipNum+=Number(goodsNum);
		   }
		})
		$(this).find(".total-num .kind-number").html(goodsTipNum);      
		$(this).find(".g-price-piece").each(function(){
			var checked=$(this).parent().parent().parent().find(".choose-guds-sku").prop("checked");
			if(checked){
				var goodsPrice=$(this).html();
				goodsPrice=goodsPrice.substring(1,goodsPrice.length).replace(/\,/g, "");
				goodsTipPrice+=Number(goodsPrice);
			}
		})
		$(this).find(".sku-price .g-price .g-price-now").html("￥"+fmoney(goodsTipPrice));
	})
}
//spu中，如果有一个sku被选中，则spu未选中状态
function skuInputCheck(){
	$(".cart-list-flag").each(function(){
		var checkboxNum=0
		$(this).find(".g-size input").each(function(){
			if($(this).prop("checked")){
				checkboxNum++
			}
		})
		if(checkboxNum>0){
			$(this).find(".choose-item").prop("checked",true);
		}else{
			$(this).find(".choose-item").prop("checked",false);
		}
	})
}
//添加库存校验所封装的函数
function kuCunNum(){
	//遍历所有保税仓sku的input中的data-ids放入到数组里
	var ningboBaoshui=[];
	$("#option2 .choose-item").each(function(){
		if($(this).hasClass("baoshuicang")){
          	$(this).parent().parent().parent().parent().find(".g-num").each(function(){
            	var dataId= $(this).find("input").attr("data-ids");
              	ningboBaoshui.push(dataId)
           	})
     	}
	})
	//遍历数组中的数据，拼接到url接口地址里面
  	var url="order/inventory?optId="
   	for(var i=0;i<ningboBaoshui.length;i++){
   	 	if(i==0){
   	 		url=url+ningboBaoshui[i];
   	 	}else{
   	 		url=url+","+ningboBaoshui[i];
   		}
    }
    var ningboCangku=[];
 // ajax请求宁波保税仓的各个sku的仓库值，拿到之后以max属性的形式，放入到该input里面
    $.ajax({
	   	type:"get",
	   	url:url,
	   	dataType:"json",
	   	async:false,
	   	success:function(r){
	        for(var i=0;i<ningboBaoshui.length;i++){
	       	  	var a=r.data[ningboBaoshui[i]]
	       		ningboCangku.push(a);
	        }
	        var cangkuNum=0;
			$("#option2 .choose-item").each(function(){
				if($(this).hasClass("baoshuicang")){
			        $(this).parent().parent().parent().parent().find(".g-num").each(function(){
			            $(this).find("input").attr("max",ningboCangku[cangkuNum]);
			            $(this).parent().find("span").html("(库存"+ningboCangku[cangkuNum]+")");
			               cangkuNum++;
		 	        })
			    }
		    })
	    }

    });
}
//判断，如果为所有商品都选中了，则全选按钮为选中
function allCheckedBox(){
	var dzcg=true;
	var yjdf=true;
	var buyWayHtml="大宗采购";
	var className="#option1 .cart-list-flag";
	$(".buy-way").each(function(){
		if($(this).hasClass("on")){
			buyWayHtml=$(this).html();
		}
	})
	if(buyWayHtml=="大宗采购"){
		allCheckedBoxNext("#option1 .cart-list-flag",dzcg,"#option1 .dzcg-choose");
	}else if(buyWayHtml=="一件代发"){
		allCheckedBoxNext("#option2 .cart-list-flag",yjdf,"#option2 .choose-all .choose");
	}
}
//allCheckedBox的子函数
function allCheckedBoxNext(allclassName,buyType,allChoose){
	//大宗采购   全选
	$(allclassName).each(function(){
		var index=0;
		$(this).find(".g-size .choose-guds-sku").each(function(){
			if($(this).prop("checked")){
				index++;
			}
		})
		var length=$(this).find(".g-size .choose-guds-sku").length;
		if(length==index){}
		else{
			buyType=false
		}
	})
	if(buyType){
        $(allChoose).prop("checked",true)
	}else{
        $(allChoose).prop("checked",false)
	}
}
//删除所选中商品逻辑的封装
function deleteGoodsChoose(className){
	var deleteItems=0;
		$(className).each(function(){
			 if($(this).prop("checked")){
			 	deleteItems++;
			 }
		})
		if(deleteItems==0){
		    Showbo.Msg.alert("删除所选中的商品为空");
		}else if(deleteItems >= 1){
    		Showbo.Msg.confirm('您确定删除所选中的商品吗？',function(flag){
            	$(className).each(function(){
            		if($(this).prop("checked")){
            			$(this).parent().parent().parent().find("td .g-delete").each(function(){
            		 		var $this = $(this),target = $this.data("target"),data={};
							if($this.hasClass(".guds")){
								data.sllrId = gudsDetail[target].sllrId;
								data.gudsId = gudsDetail[target].gudsId;
							}else{
								data.sllrId = gudsDetail[target].sllrId;
								data.gudsId = gudsDetail[target].gudsId;
								data.gudsOptId = $this.data("ids");
							}
							if($("#option2").css("display")=="none"){
								data.type = 0;
							}else{
								data.type = 1;
							}
              		 		if(flag =='yes'){
								$.ajax({
									"url":"/cart/del",
									"type":"post",
									"data":data,
									"dataType":"json",
									"success":function(r){
										if(r.success){
											var tr = $this.parents("tr"),num = parseInt($(".cart-num-in-topnav").html());
											//删除商品或sku
											if(tr.hasClass("guds-show-cart")){
												num = num - $(".guds-sku-"+target).length;
												$(".guds-table-"+target).remove();
											}else{
												num = num - 1;
												tr.remove();
											}
											//商品属性全部被删除
											if($(".guds-sku-"+target).length < 1){
												$(".select-guds-cart-"+target).prop("checked",false);
												$(".guds-table-"+target).remove();
											}
											countGuds(target);
											//0为大宗采购，
											if(data.type == 0){
												if($("#option1").find(".cart-list").length == 1){
													$(".total-money-1").html("￥0.00");
												}
											}else{
												if($("#option2").find(".cart-list").length == 1){
													$("#option1 .total-money-2").html("￥0.00");
												}
											}
											//购物车商品删没了
											if($(".cart-list").length == 2){
												window.location.href="";
											}
											$('.cart-num-in-topnav').text(num);
										}else{
											Showbo.Msg.alert(r.message);
										}
								    }
								});
						    }else if( flag == 'no'){
								return false;
							}
            			})
            	    }
               })
			},'确认', '取消');	
		}
}
function dzcgPurchaseNow(){
	var windowScroll=$(window).scrollTop()+1000;
	var cartBtn=$(".cart-btn").offset().top;
	if(windowScroll < cartBtn){
		$(".cart-btn1").css({"opacity":"1","filter":"alpha(opacity=100)","display":"block"})
	}
	else{
		$(".cart-btn1").css({"opacity":"0","filter":"alpha(opacity=0)","display":"none"})
	}
}
function yjdfPurchaseNow(){
	var windowScroll=$(window).scrollTop()+1000;
	var cartBtn=$(".yjdf-pay-order").offset().top;
	if(windowScroll < cartBtn){
		$(".yjdfPurchase").css({"opacity":"1","filter":"alpha(opacity=100)","display":"block"})
	}
	else{
		$(".yjdfPurchase").css({"opacity":"0","filter":"alpha(opacity=0)","display":"none"})
	}
}