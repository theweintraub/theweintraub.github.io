<?php 

	$to = "uddinasib@gmail.com"; // this is your Email address
	$from  = $_POST['email']; // this is the sender's Email address
	$sender_name = $_POST['name'];
	$phone = $_POST['phone'];
	$notes = $_POST['message'];

	$message = $sender_name . " has send the contact message. " .  $phone . " is his / her Phone number. He / she worte the following... ". "\n\n" . $notes;


	$subject = "Form submission";

	$headers = 'From: ' . $from;
	mail($to, $subject, $message, $headers);

?>















