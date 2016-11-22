<?php
header('Content-Type: text/html; charset=utf-8');
setlocale(LC_ALL, 'ru_RU.65001', 'rus_RUS.65001', 'Russian_Russia.65001', 'russian');
session_start();//  вся процедура работает на сессиях. Именно в ней хранятся данные  пользователя, пока он находится на сайте. Очень важно запустить их в  самом начале странички!!!

if (isset($_POST['login'])) {
    $login = $_POST['login'];
    if ($login == '') {
        unset($login);
    }
}
if (isset($_POST['password'])) {
    $password = $_POST['password'];
    if ($password == '') {
        unset($password);
    }
}
//если логин и пароль введены,то обрабатываем их
$login = stripslashes($login);
$login = htmlspecialchars($login);
$password = stripslashes($password);
$password = htmlspecialchars($password);
//удаляем лишние пробелы
$login = trim($login);
$password = trim($password);
$password=md5($password);
$result=1;

//Подключаемся к базе данных.
$dbcon = mysql_connect("localhost", "root", "");
mysql_select_db("BlackJack", $dbcon);
if (!$dbcon) {
    echo "<p>Произошла ошибка при подсоединении к MySQL!</p>" . mysql_error();
    exit();
} else {
    if (!mysql_select_db("BlackJack", $dbcon)) {
        echo("<p>Выбранной базы данных не существует!</p>");
    }
}
$res = mysql_query("SELECT * FROM Users WHERE login='$login'", $dbcon);
$myrow = mysql_fetch_array($res);

if (empty($myrow["password"])) {
    //если пользователя с введенным логином не существует
    $request=mysql_query("INSERT INTO Users (login,password,balance) VALUES ('$login','$password','1000')", $dbcon);
    if($res = mysql_affected_rows()==-1){
        $result=1;
    }
    else{
        $res = mysql_query("SELECT MAX(id) FROM Users", $dbcon);
        $count = mysql_fetch_row($res);
        $nextUserId=$count[0]++;
        $_SESSION['login'] = $login;
        $_SESSION['id'] = $nextUserId;
        $result=0;
    }
}

 else {
        $result=2;

}
mysql_close($dbcon);
print $result;

?>