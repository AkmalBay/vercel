// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu diklik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// klik diluar elemen
const hm = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Mencegah perilaku scroll bawaan browser
    const targetId = this.getAttribute("href").slice(1); // Ambil ID elemen target
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 100; // Offset dari atas layar (sesuaikan dengan tinggi navbar)
      const topPosition = targetElement.offsetTop - offset;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  });
});

function sendEmail(event) {
  event.preventDefault(); // Mencegah pengiriman formulir default

  // Mengambil nilai dari input
  const message = document.getElementById("message").value;

  // Membangun URL untuk Gmail dengan alamat email yang ditentukan
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=akmalbayan03@mhs.unsiq.ac.id&su=Message%20from%20&body=${encodeURIComponent(
    message
  )}`;

  // Membuka Gmail dengan URL yang dibangun
  window.open(mailtoLink, "_blank");

  // Kosongkan form setelah pengiriman
  document.getElementById("contact-form").reset();
}

 // Mendapatkan IP Address dengan API eksternal
async function getIPAddress() {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

// Mengirimkan Data IP ke Backend
async function sendToBackend(ip) {
  const backendUrl = "https://hell0w0rld.my.id/sendToTelegram.php"; // Ganti dengan URL endpoint backend Anda
  const messageData = {
    ip: ip,
  };

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });
    if (!response.ok) {
      console.error("Gagal mengirim data ke backend: ", response.statusText);
    }
  } catch (error) {
    console.error("Kesalahan saat mengirim data ke backend: ", error.message);
  }
}

// Jalankan ketika halaman dimuat
window.onload = async function () {
  try {
    const ip = await getIPAddress();
    sendToBackend(ip);  // Hanya kirimkan IP ke backend
  } catch (err) {
    console.error("Gagal mengambil data: ", err.message);
  }
};
