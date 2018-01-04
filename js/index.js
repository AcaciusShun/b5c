$(function(){
    $(window).scroll(function(){  
        if ($(window).scrollTop()>196){
            $('.topnavinner-bg').css({"opacity":1,"top":0});
            $('.topnavinner-bg').show();
        }
        else  
        {  
            $('.topnavinner-bg').css({"opacity":0,"top":"-48px"});
            $('.topnavinner-bg').hide();
        } 
    });
    //default
    $('.topnavinner-bg').hide();
    $(".return_top").click(function(){  
        $('body,html').animate({scrollTop:0},500);  
        return false;
    });        
});


function convertUserStrToObj(userStr){
    //如果是空字符串，即没有用户信息，那么购物车为空，直接返回一个空对象
    if(!userStr){
        return {};
    }
    var users = userStr.split(":");
    var obj = {};
    for(var i = 0; i < users.length; i ++){
        var data = users[i].split(",");
        //以用户的id为健，用户的其他信息为值，这个值也设计为一个对象
        obj[data[0]] = {
            username : data[1],
            password : data[2],
            email : data[3],
            qq : data[4]
        }
    }
    return obj;
}
