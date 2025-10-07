<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__.'/Exception.php';
require __DIR__.'/PHPMailer.php';


$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {

    $tel = filter_input(INPUT_POST, 'tel', FILTER_SANITIZE_NUMBER_INT);
    $text = filter_input(INPUT_POST, 'text', FILTER_SANITIZE_STRING);
    if (empty($tel) || empty($text)) {
        throw new Exception('Invalid input!');
    }

    $mail->setFrom('major@nakrutka-p-f.ru', 'Mailer');
    $mail->addAddress('major@nakrutka-p-f.ru', 'Recipient Name');
    $mail->isHTML(true);
    $mail->Subject = 'Новая заявка ПФ';
    $mail->Body    = "Телефон: {$tel}<br>Сообщение: {$text}";

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
?>
