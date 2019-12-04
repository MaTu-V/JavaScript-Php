<?php
  require_once 'function.php';
  $_loginUsername = $_POST['loginUsername'];
  $_loginPassword = $_POST['loginPassword'];
  $res = blog_fetch_all("select regUsername from regBlog where regUsername='{$_loginUsername}' and regPassword='{$_loginPassword}';");
  if($res){
   echo 1;
  }else{
   echo 0;
  }
?>