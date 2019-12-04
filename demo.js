(function () {
    window.sys={};                       //全局变量(让外部可以访问 用来保存浏览器的信息)
   // let ua=navigator.userAgent;        // 浏览器代理商信息
    let ua=navigator.userAgent.toLowerCase(); // 转换为小写

  //  console.log(ua);
    let s;                           // 浏览器信息数组，浏览器名称+版本
//   console.log(ua.match(/msie ([\d.]+)/));
    if ((/chrome\/([\d.]+)/).test(ua)) {
        s = ua.match(/chrome\/([\d.]+)/);
        sys.chrome = s[1];
    }
})();
if(sys.chrome){
    console.log("22");
}