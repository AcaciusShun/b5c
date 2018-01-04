function timer(t) {
    window.setInterval(function() {
        var s = 0,
            i = 0,
            e = 0,
            a = 0;
        t > 0 && (s = Math.floor(t / 86400), i = Math.floor(t / 3600) - 24 * s, e = Math.floor(t / 60) - 24 * s * 60 - 60 * i, a = Math.floor(t) - 24 * s * 60 * 60 - 60 * i * 60 - 60 * e), 9 >= e && (e = "0" + e), 9 >= a && (a = "0" + a), $(".lastTime-day").html(s), $(".lastTime-hour").html(i), $(".lastTime-minute").html(e), $(".lastTime-second").html(a), t--
    }, 1e3)
}

function timer1(t) {
    var s = 0,
        i = 0,
        e = 0,
        a = 0;
    t > 0 && (s = Math.floor(t / 86400), i = Math.floor(t / 3600) - 24 * s, e = Math.floor(t / 60) - 24 * s * 60 - 60 * i, a = Math.floor(t) - 24 * s * 60 * 60 - 60 * i * 60 - 60 * e), 9 >= e && (e = "0" + e), 9 >= a && (a = "0" + a), $(".lastTime-day").html(s), $(".lastTime-hour").html(i), $(".lastTime-minute").html(e), $(".lastTime-second").html(a), t--
}! function(t) {
    require.config({
        paths: {
            jQ: "jquery-1.9.1.min",
            common: "common_min"
        },
        shim: {
            common: {
                deps: ["jQ"]
            }
        }
    }), require(["common"], function() {
        try {
            var s = $(".detail-tab");
            s.on("click", ".tab-tit-item:not(.active)", function() {
                var t = $(this),
                    i = t.index();
                t.addClass("active").siblings(".tab-tit-item").removeClass("active"), s.find(".tab-item").eq(i).show().siblings().hide()
            })
        } catch (i) {
            t.console && console.log(i)
        }
        $cart_list = $(".sku-detail"), $cart_list.on("click", ".opt-sku-select", function() {
            $(this).addClass("active").siblings().removeClass("active")
        }), $cart_list.on("click", ".buy-cart", function() {
            // var t = $(".buy-animation"),
            //     s = $(".buy-cart");
            // t.css("width", "32px"), x = s.offset().left, y = s.offset().top, t.css({
            //     left: x + 44,
            //     top: y
            // }).animate({
            //     left: x - 22,
            //     top: 62
            // }, 500), t.animate({
            //     width: "0px"
            // }, 10), t.animate({
            //     left: x + 44,
            //     top: y
            // }, 1)
        }), $cart_list.on("click", ".buy-cart-df", function() {
            // var t = $(".buy-animation-df"),
            //     s = $(".buy-cart-df");
            // t.css("width", "32px"), x = s.offset().left, y = s.offset().top, t.css({
            //     left: x + 44,
            //     top: y
            // }).animate({
            //     left: x - 22,
            //     top: 62
            // }, 500), t.animate({
            //     width: "0px"
            // }, 10), t.animate({
            //     left: x + 44,
            //     top: y
            // }, 1)
        });
        var e = $(".scroll-part").children().length / 2;
        5 >= e ? ($(".scroll-part").css("height", 40 * e + "px"), $(".detail-more").css("display", "none")) : ($(".scroll-part").css("height", "110px"), $(".detail-more").css("display", "block")), $(".detail-more").click(function() {
            if ("110px" == $(".scroll-part").css("height")) {
                var t = $(".scroll-part").children().length / 2;
                $(".scroll-part").css("height", 40 * t + "px"), $(".more").addClass("on")
            } else $(".scroll-part").css("height", "110px"), $(".more").removeClass("on")
        }), $(".select-button").click(function() {
            "none" == $(".sku-price-num-list-flex").css("display") ? ($(".sku-price-num-list-flex").css("display", "block"), $(".sku-price-num-list-cover").css("display", "block"), $(this).addClass("on")) : ($(".sku-price-num-list-flex").css("display", "none"), $(".sku-price-num-list-cover").css("display", "none"), $(this).removeClass("on"))
        }), $(".sku-price-num-list-cover").click(function() {
            $(this).css("display", "none"), $(".sku-price-num-list-flex").css("display", "none")
        }), $(".myorder-page .page-go").on("change", function() {
            var t = Number($(this).val()),
                s = Number($(this).prop("max")),
                i = Number($(this).prop("min"));
            t >= s ? $(this).val(s) : i >= t && $(this).val(i)
        }), $(".myorder-page .page-go-btn").on("click", function() {
            for (var t = $(this).parent().parent().find("li .page-go").val(), s = $(this).prop("href"), i = s.split("="), e = "", a = 0; a < i.length - 1; a++) a > 0 ? e = e + "=" + i[a] : e += i[a];
            var l = e + "=" + t;
            $(this).prop("href", l)
        });
        var a = $(".lastTime").attr("data-time");
        a && (a = parseInt(a), timer1(a), timer(a))
        $(".scroll-part").css("height", "auto");
    })
}(window);