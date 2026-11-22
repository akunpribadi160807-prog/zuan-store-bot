// ============================================
// ZUAN STORE - URUTAN ASLI - UDAH DIBENERIN
// FLOW: MENU -> VPS -> LOKASI -> OS -> VERSI -> RINGKASAN -> USERNAME -> BAYAR -> QRIS -> BUKTI -> VALID/TOLAK -> IZIN
// ============================================
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN || 'ISI_TOKEN_LU_DISINI');
const ADMIN_ID = 8493708698;
const GROUP_UTAMA = -1004497488934;
const GROUP_PROMO = -1003900745031;
const GROUP_TESTI = -1004432426937;
const GROUP_PAYMENT = -1004257626762;

const users = new Map();
function rupiah(n){ return 'Rp ' + n.toLocaleString('id-ID'); }

// ===== DATA - URUTAN ASLI =====
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
  ubuntu: ['Ubuntu 24.04 LTS', 'Ubuntu 22.04 LTS', 'Ubuntu 20.04 LTS'],
  debian: ['Debian 12', 'Debian 11', 'Debian 10'],
  alma: ['AlmaLinux 9', 'AlmaLinux 8'],
  rocky: ['Rocky Linux 9', 'Rocky Linux 8'],
};
const OS_VERSIONS_RAW = {
  ubuntu: ['Ubuntu 24.04 LTS', 'Ubuntu 22.04 LTS', 'Ubuntu 20.04 LTS'],
  debian: ['Debian 12', 'Debian 11', 'Debian 10'],
  alma: ['AlmaLinux 9', 'AlmaLinux 8'],
  rocky: ['Rocky Linux 9', 'Rocky Linux 8'],
};

// ===== TEKS - SANGAR TAPI URUTAN ASLI =====
const MENU = `╔═══════════════════╗
   ★  ZUAN STORE  ★
╚═══════════════════╝

╭───────────────────╮
  WELCOME, BOSKU!
╰───────────────────╯

Selamat datang di tempatnya
para SULTAN, Bosku! 🔥

Gua seneng banget lu udah mampir
ke ZUAN STORE. Di sini lu bukan
cuma beli VPS, tapi lu lagi
naik level.

VPS murah, spek gahar,
aktif super cepat, garansi full.
Nggak ada drama, nggak ada PHP.

Mau bangun apa kita hari ini?
Server impian lu udah nunggu
di bawah ini.

┏━━━━━━━━━━━━━━━━━━━┓
  PILIH MENU DI BAWAH 👇
┗━━━━━━━━━━━━━━━━━━━┛`;

const VPS_LIST = `╔═══════════════════╗
  ◆  DAFTAR VPS  ◆
╚═══════════════════╝

Pilih amunisi lu, Bos.
Semua paket udah FULL POWER,
tinggal gas sesuai kebutuhan.

╭───────────────────╮
  MURAH • CEPAT • STABIL
╰───────────────────╯`;

const LOKASI_TXT = `╔═══════════════════╗
  PILIH LOKASI SERVER
╚═══════════════════╝

Pilih lokasi terdekat,
biar ping lu makin ngebut,
game / bot / panel makin ngacir.

  ╭─► Ping Kecil
  ╰─► Speed Ngacir
  ╭─► Stabil Full

━━━━━━━━━━━━━━━━━━━━━`;

const OS_TXT = `╔═══════════════════╗
  ✦  PILIH OS  ✦
╚═══════════════════╝

╭───────────────────╮
  OS FAVORIT SULTAN
╰───────────────────╯

Silakan pilih OS nya, Bos.
Semua udah versi paling stabil,
tinggal pake, nggak usah setting
ribet lagi.

━━━━━━━━━━━━━━━━━━━━━`;

function osVersionTxt(fam){
  const judul = fam === 'ubuntu' ? 'UBUNTU' : fam === 'debian' ? 'DEBIAN' : fam === 'alma' ? 'ALMALINUX' : 'ROCKYLINUX';
  return `╔═══════════════════╗\n  ✦  ${judul}  ✦\n╚═══════════════════╝\n\n╭───────────────────╮\n  PILIH VERSI ${judul}\n╰───────────────────╯\n\nSilakan pilih versi nya, Bos.\nSemua udah versi paling stabil.\n\n━━━━━━━━━━━━━━━━━━━━━`;
}
function ringkasanTxt(u){
 return `╔═══════════════════╗\n  ${u.nama} - GASPOL\n╚═══════════════════╝\n\n╭───────────────────╮\n  💰 ${rupiah(u.harga)} / BULAN\n╰───────────────────╯\n\n┏━━━━━━━━━━━━━━━━━━━┓\n  SPESIFIKASI GAHAR\n┗━━━━━━━━━━━━━━━━━━━┛\n\n╭─► CPU      : ${u.cpu}\n╰─► RAM      : ${u.ram}\n╭─► STORAGE  : ${u.storage}\n╰─► LOKASI   : ${u.lokasi}\n╭─► OS       : ${u.os}\n╰─► DURASI   : 30 Hari Full\n\n━━━━━━━━━━━━━━━━━━━━━\n\nUdah bener? Klik YA buat lanjut 👇`;
}
const USERNAME_TXT = `╔═══════════════════╗\n  ATUR USERNAME VPS\n╚═══════════════════╝\n\n╭───────────────────╮\n  👤 USERNAME KAMU\n╰───────────────────╯\n\nTentuin username buat login VPS kamu 😎\nContoh: zuan, budi, storeku\n\n╭─► Huruf kecil aja\n╰─► Tanpa spasi\n\n⌨️ Ketik username kamu sekarang:`;
function bayarTxt(u){
 return `╔═══════════════════╗\n  ★ ORDER DIKUNCI ★\n╚═══════════════════╝\n\nTerima kasih, Bosku!\nOrder lu udah gua kunci,\nggak bakal diambil orang lain.\n\n┏━━━━━━━━━━━━━━━━━━━┓\n  SPEK VPS KAMU\n┗━━━━━━━━━━━━━━━━━━━┛\n\n╭─► PAKET    : ${u.nama}\n─────────────────────\n╰─► CPU      : ${u.cpu || '-'}\n─────────────────────\n╭─► RAM      : ${u.ram || '-'}\n─────────────────────\n╰─► STORAGE  : ${u.storage || '-'}\n─────────────────────\n╭─► LOKASI   : ${u.lokasi || '-'}\n─────────────────────\n╰─► OS       : ${u.os || '-'}\n─────────────────────\n╭─► USERNAME : ${u.username}\n─────────────────────\n╰─► PASSWORD : Dikirim Setelah Bayar\n─────────────────────\n╭─► DURASI   : 30 Hari Full\n\n┏━━━━━━━━━━━━━━━━━━━┓\n  TOTAL : ${rupiah(u.harga)}\n┗━━━━━━━━━━━━━━━━━━━┛\n\n╭───────────────────╮\n  METODE : TRANSFER\n╰───────────────────╯\n\n╭─► SEABANK\n╰─► No. Rek : 9012-4214-5662\n    A.N : MUHAMAD IKHSANDI AKBAR\n─────────────────────\n╭─► GOPAY\n╰─► No. HP : 0858-7225-7850\n    A.N : MUHAMAD IKHSANDI AKBAR\n\n━━━━━━━━━━━━━━━━━━━━━\n\nKlik tombol QRIS di bawah 👇`;
}
function qrisTxt(u){
 return `╔═══════════════════╗\n  PEMBAYARAN VIA QRIS\n╚═══════════════════╝\n\nHalo kak, terima kasih banyak\nudah percaya sama ZUAN STORE. 🙏\n\nQRIS nya udah kami kirim di atas.\nSilakan scan untuk menyelesaikan\npembayaran lu:\n\n╭───────────────────╮\n  💰 ${rupiah(u.harga)}\n  A.N : MUHAMAD IKHSANDI AKBAR\n╰───────────────────╯\n\n─────────────────────\n╭─► Bisa di scan lewat:\n╰─► DANA • OVO • Gopay • ShopeePay\n    atau M-Banking apa aja.\n─────────────────────\n\nSetelah berhasil, kirim bukti\ntransfernya ke sini ya kak.\nVPS lu langsung kami proses,\naktif dalam 5-10 menit aja.\n\nSekali lagi, terima kasih udah\nmilih ZUAN STORE. Kepercayaan\nkakak adalah kehormatan buat kami.\n\n┏━━━━━━━━━━━━━━━━━━━┓\n  ZUAN STORE\n  CEPAT • STABIL • TANPA RIBET\n┗━━━━━━━━━━━━━━━━━━━┛`;
}
const PANEL_TXT = `╔═══════════════════╗\n  ◆  DAFTAR PANEL  ◆\n╚═══════════════════╝\n\nPilih amunisi lu, Bos.\nPanel Pterodactyl, server game & bot,\ntinggal gas sesuai kebutuhan.\n\n╭───────────────────╮\n  MURAH • CEPAT • STABIL\n╰───────────────────╯`;
const DOMAIN_TXT = `╔═══════════════════╗\n  ◆  DOMAIN MURAH  ◆\n╚═══════════════════╝\n\nNama keren buat web lu, Bos.\nPilih ekstensi nya di bawah.\n\n╭───────────────────╮\n  MURAH • CEPAT • STABIL\n╰───────────────────╯`;
const JASA_TXT = `╔═══════════════════╗\n  ◆  JASA INSTALL  ◆\n╚═══════════════════╝\n\nDibantu sampe beres, Bos.\nPilih jasa kamu di bawah.\n\n╭───────────────────╮\n  MURAH • CEPAT • STABIL\n╰───────────────────╯`;
const ADMIN_TXT = `╔═══════════════════╗\n  HUBUNGI ADMIN\n╚═══════════════════╝\n\nButuh bantuan? Santai, admin kita\nfast respon kok! 😎👇\n\n╭─► ADMIN : Zuan\n╰─► ONLINE : 24 Jam\n╭─► RESPON : 1 - 5 Menit\n╰─► TELE : Klik tombol di bawah\n\nKlik tombol ADMIN 👇`;
const TESTI_TXT = `╔═══════════════════╗\n  ★  TESTIMONI  ★\n╚═══════════════════╝\n\n╭───────────────────╮\n  RATING SULTAN ⭐⭐⭐⭐⭐\n╰───────────────────╯\n\n╭─► "VPS nya ngebut parah, admin fast respon!"\n╰─► "Order 5 menit langsung aktif, gila!"\n╭─► "Udah langganan 3 bulan, aman terus"\n\n━━━━━━━━━━━━━━━━━━━━━\n\nMau jadi testimoni berikutnya? Gas order 👇`;
function validTxt(u){
 return `╔═══════════════════╗\n  ✅ PEMBAYARAN BERHASIL ✅\n╚═══════════════════╝\n\nTerima kasih banyak kak 🙏💎\n\nPembayaran kakak untuk:\n╭─► 📦 ${u.nama}\n╰─► 💰 ${rupiah(u.harga)}\n\nSudah kami VALIDASI dan dinyatakan\nBERHASIL ✅\n\n╭─► 👤 USERNAME : ${u.username}\n╰─► ⚡ STATUS : VPS sedang diproses\n    Aktif 5-10 menit lagi\n\nSekali lagi, terima kasih atas\nkepercayaan kakak sudah memilih\nZUAN STORE`;
}
function tolakTxt(u){
 return `╔═══════════════════╗\n  🙏 MOHON MAAF YA KAK 🙏\n╚═══════════════════╝\n\nMohon maaf sebesar-besarnya ya kak 🙏\n\nSetelah kami cek dengan teliti,\nbukti transfer yang kakak kirim untuk:\n╭─► 📦 ${u.nama}\n╰─► 💰 ${rupiah(u.harga)}\n\nBelum bisa kami validasi.\n\n╭─► 📸 Boleh tolong kirim ulang\n│     bukti yang lebih jelas?\n│     Foto full, jangan terpotong ya kak 🥺\n╰─► 💬 Atau chat admin, kami bantu\n    cek bareng-bareng 🙏\n\nTerima kasih atas pengertiannya kak 💎`;
}

// ===== KEYBOARDS - URUTAN ASLI DIBALIKIN =====
// MENU UTAMA ASLI: VPS - PANEL / DOMAIN - JASA / ADMIN - TESTIMONI
const kbMenu = Markup.inlineKeyboard([
  [Markup.button.callback('VPS', 'menu_1'), Markup.button.callback('PANEL', 'menu_2')],
  [Markup.button.callback('DOMAIN', 'menu_3'), Markup.button.callback('JASA', 'menu_4')],
  [Markup.button.callback('ADMIN', 'menu_5'), Markup.button.callback('TESTIMONI', 'menu_testi')],
]);
// VPS: 2-2, URUT 1-6
const kbVps = Markup.inlineKeyboard([
  [Markup.button.callback('VPS 1GB', 'vps_1'), Markup.button.callback('VPS 2GB', 'vps_2')],
  [Markup.button.callback('VPS 4GB', 'vps_3'), Markup.button.callback('VPS 8GB', 'vps_4')],
  [Markup.button.callback('VPS 12GB', 'vps_5'), Markup.button.callback('VPS 16GB', 'vps_6')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
// LOKASI: URUT ASLI 1-2-3
const kbLokasi = Markup.inlineKeyboard([
  [Markup.button.callback('JERMAN', 'lok_1')],
  [Markup.button.callback('INDONESIA', 'lok_2')],
  [Markup.button.callback('SINGAPURA', 'lok_3')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
// OS: URUT ASLI UBUNTU - DEBIAN / ALMA - ROCKY
const kbOsFamily = Markup.inlineKeyboard([
  [Markup.button.callback('UBUNTU', 'osfam_ubuntu'), Markup.button.callback('DEBIAN', 'osfam_debian')],
  [Markup.button.callback('ALMALINUX', 'osfam_alma'), Markup.button.callback('ROCKYLINUX', 'osfam_rocky')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
function kbOsVersion(fam){
  const btns = OS_VERSIONS_LABEL[fam].map((label, i) => [Markup.button.callback(label, `osver_${fam}_${i}`)]);
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
  [Markup.button.callback('PANEL 1GB', 'panel_1'), Markup.button.callback('PANEL 2GB', 'panel_2')],
  [Markup.button.callback('PANEL 4GB', 'panel_3'), Markup.button.callback('PANEL UNLIMITED', 'panel_4')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
const kbDomain = Markup.inlineKeyboard([
  [Markup.button.callback('.my.id', 'dom_1'), Markup.button.callback('.xyz', 'dom_2')],
  [Markup.button.callback('.online', 'dom_3'), Markup.button.callback('.store', 'dom_4')],
  [Markup.button.callback('.com', 'dom_5'), Markup.button.callback('.id', 'dom_6')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
const kbJasa = Markup.inlineKeyboard([
  [Markup.button.callback('INSTALL BOT WA', 'jasa_1'), Markup.button.callback('INSTALL PANEL', 'jasa_2')],
  [Markup.button.callback('INSTALL WEB', 'jasa_3'), Markup.button.callback('SETTING VPS', 'jasa_4')],
  [Markup.button.callback('↩️ Kembali', 'back_menu')],
]);
const kbAdmin = Markup.inlineKeyboard([
  [Markup.button.callback('💬 CHAT ADMIN SEKARANG', 'admin_chat')],
  [Markup.button.callback('↩️ MENU UTAMA', 'back_menu')],
]);

const sendMenu = (ctx) => ctx.reply(MENU, kbMenu);
const editTo = async (ctx, text, kb) => {
  try{ await ctx.editMessageText(text, kb); }
  catch(e){ await ctx.reply(text, kb); }
};
async function kirimKeGrup(text){
  for(const gid of [GROUP_UTAMA, GROUP_PROMO, GROUP_TESTI, GROUP_PAYMENT]){
    try{ await bot.telegram.sendMessage(gid, text); } catch(e){ console.log('Gagal kirim grup', gid, e.message); }
  }
}

bot.start((ctx) => { users.set(ctx.from.id, {step:'menu'}); return sendMenu(ctx); });
bot.command('menu', (ctx) => { users.set(ctx.from.id, {step:'menu'}); return sendMenu(ctx); });

// ===== FLOW URUT - 1. MENU -> 2. VPS -> 3. LOKASI -> 4. OS -> 5. VERSI -> 6. RINGKASAN -> 7. USERNAME -> 8. BAYAR -> 9. QRIS -> 10. BUKTI -> 11. VALID/TOLAK -> 12. IZIN =====
bot.on('callback_query', async (ctx) => {
  const id = ctx.from.id;
  const data = ctx.callbackQuery.data;
  await ctx.answerCbQuery().catch(()=>{});
  if(!users.has(id)) users.set(id, {step:'menu'});
  const u = users.get(id);

  // 1. MENU
  if(data==='back_menu'){ u.step='menu'; return editTo(ctx, MENU, kbMenu); }
  if(data==='menu_1'){ u.step='pilih_vps'; return editTo(ctx, VPS_LIST, kbVps); }
  if(data==='menu_2'){ u.step='pilih_panel'; return editTo(ctx, PANEL_TXT, kbPanel); }
  if(data==='menu_3'){ u.step='pilih_domain'; return editTo(ctx, DOMAIN_TXT, kbDomain); }
  if(data==='menu_4'){ u.step='pilih_jasa'; return editTo(ctx, JASA_TXT, kbJasa); }
  if(data==='menu_5'){ u.step='admin_info'; return editTo(ctx, ADMIN_TXT, kbAdmin); }
  if(data==='menu_testi'){ return editTo(ctx, TESTI_TXT, kbMenu); }

  // 2. VPS -> 3. LOKASI
  if(data.startsWith('vps_')){ const k=data.split('_')[1]; Object.assign(u, VPS[k]); u.step='pilih_lokasi'; return editTo(ctx, LOKASI_TXT, kbLokasi); }
  // 3. LOKASI -> 4. OS
  if(data.startsWith('lok_')){ const k=data.split('_')[1]; u.lokasi=LOKASI[k]; u.step='pilih_os_family'; return editTo(ctx, OS_TXT, kbOsFamily); }
  if(data==='back_os'){ u.step='pilih_os_family'; return editTo(ctx, OS_TXT, kbOsFamily); }
  // 4. OS -> 5. VERSI
  if(data.startsWith('osfam_')){ const fam=data.split('_')[1]; u.os_fam=fam; u.step='pilih_os_version'; return editTo(ctx, osVersionTxt(fam), kbOsVersion(fam)); }
  // 5. VERSI -> 6. RINGKASAN
  if(data.startsWith('osver_')){ const parts=data.split('_'); const fam=parts[1]; const idx=parseInt(parts[2]); u.os=OS_VERSIONS_RAW[fam][idx]; u.step='konfirmasi_vps'; return editTo(ctx, ringkasanTxt(u), kbYaBatal); }

  // 6. RINGKASAN -> 7. USERNAME
  if(data==='ya'){
    if(u.step==='konfirmasi_vps' || u.step==='konfirmasi_simple'){ u.step='username'; return ctx.reply(USERNAME_TXT); }
  }
  if(data==='batal'){ u.step='menu'; return editTo(ctx, MENU, kbMenu); }

  if(data.startsWith('panel_')){ const k=data.split('_')[1]; Object.assign(u, PANEL[k]); u.detail=PANEL[k].spek; u.step='konfirmasi_simple'; return editTo(ctx, `╔═══════════════════╗\n  ${u.nama} - GASPOL\n╚═══════════════════╝\n\n╭─► 📦 ${u.nama}\n╰─► 💰 ${rupiah(u.harga)}\n╭─► 📋 ${u.detail}\n\nKlik YA buat lanjut 👇`, kbYaBatal); }
  if(data.startsWith('dom_')){ const k=data.split('_')[1]; u.ekstensi=DOMAIN[k]; u.step='input_domain'; return ctx.reply(`╔═══════════════════╗\n  DOMAIN MURAH\n╚═══════════════════╝\n\nKamu pilih ${DOMAIN[k].nama} - ${rupiah(DOMAIN[k].harga)}/tahun\n\nKetik nama domain nya aja, contoh:\nzuanstore`); }
  if(data.startsWith('jasa_')){ const k=data.split('_')[1]; Object.assign(u, JASA[k]); u.detail=JASA[k].desc; u.step='konfirmasi_simple'; return editTo(ctx, `╔═══════════════════╗\n  ${u.nama}\n╚═══════════════════╝\n\n╭─► 🛠️ ${u.nama}\n╰─► 💰 ${rupiah(u.harga)}\n╭─► 📋 ${u.detail}\n\nKlik YA buat lanjut 👇`, kbYaBatal); }

  if(data==='admin_chat'){ u.step='chat_admin'; await bot.telegram.sendMessage(ADMIN_ID, `🔔 Ada cust minta admin! ID: ${id} (@${ctx.from.username||'-'})`); return ctx.reply('✅ Oke kak, admin sudah dihubungi! Tunggu sebentar ya, admin akan chat kakak langsung 🙏\nKetik /start buat balik.'); }
  // 9. QRIS
  if(data==='qris'){
    try{ await ctx.replyWithPhoto({source:'./qris.jpg'}, {caption: qrisTxt(u)}); }
    catch(e){ await ctx.reply(qrisTxt(u) + '\n\n⚠️ Foto QRIS belum ada, taro file qris.jpg di folder bot ya'); }
    return;
  }

  // 11. VALID / TOLAK
  if(data.startsWith('valid_')){
    const custId = data.split('_')[1];
    const cust = users.get(Number(custId));
    if(!cust) return ctx.reply('Order tidak ketemu, mungkin bot restart.');
    cust.step = 'tanya_izin_post';
    await bot.telegram.sendMessage(custId, validTxt(cust));
    await ctx.reply('✅ Udah VALID, cust udah dikirimin notif + ditanyain izin post.');
    await bot.telegram.sendMessage(custId, 'Boleh izin post testimoni nya di grup kak? 🙏', Markup.inlineKeyboard([
      [Markup.button.callback('✅ BOLEH', 'izin_ya'), Markup.button.callback('❌ JANGAN', 'izin_tidak')]
    ]));
    return;
  }
  if(data.startsWith('tolak_')){
    const custId = data.split('_')[1];
    const cust = users.get(Number(custId));
    if(!cust) return ctx.reply('Order tidak ketemu.');
    await bot.telegram.sendMessage(custId, tolakTxt(cust));
    await ctx.reply('❌ Udah DITOLAK, cust udah dikirimin alasan.');
    return;
  }
  // 12. IZIN
  if(data==='izin_ya'){
    await ctx.reply('Makasih banyak kak! 🙏 Testimoni kakak bakal kami post di grup biar makin rame!');
    await bot.telegram.sendMessage(ADMIN_ID, `✅ Cust ${id} (@${ctx.from.username||'-'}) IZIN POST testimoni.`);
    return;
  }
  if(data==='izin_tidak'){
    await ctx.reply('Siap kak, aman! 🙏 Testimoni kakak NGGAK bakal kami post. Privasi kakak aman.');
    await bot.telegram.sendMessage(ADMIN_ID, `❌ Cust ${id} (@${ctx.from.username||'-'}) TIDAK IZIN POST.`);
    return;
  }
});

bot.on('text', async (ctx) => {
  const id = ctx.from.id;
  if(!users.has(id)) users.set(id, {step:'menu'});
  const u = users.get(id);
  const text = ctx.message.text;
  if(text.startsWith('/')) return;

  // 7. USERNAME -> 8. BAYAR
  if(u.step === 'username'){
    u.username = text.toLowerCase().replace(/\s+/g,'');
    u.step = 'bayar';
    await ctx.reply(bayarTxt(u), kbBayar);
    const orderMsg = `╔═══════════════════╗\n  ⚡ ORDER BARU MASUK ⚡\n╚═══════════════════╝\n\n┏━━━━━━━━━━━━━━━━━━━┓\n╭─► 📦 PAKET : ${u.nama}\n╰─► 💰 TOTAL : ${rupiah(u.harga)}\n╭─► 👤 USER VPS : ${u.username}\n╰─► 👤 CUSTOMER : @${ctx.from.username||'-'}\n╭─► 📍 LOKASI : ${u.lokasi}\n╰─► 💻 OS : ${u.os}\n┗━━━━━━━━━━━━━━━━━━━┛\n\n┏━━━━━━━━━━━━━━━━━━━┓\n  STATUS : MENUNGGU BAYAR\n┗━━━━━━━━━━━━━━━━━━━┛`;
    await kirimKeGrup(orderMsg);
    return;
  }
  if(u.step === 'input_domain'){
    u.nama = text + u.ekstensi.nama; u.harga = u.ekstensi.harga; u.cpu='-'; u.ram='-'; u.storage='-'; u.lokasi='-'; u.os='-';
    u.step='konfirmasi_simple';
    return ctx.reply(`╔═══════════════════╗\n  ${u.nama}\n╚═══════════════════╝\n\n╭─► 🌐 ${u.nama}\n╰─► 💰 ${rupiah(u.harga)}/tahun\n\nKlik YA buat lanjut 👇`, kbYaBatal);
  }
});

// 10. BUKTI -> OWNER DOANG
bot.on('photo', async (ctx) => {
  const id = ctx.from.id;
  const u = users.get(id) || {};
  const photoId = ctx.message.photo[ctx.message.photo.length-1].file_id;
  await bot.telegram.sendPhoto(ADMIN_ID, photoId, {
    caption: `📸 BUKTI BARU\n╭─► 📦 ${u.nama||'-'}\n╰─► 💰 ${u.harga?rupiah(u.harga):'-'}\n╭─► 👤 @${ctx.from.username||'-'} | ID: ${id}\n╰─► 👤 USER VPS: ${u.username||'-'}`,
    ...Markup.inlineKeyboard([
      [Markup.button.callback('✅ VALID', `valid_${id}`), Markup.button.callback('❌ TOLAK', `tolak_${id}`)]
    ])
  });
  await ctx.reply('✅ Bukti udah dikirim ke admin, tunggu divalidasi ya kak 🙏');
});

bot.launch().then(()=>console.log('ZUAN STORE BOT JALAN...')).catch(e=>console.log('GAGAL JALAN:', e.message));
process.once('SIGINT', ()=>bot.stop('SIGINT'));
process.once('SIGTERM', ()=>bot.stop('SIGTERM'));
