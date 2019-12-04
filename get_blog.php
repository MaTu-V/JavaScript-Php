<?php
  require_once 'function.php';
  $res = blog_fetch_all("select title,content,created from publishBlog ORDER BY created DESC LIMIT 0,3;");
  $json = json_encode($res);
  echo $json;
?>