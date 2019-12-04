<?php
 /**
  * 封装共用内容
  */
 require_once 'config.php';

 /**
  * 通过一个数据库查询获取数据
  *
  */
  function blog_fetch_all($sql){
  	 $conn = mysqli_connect(BLOG_DB_HOST,BLOG_DB_USER,BLOG_DB_PWD,BLOG_DB_NAME);
  	 if(!$conn){
  	 	exit('连接失败');
  	 }
     $program_char = "utf8" ;
     mysqli_set_charset( $conn , $program_char );
  	 $query = mysqli_query($conn,$sql);
     if(!$query){
     	// 查询失败
     	return false;
     }
     $result = array();
     while($row = mysqli_fetch_assoc($query)){
     	$result[] = $row;
     }
    mysqli_free_result($query);
   	mysqli_close($conn);
    return $result;
  }
  /**
   * 数据库获取单条操作
   * @param  [type] $sql [description]
   * @return [type]      [description]
   */
  function blog_fetch_one($sql){
  	$res = blog_fetch_all($sql);
  	return isset($res[0])?$res[0]:null;
  }
  /**
   * 数据库增加内容
   *
   */
  function blog_add_exec($sql){
   $conn = mysqli_connect(BLOG_DB_HOST,BLOG_DB_USER,BLOG_DB_PWD,BLOG_DB_NAME);
     if(!$conn){
      exit('连接失败');
     }
     $program_char = "utf8" ;
     mysqli_set_charset( $conn , $program_char);
     $query = mysqli_query($conn,$sql);
     if(!$query){
      //查询失败
      return false;
     }
     //获取受影响行数
     $affected_row = mysqli_affected_rows($conn);
     mysqli_close($conn);
     return $affected_row;
  }