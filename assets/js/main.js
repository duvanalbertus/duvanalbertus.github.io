/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        },
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false,
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim(),
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  /**
   * Simple client-side i18n for EN/ID toggle
   */
  (function initTranslations() {
    const translations = {
      id: {
        "nav.home": "Beranda",
        "nav.about": "Tentang",
        "nav.resume": "Resume",
        "nav.portfolio": "Portofolio",
        "nav.contact": "Kontak",
        "section.about": "Tentang",
        "about.paragraph": `Halo, nama saya Duvan Albertus, seorang Pengembang Perangkat Lunak dengan lebih dari 2 tahun pengalaman dalam pengembangan aplikasi web dan desktop. Saya juga aktif sebagai freelancer, menangani berbagai proyek dari tahap perencanaan hingga implementasi. Saya menguasai PHP, JavaScript, Java, REST API, serta beberapa framework pendukung. Saya berpengalaman membangun sistem yang efisien, mengoptimalkan performa aplikasi, dan menghadirkan solusi sesuai kebutuhan bisnis. Selama setahun terakhir saya fokus pada Otomasi AI, khususnya pengembangan dan integrasi sistem otomasi berbasis AI untuk mengikuti perkembangan teknologi terbaru.`,
        "about.phoneLabel": "Nomor Telepon:",
        "about.phone": "+62 851-8325-3224",
        "about.emailLabel": "Email:",
        "about.email": "albertusyuri4@gmail.com",
        "section.skills": "Skills",
        "section.skillsDesc":
          "Berikut ini adalah beberapa bahasa pemrograman dan tools yang saya gunakan untuk membangun website, sistem, dan aplikasi.",
        "section.resume": "Resume",
        "section.resumeDesc":
          "Berikut adalah ringkasan latar belakang pendidikan dan pengalaman kerja saya sejak pertama kali terjun ke industri teknologi.",
        "section.portfolio": "Portofolio",
        "section.portfolioDesc":
          "Di bawah ini adalah kumpulan project yang pernah saya bangun — yaitu sistem aplikasi web/dekstop dan sistem workflow automation.",
        "section.testimonials": "Apa Kata Klien ?",
        "section.testimonialsDesc":
          "Saya percaya bahwa kepuasan klien adalah ukuran utama kesuksesan sebuah proyek.",
        "section.contact": "Kontak",
        "section.contactDesc":
          "Jika Anda tertarik untuk bekerja sama, memiliki pertanyaan, atau ingin berdiskusi lebih lanjut mengenai proyek, silakan hubungi saya melalui form di bawah ini atau melalui kontak yang tersedia.",
        "contact.sendButton": "Kirim Pesan",
        "resume.educationTitle": "Pendidikan",
        "resume.edu1.title": "Manajemen Informatika",
        "resume.edu1.school": "Politeknik Negeri Malang",
        "resume.edu1.desc":
          "Pada tingkat pendidikan ini, saya sudah mulai mengenal dan belajar menggunakan teknologi populer seperti bahasa pemrograman PHP dan Java, saya juga mulai mempelajari teknologi framework seperti Laravel dan Codeigniter",
        "resume.edu2.title": "Teknik Komputer Jaringan",
        "resume.edu2.school": "SMK Pawyatan Daha 2 Kediri",
        "resume.edu2.desc":
          "Mulai mengenal pertama code pemrograman dan membuat landing page pertama saya dengan menggunakan teknologi basic HTML, CSS, dan Javascript",
        "resume.experienceTitle": "Pengalaman Kerja",
        "resume.exp1.title": "Staff IT Programmer",
        "resume.exp1.company": "RS Wilujeng Kediri",
        "resume.exp1.desc1":
          "Menganalisis kebutuhan fitur sistem untuk menunjang operasional kesehatan rumah sakit",
        "resume.exp1.desc2":
          "Membangun sistem informasi berbasis web dan desktop sesuai kebutuhan operasional kesehatan rumah sakit",
        "resume.exp1.desc3":
          "Melakukan maintenance sederhana pada perangkat hardware komputer",
        "resume.exp2.title": "Freelancer Programmer",
        "resume.exp2.desc1":
          "Menganalisis kebutuhan dan fitur sistem yang diminta client",
        "resume.exp2.desc2":
          "Membangun sistem informasi berbasis web sesuai kebutuhan client",
        "resume.exp3.title": "UI / UX Designer",
        "resume.exp3.company": "CV. Visual Code Indonesia",
        "resume.exp3.desc1": "Mengembangkan desain UI / UX Aplikasi Mobile",
        "resume.exp3.desc2":
          "Menganalisis kebutuhan pengguna melalui diagram alur bisnis",
        "resume.exp3.desc3":
          "Membuat desain wireframe, mockup, dan prototipe interaktif sesuai diagram alur bisnis",
        "testimonial.1.text":
          "Saya sangat terbantu dengan sistem kasir dan manajemen toko jamu yang dibuat. Sekarang saya bisa mencatat penjualan, stok, dan laporan harian dengan mudah. Pelayanan cepat dan komunikatif. Sangat direkomendasikan!",
        "testimonial.1.name": "Leo",
        "testimonial.1.role": "Pemilik Toko Jamu Leo",
        "testimonial.2.text":
          "Sistem reservasi yang dibuat sangat membantu kami dalam mengatur pemakaian gedung gereja. Proses booking jadi lebih tertata dan transparan. Tim sangat responsif dan hasilnya memuaskan!",
        "testimonial.2.name": "Yohanes Pratama",
        "testimonial.2.role": "Pengurus Gereja",
        "testimonial.3.text":
          "Sistem rekrutmen yang dibuatkan sangat membantu saya menyelesaikan proyek akhir kuliah. Fitur-fiturnya lengkap dan tampilannya rapi. Komunikasi selama pengerjaan juga sangat baik!",
        "testimonial.3.name": "Satrio",
        "testimonial.3.role": "Mahasiswa",
        "portfolio.pageTitle": "Portofolio Detail",
        "portfolio.infoTitle": "Informasi Project",
        "portfolio.labels.category": "Kategori",
        "portfolio.labels.client": "Client",
        "portfolio.labels.year": "Tahun Project",
        "portfolio.labels.url": "Project URL",
        "portfolio.labels.notAvailable": "-",
        "portfolio.labels.notPublished": "Belum Terbit",
        "portfolio.workflow1.category": "Workflow Auto",
        "portfolio.workflow1.client": "-",
        "portfolio.workflow1.year": "2025",
        "portfolio.workflow1.urlText": "Belum Terbit",
        "portfolio.workflow1.title": "Asisten Bot AI Telegram",
        "portfolio.workflow1.desc":
          "Project ini merupakan chatbot AIberbasis Telegram yang berfungsisebagai asisten pribadi virtual. Botini dibangun menggunakan n8nsebagai platform automation (no-code) untuk menghubungkanberbagai layanan Telegram,Gemini AI, dan modul lainnya.",
        "portfolio.workflow2.category": "Workflow Auto",
        "portfolio.workflow2.client": "-",
        "portfolio.workflow2.year": "2025",
        "portfolio.workflow2.urlText": "Belum Terbit",
        "portfolio.workflow2.title":
          "Workflow Keuangan Otomatis via Telegram Bot",
        "portfolio.workflow2.desc":
          "Workflow ini dirancang menggunakan n8n untuk membantu mencatat transaksi keuangan pribadi secara otomatis melalui Telegram Bot. Setiap kali pengguna mengirimkan pesan berisi catatan pengeluaran atau pemasukan, bot akan memproses data tersebut dan menyimpannya ke dalam spreadsheet/database. Solusi ini memudahkan pengelolaan keuangan harian dengan cara yang praktis, cepat, dan minim intervensi manual.",
        "portfolio.workflow3.category": "Workflow Auto",
        "portfolio.workflow3.client": "-",
        "portfolio.workflow3.year": "2025",
        "portfolio.workflow3.urlText": "Belum Terbit",
        "portfolio.workflow3.title":
          "Penyaringan & EvaluasiResume Otomatis untuk HRD",
        "portfolio.workflow3.desc":
          "Proyek ini membangun workflow otomatis untuk membantu tim HR dalam menyeleksi dan mengevaluasi resume kandidat secara cepat. Sistem memanfaatkan integrasi AI/NLP untuk menilai kecocokan kandidat berdasarkan kriteria yang ditentukan, lalu menghasilkan skor evaluasi dan laporan ringkas yang mempermudah proses rekrutmen.Solusi ini mempercepat proses screening, mengurangi bias manual, dan meningkatkan efisiensi tim HR.",
        "portfolio.web1.category": "Website",
        "portfolio.web1.client": "-",
        "portfolio.web1.year": "2023",
        "portfolio.web1.urlText": "Belum Terbit",
        "portfolio.web1.title":
          "Sistem Informasi Pengelolaan Layanan Masyarakat dan Manajemen Inventaris Prodamas Berbasis Web",
        "portfolio.web1.desc":
          "Sistem Informasi Pengelolaan Layanan Masyarakat dan Manajemen Inventaris Prodamas Berbasis Web adalah aplikasi yang dirancang untuk mengelola pengajuan layanan masyarakat serta pendataan inventaris barang Prodamas secara terintegrasi. Sistem ini terhubung dengan aplikasi mobile bernama Sistem Informasi Pelayanan Masyarakat RW 06 Berbasis Mobile, yang digunakan oleh warga untuk mengajukan surat secara online. Integrasi antara sistem mobile dan web dilakukan melalui teknologi API, sehingga proses layanan dapat berjalan lebih efisien dan real-time. Terdapat dua jenis pengguna dalam sistem ini, yaitu Ketua RT dan Ketua RW, yang memiliki akses untuk memverifikasi pengajuan layanan serta mengelola data inventaris barang Prodamas.",
        "portfolio.web2.category": "Website",
        "portfolio.web2.client": "-",
        "portfolio.web2.year": "2023",
        "portfolio.web2.urlText": "Belum Terbit",
        "portfolio.web2.title": "Sistem Informasi Sewa Mobil Berbasis Web",
        "portfolio.web2.desc":
          "Sistem Informasi Sewa Mobil Berbasis Web adalah aplikasi yang dirancang untuk mempermudah proses pemesanan mobil pada perusahaan rental secara online. Melalui sistem ini, pelanggan dapat melihat daftar mobil yang tersedia, melakukan pemesanan, serta mendapatkan informasi detail terkait harga dan durasi sewa. Terdapat dua jenis pengguna dalam sistem ini, yaitu User Pelanggan, yang melakukan pemesanan, dan User Admin, yang bertugas mengelola data mobil, transaksi, dan konfirmasi pemesanan.",
        "portfolio.web3.category": "Website",
        "portfolio.web3.client": "-",
        "portfolio.web3.year": "2023",
        "portfolio.web3.urlText": "Belum Terbit",
        "portfolio.web3.title":
          "Sistem Informasi Penerimaan Pegawai Baru Berbasis Web",
        "portfolio.web3.desc":
          "Sistem Informasi Rekrutmen Pegawai adalah aplikasi berbasis web yang berfokus pada proses penerimaan pegawai baru secara digital. Sistem ini mendukung alur seleksi yang terdiri dari beberapa tahapan persyaratan yang harus diikuti oleh para pelamar, mulai dari pendaftaran, seleksi administrasi, hingga tahap akhir penerimaan. Terdapat lima jenis aktor pengguna dalam sistem ini, yaitu: Pelamar, HRD, Tim Seleksi, Admin Sistem, dan Manajer, yang masing-masing memiliki akses dan fungsi sesuai dengan perannya dalam proses rekrutmen.",
        "portfolio.web4.category": "Website",
        "portfolio.web4.client": "-",
        "portfolio.web4.year": "2024",
        "portfolio.web4.urlText": "Belum Terbit",
        "portfolio.web4.title":
          "Sistem Informasi Reservasi Gereja Berbasis Web",
        "portfolio.web4.desc":
          "Sistem Informasi Reservasi Kursi Gereja adalah aplikasi yang dirancang untuk memfasilitasi proses pemesanan kursi dalam kegiatan atau acara keagamaan di gereja. Sistem ini membantu pengelolaan jumlah peserta agar lebih tertib dan terorganisir. Terdapat dua jenis pengguna dalam sistem ini, yaitu User Admin, yang bertugas mengelola data acara dan kursi, serta User Jemaat, yang dapat melakukan reservasi secara mandiri melalui sistem.",
        "portfolio.web5.category": "Website",
        "portfolio.web5.client": "-",
        "portfolio.web5.year": "2024",
        "portfolio.web5.urlText": "Belum Terbit",
        "portfolio.web5.title":
          "Sistem Informasi Manajemen Rumah Sakit Wilujeng",
        "portfolio.web5.desc":
          "Sistem Informasi Manajemen Rumah Sakit Wilujeng merupakan sistem yang dikembangkan oleh saya bersama tim IT Rumah Sakit Wilujeng. Pengembangan sistem ini menggunakan referensi dari source code open-source yang tersedia di repositori GitHub, kemudian disesuaikan dan dikembangkan lebih lanjut agar sesuai dengan kebutuhan operasional rumah sakit. Sistem ini dirancang untuk mendukung manajemen data pasien, layanan medis, administrasi, dan operasional rumah sakit secara digital dan terintegrasi.",
        "portfolio.web6.category": "Website",
        "portfolio.web6.client": "-",
        "portfolio.web6.year": "2024",
        "portfolio.web6.urlText": "Belum Terbit",
        "portfolio.web6.title":
          "Sistem Informasi Pengarsipan Surat Berbasis Web",
        "portfolio.web6.desc":
          "Sistem Informasi Pengarsipan Surat Berbasis Web adalah aplikasi digital yang dirancang untuk mempermudah proses pengarsipan surat di lingkungan desa. Sistem ini menyediakan fitur untuk mengunggah, mengunduh, dan melakukan pratinjau (preview) surat secara langsung melalui platform web. Aplikasi ini hanya memiliki satu jenis pengguna, yaitu pegawai desa, yang bertugas mengelola seluruh dokumen agar tersimpan dengan rapi, aman, dan mudah diakses kapan pun diperlukan.",
        "portfolio.web7.category": "Website",
        "portfolio.web7.client": "-",
        "portfolio.web7.year": "2024",
        "portfolio.web7.urlText": "Belum Terbit",
        "portfolio.web7.title": "Sistem Kasir dan Manajemen Toko Jamu",
        "portfolio.web7.desc":
          "Sistem Kasir dan Manajemen Toko Jamu adalah aplikasi berbasis web yang dirancang untuk membantu pemilik usaha dalam mengelola produk dan transaksi penjualan secara efisien. Sistem ini mencakup fitur manajemen data barang, stok produk, serta proses transaksi penjualan langsung layaknya sistem kasir. Dengan sistem ini, operasional toko jamu menjadi lebih terstruktur, cepat, dan mudah dikontrol dalam satu platform digital.",
        "portfolio.web8.category": "Website",
        "portfolio.web8.client": "-",
        "portfolio.web8.year": "2024",
        "portfolio.web8.urlText": "Belum Terbit",
        "portfolio.web8.title": "Sistem Pencatatan Buku Perpustakaan",
        "portfolio.web8.desc":
          "Sistem Pencatatan Buku Perpustakaan adalah aplikasi berbasis web yang berfungsi untuk memudahkan proses pencatatan dan pengelolaan data koleksi buku di sebuah perpustakaan. Sistem ini dirancang untuk membantu petugas dalam mencatat data buku secara sistematis, mempercepat proses pencarian informasi buku, serta meningkatkan efisiensi dalam pengelolaan inventaris perpustakaan.",
        "portfolio.other1.category": "App",
        "portfolio.other1.client": "-",
        "portfolio.other1.year": "2023",
        "portfolio.other1.urlText": "Belum Terbit",
        "portfolio.other1.title":
          "Sistem Informasi Pelayanan Masyarakat Berbasis Mobile",
        "portfolio.other1.desc":
          "Sistem Informasi Pelayanan Masyarakat Berbasis Mobile adalah aplikasi yang dirancang untuk mempermudah warga dalam mengakses layanan masyarakat secara digital. Fitur utamanya mencakup pengajuan surat, pembayaran kas RT/RW secara online, serta penyampaian informasi kegiatan warga. Aplikasi ini hanya dapat digunakan oleh warga melalui perangkat mobile, dan terintegrasi dengan sistem web melalui teknologi API untuk memudahkan pengurus dalam mengelola data dan layanan secara efisien.",
        "portfolio.other2.category": "Other",
        "portfolio.other2.client": "-",
        "portfolio.other2.year": "-",
        "portfolio.other2.urlText": "Belum Terbit",
        "portfolio.other2.title": "Coming Soon",
        "portfolio.other2.desc": "Coming Soon",
        "portfolio.design1.category": "UI/UX Design",
        "portfolio.design1.client": "-",
        "portfolio.design1.year": "2022",
        "portfolio.design1.urlText": "Belum Terbit",
        "portfolio.design1.title":
          "Desain UI UX Mobile Sistem Aplikasi Perumahan Indonesia",
        "portfolio.design1.desc":
          "Desain UI/UX ini merupakan hasil perancangan antarmuka dan pengalaman pengguna untuk aplikasi yang akan diimplementasikan pada platform mobile. Desain ini mencakup kebutuhan tiga jenis pengguna (aktor), yaitu pembeli, agen properti, dan admin perusahaan. Setiap peran memiliki tampilan dan fitur yang disesuaikan untuk mendukung alur kerja masing-masing secara optimal, dengan fokus pada kemudahan navigasi, kenyamanan visual, dan pengalaman pengguna yang intuitif.",
        "portfolio.design2.category": "UI/UX Design",
        "portfolio.design2.client": "-",
        "portfolio.design2.year": "2023",
        "portfolio.design2.urlText": "Belum Terbit",
        "portfolio.design2.title":
          "Desain UI UX Mobile Sistem Informasi Pelayanan Warga Berbasis Mobile",
        "portfolio.design2.desc":
          "Desain UI/UX ini merupakan rancangan antarmuka dan pengalaman pengguna yang ditujukan untuk pengembangan aplikasi mobile. Desain ini telah berhasil diimplementasikan pada Sistem Informasi Pelayanan Masyarakat RW 06 Berbasis Mobile, yang bertujuan memberikan kemudahan bagi warga dalam mengakses layanan seperti pengajuan surat, pembayaran kas, dan informasi kegiatan secara digital. Perancangan UI/UX difokuskan pada kemudahan navigasi, kenyamanan visual, serta pengalaman pengguna yang intuitif.",
      },
      en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.resume": "Resume",
        "nav.portfolio": "Portfolio",
        "nav.contact": "Contact",
        "section.about": "About",
        "about.heading": "Software Developer & AI Automation Specialist",
        "about.paragraph": `Greetings, my name is Duvan Albertus, a Software Developer with over 2 years of experience in web and desktop application development. I am also an active freelancer, independently handling various projects from planning through implementation. I have strong skills in PHP, JavaScript, Java, REST APIs, and supporting frameworks. I build efficient systems, optimize application performance, and deliver solutions aligned with business needs. Over the past year I've focused on AI Automation, developing and integrating AI-based automation systems to keep up with the latest technological advances.`,
        "about.phoneLabel": "Phone:",
        "about.phone": "+62 851-8325-3224",
        "about.emailLabel": "Email:",
        "about.email": "albertusyuri4@gmail.com",
        "section.skills": "Skills",
        "section.skillsDesc":
          "Below are some programming languages and tools I use to build websites, systems, and applications.",
        "section.resume": "Resume",
        "section.resumeDesc":
          "Here is a brief summary of my education background and work experience since I entered the technology industry.",
        "section.portfolio": "Portfolio",
        "section.portfolioDesc":
          "Below is a collection of projects I've built — web/desktop apps and workflow automation systems.",
        "section.testimonials": "What Clients Say ?",
        "section.testimonialsDesc":
          "I believe client satisfaction is the primary measure of a project's success.",
        "section.contact": "Contact",
        "section.contactDesc":
          "If you're interested in working together, have questions, or want to discuss a project further, please contact me via the form or the contact details provided.",
        "contact.sendButton": "Send Message",
        "resume.educationTitle": "Education",
        "resume.edu1.title": "Manajemen Informatika (Information Management)",
        "resume.edu1.school": "Politeknik Negeri Malang",
        "resume.edu1.desc":
          "At this education level, I began learning and using popular technologies such as programming languages PHP and Java, and started studying framework technologies like Laravel and Codeigniter",
        "resume.edu2.title":
          "Teknik Komputer Jaringan (Network Computer Engineering)",
        "resume.edu2.school": "SMK Pawyatan Daha 2 Kediri",
        "resume.edu2.desc":
          "Started learning basic programming code and creating my first landing page using basic HTML, CSS, and Javascript technologies",
        "resume.experienceTitle": "Professional Experience",
        "resume.exp1.title": "Staff IT Programmer",
        "resume.exp1.company": "RS Wilujeng Kediri",
        "resume.exp1.desc1":
          "Analyzed system feature requirements to support hospital health operations",
        "resume.exp1.desc2":
          "Built web and desktop-based information systems according to hospital health operational needs",
        "resume.exp1.desc3":
          "Performed simple maintenance on computer hardware devices",
        "resume.exp2.title": "Freelancer Programmer",
        "resume.exp2.desc1":
          "Analyzed requirements and system features requested by clients",
        "resume.exp2.desc2":
          "Built web-based information systems according to client needs",
        "resume.exp3.title": "UI / UX Designer",
        "resume.exp3.company": "CV. Visual Code Indonesia",
        "resume.exp3.desc1": "Developed UI / UX design for Mobile Applications",
        "resume.exp3.desc2":
          "Analyzed user needs through business flow diagrams",
        "resume.exp3.desc3":
          "Created wireframe designs, mockups, and interactive prototypes according to business flow diagrams",
        "testimonial.1.text":
          "I was very helped by the cash register and herbal shop management system that was created. Now I can easily record sales, stock, and daily reports. Fast and communicative service. Highly recommended!",
        "testimonial.1.name": "Leo",
        "testimonial.1.role": "Owner of Leo Herbal Shop",
        "testimonial.2.text":
          "The reservation system created was very helpful to us in managing church building usage. The booking process became more organized and transparent. The team was very responsive and the results were satisfactory!",
        "testimonial.2.name": "Yohanes Pratama",
        "testimonial.2.role": "Church Administrator",
        "testimonial.3.text":
          "The recruitment system created was very helpful in completing my college final project. The features are complete and the display is neat. Communication during the work process was also very good!",
        "testimonial.3.name": "Satrio",
        "testimonial.3.role": "Student",
        "portfolio.pageTitle": "Portfolio Detail",
        "portfolio.infoTitle": "Project Information",
        "portfolio.labels.category": "Category",
        "portfolio.labels.client": "Client",
        "portfolio.labels.year": "Project Year",
        "portfolio.labels.url": "Project URL",
        "portfolio.labels.notAvailable": "-",
        "portfolio.labels.notPublished": "Not Yet Published",
        "portfolio.workflow1.category": "Workflow Auto",
        "portfolio.workflow1.client": "-",
        "portfolio.workflow1.year": "2025",
        "portfolio.workflow1.urlText": "Not Yet Published",
        "portfolio.workflow1.title": "Telegram AI Assistant Bot",
        "portfolio.workflow1.desc":
          "This project is a Telegram-based chatbot that functions as a virtual personal assistant. This bot was built using n8n as an automation platform (no-code) to connect various services including Telegram, Gemini AI, and other modules.",
        "portfolio.workflow2.category": "Workflow Auto",
        "portfolio.workflow2.client": "-",
        "portfolio.workflow2.year": "2025",
        "portfolio.workflow2.urlText": "Not Yet Published",
        "portfolio.workflow2.title":
          "Automatic Financial Workflow via Telegram Bot",
        "portfolio.workflow2.desc":
          "This workflow is designed using n8n to help record personal financial transactions automatically via Telegram Bot. Whenever a user sends a message containing expense or income notes, the bot will process the data and save it to a spreadsheet/database. This solution makes daily financial management easier in a practical, fast, and minimally manual way.",
        "portfolio.workflow3.category": "Workflow Auto",
        "portfolio.workflow3.client": "-",
        "portfolio.workflow3.year": "2025",
        "portfolio.workflow3.urlText": "Not Yet Published",
        "portfolio.workflow3.title":
          "Automatic Resume Screening & Evaluation for HR",
        "portfolio.workflow3.desc":
          "This project builds an automated workflow to help HR teams quickly screen and evaluate candidate resumes. The system leverages AI/NLP integration to assess candidate fit based on defined criteria, then generates evaluation scores and summary reports to streamline recruitment. This solution speeds up the screening process, reduces manual bias, and increases HR team efficiency.",
        "portfolio.web1.category": "Website",
        "portfolio.web1.client": "-",
        "portfolio.web1.year": "2023",
        "portfolio.web1.urlText": "Not Yet Published",
        "portfolio.web1.title":
          "Community Service Management and Prodamas Inventory Management Information System Web-Based",
        "portfolio.web1.desc":
          "The Community Service Management and Prodamas Inventory Management Information System Web-Based is an application designed to manage community service applications and Prodamas inventory data in an integrated manner. This system is connected to a mobile application called Sistem Informasi Pelayanan Masyarakat RW 06 Berbasis Mobile, which is used by residents to apply for letters online. Integration between mobile and web systems is done through API technology, so service processes can run more efficiently and real-time. There are two types of users in this system, namely RT Chairman and RW Chairman, who have access to verify service applications and manage Prodamas inventory data.",
        "portfolio.web2.category": "Website",
        "portfolio.web2.client": "-",
        "portfolio.web2.year": "2023",
        "portfolio.web2.urlText": "Not Yet Published",
        "portfolio.web2.title": "Car Rental Information System Web-Based",
        "portfolio.web2.desc":
          "The Car Rental Information System Web-Based is an application designed to streamline the car booking process at rental companies online. Through this system, customers can view available vehicles, make bookings, and get detailed information related to rental prices and duration. There are two types of users in this system, namely Customer User, who make bookings, and Admin User, who are responsible for managing vehicle data, transactions, and booking confirmations.",
        "portfolio.web3.category": "Website",
        "portfolio.web3.client": "-",
        "portfolio.web3.year": "2023",
        "portfolio.web3.urlText": "Not Yet Published",
        "portfolio.web3.title":
          "New Employee Reception Information System Web-Based",
        "portfolio.web3.desc":
          "The Employee Recruitment Information System is a web-based application focused on the digital new employee recruitment process. This system supports a selection flow consisting of several requirement stages that must be followed by applicants, from registration, administrative selection, to final receipt stages. There are five types of user actors in this system, namely: Applicant, HR, Selection Team, System Admin, and Manager, each with access and functions according to their role in the recruitment process.",
        "portfolio.web4.category": "Website",
        "portfolio.web4.client": "-",
        "portfolio.web4.year": "2024",
        "portfolio.web4.urlText": "Not Yet Published",
        "portfolio.web4.title":
          "Church Reservation Information System Web-Based",
        "portfolio.web4.desc":
          "The Church Chair Reservation Information System is an application designed to facilitate the process of booking chairs in religious or church activities. This system helps manage the number of participants to be more orderly and organized. There are two types of users in this system, namely Admin User, who is responsible for managing event and chair data, and Congregation User, who can make reservations independently through the system.",
        "portfolio.web5.category": "Website",
        "portfolio.web5.client": "-",
        "portfolio.web5.year": "2024",
        "portfolio.web5.urlText": "Not Yet Published",
        "portfolio.web5.title":
          "Wilujeng Hospital Management Information System",
        "portfolio.web5.desc":
          "The Wilujeng Hospital Management Information System is a system developed by me together with the IT team of Wilujeng Hospital. The development of this system uses references from open-source code available in the GitHub repository, which is then adapted and developed further to suit hospital operational needs. This system is designed to support patient data management, medical services, administration, and hospital operations digitally and in an integrated manner.",
        "portfolio.web6.category": "Website",
        "portfolio.web6.client": "-",
        "portfolio.web6.year": "2024",
        "portfolio.web6.urlText": "Not Yet Published",
        "portfolio.web6.title": "Letter Archiving Information System Web-Based",
        "portfolio.web6.desc":
          "The Letter Archiving Information System Web-Based is a digital application designed to streamline the letter archiving process in the village environment. This system provides features for uploading, downloading, and previewing letters directly through the web platform. This application has only one type of user, namely village employees, who are responsible for managing all documents so they are stored neatly, safely, and easily accessible whenever needed.",
        "portfolio.web7.category": "Website",
        "portfolio.web7.client": "-",
        "portfolio.web7.year": "2024",
        "portfolio.web7.urlText": "Not Yet Published",
        "portfolio.web7.title":
          "Herbal Shop Cash Register and Management System",
        "portfolio.web7.desc":
          "The Herbal Shop Cash Register and Management System is a web-based application designed to help business owners manage products and sales transactions efficiently. This system includes features for managing item data, product stock, and direct sales transaction processes like a cash register system. With this system, herbal shop operations become more structured, fast, and easy to control in a single digital platform.",
        "portfolio.web8.category": "Website",
        "portfolio.web8.client": "-",
        "portfolio.web8.year": "2024",
        "portfolio.web8.urlText": "Not Yet Published",
        "portfolio.web8.title": "Library Book Recording System",
        "portfolio.web8.desc":
          "The Library Book Recording System is a web-based application that functions to facilitate the process of recording and managing book collection data in a library. This system is designed to help staff record book data systematically, speed up the book information search process, and improve efficiency in library inventory management.",
        "portfolio.other1.category": "App",
        "portfolio.other1.client": "-",
        "portfolio.other1.year": "2023",
        "portfolio.other1.urlText": "Not Yet Published",
        "portfolio.other1.title":
          "Community Service Information System Mobile-Based",
        "portfolio.other1.desc":
          "The Mobile-Based Community Service Information System is an application designed to make it easier for residents to access community services digitally. Its main features include letter applications, online RT/RW fee payments, and information about resident activities. This application can only be used by residents through mobile devices, and is integrated with the web system through API technology to make it easier for administrators to manage data and services efficiently.",
        "portfolio.other2.category": "Other",
        "portfolio.other2.client": "-",
        "portfolio.other2.year": "-",
        "portfolio.other2.urlText": "Not Yet Published",
        "portfolio.other2.title": "Coming Soon",
        "portfolio.other2.desc": "Coming Soon",
        "portfolio.design1.category": "UI/UX Design",
        "portfolio.design1.client": "-",
        "portfolio.design1.year": "2022",
        "portfolio.design1.urlText": "Not Yet Published",
        "portfolio.design1.title":
          "UI UX Design Mobile Indonesian Housing Application System",
        "portfolio.design1.desc":
          "This UI/UX design is the result of designing the interface and user experience for an application that will be implemented on the mobile platform. This design covers the needs of three types of users (actors), namely buyers, real estate agents, and company administrators. Each role has a display and features adapted to support the workflow of each optimally, with a focus on ease of navigation, visual comfort, and intuitive user experience.",
        "portfolio.design2.category": "UI/UX Design",
        "portfolio.design2.client": "-",
        "portfolio.design2.year": "2023",
        "portfolio.design2.urlText": "Not Yet Published",
        "portfolio.design2.title":
          "UI UX Design Mobile Citizen Service Information System Mobile-Based",
        "portfolio.design2.desc":
          "This UI/UX design is an interface and user experience design intended for mobile application development. This design has been successfully implemented in the Sistem Informasi Pelayanan Masyarakat RW 06 Berbasis Mobile, which aims to make it easier for residents to access services such as letter applications, fee payments, and activity information digitally. UI/UX design is focused on ease of navigation, visual comfort, and intuitive user experience.",
      },
    };

    const switchEl = document.getElementById("langSwitch");
    const labelEl = document.getElementById("langLabel");

    function applyLang(lang) {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
          el.innerHTML = translations[lang][key];
        }
      });
      if (labelEl) labelEl.textContent = lang === "en" ? "EN" : "ID";
      localStorage.setItem("siteLang", lang);
    }

    const saved = localStorage.getItem("siteLang") || "en";
    if (switchEl) {
      switchEl.checked = saved === "en";
      applyLang(saved);
      switchEl.addEventListener("change", function () {
        applyLang(this.checked ? "en" : "id");
      });
    } else {
      applyLang(saved);
    }
  })();
})();
