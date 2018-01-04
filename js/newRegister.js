var nums = 1;
var true1 = true;
$(function() {
    var true1 = true;
    // 验证码
    $(".register_code").on("click", function() {

        if ($(this).hasClass("disabled")) {
            return false;
        }
        var mobile = $(".username_mobile").val();
        var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
        if (!mobile) {
            Showbo.Msg.alert('手机号码不能为空');
            return false;
        }


        if (!reg.test(mobile)) {
            Showbo.Msg.alert('手机号码格式不正确');
            return false;
        }

        var captchas = $('#captchas').val();
        if (captchas == '') {
            Showbo.Msg.alert('图形验证码不能为空');
            return false;
        }

    });


    /* 第一步判断提交s */
    $('#submit_step_1').click(function() {
        var true1 = true;
        var mobilecode = $('input[name=mobilecode]').val();
        if (!mobilecode) {
            Showbo.Msg.alert('短信验证码不能为空');
            ture1 = false;
            return false;
        }

        var mobile = $(".username_mobile").val();
        if (!mobile) {
            Showbo.Msg.alert('手机号码不能为空');
            ture1 = false;
            return false;
        }
        // Showbo.Msg.alert(true1);  当全部数据正确时跳转


                if (!true1) {
                    Showbo.Msg.alert('短信验证码错误');
                    return false;
                } else {
                    $('#re_mobile').val(mobile);
                    $('#step-1').hide();
                    $('.step2').addClass('active');
                    $('#step_2').show();
                }

        })

    });

    /* 第一步判断提交e */


    $('#submit_step_2').click(function() {

        var username = $('#username').val();
        if (username == '') {
            Showbo.Msg.alert('用户名不能为空');
            ture1 = false
            return false;
        }
        var password = $('#password').val();
        if (password == '') {
            Showbo.Msg.alert('密码不能为空');
            ture1 = false
            return false;
        }
        var repassword = $('#repassword').val();
        if (repassword == '') {
            Showbo.Msg.alert('确认密码不能为空');
            ture1 = false
            return false;
        }

        if (repassword != password) {
            Showbo.Msg.alert('两次密码输入的不同');
            ture1 = false
            return false;

        }


        var us_email = $('#email').val();
        if (us_email == '') {
            Showbo.Msg.alert('邮箱地址不能为空');
            ture1 = false
            return false;


        }

        pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

        if (!pattern.test(us_email)) {
            Showbo.Msg.alert('邮箱格式不正确');
            ture1 = false
            return false;

        }


        var qq = $('#qq').val();
        if (qq == '') {
            Showbo.Msg.alert('QQ不能为空');
            ture1 = false
            return false;
        }

        patter_qq = /^[0-9]{4,11}$/;

        if (!patter_qq.test(qq)) {
            Showbo.Msg.alert('QQ号码格式不正确');
            ture1 = false
            return false;
        }

        var re_mobile = $('#re_mobile').val();
        var tags = true;
        var dianpu_val = [];
        $('input[name="shop[]"]').each(function(i) {
            var valus_s = $(this).val();
            if (!valus_s) {
                tags = false;
                Showbo.Msg.alert('店铺名不能为空');
                ture1 = false
                return false;
            } else {
                dianpu_val[i] = $(this).val();
            }
        });

        if (!tags) {
            return false;
        }

        var qudao_code = $('#qudao_code').val();
        if (qudao_code == '') {
            Showbo.Msg.alert('销售渠道必须选择一个');
            ture1 = false
            return false;
        }
        var want_code = $('#want_code').val();
        if (want_code == '') {
            Showbo.Msg.alert('请选择一个您想要销售的商品');
            ture1 = false
            return false;
        }

        // 个人选择
        var qudao_val = $('#qudao').val();
        var want_val = $('#want').val();
        var refurl = $('#refurl').val();
        if (tags) {

            if (true1 == 1) {
                var mobile = $(".username_mobile").val();
                //获取cookie中的信息
                //如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
                var userStr = $.cookie("user") ? $.cookie("user") : "";
                //将字符串转成对象
                var userObj = convertUserStrToObj(userStr);
                //判断该商品是否已经在购物车中存在
                if(mobile in userObj){
                    //如果已存在，那么弹出提示
                    Showbo.Msg.alert('该用户已存在');
                }else{
                    //如果不存在，那么将的信息存入
                    userObj[mobile] = {
                        mobile:mobile,
                        username : username,
                        password : repassword,
                        email : us_email,
                        qq : qq
                    };
                }

                //将新的用户信息存到cookie
                //将对象转为字符串
                userStr = convertObjToUserStr(userObj);
                //存入cookie
                //document.cookie = "key=value"
                $.cookie("user",userStr,{expires : 7,path:"/"});



                $('#step_2').hide();
                $('#step_3').show();
                $('.step3').addClass('active');

                $("#alredy-reg-login").remove();

                // Showbo.Msg.alert('测试语句');

                window.setInterval(function() {
                    var times = $('#time_out').text();
                    if (parseInt(times) <= 0) {
                        window.location.href = 'login.html';
                    } else {
                        $('#time_out').text(parseInt(times) - 1);
                    }
                }, 1000);
            } else {
                Showbo.Msg.alert(obj.msg);
                return false;
            }
        }



    });

        function convertUserStrToObj(userStr){
            //如果是空字符串，即没有用户信息，那么用户为空，直接返回一个空对象
            if(!userStr){
                return {};
            }
            var users = userStr.split(":");
            var obj = {};
            for(var i = 0; i < users.length; i ++){
                var data = users[i].split(",");
                //以用户的id为健，用户的其他信息为值，这个值也设计为一个对象
                obj[data[0]] = {
                    mobile : data[1],
                    username : data[2],
                    password : data[3],
                    email : data[4],
                    qq : data[5]
                }
            }
            return obj;
        }
        function convertObjToUserStr(obj){
            /* {
             * 	mobile1 : {
             * 	mobile : ,
             * 		username : "xiaoming",
                 * password : 123456,
                 * email : hhhhh@qq.com,
                 * qq : "1026289997"
                 * }

             * }
             */
            var userStr = "";
            //遍历对象
            for(var mobile in obj){
                if(userStr){
                    userStr += ":";
                }
                //"mobile,xiaoming,123456,hhhhh@qq.com,1026289997:mobile2,xiaomi,2222,nihao@qq.com,1213424"
                userStr += mobile + "," + obj[mobile].mobile + "," + obj[mobile].username + "," + obj[mobile].password + "," + obj[mobile].email + "," + obj[mobile].qq;
            }
            return userStr;
        }



    /* 第二步判断提交s */
    $('#qudao').click(function() {
        var temp_id = $(this).attr('data-value');
        if (temp_id == 1) {
            $(this).attr('data-value', 2);
            $('#option1').show();
        } else {
            $(this).attr('data-value', 1);
            $('#option1').hide();
        }
    });

    $('#want').click(function() {
        var temp_id = $(this).attr('data-value');
        if (temp_id == 1) {
            $(this).attr('data-value', 2);
            $('#option2').show();
        } else {
            $(this).attr('data-value', 1);
            $('#option2').hide();
        }
    });
    /* 第二步判断提交e */


    // 渠道选择
    $('.qudao').click(function() {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');

            var temp_qudao = $('#qudao').val();
            var temp_arr = temp_qudao.split(',');
            var current_value = $(this).attr('data-value');
            for (var i = 0; i < temp_arr.length; i++) {
                if (temp_arr[i] == current_value) {

                    temp_arr.splice(i, 1);
                }
            }
            $('#qudao').attr('value', temp_arr.join(','));


            var temp_qudao_code = $('#qudao_code').val();
            var temp_arr_code = temp_qudao_code.split(',');
            var current_value_code = $(this).attr('data-id');
            for (var i = 0; i < temp_arr_code.length; i++) {
                if (temp_arr_code[i] == current_value_code) {

                    temp_arr_code.splice(i, 1);
                }
            }
            $('#qudao_code').attr('value', temp_arr_code.join(','));


        } else {
            $(this).addClass('on');
            var temp_qudao = $('#qudao').val();
            if (temp_qudao == '') {
                temp_qudao = $(this).attr('data-value');
            } else {
                temp_qudao = temp_qudao + ',' + $(this).attr('data-value');
            }
            $('#qudao').attr('value', temp_qudao);


            // code传值
            var temp_qudao_code = $('#qudao_code').val();
            if (temp_qudao_code == '') {
                temp_qudao_code = $(this).attr('data-id');
            } else {
                temp_qudao_code = temp_qudao_code + ',' + $(this).attr('data-id');
            }
            $('#qudao_code').attr('value', temp_qudao_code)
        }
    });
    // 渠道选择

    // 销售哪些商品的选择
    $('.want').click(function() {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            var temp_qudao = $('#want').val();
            var temp_arr = temp_qudao.split(',');
            var current_value = $(this).attr('data-value');
            for (var i = 0; i < temp_arr.length; i++) {
                if (temp_arr[i] == current_value) {

                    temp_arr.splice(i, 1);
                }
            }
            $('#want').attr('value', temp_arr.join(','));

            var temp_want_code = $('#want_code').val();
            var temp_arr_code = temp_want_code.split(',');
            var current_value_code = $(this).attr('data-id');
            for (var i = 0; i < temp_arr_code.length; i++) {
                if (temp_arr_code[i] == current_value_code) {

                    temp_arr_code.splice(i, 1);
                }
            }
            $('#want_code').attr('value', temp_arr_code.join(','));

        } else {
            $(this).addClass('on');
            var temp_want = $('#want').val();
            if (temp_want == '') {
                temp_want = $(this).attr('data-value');
            } else {
                temp_want = temp_want + ',' + $(this).attr('data-value');
            }

            $('#want').attr('value', temp_want);

            var temp_want_code = $('#want_code').val();
            if (temp_want_code == '') {
                temp_want_code = $(this).attr('data-id');
            } else {
                temp_want_code = temp_want_code + ',' + $(this).attr('data-id');
            }

            $('#want_code').attr('value', temp_want_code)
        }
    });
    // 销售哪些商品的选择


    /* 新增店铺数目 不得超过3个 */
    $('.add').click(function() {
        if (nums >= 3) {
            Showbo.Msg.alert('当前选择不得超过3个');
            return false;
        }
        html = '<li class="ucenter-item">' +
            '<span class="delete" onclick="delete_shop(this)"></span><input type="text" class="shop" name="shop" maxlength="50" placeholder="店铺名，个人或微商可填微信号">' +
            '<p class="tip"></p><i class="v-icon"></i></li>';
        $(this).parent().after(html);
        nums++;
    });

function delete_shop(obj) {
    $(obj).parent().remove();
    nums--;
}

function change_valu(obj) {
    $('#submit_step_1').attr('disabled', "disabled");
    $('#submit_step_1').addClass('error');
    var url = $(obj).attr('data-value');
    $('#catp').attr('src', url + "?d=" + Math.random());
    $('input[name=mobilecode]').attr('disabled', "disabled");

}


var sec = 60;
var waitingHandle;

function waitingRetry() {
    sec -= 1;
    if (sec <= 0) {
        $(".get-phone-code").show();
        $(".get-code").hide();
        $(".get-phone-code").html("获取手机验证码");
        window.clearInterval(waitingHandle);
        sec = 60;
    } else {
        $(".get-phone-code").hide();
        $(".get-code").show();
        $(".get-code").html("重新发送验证码(" + sec + ")");
        return false;
    }
}