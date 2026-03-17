<?php

$php_main_email = "jiyadahammad74@gmail.com";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $php_name = htmlspecialchars($_POST['name']);
    $php_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $php_phone = htmlspecialchars($_POST['phone']);
    $php_message = htmlspecialchars($_POST['message']);

    if (filter_var($php_email, FILTER_VALIDATE_EMAIL)) {

        $php_subject = "New Contact Message";

        $php_headers = "MIME-Version: 1.0\r\n";
        $php_headers .= "Content-type:text/html;charset=UTF-8\r\n";
        $php_headers .= "From: ".$php_email."\r\n";

        $php_body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $php_name</p>
        <p><strong>Email:</strong> $php_email</p>
        <p><strong>Phone:</strong> $php_phone</p>
        <p><strong>Message:</strong> $php_message</p>
        ";

        if (mail($php_main_email, $php_subject, $php_body, $php_headers)) {
            echo "success";
        } else {
            echo "error";
        }

    } else {
        echo "invalid_email";
    }
}
?>