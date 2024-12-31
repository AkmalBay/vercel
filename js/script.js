
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

// Ambil elemen navbar dan section about
const projectsNav = document.getElementById("projectsNav");
const aboutSection = document.getElementById("about");

// Ketika navbar "Projects" diklik
projectsNav.addEventListener("click", function() {
  // Tambahkan kelas "visible" ke section "about" untuk memunculkan projek dengan animasi
  aboutSection.classList.add("visible");
});

  function sendEmail(event) {
    event.preventDefault(); // Mencegah pengiriman formulir default

    // Mengambil nilai dari input
    const message = document.getElementById('message').value;

    // Membangun URL untuk Gmail dengan alamat email yang ditentukan
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=akmalbayan03@mhs.unsiq.ac.id&su=Message%20from%20&body=${encodeURIComponent(message)}`;

    // Membuka Gmail dengan URL yang dibangun
    window.open(mailtoLink, '_blank');
  
      // Kosongkan form setelah pengiriman
      document.getElementById('contact-form').reset();
    }

