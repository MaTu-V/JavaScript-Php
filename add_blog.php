<?php
   require_once 'function.php';
   function add_blog(){
      date_default_timezone_set('PRC');
      $_created = date('Y-m-d h:i:s', time());
      $_title = $_POST['title'];
      $_content = $_POST['content'];
      $rows = blog_add_exec("INSERT INTO publishBlog(id,title,content,created) VALUES (null,'{$_title}', '{$_content}', '{$_created}');");
      $message = $rows <= 0 ? $GLOBALS['message'] = 0 : 1 ;
      echo $message;
   }

   if($_SERVER['REQUEST_METHOD'] === 'POST'){
      add_blog();
   }
?>