/*
window.onload = function () {
     // -----------------------------------------------------------------------------------------------------------------
    //个人中心
    $().getClass('member').hover(function () {
        //$().getClass('member').css('background','url("images/arrow2.png")  no-repeat 60px 6px');
        $(this).css('background', 'url("images/arrow2.png")  no-repeat 60px 6px');
        $().getClass('member_ul').show();
    }, function () {
        // $().getClass('member').css('background','url("images/arrow.png")  no-repeat 60px 6px');
        $(this).css('background', 'url("images/arrow.png")  no-repeat 60px 6px');
        $().getClass('member_ul').hidden();
    });
    // -----------------------------------------------------------------------------------------------------------------
    var loginPage = $().getId('loginPage');
    var screen = $().getId('screen');
    var login = $().getClass('login');
    // 登录页面位置随窗体移动改变
    loginPage.center(450, 250).resize(function () {
        if (loginPage.css('display') === 'block') {
            screen.lock();
        }
    })
    //点击登录 时候  出现登录页面并且锁屏
    $().getClass('login').click(function () {
        loginPage.center(450, 250);
        loginPage.css('display', 'block'); //显示登录页面
        screen.lock();
    });

    //点击关闭 时候  出现关闭页面并且取消锁屏
    $().getClass('close').click(function () {
        loginPage.css('display', 'none');//隐藏登录页面
        screen.unlock();
    });

    // -----------------------------------------------------------------------------------------------------------------
    //拖拽
    //alert(window.innerWidth);

    loginPage.drag([$().getTagName('h2').getElement(0)]);
}
*/
    $(function () {
        //个人中心
        $('#header .member').hover(function () {
            $(this).css('background', 'url("images/arrow2.png")  no-repeat 60px 6px');
            $('#header .member_ul').show().animate({
                't': 30,
                'step': 10,
                'mul': {
                    'o': 100,
                    'h': 100
                }
            });
        }, function () {
            $(this).css('background', 'url("images/arrow.png")  no-repeat 60px 6px');
            $('#header .member_ul').animate({
                't': 30,
                'step': 10,
                'mul': {
                    'o': 0,
                    'h': 0
                },
                'fn': function () {
                    $('#header .member_ul').hide();
                }
            });
            /*$('#header .member_ul').hide();*/
        });
        var loginPage = $('#loginPage');
        var screen = $('#screen');
        // 登录页面位置随窗体移动改变
        loginPage.center(450, 250).resize(function () {
            if (loginPage.css('display') === 'block') {
                screen.lock();
            }
        })
        //点击登录 时候  出现登录页面并且锁屏
        $('#header .login').click(function () {
            loginPage.center(450, 250);
            loginPage.css('display', 'block'); //显示登录页面
            screen.lock().animate({
                'attr': 'o',
                'start': 0,
                'target': 63,
                't': 50,
                'step': 10
            });
        });
        //点击关闭 时候  出现关闭页面并且取消锁屏
        $('#loginPage .close').click(function () {
            loginPage.css('display', 'none');//隐藏登录页面
            screen.animate({
                'attr': 'o',
                'target': 0,
                't': 50,
                'step': 10,
                'fn': function () {
                    screen.unlock();
                }
            });
        });

        // 登录验证
        $('#loginForm .submit').click(function () {
           var user_length = trim($('#loginForm').form('loginUsername').value()).length;
           var pass_length = trim($('#loginForm').form('loginPassword').value()).length;
           if (user_length>=2 && user_length <= 20 && pass_length>=6 ){
               var _this = $(this);
               _this.attr('disabled','disabled');
               _this.css('backgroundPosition','right');
               $('#loading').eq(0).css('display','block').center(200,40);
               $('#loading p').html('正在尝试登录中....');
               ajax({
                   method : 'post',
                   url : 'isLogin.php',
                   data : $('#loginForm').eq(0).serialize(),
                   success : function (text) {
                       $('#loading').eq(0).css('display','none');
                       if(text == 1){
                           $('#success').html('登录成功:请稍后....');
                           setCookie('user',$('#loginForm').form('loginUsername').value());
                           setTimeout(function () {
                               $('#success').eq(0).css('display','none');
                               $('#loginPage').css('display', 'none');//隐藏登录页面
                               $('#loginForm').first().reset();
                               screen.animate({
                                   'attr': 'o',
                                   'target': 0,
                                   't': 50,
                                   'step': 10,
                                   'fn': function () {
                                       screen.unlock();
                                   }
                               });
                               $('#header .reg').css('display','none');
                               $('#header .login').css('display','none');
                               $('#header .info').css('display','block').html(getCookie('user') + '你好!');
                           },1500);

                       }else{
                           $('#loginPage .info').html('登录失败:用户名或密码输入错误!');
                       }
                       _this.first().removeAttribute('disabled');
                       _this.css('backgroundPosition','left');
                   },
                   async : true
               });
           }else {
               $('#loginPage .info').html('登录失败:用户名或密码输入不合法!');
           }
        });

        var reg = $('#reg');
        // 注册框
        reg.center(600, 550).resize(function () {
            if (reg.css('display') === 'block') {
                screen.lock();
            }
        });

        $('#header .reg').click(function () {
            reg.center(600, 550);
            reg.css('display', 'block');
            screen.lock().animate({
                'attr': 'o',
                'start': 0,
                'target': 63,
                't': 50,
                'step': 10
            });
        });
        //点击关闭 时候  出现关闭页面并且取消锁屏
        $('#reg .close').click(function () {
            reg.css('display', 'none');//隐藏登录页面
            screen.animate({
                'attr': 'o',
                'target': 0,
                't': 50,
                'step': 10,
                'fn': function () {
                    screen.unlock();
                }
            });
        });
        //拖拽
        reg.drag($('#reg h2').last());
        loginPage.drag($('#loginPage h2').last());

        //侧边栏 (随着滚动条移动)
        $('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 10 + 'px');

        addEvent(window, 'scroll', function () {
        //    $('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) /10+ 'px');
            setTimeout(function () {
                $('#share').animate({
                    'attr': 'y',
                    'target': getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) /10
                });
            },500);

        });

        // 侧边栏收缩
        $('#share').hover(function () {
            $(this).animate({
                'attr': 'x',
                'target': 0
            })
        }, function () {
            $(this).animate({
                'attr': 'x',
                'target': -211
            })
        });
        //导航条
        $('#nav .about li').hover(function () {
            var target = $(this).first().offsetLeft;
            $('#nav .nav_bg').animate({
                'attr': 'x',
                'target': target + 20,
                't': 30,
                'step': 10,
                'fn': function () {
                    $('#nav .white').animate({
                        'attr': 'x',
                        'target': -target
                    });
                }
            })
        }, function () {
            $('#nav .nav_bg').animate({
                'attr': 'x',
                'target':20,
                't': 30,
                'step': 10,
                'fn': function () {
                    $('#nav .white').animate({
                        'attr': 'x',
                        'target': 0
                    });
                }
            })
        });

        //左侧导航栏
        $('#main .sidebar h2').toggle(function () {
            //console.log(this.innerHTML);
            //$(this).next().hide();
            $(this).next().animate({
                //'attr':'h',
                // 'target':0
                'mul': {
                    'h': 0,
                    'o': 0,
                    'step':10,
                    't':30
                }
            });
        }, function () {
            $(this).next().animate({
                // 'attr':'h',
                // 'target':150
                'mul': {
                    'h': 150,
                    'o': 100,
                    'step':10,
                    't':30
                }
            });
        });


        //左侧导航栏滑动
        $('#main .sidebar ul li').hover(function () {
        $(this).css('background', 'url("images/arrow3.gif")  no-repeat 12px 45%');
            //$(this).next().css('color', 'blue');
            $('#main .sidebar ul li a').hover(function () {
                $(this).css('color', '#ff6600');
            }, function () {
                $(this).css('color', '#333');
            });
        }, function () {
            $(this).css('background', 'url("images/arrow4.gif")  no-repeat 12px 45%');
            $('#main .sidebar ul li a').css('color', '#333');
        });


        //初始化表单操作
        $('#regForm').first().reset();
        //表单验证
        $('#regForm').form('regUsername').bind('focus', function () {
            $('#reg .info_user').css('display', 'inline-block');
            $('#reg .error_user').css('display', 'none');
            $('#reg .succ_user').css('display', 'none');
        }).bind('blur', function () {
            if (trim($(this).value()) === '') {
                $('#reg .info_user').css('display', 'none');
            } else {
                if (!check_User()) {
                    $('#reg .info_user').css('display', 'none');
                    $('#reg .succ_user').css('display', 'none');
                    $('#reg .error_user').css('display', 'inline-block');
                } else {
                    $('#reg .info_user').css('display', 'none');
                    $('#reg .error_user').css('display', 'none');
                    $('#reg .succ_user').css('display', 'inline-block');
                }
            }
        });

        function check_User(){
            var flag = true;
            if(!/[\w]{2,20}/.test(trim($('#regForm').form('regUsername').value()))) {
              $('#reg .error_user').html('输入不合法，请重新输入！');
              return false;
            }else{
              $('#reg .loading').css('display','inline-block');
              $('#reg .info_user').css('display', 'none');
              ajax({
                method : 'post',
                url : 'isUser.php',
                data : $('#regForm').eq(0).serialize(),
                success : function (text) {
                 if(text == 0){
                   //等于1 时候 说明已存在
                   flag = true;
                 }else{
                   $('#reg .error_user').html('用户名已被注册！');
                   flag = false;
                 }
                 $('#reg .loading').css('display','none');
               },
               async : false
              });
            }
            return flag;
        }

        // 密码验证
        $('#regForm').form('regPassword').bind('focus', function () {
            $('#reg .info_pass').css('display', 'inline-block');
            $('#reg .error_pass').css('display', 'none');
            $('#reg .succ_pass').css('display', 'none');
        }).bind('blur', function () {
            if (trim($(this).value()) === '') {
                $('#reg .info_pass').css('display', 'none');
            } else {
                if (check_Pass()) {
                    $('#reg .info_pass').css('display', 'none');
                    $('#reg .error_pass').css('display', 'none');
                    $('#reg .succ_pass').css('display', 'inline-block');
                } else {
                    $('#reg .info_pass').css('display', 'none');
                    $('#reg .succ_pass').css('display', 'none');
                    $('#reg .error_pass').css('display', 'inline-block');
                }
            }
        });
        //密码强度验证
        $('#regForm').form('regPassword').bind('keyup', function () {
            check_Pass();
        });

        // 密码验证函数
        function check_Pass() {
            var value = trim($('#regForm').form('regPassword').value());
            var value_length = value.length;
            var code_length = 0;//验证输入的类型格式
            //  6-20 个字符
            if (value_length >= 6 && value_length <= 20) {
                $('#reg .q1').html('●').css('color', 'green');
            } else {
                $('#reg .q1').html('○').css('color', '#666');
            }
            //只能包含大小写字母、数字和非空格字符
            if (value_length > 0 && !/\s/.test(value)) {
                $('#reg .q2').html('●').css('color', 'green');
            } else {
                $('#reg .q2').html('○').css('color', '#666');
            }
            //大、小写字母、数字、非空字符，2 种以上
            if (/[\d]/.test(value)) {
                code_length++;
            }
            if (/[a-z]/.test(value)) {
                code_length++;
            }
            if (/[A-Z]/.test(value)) {
                code_length++;
            }
            if (/[^\w]/.test(value)) {
                code_length++;
            }
            if (code_length >= 2) {
                $('#reg .q3').html('●').css('color', 'green');
            } else {
                $('#reg .q3').html('○').css('color', '#666');
            }
            //安全级别验证
            if (value_length >= 10 && code_length >= 3) {
                $('#reg .s3').css('color', 'green');
                $('#reg .s2').css('color', 'green');
                $('#reg .s1').css('color', 'green');
                $('#reg .s4').html('高').css('color', 'green').css('fontSize', '12px');
            } else if (value_length >= 8 && code_length >= 2) {
                $('#reg .s3').css('color', '#ccc');
                $('#reg .s2').css('color', 'orange');
                $('#reg .s1').css('color', 'orange');
                $('#reg .s4').html('中').css('color', 'orange').css('fontSize', '12px');
            } else if (value_length > 0) {
                $('#reg .s3').css('color', '#ccc');
                $('#reg .s2').css('color', '#ccc');
                $('#reg .s1').css('color', 'red');
                $('#reg .s4').html('低').css('color', 'red').css('fontSize', '12px');
            } else {
                $('#reg .s3').css('color', '#ccc');
                $('#reg .s2').css('color', '#ccc');
                $('#reg .s1').css('color', '#ccc');
                $('#reg .s4').html('');
            }
            //密码可提交返回
            if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
                return true;
            }else{
                return false;
            }
        }

        // 密码匹配验证
        $('#regForm').form('checkPassword').bind('focus', function () {
            $('#reg .info_checkPass').css('display', 'inline-block');
            $('#reg .error_checkPass').css('display', 'none');
            $('#reg .succ_checkPass').css('display', 'none');
        }).bind('blur', function () {
            if (trim($(this).value()) === '') {
                $('#reg .info_checkPass').css('display', 'none');//当原本文本框不存在焦点时候 不会显示提示内容
            } else {
                if(check_Qpass()){
                    $('#reg .info_checkPass').css('display','none');
                    $('#reg .error_checkPass').css('display','none');
                    $('#reg .succ_checkPass').css('display','inline-block');
                }else{
                    $('#reg .info_checkPass').css('display','none');
                    $('#reg .error_checkPass').css('display','inline-block');
                    $('#reg .succ_checkPass').css('display','none');
                }
            }
        });

        function check_Qpass(){
            if(trim($('#regForm').form('checkPassword').value())===trim($('form').form('regPassword').value())){
                return true;
            } else {
                return false;
            }
        }
        //提问验证
        $('#regForm').form('regQuestion').bind('change',function () {
           if(check_Ques())  $('#reg .error_ques').css('display','none');
        });

        function check_Ques(){
             if($('#regForm').form('regQuestion').value()!= 0)
                     return true;
        }
        //回答判断验证
        $('#regForm').form('regAnswer').bind('focus', function () {
            $('#reg .info_ans').css('display', 'inline-block');
            $('#reg .error_ans').css('display', 'none');
            $('#reg .succ_ans').css('display', 'none');
        }).bind('blur', function () {
            if (trim($(this).value()) === '') {
                $('#reg .info_ans').css('display', 'none');//当原本文本框不存在焦点时候 不会显示提示内容
            } else {
                if(check_Ans()){
                    $('#reg .info_ans').css('display','none');
                    $('#reg .error_ans').css('display','none');
                    $('#reg .succ_ans').css('display','inline-block');
                }else{
                    $('#reg .info_ans').css('display','none');
                    $('#reg .error_ans').css('display','inline-block');
                    $('#reg .succ_ans').css('display','none');
                }
            }
        });

        function check_Ans(){
            if(trim($('#regForm').form('regAnswer').value()).length>=2 && trim($('#regForm').form('regAnswer').value()).length<=32){
               return true;
            }
        }

        //电子邮件合法验证
        $('#regForm').form('regEmail').bind('focus', function () {
            //电子邮箱提示页面补全
            if($(this).value().indexOf('@')=== -1 ){
                $('#reg .all_email').css('display','block');
            }

            $('#reg .info_email').css('display', 'inline-block');
            $('#reg .error_email').css('display', 'none');
            $('#reg .succ_email').css('display', 'none');
        }).bind('blur', function () {
            //电子邮箱提示页面补全
            $('#reg .all_email').css('display','none');

            if (trim($(this).value()) === '') {
                $('#reg .info_email').css('display', 'none');//当原本文本框不存在焦点时候 不会显示提示内容
            } else {
                if(check_Email()){
                    $('#reg .info_email').css('display', 'none');
                    $('#reg .error_email').css('display', 'none');
                    $('#reg .succ_email').css('display', 'inline-block');
                }else{
                    $('#reg .info_email').css('display', 'none');
                    $('#reg .error_email').css('display', 'inline-block');
                    $('#reg .succ_email').css('display', 'none');
                }
            }
        });
        function check_Email(){
            if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test($('#regForm').form('regEmail').value()))
                return true;
        }
        //电子邮件移入移出补全效果
        $('#reg .all_email li').hover(function () {
            //console.log($(this));
            $(this).css('background','#e5e9f2');
            $(this).css('color','#666');
        },function () {
            $(this).css('background','white');
            $(this).css('color','#999');
        });
        //电子邮件提示内容的补全

        $('#regForm').form('regEmail').bind('keyup', function (event) {
            if($(this).value().indexOf('@')=== -1 ){
                $('#reg .all_email').css('display','block');
                $('#reg  .all_email li span').html($(this).value());
            }else{
                $('#reg .all_email').css('display','none');
            }
            //console.log(event.keyCode);
            $('#reg .all_email li').css('background','white');
            $('#reg .all_email li').css('color','#999');
            if(event.keyCode===40){
                if(this.index==undefined || this.index>=$('#reg .all_email li').length()-1){
                    this.index=0;
                } else{
                   this.index++;
                }
                $('#reg .all_email li').eq(this.index).css('background','#e5e9f2');
                $('#reg .all_email li').eq(this.index).css('color','#666');
            }
            if(event.keyCode===38){
                if(this.index==undefined || this.index<=0){
                    this.index=$('#reg .all_email li').length()-1;
                } else{
                    this.index--;
                }
                $('#reg .all_email li').eq(this.index).css('background','#e5e9f2');
                $('#reg .all_email li').eq(this.index).css('color','#666');
            }
            if(event.keyCode==13){
                $(this).value($('#reg .all_email li').eq(this.index).text());
                $('#reg .all_email').css('display','none');
                this.index=undefined;
            }
        });
        //电子邮件点击获取
        $('#reg .all_email li').bind('mousedown',function () {
           //console.log($(this).first().textContent);
            $('#regForm').form('regEmail').value($(this).text());
        });

        // 生日的验证
        var year=$('#regForm').form('year');
        var month=$('#regForm').form('month');
        var day=$('#regForm').form('day');
        //年
        for(var i=1950;i<=2050;i++){
            year.first().add(new Option(i,i),undefined);
        }
        //月
        for(var i=1;i<=12;i++){
            month.first().add(new Option(i,i),undefined);
        }

        var day30 = [4, 6, 9, 11];
        var day31 = [1, 3, 5, 7, 8, 10, 12];

        year.bind('change', select_day);
        month.bind('change', select_day);

        function select_day() {
            if (year.value() != 0 && month.value() != 0) {

                //清理之前的注入
                day.first().options.length = 1;

                //不确定的日
                var cur_day = 0;

                //注入日
                if (inArray(day31, parseInt(month.value()))) {
                    cur_day = 31;
                } else if (inArray(day30, parseInt(month.value()))) {
                    cur_day = 30;
                } else {
                    if ((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0) {
                        cur_day = 29;
                    } else {
                        cur_day = 28;
                    }
                }

                for (var i = 1; i <= cur_day; i ++) {
                    day.first().add(new Option(i, i), undefined);
                }

            } else {
                //清理之前的注入
                day.first().options.length = 1;
            }
        }
        day.bind('change',function () {
            if(check_Birthday())   $('#reg .error_birthday').css('display', 'none');
        });
       //  $('#regForm').form('regEmail').
        function check_Birthday(){
             if(year.value()!=0 && month.value()!=0 && day.value()!=0 )
                 return true;
        }

        //备注
        $('#regForm').form('regRemarks').bind('keyup',check_Remark).bind('paste',function () {
            setTimeout(check_Remark,50);
        });
        // 清尾设置
        $('.clear').click(function () {
            $('#regForm').form('regRemarks').value($('#regForm').form('regRemarks').value().substring(0,200));
            check_Remark();
        });

        function check_Remark() {
            var num=200- $('#regForm').form('regRemarks').value().length;
            if(num<0){
                $('#reg .num').css('display','none');
                $('#reg .num_clear').css('display','block');
                $('#reg .total_pass').html(Math.abs(num)).css('color','red');
                $('.clear').css('color','blue');
                return false;
            }else{
                $('#reg .num').css('display','block');
                $('#reg .num_clear').css('display','none');
                $('#reg .total').html(num).css('color','red');
                return true;
            }
        }

        // 提交验证
        $('#regForm').form('sub').click(function () {
          var flag=true;

            if(!check_User()){
                $('#reg .error_user').css('display', 'inline-block');
                flag=false;
            }
            if(!check_Pass()){
                  $('#reg .error_pass').css('display', 'inline-block');
                  flag=false;

            }
            if(!check_Qpass()){
                $('#reg .error_checkPass').css('display', 'inline-block');
                flag=false;

            }
            if(!check_Ques()){
                $('#reg .error_ques').css('display', 'inline-block');
                flag=false;

            }
            if(!check_Ans()){
                $('#reg .error_ans').css('display', 'inline-block');
                flag=false;
            }
            if(!check_Email()){
                $('#reg .error_email').css('display', 'inline-block');
                flag=false;

            }
            if(!check_Birthday()){
                $('#reg .error_birthday').css('display', 'block');
                flag=false;
            }
            //error
            if(!check_Remark()){
                flag=false;
            }

            if(flag){
               // $('#regForm').first().submit();
                var _this = $(this);
                // 表单提交一次
               // removeAttributeNode()
                _this.attr('disabled','disabled');
                _this.css('backgroundPosition','right');
                $('#loading').eq(0).css('display','block').center(200,40);
                $('#loading p').html('正在提交注册中....');
                ajax({
                    method : 'post',
                    url : 'add.php',
                    data : $('#regForm').eq(0).serialize(),
                    success : function (text) {
                        if(text == 1){
                            $('#loading').eq(0).css('display','none');
                            $('#success').eq(0).css('display','block');
                            $('#success p').html('注册成功,请登录....');
                            setTimeout(function () {
                                $('#success').eq(0).css('display','none');
                                reg.css('display', 'none');//隐藏登录页面
                                $('#reg .succ').css('display', 'none');
                                $('#regForm').first().reset();
                                //更改表单提交事件
                                _this.first().removeAttribute('disabled');
                                _this.css('backgroundPosition','left');
                                screen.animate({
                                    'attr': 'o',
                                    'target': 0,
                                    't': 50,
                                    'step': 10,
                                    'fn': function () {
                                        screen.unlock();
                                    }
                                });
                            },1500);
                        }
                    },
                    async : true
                });
            }

          });
        //自动轮播器
        var banner_Timeid=setInterval(banner_fn,2000);
        //获取图片次序
        var banner_index=1;
        //轮播器种类
        var banner_type=1;

        //轮播器初始化
        //第一张显示 以及对应下标小圆点显示
        $('#main .banner img').eq(0).css('display','block');
        $('#main .banner li').eq(0).css('color','#333');
        //获取对应对应第一张图片的内容(alt内容)
        $('#main .banner strong').html( $('#main .banner img').eq(0).attr('alt'));
        //手动轮播器
        //当li被划过的时候  取消定时器
        $('#main .banner li').hover(function () {
            //会有一个性能损耗（当再次指向当前位置的时候）
            clearInterval(banner_Timeid);
            //判断当前小圆点的颜色
            if($(this).css('color')!='rgb(51, 51, 51)'&& $(this).css('color')!='#333'){
                //传入当前  this  判断当前的 bannner_index ==0 如果等于 则说明 当前为第一张图片 prev参数中 应该是 所有图片数量减1 即指向最后一张图片
                // 否则 则 减1 即可
                banner(this,banner_index==0?($('#main .banner li').length()-1):banner_index-1);
            }
        },function () {
            banner_index=$(this).index()+1;
            banner_Timeid=setInterval(banner_fn,2000);
        });


        // obj 指代当前图片 prev指代前一张图片
        function  banner(obj,prev) {
            //初始化所有小圆点的统一样式
            $('#main .banner li').css('color','#999');
            // 让 obj 所指带的小圆点的 样式 改变
            $(obj).css('color','#333');
            // 获取 $obj 当中的 index 元素li  获取到对应图片 的index 将 图片的内容更换
            $('#main .banner strong').html($('#main .banner img').eq($(obj).index()).attr('alt'));
              //两种轮播类型 淡入淡出轮播 / 上下滑动轮播
            if(banner_type==1){
                // 前一张 透明度 从 100 变为0  当前图片出现 是从 0 变为100
                // 来实现淡入淡出
                $('#main .banner img').eq(prev).animate({
                    'attr':'o',
                    'start':100,
                    'step':0,
                    'target':0,
                    't':50
                }).css('display','block').css('zIndex','1');
                $('#main .banner img').eq($(obj).index()).animate({
                    'attr':'o',
                    'start':0,
                    'step':10,
                    'target':100,
                    't':100
                }).css('display','block').css('zIndex','2');
            }else if(banner_type==2){
                // 前一张图片 初始top 从0 变为 150 向下 当前图片 从 -150 从上往下 变为0
                // 实现 从顶向下
                $('#main .banner img').eq(prev).animate({
                    'attr':'y',
                    'start':0,
                    'step':10,
                    'target':150,
                    't':50
                }).css('display','block').css('top','0px');
                $('#main .banner img').eq($(obj).index()).animate({
                    'attr':'y',
                    'start':-150,
                    'step':10,
                    'target':0,
                    't':30
                }).css('display','block').css('top','-150px');
            }
        }
        // 自动轮播 函数  如果超出轮播图片类型 让 banner_index = 0
        function banner_fn() {
            if(banner_index>=$('#main .banner li').length()) banner_index=0;
         // 执行之前的banner函数 传入参数
         // 获取 当前 的banner_index 得到当前的li传入 作为 obj 为第一个参数,
         // 之后 去找到 他的前一张图片的 prev
            banner($('#main .banner li').eq(banner_index).first(),banner_index==0?($('#main .banner li').length()-1):banner_index-1);
            banner_index++;
        }

        //延迟加载
        var wait_load=$('.wait_load');
        wait_load.opacity(0);
        $(window).bind('scroll',_wait_load);
        $(window).bind('reSize',_wait_load);
        //延迟加载函数
        function  _wait_load() {
            setTimeout(function () {
                for(var i=0;i<wait_load.length();i++){
                    var _this=wait_load.ge(i);
                    if(getInner().height+getScroll().top>=offsetTop(_this)){
                        $(_this).attr('src',$(_this).attr('xsrc')).animate({
                            'attr':'o',
                            'target':100,
                            'step':10,
                            't':100
                        });
                    }
                }
            },100);
        }


        var photo_big= $('#photo_big');
        photo_big.center(620, 511).resize(function () {
            if (photo_big.css('display') === 'block') {
                screen.lock();
            }
        });
        //点击图片 时候  出现详细页面并且锁屏
        $('#photo_big dl dt img').click(function () {
            photo_big.center(620, 511);
            photo_big.css('display', 'block'); //点击图片
            screen.lock().animate({
                'attr': 'o',
                'start': 0,
                'target': 63,
                't': 50,
                'step': 10
            });
            //图片加载
            var temp_img=new Image();
            $(temp_img).bind('load',function () {
                $('#photo_big .big img').attr('src',temp_img.src).animate({
                    'attr':'o',
                    'start':0,
                    'target':100,
                    't':30,
                    'step':10
                }).css('top','0px').css('width','600px').css('height','450px').opacity(0);
            });
            temp_img.src=$(this).attr('bigsrc');
            var children=this.parentNode.parentNode;
            //加载上一张 /下一张图片
            prev_next_img(children);
        });
        //点击关闭 时候  出现关闭页面并且取消锁屏
        $('#photo_big .close').click(function () {
            photo_big.css('display', 'none');//隐藏页面
            screen.animate({
                'attr': 'o',
                'target': 0,
                't': 50,
                'step': 10,
                'fn': function () {
                    screen.unlock();
                }
            });
            $('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
        });
        //拖拽
        photo_big.drag( $('#photo_big h2').last());
        //左侧划过
        $('#photo_big .big .left').hover(function () {
            $('#photo_big .big .sl').animate({
                'attr':'o',
                'target':30,
                't':50,
                'step':10
            });
        },function () {
            $('#photo_big .big .sl').animate({
                'attr':'o',
                'target':0,
                't':50,
                'step':10
            });
        });
        //右侧划过
        $('#photo_big .big .right').hover(function () {
            $('#photo_big .big .sr').animate({
                'attr':'o',
                'target':30,
                't':50,
                'step':10
            });
        },function () {
            $('#photo_big .big .sr').animate({
                'attr':'o',
                'target':0,
                't':50,
                'step':10
            });
        });
        //左侧点击
        $('#photo_big .big .left').click(function () {
            $('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
            var left_img=new Image();
            $(left_img).bind('load',function () {
            $('#photo_big .big img').attr('src',left_img.src).animate({
                'attr':'o',
                'target':100,
                't':30,
                'step':10
            }).css('top','0px').css('width','600px').css('height','450px').opacity(0);
            });
            left_img.src=$(this).attr('src');

            //alert($('#photo_big .big img').attr('index'));
            // alert($('#photo_big dl dt img').ge($('#photo_big .big img').attr('index')).src); //得到当前图片的src
            //$('#photo_big dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('.photo').first()));
            //alert($('#photo_big dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('.photo').first())).src);
            var children=$('#photo_big dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('.photo').first())).parentNode.parentNode;
            prev_next_img(children);
        });
        //右侧点击
        $('#photo_big .big .right').click(function () {
            //恢复原样
            $('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
            var right_img=new Image();
            $(right_img).bind('load',function () {
            $('#photo_big .big img').attr('src',right_img.src).animate({
                'attr':'o',
                'target':100,
                't':30,
                'step':10
            }).css('top','0px').css('width','600px').css('height','450px').opacity(0);
            });
            right_img.src=$(this).attr('src');

            //alert($('#photo_big .big img').attr('index'));
            // alert($('#photo_big dl dt img').ge($('#photo_big .big img').attr('index')).src); //得到当前图片的src
            //$('#photo_big dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('.photo').first()));
            //alert($('#photo_big dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('.photo').first())).src);
            var children=$('#photo_big dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('.photo').first())).parentNode.parentNode;
            prev_next_img(children);
        });
        //获取前后图片函数
        function prev_next_img(children) {
            var prev=prevIndex($(children).index(),children.parentNode);
            var next=nextIndex($(children).index(),children.parentNode);
            var prev_img=new Image();
            var next_img=new Image();
            prev_img.src=$('#photo_big dl dt img').eq(prev).attr('bigsrc');
            next_img.src=$('#photo_big dl dt img').eq(next).attr('bigsrc');
            $('#photo_big .big .left').attr('src',prev_img.src);
            $('#photo_big .big .right').attr('src',next_img.src);
            $('#photo_big .big img').attr('index',$(children).index());
            $('#photo_big .big .index').html(parseInt(($(children).index()+1)) + '/'+$('#photo_big dl dt img').length());
        }


 /*
        //调用ajax
        $(document).click(function () {
            ajax({
                method : 'post',
                url : 'demo3.php',
                data : {
                    'name' : 'Lee',
                    'age' : 100
                },
                success : function (text) {
                    alert(text);
                },
                async : true
            });
        });

 */
        var publishBlog =  $('#blog');
        publishBlog.center(580, 310).resize(function () {
            if (publishBlog.css('display') === 'block') {
                screen.lock();
            }
        });
        //点击登录 时候  出现登录页面并且锁屏
        $('#header .member .member_ul #publish').click(function () {
            publishBlog.center(580, 310);
            publishBlog.css('display', 'block'); //显示登录页面
            screen.lock().animate({
                'attr': 'o',
                'start': 0,
                'target': 63,
                't': 50,
                'step': 10
            });
        });
        //点击关闭 时候  出现关闭页面并且取消锁屏
        $('#blog .close').click(function () {
            publishBlog.css('display', 'none');//隐藏登录页面
            screen.animate({
                'attr': 'o',
                'target': 0,
                't': 50,
                'step': 10,
                'fn': function () {
                    screen.unlock();
                }
            });
        });
        //拖拽
        publishBlog.drag($('#blog h2').last());
        //提交发文
        $('#blog .submit').click(function () {
            var title_length = trim($('#publishBlog').form('title').value()).length;
            var content_length = trim($('#publishBlog').form('content').value()).length;
            if (title_length>0  && content_length>0){
                var _this = $(this);
                _this.attr('disabled','disabled');
                _this.css('backgroundPosition','right');
                $('#loading').eq(0).css('display','block').center(200,40);
                $('#loading p').html('正在发表博文中....');
                ajax({
                    method : 'post',
                    url : 'add_blog.php',
                    data : $('#publishBlog').eq(0).serialize(),
                    success : function (text) {
                        $('#loading').eq(0).css('display','none');
                        if(text == 1){
                            $('#success').html('发表成功:请稍后....');
                            setTimeout(function () {
                                publishBlog.css('display', 'none');//隐藏登录页面
                                $('#publishBlog').first().reset();
                                screen.animate({
                                    'attr': 'o',
                                    'target': 0,
                                    't': 50,
                                    'step': 10,
                                    'fn': function () {
                                        screen.unlock();
                                        $('#main .index').html("<span class=\"loading\"></span>");
                                        $('#main .index .loading').show();
                                        ajax({
                                            method : 'post',
                                            url : 'get_blog.php',
                                            data : {},
                                            success : function (text) {
                                                $('#main .index .loading').hide();
                                                var json = JSON.parse(text);
                                                var html ="";
                                                for (var i =0 ; i<json.length;i++){
                                                    html+="<div class=\"content\"><h2>"+json[i].title+"<em>"+json[i].created+"</em></h2><p>"+json[i].content+"</p></div>";
                                                }
                                                $('#main .index').html(html);
                                                for (var i = 0; i < json.length; i ++) {
                                                    $('#main .index .content').eq(i).animate({
                                                        attr : 'o',
                                                        target : 200,
                                                        t : 100,
                                                        step : 10
                                                    });
                                                }
                                            },
                                            async : true
                                        });
                                    }
                                });
                            },1500);
                        }else{
                            $('#loginPage .info').html('发表失败:标题或内容不得为空!');
                        }
                        _this.first().removeAttribute('disabled');
                        _this.css('backgroundPosition','left');
                    },
                    async : true
                });
            }else {
                $('#blog .info').html('发表失败:标题或内容不得为空!');
            }
        });

        //加载博文
        $('#main .index').html("<span class=\"loading\"></span>");
        $('#main .index .loading').show();
        ajax({
           method : 'post',
           url : 'get_blog.php',
           data : {},
           success : function (text) {
             $('#main .index .loading').hide();
             var json = JSON.parse(text);
             var html ="";
             for (var i =0 ; i<json.length;i++){
                 html+="<div class=\"content\"><h2>"+json[i].title+"<em>"+json[i].created+"</em></h2><p>"+json[i].content+"</p></div>";
             }
             $('#main .index').html(html);
              for (var i = 0; i < json.length; i ++) {
                  $('#main .index .content').eq(i).animate({
                      attr : 'o',
                      target : 100,
                      t : 200,
                      step : 10
                  });
              }
           },
           async : true
        });


        //换肤
        var skin = $('#skin');
        //拖拽
        skin.drag($('#skin h2').last());
        skin.center(650, 360).resize(function () {
            if (skin.css('display') === 'block') {
                screen.lock();
            }
        });
        $('#header .member .member_ul #skinPeeler').click(function () {
            skin.center(650, 360);
            skin.css('display', 'block');
            screen.lock().animate({
                'attr': 'o',
                'start': 0,
                'target': 63,
                't': 50,
                'step': 10
            });
            $('#skin .skin_bg').html("<span class=\"loading\"></span>");
            $('#skin .skin_bg .loading').show();

            ajax({
                method : 'post',
                url : 'get_skin.php',
                data : {
                    'type' : 'all',
                },
                success : function (text) {
                    $('#skin .skin_bg .loading').hide();
                    var json = JSON.parse(text);
                    var html ="";
                    for (var i=0;i<json.length;i++){
                        html+="<dl><dt><img src=\"images/"+json[i].small_bg+"\" big_bg=\""+json[i].big_bg+"\"  alt=\""+json[i].bg_title+"\" bg_color=\""+json[i].bg_color+"\"/></dt><dd>"+json[i].bg_title+"</dd></dl>";
                    }
                    $('#skin .skin_bg').html(html).opacity(0).animate({
                        attr : 'o',
                        target : 100,
                        t : 200,
                        step :10
                    });
                    $('#skin dl dt img').click(function () {
                        $('body').css('background', $(this).attr('bg_color') + ' ' + 'url(images/' + $(this).attr('big_bg') + ') repeat-x');
                        ajax({
                            method : 'post',
                            url : 'get_skin.php',
                            data : {
                                'type' : 'set',
                                'big_bg' : $(this).attr('big_bg')
                            },
                            success : function (text) {
                              if(text == 1){
                                  $('#success').show().center(200, 40);
                                  $('#success p').html('换肤成功:请稍后...');
                                  setTimeout(function () {
                                      $('#success').hide();
                                      $('#skin').hide();
                                      screen.unlock();
                                  }, 1500);
                              }else{
                                  $('#success p').html('换肤失败:请检测网络是否通畅...');
                              }
                            },
                            async : true
                        });
                    });

                },
                async : true
            });

        });
        $('#skin .close').click(function () {
            skin.css('display', 'none');
            screen.animate({
                'attr': 'o',
                'target': 0,
                't': 50,
                'step': 10,
                'fn': function () {
                    screen.unlock();
                }
            });
        });
    });
    ajax({
      method : 'post',
      url : 'get_skin.php',
      data : {
          'type' : 'main'
      },
      success : function (text) {
          var json = JSON.parse(text);
          $('body').css('background',json[0].bg_color + ' ' + 'url(images/' + json[0].big_bg + ') repeat-x');
    },
    async : true
});











