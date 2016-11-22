<?php

if (isset($_POST['login'])) { 
	$login = $_POST['login'];
	}
if (isset($_POST['balance'])) { 
	$balance = $_POST['balance'];
	}
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
	mysql_query("UPDATE Users SET balance=$balance WHERE login='$login'", $dbcon);
	mysql_close($dbcon);

?>