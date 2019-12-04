<?php
  require_once 'function.php';
  $_regUsername = $_POST['regUsername'];
  $res = blog_fetch_all("select regUsername as name from regBlog where regUsername='{$_regUsername}' limit 1;");

  if($res){
   echo 1;
  }else{
   echo 0;
  }
?>