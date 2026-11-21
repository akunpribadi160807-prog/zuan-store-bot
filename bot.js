// ============================================
// ZUAN STORE - FINAL - TEKS ASLI + LOGIKA BARU
// Teks & garis ngikutin script asli lu
// Logika: order -> grup, bukti -> owner doang, VALID/TOLAK, izin post
// ============================================
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('9072638201:AAHYWt2xevTZKMfpUC5CiCMhqrPlnauH0m4');
const ADMIN_ID = 8493708698;
const GROUP_UTAMA = -1004497488934;
const GROUP_PROMO = -1003900745031;
const GROUP_TESTI = -1004432426937;
const GROUP_PAYMENT = -1004257626762;

const users = new Map();
function rupiah(n){ return 'Rp ' + n.toLocaleString('id-ID'); }
const mono = (t) => t;

// ===== DATA - SAMA KAYAK ASLI =====
const VPS = {
  '1':{nama:'VPS 1GB',harga:30000,cpu:'1 vCPU',ram:'1GB DDR4',storage:'20GB NVMe Gen4'},
  '2':{nama:'VPS 2GB',harga:40000,cpu:'1 vCPU',ram:'2GB DDR4',storage:'30GB NVMe Gen4'},
  '3':{nama:'VPS 4GB',harga:75000,cpu:'2 vCPU',ram:'4GB DDR4',storage:'60GB NVMe Gen4'},
  '4':{nama:'VPS 8GB',harga:130000,cpu:'4 vCPU',ram:'8GB DDR4',storage:'100GB NVMe Gen4'},
  '5':{nama:'VPS 12GB',harga:195000,cpu:'6 vCPU',ram:'12GB DDR4',storage:'160GB NVMe Gen4'},
  '6':{nama:'VPS 16GB',harga:275000,cpu:'8 vCPU',ram:'16GB DDR4',storage:'200GB NVMe Gen4'},
};
const LOKASI = {'1':'Jerman - 140ms','2':'Indonesia - 15ms','3':'Singapura - 30ms'};
const PANEL = {
  '1':{nama:'PANEL 1GB',harga:5000,spek:'1GB RAM | 10GB Disk | 40% CPU'},
  '2':{nama:'PANEL 2GB',harga:8000,spek:'2GB RAM | 20GB Disk | 80% CPU'},
  '3':{nama:'PANEL 4GB',harga:15000,spek:'4GB RAM | 40GB Disk | 150% CPU'},
  '4':{nama:'PANEL UNLIMITED',harga:30000,spek:'UNLI RAM | UNLI Disk | UNLI CPU'}
};
const DOMAIN = {
  '1':{nama:'.my.id',harga:12000},'2':{nama:'.xyz',harga:15000},
  '3':{nama:'.online',harga:20000},'4':{nama:'.store',harga:25000},
  '5':{nama:'.com',harga:95000},'6':{nama:'.id',harga:180000}
};
const JASA = {
  '1':{nama:'INSTALL BOT WA',harga:15000,desc:'Sampai Jalan & Online'},
  '2':{nama:'INSTALL PANEL',harga:20000,desc:'Pterodactyl Full Setting'},
  '3':{nama:'INSTALL WEB / STORE',harga:25000,desc:'Domain + SSL + Tampilan'},
  '4':{nama:'SETTING VPS',harga:10000,desc:'Optimasi Biar Ngebut'}
};
const OS_VERSIONS_LABEL = {
  ubuntu: ['Ubuntu 24.04 LTS ⭐ REKOMENDASI', 'Ubuntu 22.04 LTS', 'Ubuntu 20.04 LTS'],
  debian: ['Debian 12 ⭐ REKOMENDASI', 'Debian 11', 'Debian 10'],
  alma: ['AlmaLinux 9 ⭐ REKOMENDASI', 'AlmaLinux 8'],
  rocky: ['Rocky Linux 9 ⭐ REKOMENDASI', 'Rocky Linux 8'],
};
const OS_VERSIONS_RAW = {
  ubuntu: ['Ubuntu 24.04 LTS', 'Ubuntu 22.04 LTS', 'Ubuntu 20.04 LTS'],
  debian: ['Debian 12', 'Debian 11', 'Debian 10'],
  alma: ['AlmaLinux 9', 'AlmaLinux 8'],
  rocky: ['Rocky Linux 9', 'Rocky Linux 8'],
};

// ===== TEKS - 100% ASLI LU, GA GUA UBAH =====
const MENU = `╔═════════════════════════════════╗
        ⚡✨ 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 ✨⚡
     🚀 CEPAT. STABIL. TANPA RIBET.
╚═════════════════════════════════╝

      👋 Halo kak, Selamat Datang di
          👑 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 👑
      Mau order apa hari ini? 😎👇

Klik tombol di bawah ya kak 👇`;

const VPS_LIST = `╔═════════════════════════════════╗
     ⚡ 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 — 𝐕𝐏𝐒 𝐌𝐔𝐑𝐀𝐇 ⚡
      🚀 NVMe Gen4 | KVM | Full Root
       ⚡ Aktif 5 Menit. Tanpa Ribet.
╚═════════════════════════════════╝

  ╭─► 01 — VPS 1GB / Rp 30.000
  │     ├─➤ CPU : 1 vCPU
  │     ├─➤ RAM : 1GB DDR4
  │     ╰─➤ STORAGE : 20GB NVMe Gen4
  ├─► 02 — VPS 2GB / Rp 40.000  🔥 PALING LARIS
  │     ├─➤ CPU : 1 vCPU
  │     ├─➤ RAM : 2GB DDR4
  │     ╰─➤ STORAGE : 30GB NVMe Gen4
  ├─► 03 — VPS 4GB / Rp 75.000  ✨ BEST VALUE
  │     ├─➤ CPU : 2 vCPU
  │     ├─➤ RAM : 4GB DDR4
  │     ╰─➤ STORAGE : 60GB NVMe Gen4
  ├─► 04 — VPS 8GB / Rp 130.000  👑 PRO
  │     ├─➤ CPU : 4 vCPU
  │     ├─➤ RAM : 8GB DDR4
  │     ╰─➤ STORAGE : 100GB NVMe Gen4
  ├─► 05 — VPS 12GB / Rp 195.000  💪 BEAST
  │     ├─➤ CPU : 6 vCPU
  │     ├─➤ RAM : 12GB DDR4
  │     ╰─➤ STORAGE : 160GB NVMe Gen4
  ╰─► 06 — VPS 16GB / Rp 275.000  🚀 MONSTER
        ├─➤ CPU : 8 vCPU
        ├─➤ RAM : 16GB DDR4
        ╰─➤ STORAGE : 200GB NVMe Gen4

Klik paket nya di bawah 👇`;

const LOKASI_TXT = `╔═════════════════════════════════╗
      🌍⚡ PILIH LOKASI SERVER ⚡🌍
╚═════════════════════════════════╝

      📍 Lokasi ngaruh ke PING ya kak!
         Makin deket, makin ngebut! 🚀

  ╭─► [1] JERMAN — 140ms
  │     ├─➤ REKOMENDASI | Paling Stabil
  │     ╰─➤ Cocok Buat Bot / Web
  ├─► [2] INDONESIA — 15ms
  │     ├─➤ PALING NGEBUT | Paling Deket
  │     ╰─➤ PING KECIL, Buat Game / Bot
  ╰─► [3] SINGAPURA — 30ms
        ├─➤ STABIL | Buat Asia
        ╰─➤ Alternatif Paling Aman

Klik lokasi nya 👇`;

const OS_TXT = `╔═════════════════════════════════╗
     🐧 PILIH SISTEM OPERASI 🐧
╚═════════════════════════════════╝

  ▸ UBUNTU
    Paling mudah. Cocok buat pemula.

  ▸ DEBIAN
    Paling stabil. Favorit para pro.

  ▸ ALMALINUX
    Rasa enterprise. Tetap ringan.

  ▸ ROCKY LINUX
    Kuat dan bisa diandalkan.

Klik OS nya di bawah 👇`;

function osVersionTxt(fam){
  const judul = fam === 'ubuntu' ? 'UBUNTU' : fam === 'debian' ? 'DEBIAN' : fam === 'alma' ? 'ALMALINUX' : 'ROCKY LINUX';
  const desc = fam === 'ubuntu' ? 'Paling mudah. Cocok buat pemula.' : fam === 'debian' ? 'Paling stabil. Favorit para pro.' : fam === 'alma' ? 'Rasa enterprise. Tetap ringan.' : 'Kuat dan bisa diandalkan.';
  return `╔═════════════════════════════════╗
     🐧 PILIH VERSI ${judul} 🐧
╚═════════════════════════════════╝

  ${desc}

Klik versi nya di bawah 👇`;
}

function ringkasanTxt(u){
 return `╔═════════════════════════════════╗
     🧾✨ RINGKASAN ORDER KAMU ✨🧾
╚═════════════════════════════════╝

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃      📦 DETAIL PESANAN KAMU      ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 📦 PAKET
  │     ╰─➤ ${u.nama}
  │
  ├─► 🖥️ CPU
  │     ╰─➤ ${u.cpu} ⚡
  │
  ├─► 🧠 RAM
  │     ╰─➤ ${u.ram} 💪
  │
  ├─► 💾 STORAGE
  │     ╰─➤ ${u.storage} 🚀
  │
  ├─► 📍 LOKASI
  │     ╰─➤ ${u.lokasi} 🔥
  │
  ├─► 🐧 OPERATING SYSTEM
  │     ╰─➤ ${u.os}
  │
  ╰─► 📅 DURASI
        ╰─➤ 30 Hari Full 📆

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃      💰 TOTAL : ${rupiah(u.harga)} 💰      ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

Udah bener? Klik YA buat lanjut 👇`;
}

const USERNAME_TXT = `╔═════════════════════════════════╗
     👤 ATUR USERNAME VPS KAMU 👤
╚═════════════════════════════════╝

   Tentuin username buat login VPS kamu 😎
       Contoh: zuan, budi, storeku

⚠️ Syaratnya:
  ╭─► 🔤 Huruf kecil aja
  ╰─► 🚫 Tanpa spasi

⌨️ Ketik username kamu sekarang:`;

function bayarTxt(u){
 return `╔═════════════════════════════════╗
    ✅🔒 ORDER BERHASIL DIKUNCI 🔒✅
╚═════════════════════════════════╝

     Terima kasih sudah order di
         👑⚡ 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 ⚡👑

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃         💻 SPEK VPS KAMU 💻         ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 📦 PAKET ╰─➤ ${u.nama}
  ├─► 🖥️ CPU ╰─➤ ${u.cpu || '-'}
  ├─► 🧠 RAM ╰─➤ ${u.ram || '-'}
  ├─► 💾 STORAGE ╰─➤ ${u.storage || '-'}
  ├─► 📍 LOKASI ╰─➤ ${u.lokasi || '-'}
  ├─► 🐧 OS ╰─➤ ${u.os || '-'}
  ├─► 👤 USERNAME ╰─➤ ${u.username}
  ├─► 🔑 PASSWORD ╰─➤ Dikirim setelah bayar
  ╰─► 📅 DURASI ╰─➤ 30 Hari Full

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       💰 TOTAL PEMBAYARAN 💰       ┃
┃            ${rupiah(u.harga)}              ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       💳 METODE : TRANSFER 💳       ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 🏦 SEABANK
  │     ├─➤ No. Rek : 9012-4214-5662
  │     ╰─➤ A.N : MUHAMAD IKHSANDI AKBAR
  │
  ├─► 📱 GOPAY
  │     ├─➤ No. HP : 0858-7225-7850
  │     ╰─➤ A.N : MUHAMAD IKHSANDI AKBAR
  │
  ╰─► ⚠️ DANA — SEDANG ADA KENDALA ⚠️
        ├─➤ Akun owner sedang gangguan
        ╰─➤ Mohon pakai QRIS / Seabank / Gopay dulu ya

Klik tombol QRIS di bawah 👇`;
}

function qrisTxt(u){
 return `╔═════════════════════════════════╗
      📷 PEMBAYARAN VIA QRIS 📷
╚═════════════════════════════════╝

  Halo kak, terima kasih banyak sudah
  percaya order di 👑 ZUAN STORE 👑

  Ini QRIS nya sudah kami kirimkan ya ✨
  Silakan scan QR di atas untuk
  menyelesaikan pembayaran sebesar:

  ╭─► 💰 ${rupiah(u.harga)}
  ╰─► 👤 A.N : MUHAMAD IKHSANDI AKBAR

QR ini bisa di scan melalui:
💙 DANA / 💜 OVO / 💚 Gopay / 🧡 ShopeePay
atau M-Banking apa saja.

📸 Setelah berhasil, kirim bukti
transfernya ke sini ya kak.
Kami akan segera proses VPS nya
dan aktif dalam 5-10 menit ⚡

Sekali lagi, terima kasih banyak
sudah memilih ZUAN STORE 🙏💎
Kami sangat menghargai kepercayaan kakak.

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ZUAN STORE - CEPAT. STABIL. TANPA RIBET. ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

const PANEL_TXT = `╔═════════════════════════════════╗
        📱 PANEL PTERODACTYL 📱
          🎮 SERVER GAME & BOT
╚═════════════════════════════════╝

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       💎 PILIH PAKET PANEL 💎       ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 01 — PANEL 1GB / Rp 5.000
  │     ╰─➤ 1GB RAM | 10GB Disk | 40% CPU
  ├─► 02 — PANEL 2GB / Rp 8.000 🔥 LARIS
  │     ╰─➤ 2GB RAM | 20GB Disk | 80% CPU
  ├─► 03 — PANEL 4GB / Rp 15.000 ✨ BEST
  │     ╰─➤ 4GB RAM | 40GB Disk | 150% CPU
  ╰─► 04 — PANEL UNLIMITED / Rp 30.000 👑
        ╰─➤ UNLI RAM | UNLI Disk | UNLI CPU

Klik paket nya 👇`;

const DOMAIN_TXT = `╔═════════════════════════════════╗
          🌐 DOMAIN MURAH 🌐
       🔗 NAMA KEREN BUAT WEB LU
╚═════════════════════════════════╝

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       💎 LIST HARGA DOMAIN 💎       ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► [1] .my.id — Rp 12.000 /tahun
  ├─► [2] .xyz — Rp 15.000 /tahun
  ├─► [3] .online — Rp 20.000 /tahun
  ├─► [4] .store — Rp 25.000 /tahun
  ├─► [5] .com — Rp 95.000 /tahun
  ╰─► [6] .id — Rp 180.000 /tahun

Klik ekstensi nya 👇`;

const JASA_TXT = `╔═════════════════════════════════╗
     🛠️ JASA INSTALL / SETTING 🛠️
        ⚙️ DIBANTU SAMPAI BERES
╚═════════════════════════════════╝

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃        💎 PILIH JASA KAMU 💎        ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► [1] 🤖 INSTALL BOT WA — Rp 15.000
  │     ╰─➤ Sampai Jalan & Online
  ├─► [2] 🎮 INSTALL PANEL — Rp 20.000
  │     ╰─➤ Pterodactyl Full Setting
  ├─► [3] 🌐 INSTALL WEB / STORE — Rp 25.000
  │     ╰─➤ Domain + SSL + Tampilan
  ╰─► [4] 🔧 SETTING VPS — Rp 10.000
        ╰─➤ Optimasi Biar Ngebut

Klik jasa nya 👇`;

const ADMIN_TXT = `╔═════════════════════════════════╗
          💬 HUBUNGI ADMIN 💬
╚═════════════════════════════════╝

     Butuh bantuan? Santai, admin kita
           fast respon kok! 😎👇

  ╭─► 👨‍💻 ADMIN : Zuan
  ├─► ⏰ ONLINE : 24 Jam
  ├─► ⚡ RESPON : 1 - 5 Menit
  ╰─► 📱 TELE : Klik tombol di bawah

Klik tombol ADMIN 👇`;

// ===== TEKS BARU - VALID / TOLAK / IZIN - PAKE GAYA YANG SAMA =====
function validTxt(u){
 return `╔═════════════════════════════════╗
    ✅✨ PEMBAYARAN BERHASIL ✨✅
╚═════════════════════════════════╝

  Terima kasih banyak kak 🙏💎

  Pembayaran kakak untuk:
  ╭─► 📦 ${u.nama}
  ╰─► 💰 ${rupiah(u.harga)}

  Sudah kami VALIDASI dan dinyatakan
  BERHASIL ✅

  ╭─► 👤 USERNAME : ${u.username}
  ╰─► ⚡ STATUS : VPS sedang diproses
        Aktif 5-10 menit lagi

  Sekali lagi, terima kasih atas
  kepercayaan kakak sudah memilih
  👑 ZUAN STORE 👑

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ZUAN STORE - CEPAT. STABIL. TANPA RIBET. ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}
function tolakTxt(u){
 return `╔═════════════════════════════════╗
    🙏 MOHON MAAF YA KAK 🙏
╚═════════════════════════════════╝

  Mohon maaf sebesar-besarnya ya kak 🙏

  Setelah kami cek dengan teliti,
  bukti transfer yang kakak kirim untuk:
  ╭─► 📦 ${u.nama}
  ╰─► 💰 ${rupiah(u.harga)}

  Belum bisa kami validasi.

  Bukan maksud kami menyulitkan kakak,
  kami hanya ingin memastikan semua
  transaksi aman untuk kakak dan kami.

  ╭─► 📸 Boleh tolong kirim ulang
  │     bukti yang lebih jelas?
  │     Foto full, jangan terpotong ya kak 🥺
  ╰─► 💬 Atau chat admin, kami bantu
        cek bareng-bareng 🙏

  Terima kasih atas pengertiannya kak 💎

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ZUAN STORE - CEPAT. STABIL. TANPA RIBET. ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

// ===== KEYBOARDS - SAMA KAYAK ASLI =====
const kbMenu = Markup.inlineKeyboard([
  [Markup.button.callback('💻 VPS MURAH', 'menu_1'), Markup.button.callback('📱 PANEL', 'menu_2')],
  [Markup.button.callback('🌐 DOMAIN MURAH', 'menu_3'), Markup.button.callback('🛠️ JASA INSTALL', 'menu_4')],
  [Markup.button.callback('💬 HUBUNGI ADMIN', 'menu_5')],
]);
const kbVps = Markup.inlineKeyboard([
  [Markup.button.callback('01 - VPS 1GB | Rp 30K', 'vps_1')],
  [Markup.button.callback('02 - VPS 2GB | Rp 40K 🔥 LARIS', 'vps_2')],
  [Markup.button.callback('03 - VPS 4GB | Rp 75K ✨ BEST', 'vps_3')],
  [Markup.button.callback('04 - VPS 8GB | Rp 130K 👑 PRO', 'vps_4')],
  [Markup.button.callback('05 - VPS 12GB | Rp 195K 💪', 'vps_5')],
  [Markup.button.callback('06 - VPS 16GB | Rp 275K 🚀', 'vps_6')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
const kbLokasi = Markup.inlineKeyboard([
  [Markup.button.callback('🇩🇪 JERMAN - 140ms ⭐', 'lok_1')],
  [Markup.button.callback('🇮🇩 INDONESIA - 15ms 🔥', 'lok_2')],
  [Markup.button.callback('🇸🇬 SINGAPURA - 30ms ✨', 'lok_3')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
const kbOsFamily = Markup.inlineKeyboard([
  [Markup.button.callback('🐧 UBUNTU - Paling Mudah', 'osfam_ubuntu')],
  [Markup.button.callback('🌀 DEBIAN - Paling Stabil', 'osfam_debian')],
  [Markup.button.callback('💼 ALMALINUX - Enterprise', 'osfam_alma')],
  [Markup.button.callback('🪨 ROCKY LINUX - Kuat', 'osfam_rocky')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
function kbOsVersion(fam){
  const btns = OS_VERSIONS_LABEL[fam].map((label, i) => [Markup.button.callback('✅ ' + label, `osver_${fam}_${i}`)]);
  btns.push([Markup.button.callback('↩️ Kembali ke OS', 'back_os')]);
  return Markup.inlineKeyboard(btns);
}
const kbYaBatal = Markup.inlineKeyboard([
  [Markup.button.callback('✅ YA, LANJUT', 'ya'), Markup.button.callback('❌ BATAL', 'batal')],
]);
const kbBayar = Markup.inlineKeyboard([
  [Markup.button.callback('📷 LIAT QRIS', 'qris')],
  [Markup.button.callback('↩️ MENU UTAMA', 'back_menu')],
]);
const kbPanel = Markup.inlineKeyboard([
  [Markup.button.callback('PANEL 1GB | Rp 5K', 'panel_1')],
  [Markup.button.callback('PANEL 2GB | Rp 8K 🔥', 'panel_2')],
  [Markup.button.callback('PANEL 4GB | Rp 15K ✨', 'panel_3')],
  [Markup.button.callback('PANEL UNLIMITED | Rp 30K 👑', 'panel_4')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
const kbDomain = Markup.inlineKeyboard([
  [Markup.button.callback('.my.id - Rp 12K', 'dom_1'), Markup.button.callback('.xyz - Rp 15K', 'dom_2')],
  [Markup.button.callback('.online - Rp 20K', 'dom_3'), Markup.button.callback('.store - Rp 25K', 'dom_4')],
  [Markup.button.callback('.com - Rp 95K', 'dom_5'), Markup.button.callback('.id - Rp 180K', 'dom_6')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
const kbJasa = Markup.inlineKeyboard([
  [Markup.button.callback('🤖 INSTALL BOT WA - Rp 15K', 'jasa_1')],
  [Markup.button.callback('🎮 INSTALL PANEL - Rp 20K', 'jasa_2')],
  [Markup.button.callback('🌐 INSTALL WEB - Rp 25K', 'jasa_3')],
  [Markup.button.callback('🔧 SETTING VPS - Rp 10K', 'jasa_4')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
const kbAdmin = Markup.inlineKeyboard([
  [Markup.button.callback('💬 CHAT ADMIN SEKARANG', 'admin_chat')],
  [Markup.button.callback('↩️ MENU UTAMA', 'back_menu')],
]);

const sendMenu = (ctx) => ctx.reply(mono(MENU), {parse_mode:'MarkdownV2', ...kbMenu});
const editTo = async (ctx, text, kb) => {
  try{ await ctx.editMessageText(mono(text), {parse_mode:'MarkdownV2', ...kb}); }
  catch(e){ await ctx.reply(mono(text), {parse_mode:'MarkdownV2', ...kb}); }
};
async function kirimKeGrup(text, extra){
  for(const gid of [GROUP_UTAMA, GROUP_PROMO, GROUP_TESTI, GROUP_PAYMENT]){
    try{ await bot.telegram.sendMessage(gid, text, extra || {}); } catch(e){}
  }
}

bot.start((ctx) => { users.set(ctx.from.id, {step:'menu'}); return sendMenu(ctx); });
bot.command('menu', (ctx) => { users.set(ctx.from.id, {step:'menu'}); return sendMenu(ctx); });
bot.command('start', (ctx) => { users.set(ctx.from.id, {step:'menu'}); return sendMenu(ctx); });

bot.on('callback_query', async (ctx) => {
  const id = ctx.from.id;
  const data = ctx.callbackQuery.data;
  await ctx.answerCbQuery();
  if(!users.has(id)) users.set(id, {step:'menu'});
  const u = users.get(id);

  if(data==='back_menu'){ u.step='menu'; return editTo(ctx, MENU, kbMenu); }
  if(data==='menu_1'){ u.step='pilih_vps'; return editTo(ctx, VPS_LIST, kbVps); }
  if(data==='menu_2'){ u.step='pilih_panel'; return editTo(ctx, PANEL_TXT, kbPanel); }
  if(data==='menu_3'){ u.step='pilih_domain'; return editTo(ctx, DOMAIN_TXT, kbDomain); }
  if(data==='menu_4'){ u.step='pilih_jasa'; return editTo(ctx, JASA_TXT, kbJasa); }
  if(data==='menu_5'){ u.step='admin_info'; return editTo(ctx, ADMIN_TXT, kbAdmin); }

  if(data.startsWith('vps_')){ const k=data.split('_')[1]; Object.assign(u, VPS[k]); u.step='pilih_lokasi'; return editTo(ctx, LOKASI_TXT, kbLokasi); }
  if(data.startsWith('lok_')){ const k=data.split('_')[1]; u.lokasi=LOKASI[k]; u.step='pilih_os_family'; return editTo(ctx, OS_TXT, kbOsFamily); }
  if(data==='back_os'){ u.step='pilih_os_family'; return editTo(ctx, OS_TXT, kbOsFamily); }
  if(data.startsWith('osfam_')){ const fam=data.split('_')[1]; u.os_fam=fam; u.step='pilih_os_version'; return editTo(ctx, osVersionTxt(fam), kbOsVersion(fam)); }
  if(data.startsWith('osver_')){ const parts=data.split('_'); const fam=parts[1]; const idx=parseInt(parts[2]); u.os=OS_VERSIONS_RAW[fam][idx]; u.step='konfirmasi_vps'; return editTo(ctx, ringkasanTxt(u), kbYaBatal); }

  if(data==='ya'){
    if(u.step==='konfirmasi_vps' || u.step==='konfirmasi_simple'){ u.step='username'; return ctx.reply(mono(USERNAME_TXT), {parse_mode:'MarkdownV2'}); }
  }
  if(data==='batal'){ u.step='menu'; return editTo(ctx, MENU, kbMenu); }

  if(data.startsWith('panel_')){ const k=data.split('_')[1]; Object.assign(u, PANEL[k]); u.detail=PANEL[k].spek; u.step='konfirmasi_simple'; return editTo(ctx, `╔═════════════════════════════════╗\n     📦 PILIHAN KAMU 📦\n╚═════════════════════════════════╝\n\n  ╭─► 📦 ${u.nama}\n  ├─► 💰 ${rupiah(u.harga)}\n  ╰─► 📋 ${u.detail}\n\nKlik YA buat lanjut 👇`, kbYaBatal); }
  if(data.startsWith('dom_')){ const k=data.split('_')[1]; u.ekstensi=DOMAIN[k]; u.step='input_domain'; return ctx.reply(`╔═════════════════════════════════╗\n          🌐 DOMAIN 🌐\n╚═════════════════════════════════╝\n\n  Kamu pilih ekstensi *${DOMAIN[k].nama}* - *${rupiah(DOMAIN[k].harga)}/tahun*\n\nKetik nama domain nya aja, contoh:\nzuanstore\n\n(Nanti otomatis jadi zuanstore${DOMAIN[k].nama})`); }
  if(data.startsWith('jasa_')){ const k=data.split('_')[1]; Object.assign(u, JASA[k]); u.detail=JASA[k].desc; u.step='konfirmasi_simple'; return editTo(ctx, `╔═════════════════════════════════╗\n     🛠️ PILIHAN KAMU 🛠️\n╚═════════════════════════════════╝\n\n  ╭─► 🛠️ ${u.nama}\n  ├─► 💰 ${rupiah(u.harga)}\n  ╰─► 📋 ${u.detail}\n\nKlik YA buat lanjut 👇`, kbYaBatal); }

  if(data==='admin_chat'){ u.step='chat_admin'; await bot.telegram.sendMessage(ADMIN_ID, `🔔 Ada cust minta admin! ID: ${id} (@${ctx.from.username||'-'})`); return ctx.reply('✅ Oke kak, admin sudah dihubungi! Tunggu sebentar ya, admin akan chat kakak langsung 🙏\nKetik /start buat balik.'); }
  if(data==='qris'){
    try{ await ctx.replyWithPhoto({source:'./qris.jpg'}, {caption: qrisTxt(u)}); }
    catch(e){ await ctx.reply(mono(qrisTxt(u) + '\n\n⚠️ Foto QRIS belum ada, taro file qris.jpg di folder bot ya'), {parse_mode:'MarkdownV2'}); }
    return;
  }

  // ===== VALID / TOLAK - CUMA OWNER YANG PENCET =====
  if(data.startsWith('valid_')){
    const custId = data.split('_')[1];
    const cust = users.get(Number(custId));
    if(!cust) return ctx.reply('Order tidak ketemu, mungkin bot restart.');
    cust.step = 'tanya_izin_post';
        await bot.telegram.sendMessage(custId, mono(validTxt(cust)), {parse_mode:'MarkdownV2'});
    await bot.telegram.sendMessage(custId, `╔═════════════════════════════════╗\n     🙏 IZIN POST TESTI 🙏\n╚═════════════════════════════════╝\n\n  Boleh ga kak, bukti TF kakak kami post\n  ke Grup Testi, Grup Payment, sama\n  Grup Utama sebagai bukti kalau\n  ZUAN STORE itu amanah? 🥺🙏\n\n  Tenang kak, data sensitif kakak\n  akan kami sensor.`, Markup.inlineKeyboard([
      [Markup.button.callback('✅ BOLEH, POST AJA', 'izin_boleh_' + custId)],
      [Markup.button.callback('🙏 JANGAN DULU YA', 'izin_jangan_' + custId)]
    ]));
    await bot.telegram.sendMessage(GROUP_PAYMENT, `╔═════════════════════════════════╗\n     ✅ PAYMENT BERHASIL ✅\n╚═════════════════════════════════╝\n\n  ╭─► 👤 Cust : @${cust.username_tg || '-'} (ID: ${custId})\n  ├─► 📦 Paket : ${cust.nama}\n  ├─► 💰 Total : ${rupiah(cust.harga)}\n  ╰─► 👤 Username VPS : ${cust.username || '-'}\n\n  Status: VALID oleh owner.\n  Menunggu izin post testi dari cust.`);
    return ctx.reply('✅ Sudah divalidasi, cust sudah ditanya izin post.');
  }

  if(data.startsWith('tolak_')){
    const custId = data.split('_')[1];
    const cust = users.get(Number(custId));
    if(!cust) return ctx.reply('Order tidak ketemu.');
    cust.step = 'ditolak';
    await bot.telegram.sendMessage(custId, mono(tolakTxt(cust)), {parse_mode:'MarkdownV2'});
    await bot.telegram.sendMessage(GROUP_PAYMENT, `╔═════════════════════════════════╗\n     ❌ PAYMENT GAGAL ❌\n╚═════════════════════════════════╝\n\n  ╭─► 👤 Cust : (ID: ${custId})\n  ├─► 📦 Paket : ${cust.nama}\n  ╰─► 💰 Total : ${rupiah(cust.harga)}\n\n  Alasan: Bukti belum bisa divalidasi.\n  Cust sudah diminta kirim ulang dengan sopan.`);
    return ctx.reply('❌ Sudah ditolak dengan sopan, cust sudah dikasih tau.');
  }

  if(data.startsWith('izin_boleh_')){
    const custId = data.split('_')[1];
    const cust = users.get(Number(custId));
    if(!cust || !cust.bukti_file_id) return ctx.reply('Bukti tidak ketemu.');
    cust.step = 'selesai';
    const captionTesti = `╔═════════════════════════════════╗\n  ⭐ TESTI TERPERCAYA - ZUAN STORE ⭐\n╚═════════════════════════════════╝\n\n  ✅ PAYMENT BERHASIL\n  ╭─► 👤 Cust : @${cust.username_tg || 'customer'}\n  ├─► 📦 ${cust.nama}\n  ╰─► 💰 ${rupiah(cust.harga)}\n\n  Terima kasih kak sudah percaya ZUAN STORE 🙏💎\n  CEPAT. STABIL. TANPA RIBET. ⚡`;
    for(const gid of [GROUP_TESTI, GROUP_PAYMENT, GROUP_UTAMA, GROUP_PROMO]){
      try{ await bot.telegram.sendPhoto(gid, cust.bukti_file_id, {caption: captionTesti}); } catch(e){}
    }
    await bot.telegram.sendMessage(custId, mono(`╔═════════════════════════════════╗\n     🙏 TERIMA KASIH KAK 🙏\n╚═════════════════════════════════╝\n\n  Terima kasih banyak kak sudah\n  mengizinkan kami post bukti nya 🙏💎\n\n  Kakak luar biasa, semoga rezeki\n  kakak makin lancar ya.\n  VPS kakak lagi kami proses ⚡`), {parse_mode:'MarkdownV2'});
    return ctx.reply('✅ Terima kasih kak sudah izin, bukti sudah di-post ke grup sebagai testi!');
  }
  if(data.startsWith('izin_jangan_')){
    const custId = data.split('_')[1];
    const cust = users.get(Number(custId));
    if(cust) cust.step = 'selesai';
    await bot.telegram.sendMessage(custId, mono(`╔═════════════════════════════════╗\n     🙏 SIAP KAK, AMAN 🙏\n╚═════════════════════════════════╝\n\n  Siap kak, aman banget, kami hargai\n  privasi kakak 100% 🙏\n\n  Bukti kakak TIDAK akan kami post\n  kemana-mana. Cukup kami simpan\n  sebagai bukti internal saja.\n\n  Terima kasih sudah percaya ZUAN STORE ya kak 💎`), {parse_mode:'MarkdownV2'});
    return ctx.reply('✅ Siap kak, bukti TIDAK di-post, privasi kakak aman.');
  }
});

bot.on('text', async (ctx) => {
  const id = ctx.from.id;
  const textRaw = ctx.message.text.trim();
  const lower = textRaw.toLowerCase();
  if(!users.has(id)) users.set(id, {step:'menu'});
  const u = users.get(id);

  if(lower==='/start' || lower==='/menu' || lower==='menu'){ u.step='menu'; return sendMenu(ctx); }
  if(lower==='admin'){ u.step='chat_admin'; await bot.telegram.sendMessage(ADMIN_ID, `🔔 Ada cust minta admin! ID: ${id}`); return ctx.reply('✅ Admin sudah dihubungi ya kak 🙏'); }
  if(u.step==='chat_admin'){ await bot.telegram.sendMessage(ADMIN_ID, `💬 Chat dari ${id}:\n${textRaw}`); return ctx.reply('📨 Pesan diteruskan ke admin ya kak...'); }

  if(u.step==='input_domain'){
    const clean = textRaw.toLowerCase().replace(/[^a-z0-9-]/g,'');
    u.nama = clean + u.ekstensi.nama; u.harga = u.ekstensi.harga; u.detail = 'Domain ' + u.nama;
    u.step = 'konfirmasi_simple';
    return ctx.reply(mono(`╔═════════════════════════════════╗\n     ✅ DOMAIN TERSEDIA ✅\n╚═════════════════════════════════╝\n\n  ╭─► 🌐 Domain : ${u.nama}\n  ╰─► 💰 Harga : ${rupiah(u.harga)}/tahun\n\nKlik YA buat lanjut 👇`), {parse_mode:'MarkdownV2', ...kbYaBatal});
  }
  if(u.step==='username'){
    if(!/^[a-z0-9]+$/.test(lower)) return ctx.reply('⚠️ Username harus huruf kecil tanpa spasi ya kak, coba lagi:');
    u.username = lower; u.username_tg = ctx.from.username || '-'; u.step = 'bayar';
    const orderTxt = `╔═════════════════════════════════╗\n     🔔 ORDER BARU! 🔔\n╚═════════════════════════════════╝\n\n  ╭─► 📦 Paket : ${u.nama}\n  ├─► 💰 Total : ${rupiah(u.harga)}\n  ├─► 👤 Username VPS : ${u.username}\n  ├─► 👤 Cust : @${u.username_tg} (ID: ${id})\n  ├─► 📍 Lokasi : ${u.lokasi || '-'}\n  ╰─► 🐧 OS : ${u.os || '-'}\n\n  Menunggu pembayaran...`;
    await bot.telegram.sendMessage(ADMIN_ID, orderTxt);
    await kirimKeGrup(orderTxt);
    return ctx.reply(mono(bayarTxt(u)), {parse_mode:'MarkdownV2', ...kbBayar});
  }
  if(u.step==='bayar' && lower==='qris'){
    try{ await ctx.replyWithPhoto({source:'./qris.jpg'}, {caption: qrisTxt(u)}); }
    catch(e){ await ctx.reply(mono(qrisTxt(u)), {parse_mode:'MarkdownV2'}); }
    return;
  }
  if(u.step==='menu') return sendMenu(ctx);
});

bot.on('photo', async (ctx) => {
  const id = ctx.from.id; const u = users.get(id);
  if(!u) return;
  if(u.step==='bayar'){
    u.step='menunggu_validasi';
    const photos = ctx.message.photo;
    const fileId = photos[photos.length-1].file_id;
    u.bukti_file_id = fileId;
    u.username_tg = ctx.from.username || '-';
    await ctx.reply(mono(`╔═════════════════════════════════╗\n     ✅ BUKTI DITERIMA ✅\n╚═════════════════════════════════╝\n\n  Bukti diterima kak!\n  Admin lagi cek ya, order kamu\n  akan aktif 5-10 menit setelah\n  divalidasi ⚡\n\n  Terima kasih sudah order di\n  ZUAN STORE 🙏💎`), {parse_mode:'MarkdownV2'});
    const kbValid = Markup.inlineKeyboard([
      [Markup.button.callback('✅ VALID - PEMBAYARAN BERHASIL', 'valid_' + id)],
      [Markup.button.callback('❌ TOLAK - BUKTI TIDAK VALID', 'tolak_' + id)]
    ]);
    const cap = `╔═════════════════════════════════╗\n     📸 BUKTI TF MASUK 📸\n╚═════════════════════════════════╝\n\n  ╭─► 👤 Cust : @${u.username_tg} (ID: ${id})\n  ├─► 📦 ${u.nama}\n  ├─► 💰 ${rupiah(u.harga)}\n  ╰─► 👤 Username VPS : ${u.username || '-'}\n\n  Pencet VALID kalo udah bener,\n  TOLAK kalo belum valid.`;
    await bot.telegram.sendPhoto(ADMIN_ID, fileId, {caption: cap, ...kbValid});
    return;
  }
});

bot.launch().then(()=> console.log('Bot ZUAN STORE jalan!'));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
