<?php
  require_once 'function.php';
  if(!$_POST['type']){
    exit('请求失败');
  }
  if($_POST['type'] == 'all'){
    $res = blog_fetch_all("select small_bg,big_bg,bg_color,bg_title from skin LIMIT 0,6;");
    $json = json_encode($res);
    echo $json;
  }
  if($_POST['type'] == 'main'){
    $res = blog_fetch_all("select big_bg,bg_color from skin WHERE bg_flag = 1;");
    $json = json_encode($res);
    echo $json;
  }

  if($_POST['type'] == 'set' && $_POST['big_bg']){
    blog_add_exec("update skin set bg_flag=0 WHERE bg_flag=1;");
    $res = blog_add_exec("update skin set bg_flag=1 WHERE big_bg='{$_POST['big_bg']}';");
    if($res > 0){
      echo 1;
    }else{
      echo 0;
    }
  }
?>