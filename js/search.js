$(function() {

    $('.hovercat').mouseover(function() {
        $('.menu-unslider').show();
    })
    $("#brand-all-item-fun").click();

    $("#live800iconlink").attr("style", "display:none;")
    $('form').on('beforeSubmit', function(e) {
        $(':submit').attr('disabled', true).addClass('disabled');
        $(':submit').text("提交中..");
    });
    $(".search-btn").on("click", function() {
        var form = $("#search-form-nav");
        var word = $(".search").val();
        form.attr("onsubmit", "return true");
        form.submit();
    });
    $("#m-brand .more").click(function() {
        $("#m-brand").addClass("on");
    });
    $("#m-brand .more2").click(function() {
        $("#m-brand").removeClass("on");
    });

    $("#m-cate .more").click(function() {
        $("#m-cate").addClass("on");
    });
    $("#m-cate .more2").click(function() {
        $("#m-cate").removeClass("on");
    });
    //顶部搜索
    $("#input-search-header").keyup(function(event) {

        var e = event || window.event || arguments.callee.caller.arguments[0],
            $this = $(this);
        if (e && (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) { // enter 键
            var a = $(".auto-fill-list").find(".active");
            if (e.keyCode == 40) {
                $(".auto-fill-list").find(".atf-item").removeClass("active");
                if (a.length == 0) {
                    $(".auto-fill-list").find(".atf-item").first().addClass("active");
                    $this.val($(".auto-fill-list").find(".atf-item").first().find(".auto-fill-word").text());
                } else {
                    $this.val(a.next().find(".auto-fill-word").text());
                    a.next().addClass("active");
                }
            } else if (e.keyCode == 38) {
                $(".auto-fill-list").find(".atf-item").removeClass("active");
                if (a.length == 0) {
                    $this.val($(".auto-fill-list").find(".atf-item").last().find(".auto-fill-word").val());
                    $(".auto-fill-list").find(".atf-item").last().addClass("active");
                } else {
                    $this.val(a.prev().find(".auto-fill-word").text());
                    a.prev().addClass("active");
                }
            } else if (e.keyCode == 13) {
                var form = $("#search-form-nav");
                form.attr("onsubmit", "return true");
                form.submit();
            }
            return;
        }
        getList();
    });

    $("#b5c_wrap").click(function(obj) {
        var isFocus = $("#input-search-header").is(":focus");
        if (!isFocus) {
            $("#auto-fill-div-self").html("");
        }
    });
    $("#input-search-header").focus(function() {
        getList();
    });
});

function getList() {
    var obj = $("#input-search-header"),
        addr = obj.data("ad"),
        key = obj.val(),
        listHtml = '';
    if (!key) {
        $("#auto-fill-div-self").html("");
        return false;
    }

    $.ajax({
        type: "get",
        data: { 'key': key },
        url: "/site/getauto",
        dataType: "json",
        // jsonp: "jsonpCallback",
        success: function(obj) {
            if (obj.length == 0) {
                $("#auto-fill-div-self").html("");
                return false;
            }
            listHtml += '<div class="auto-fill"><div class="auto-fill-list">';
            jQuery.each(obj, function(k, v) {
                listHtml += '<a class="atf-item" onmouseover="comeTexiao()" href="/search?w=' + v.term + '"><cite class="s-result-num">约' + v.total_count + '个结果</cite><span class="auto-fill-word">' + v.term + '</span></a>';
            })
            listHtml += '</div></div>';
            $("#auto-fill-div-self").html(listHtml);
        }
    });

    //$.ajax({
    //    type: "get",
    //    data:{'key':key},
    //    url: "autofill.html",
    //    dataType : "json",
    //   // jsonp: "jsonpCallback",
    //    success : function(obj){
    //        if (obj.code = 200) {
    //            $.ajax({
    //                type: "get",
    //                data:{'key': key},
    //                url: obj.url,
    //                dataType : "jsonp",
    //                jsonp: "jsonpCallback",
    //                success : function(r){
    //                    if(r.length == 0){
    //                      $("#auto-fill-div-self").html("");
    //                      return false;
    //                    }
    //                    listHtml +='<div class="auto-fill"><div class="auto-fill-list">';
    //                    r.map(function(v,k){
    //                      listHtml +='<a class="atf-item" onmouseover="comeTexiao()" href="/search?w='+v.term+'"><cite class="s-result-num">约'+v.total_count+'个结果</cite><span class="auto-fill-word">'+v.term+'</span></a>';
    //                    })
    //                    listHtml +='</div></div>';
    //                    $("#auto-fill-div-self").html(listHtml);
    //                }
    //            })
    //        } else {
    //            return false;
    //        }
    //
    //    }
    //});
}

function comeTexiao() {
    $("#auto-fill-div-self").find(".atf-item").removeClass("active")
}

function searchBrand(s, w) {
    $.ajax({
        url: 'search.html?w=' + w,
        type: 'post',
        data: { 'sllrId': s },
        dataType: 'json',
        success: function(r) {
            if (r.succeess) {
                $('.result-list').html(r.message);
            }
        }
    });
}

/* 商品收藏 */
function collectgoods(obj) {
    if (statcd == '') {
        Showbo.Msg.alert('请先登录', function() {
            $("#check-login").click();
        });
        return false;
    }
    // 商品ID
    var gudsId = $("input[name='gudsId']").val();
    // 品牌名称
    var sllrId = $("input[name='sllrId']").val();
    // 是否收藏
    var is_collect = $('#is_collect').val();

    var msg = '收藏成功';
    var ibj = obj;
    $.ajax({
        url: '/ucenter/collectgoods',
        type: 'post',
        data: { 'sllrId': sllrId, 'gudsId': gudsId, 'is_collect': is_collect },
        dataType: 'json',
        success: function(obj) {
            if (obj.errorcode == 0) {

                if (is_collect != 0) {
                    msg = '取消收藏成功';
                    $('#is_collect').attr('value', 0);
                    $(ibj).removeClass("heartAnimation").attr("rel", "like");
                } else {
                    $('#is_collect').attr('value', 1);
                    $(ibj).addClass("heartAnimation").attr("rel", "unlike");
                }
                //Showbo.Msg.alert(msg);
                return false;
            } else {
                Showbo.Msg.alert(obj.errormsg);
                return false;
            }
        }
    })
}

/**
 * 取消收藏
 * @param sllrId
 * @param gudsId
 * @param id
 */
function no_collcect(sllrId, gudsId, id) {

    $.ajax({
        url: '/ucenter/collectgoods',
        type: 'post',
        data: { 'sllrId': sllrId, 'gudsId': gudsId, 'is_collect': 1 },
        dataType: 'json',
        success: function(obj) {
            if (obj.errorcode == 0) {
                Showbo.Msg.alert('取消收藏成功');
                Stat.addEvent(208, 'unfavorite');
                setTimeout(function() {
                    $('#goods_' + id).remove();
                    var nums = $('#collect_num').attr('data-value');
                    if (nums > 0) {
                        $('#collect_num').attr("data-value", nums - 1);
                        $('#collect_num').html("我收藏的商品(" + (nums - 1) + ")");
                    }
                }, 1500);

                return false;
            } else {
                Showbo.Msg.alert(obj.errormsg);
                return false;
            }
        }
    })
}

/* 品牌关注 */
function attentionbrand(sllrId) {
    var is_attention = $("input[name='is_attention']").val();
    $.ajax({
        'url': '/ucenter/attentionbrand',
        'type': 'POST',
        'data': { 'sllrId': sllrId, 'is_attention': is_attention },
        'dataType': 'json',
        success: function(obj) {
            if (obj.errorcode == 0) {
                if (1 == is_attention) {
                    Showbo.Msg.alert('取消关注成功');
                    Stat.addEvent(208, 'unfollow');
                    var html = '<input type="hidden" name="is_attention" value="0">' +
                        '<a href="javascript:void(0);" onclick="attentionbrand(\'' + sllrId + '\')"><span class="brand-fh">+&nbsp;</span><span class="brand-wz" data-mps="PO1">关注该品牌</span></a>';
                } else {
                    var html = '<input type="hidden" name="is_attention" value="1">' +
                        '<a href="javascript:void(0);" onclick="attentionbrand(\'' + sllrId + '\')"><span class="brand-fh">-&nbsp;</span><span class="brand-wz" data-mps="PO2">取消关注</span></a>';
                    Showbo.Msg.alert('关注成功');
                }
                $(".brand-attention").html(html);
                return false;
            } else {
                if (obj.errorcode == 10001) {
                    Stat.addEvent(208, 'notlogin');
                    Showbo.Msg.alert('请先登录', function() {
                        $("#check-login").click();
                    });
                } else {
                    Showbo.Msg.alert(obj.errormsg);
                }
                return false;
            }
        }
    })
}

/* 取消品牌关注 */
function no_attentionbrand(sllrId, id) {

    $.ajax({
        'url': '/ucenter/attentionbrand',
        'type': 'POST',
        'data': { 'sllrId': sllrId, is_attention: 1 },
        'dataType': 'json',
        success: function(obj) {
            if (obj.errorcode == 0) {
                $('#brand_fav_list_' + id).remove();
                var nums = $('#attention_num').attr('data-value');
                if (nums > 0) {
                    $('#attention_num').attr("data-value", nums - 1);
                    $('#attention_num').html("我关注的品牌(" + (nums - 1) + ")");
                }
                Stat.addEvent(208, 'unfollow');
                Showbo.Msg.alert('取消关注成功');
                return false;
            } else {
                Showbo.Msg.alert(obj.errormsg);
                return false;
            }
        }
    })
}