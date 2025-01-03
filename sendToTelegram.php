<?php
// Periksa metode HTTP (hanya POST yang diizinkan)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // 405 Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Ambil Token dan Chat ID dari variabel lingkungan
$botToken = getenv('BOT_TOKEN');
$chatId = getenv('CHAT_ID');

// Periksa apakah bot token dan chat ID tersedia
if (!$botToken || !$chatId) {
    echo json_encode(['success' => false, 'message' => 'Environment variables missing']);
    exit;
}

// Ambil data dari request POST
$data = json_decode(file_get_contents("php://input"), true);

// Pastikan data yang diperlukan ada
if (isset($data['ip'])) {
    // Ambil IP Address yang dikirimkan
    $ip = htmlspecialchars($data['ip']);

    // API Key untuk ipgeolocation
    $apiKey = getenv('API_KEY'); // Simpan API Key di variabel lingkungan
    
    // URL API ipgeolocation untuk mendapatkan data lokasi berdasarkan IP
    $geolocationApi = "https://api.ipgeolocation.io/ipgeo?apiKey=$apiKey&ip=$ip";

    // Ambil data lokasi dari API ipgeolocation
    $locationData = json_decode(file_get_contents($geolocationApi), true);

    // Periksa apakah lokasi berhasil didapatkan
    if (isset($locationData['latitude'], $locationData['longitude'])) {
        $latitude = $locationData['latitude'];
        $longitude = $locationData['longitude'];

        // Format pesan untuk Telegram
        $message = "IP Address: $ip\nLatitude: $latitude\nLongitude: $longitude";

        // URL API Telegram
        $telegramApi = "https://api.telegram.org/bot$botToken/sendMessage";

        // Konfigurasi data POST
        $postFields = [
            'chat_id' => $chatId,
            'text' => $message
        ];

        // Kirim data ke Telegram menggunakan cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $telegramApi);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); // Periksa HTTP status code
        curl_close($ch);

        // Periksa respons dari Telegram
        if ($httpCode == 200) {
            echo json_encode(['success' => true, 'response' => $response]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send message to Telegram', 'httpCode' => $httpCode]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to retrieve location data']);
    }
} else {
    // Data tidak valid
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>
