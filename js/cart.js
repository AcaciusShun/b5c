! function() {
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
        $(".rec-refresh").on("click", function() {
            for (var e = $(".goods").length, r = 0; e > r; r++)
                if ("block" == $(".tab" + r).css("display")) {
                    if (r != e - 1) {
                        var n = $(".tab" + r);
                        r += 1;
                        var o = $(".tab" + r)
                    } else var n = $(".tab" + (e - 1)),
                        o = $(".tab0");
                    return n.css("display", "none"), void o.fadeIn()
                }
        }), $(".myorder-page .page-go").on("change", function() {
            var e = Number($(this).val()),
                r = Number($(this).prop("max")),
                n = Number($(this).prop("min"));
            e >= r ? $(this).val(r) : n >= e && $(this).val(n)
        }), $(".myorder-page .page-go-btn").on("click", function() {
            for (var e = $(this).parent().parent().find("li .page-go").val(), r = $(this).prop("href"), n = r.split("="), o = "", i = 0; i < n.length - 1; i++) i > 0 ? o = o + "=" + n[i] : o += n[i];
            var t = o + "=" + e;
            $(this).prop("href", t)
        })
    })
}(window);