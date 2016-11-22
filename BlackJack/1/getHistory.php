<?php
header('Content-Type: text/html; charset=utf-8');
setlocale(LC_ALL, 'ru_RU.65001', 'rus_RUS.65001', 'Russian_Russia.65001', 'russian');

if (isset($_POST['login'])) {
    $login = $_POST['login'];
    if ($login == '') {
        unset($login);
    }
}
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
$res = mysql_query("SELECT * FROM Results WHERE login='$login'", $dbcon);

if (mysql_num_rows($res)==0) {
    echo '<div class="close-btn" title="Закрыть" href="#" onclick = "hideHistory()"></div>';
    echo "<p class='empty-history'> Вы еще не играли!</p>";
} else {
    echo '<div class="close-btn" title="Закрыть" href="#" onclick = "hideHistory()"></div>';
    echo "<h2>Ваша история</h2>";
    echo "<table width='100%' id=results-table>";
    echo "<tr><td>Дата</td><td>Ставка</td><td>Результат</td></tr>";
    while ($row=mysql_fetch_array($res)){
        $date=$row[2];
        $bet=$row[3];
        $result=$row[4];
        echo "<tr><td>$date</td><td>$bet</td><td>$result</td></tr>";
    }
    echo "</table>";
}
mysql_close($dbcon);

?>