<?php
header("Content-Type: text/html; charset=utf-8");
$email = htmlspecialchars($_POST["email"]);
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "alextat23@gmail.com"; // e-mail администратора


// Отправка письма администратору сайта

$tema = "Тема письма админу";
$message_to_myemail = "Текст письма:
<br><br>
Имя: $name<br>
E-mail: $email<br>
Телефон: $tel<br>
Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: flip-kick <alextat23@gmail.com> \r\n Reply-To: flip-kick \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


// // Отправка письма пользователю

// $tema = "Тема письма клиенту";
// $message_to_myemail = "
// Текст письма<br>
// Файл: <a href='http://numbers.andrewgavrilov.me/form/files/ripple.zip' download>Название файла</a>

// ";
// $myemail = $email;
// mail($myemail, $tema, $message_to_myemail, "From: Sitename <reg@wayup.in> \r\n Reply-To: Sitename \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


// Сохранение инфо о лидах в файл leads.xls

$f = fopen("leads.xls", "a+");
fwrite($f," <tr>");    
fwrite($f," <td>$email</td> <td>$name</td> <td>$tel</td>   <td>$date / $time</td>");   
fwrite($f," <td>$refferer</td>");    
fwrite($f," </tr>");  
fwrite($f,"\n ");    
fclose($f);

?>