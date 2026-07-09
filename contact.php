<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    // Set email recipients
    $to = "info@sksstatutory.com";
    $subject = "Enquiry from website";

    $body = "Name: $name
    Email: $email
    Phone Number: $number
    Interested Service: $service

    Message:
    $message";

    // Send email to primary recipient
    $mailStatus = mail($to, $subject, $body);
    $mailTest = mail("info@sksstatutory.com", $subject, $body);

    $returnPage = $_SERVER['HTTP_REFERER'] ?? 'index.html';

    if ($mailStatus) {
        header("Location: $returnPage?emailSuccess=true");
    } else {
        header("Location: $returnPage?emailSuccess=false");
    }
    exit;
    exit;
}
?>