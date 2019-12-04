<?php
   require_once 'function.php';
   function update_users(){
      $_regUsername = $_POST['regUsername'];
      $_regPassword = $_POST['regPassword'];
      $_regQuestion = $_POST['regQuestion'];
      $_regAnswer = $_POST['regAnswer'];
      $_regEmail = $_POST['regEmail'];
      $_regRemarks = $_POST['regRemarks'];
      $_regBirthday = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
      $rows = blog_add_exec("INSERT INTO regBlog(id,regUsername,regPassword,regQuestion,regAnswer,regEmail,regBirthday,regRemarks) VALUES (null,'{$_regUsername}', '{$_regPassword}','{$_regQuestion}','{$_regAnswer}','{$_regEmail}','{$_regBirthday}','{$_regRemarks}');");
      $message = $rows <= 0 ? $GLOBALS['message'] = 0 : 1 ;
      echo $message;
   }

   if($_SERVER['REQUEST_METHOD'] === 'POST'){
    update_users();
   }
?>