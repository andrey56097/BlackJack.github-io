<?php

	if (isset($_POST['login'])) { 
	$login = $_POST['login'];
	}
	if (isset($_POST['bet'])) { 
	$bet = $_POST['bet'];
	}
	if (isset($_POST['result'])) { 
	$result = $_POST['result'];
	}
	$date=date("Y-m-d H:i:s");
	$file = 'result.txt';
	file_put_contents($file, $login, FILE_APPEND);
	file_put_contents($file, $bet, FILE_APPEND);
	file_put_contents($file, $date, FILE_APPEND);
	file_put_contents($file, $result, FILE_APPEND);
$dbcon = mysql_connect("localhost", "root", ""); 
    mysql_select_db("BlackJack", $dbcon);
	if (!$dbcon)
	{
    echo "<p>Произошла ошибка при подсоединении к MySQL!</p>".mysql_error(); exit();
    } else {
    if (!mysql_select_db("BlackJack", $dbcon))
    {
    echo("<p>Выбранной базы данных не существует!</p>");
    }
	}
	$res = mysql_query("SELECT id FROM Users WHERE login='$login'", $dbcon);
	while($row = mysql_fetch_array($res)) 
 	{
		$id = $row["id"];
  	}
  	file_put_contents($file, $id, FILE_APPEND);
	mysql_query("INSERT INTO Results VALUES ('$id', '$login', '$date', '$bet', '$result')", $dbcon);
	mysql_close($dbcon);

?>