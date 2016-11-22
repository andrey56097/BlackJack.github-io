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
//если логин и пароль введены,то обрабатываем их, чтобы теги и скрипты не работали, мало ли что люди могут ввести
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
//извлекаем из базы все данные о пользователе с введенным логином
$res = mysql_query("SELECT * FROM Users WHERE login='$login'", $dbcon);
$myrow = mysql_fetch_array($res);
mysql_close($dbcon);
if (empty($myrow["password"])) {
    //если пользователя с введенным логином не существует
    $result=1;
} else {
    //если существует, то сверяем пароли
    if ($myrow["password"] == $password) {
        //если пароли совпадают, то запускаем пользователю сессию! Можете его поздравить, он вошел!
        $_SESSION['login'] = $myrow["login"];
        $_SESSION['id'] = $myrow["id"];//эти данные очень часто используются, вот их и будет "носить с собой" вошедший пользователь
        $result=0;
    } else {
        //если пароли не сошлись

        $result=1;
    }
}
print $result;

?>