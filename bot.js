// ZUAN STORE - FINAL FIX - 100% JALAN
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN || '9072638201:AAEu98JzB7s_vWylp08237Bi7ACxeB1YaCc');
const ADMIN_ID = 8493708698;
const GROUP_UTAMA = -1004497488934;
const GROUP_PROMO = -1003900745031;
const GROUP_TESTI = -1004432426937;
const GROUP_PAYMENT = -1004257626762;

const users = new Map();
function rupiah(n){ return 'Rp ' + n.toLocaleString('id-ID'); }
// FIX: mono jangan pake MarkdownV2 lagi, kirim polos aja biar garis lu aman
const mono = (t) => t;

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
  alma: ['AlmaLinux', 'AlmaLinux 8'],
  rocky: ['Rocky Linux 9', 'Rocky Linux 8'],
};
const OS_VERSIONS_RAW = {
  ubuntu: ['Ubuntu 24.04 LTS', 'Ubuntu 22.04 LTS', 'Ubuntu 20.04 LTS'],
  debian: ['Debian 12', 'Debian 11', 'Debian 10'],
  alma: ['AlmaLinux 9', 'AlmaLinux 8'],
  rocky: ['Rocky Linux 9', 'Rocky Linux 8'],
};

const MENU = `ㅤㅤㅤ✦ ━━━━━━━━━━━━━━━━━━━ ✦
    ㅤㅤㅤㅤ⚡ 「 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 」 ⚡
  ㅤㅤㅤㅤ𝐂𝐄𝐏𝐀𝐓. 𝐒𝐓𝐀𝐁𝐈𝐋. 𝐓𝐀𝐍𝐏𝐀 𝐑𝐈𝐁𝐄𝐓.
ㅤㅤㅤ✦ ━━━━━━━━━━━━━━━━━━━ ✦

ㅤㅤㅤㅤㅤㅤ ㅤ𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎
 ㅤㅤㅤㅤㅤ✦「 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 」✦ 

ㅤㅤㅤㅤㅤ「 𝚃𝚎𝚛𝚒𝚖𝚊 𝚔𝚊𝚜𝚒𝚑 𝚋𝚊𝚗𝚢𝚊𝚔 」 
│𝚞𝚍𝚊𝚑 𝚖𝚊𝚖𝚙𝚒𝚛 𝚍𝚊𝚗 𝚙𝚎𝚛𝚌𝚊𝚢𝚊 𝚜𝚊𝚖𝚊 𝚔𝚊𝚖𝚒  
│𝙳𝚒 𝚜𝚒𝚗𝚒 𝚔𝚊𝚔𝚊𝚔 𝚗𝚐𝚐𝚊𝚔 𝚌𝚞𝚖𝚊 𝚋𝚎𝚕𝚒 𝚙𝚛𝚘𝚍𝚞𝚔, 
│𝚝𝚊𝚙𝚒 𝚔𝚊𝚔𝚊𝚔 𝚓𝚞𝚐𝚊 𝚍𝚊𝚙𝚎𝚝  ㅤ
│𝙺𝙴𝙽𝚈𝙰𝙼𝙰𝙽𝙰𝙽 𝚍𝚊𝚗 𝙺𝙴𝙰𝙼𝙰𝙽𝙰𝙽.

✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦
ㅤㅤㅤ𝐊𝐄𝐔𝐍𝐆𝐆𝐔𝐋𝐀𝐍 𝐁𝐄𝐋𝐈 𝐃𝐈 𝐊𝐀𝐌𝐈

1.ㅤㅤㅤㅤㅤ⚡ 𝐒𝐏𝐄𝐄𝐃 𝐍𝐆𝐄𝐁𝐔𝐓
ꜱᴇʀᴠᴇʀ ᴋᴀᴍɪ ᴍᴇᴍᴀᴋᴀɪ ɴᴠᴍᴇ ɢᴇɴ4 + 1ɢʙᴘꜱ.
ᴅɪᴊᴀᴍɪɴ ɴɢᴇʙᴜᴛ, ᴀɴᴛɪ ʟᴇᴍᴏᴛ, 
ᴀɴᴛɪ ɴɢᴇʟᴀɢ ʙᴜᴀᴛ ʙᴏᴛ, ᴡᴇʙ, ᴀᴛᴀᴜ ɢᴀᴍᴇ

2.ㅤㅤ🛡️ 𝐀𝐍𝐓𝐈 𝐃𝐎𝐖𝐍 - 𝐔𝐏𝐓𝐈𝐌𝐄 𝟗𝟗.𝟗%
ꜱᴇʀᴠᴇʀ ᴋᴀᴍɪ ᴅɪᴘᴀɴᴛᴀᴜ 24 ᴊᴀᴍ ɴᴏɴꜱᴛᴏᴘ.
ᴋᴀᴋᴀᴋ ʙɪꜱᴀ ᴛɪᴅᴜʀ ᴛᴇɴᴀɴɢ, 
ꜱᴇʀᴠᴇʀ ᴛᴇᴛᴀᴘ ᴊᴀʟᴀɴ ꜱᴛᴀʙɪʟ.

3.ㅤㅤㅤㅤㅤ🕹️ 𝐅𝐔𝐋𝐋 𝐊𝐎𝐍𝐓𝐑𝐎𝐋
ᴋᴀᴋᴀᴋ ʙᴇʙᴀꜱ ɪɴꜱᴛᴀʟʟ ᴀᴘᴀ ᴀᴊᴀ, 
ʙᴇʙᴀꜱ ᴀᴛᴜʀ ꜱᴇꜱᴜᴋᴀ ʜᴀᴛɪ.
ɪɴɪ ꜱᴇʀᴠᴇʀ ᴀɴᴅᴀ ʏᴀɴɢ ᴘᴜɴʏᴀ ᴋᴇɴᴅᴀʟɪ ᴘᴇɴᴜʜ.

4.ㅤ👨‍💼 𝐀𝐃𝐌𝐈𝐍 𝐅𝐀𝐒𝐓 𝐑𝐄𝐒𝐏𝐎𝐍 𝟐𝟒 𝐉𝐀𝐌
ɴɢɢᴀᴋ ᴀᴅᴀ ᴄᴇʀɪᴛᴀ ᴋᴀᴋᴀᴋ ᴅɪᴛɪᴅᴜʀɪɴ ᴀᴅᴍɪɴ.
ᴄʜᴀᴛ ᴅɪʙᴀʟᴀꜱ 1-5 ᴍᴇɴɪᴛ, 
ᴅɪʙᴀɴᴛᴜ ꜱᴀᴍᴘᴀɪ ʙᴇʀᴇꜱ.

5.ㅤㅤㅤㅤ💎 𝐅𝐔𝐋𝐋 𝐆𝐀𝐑𝐀𝐍𝐒𝐈
ᴋᴀʟᴀᴜ ꜱᴇʀᴠᴇʀ ᴅᴏᴡɴ ᴛᴀɴᴘᴀ ꜱᴇʙᴀʙ, ᴋᴀᴍɪ ɢᴀɴᴛɪ!
ᴋᴀᴋᴀᴋ ɴɢɢᴀᴋ ᴀᴋᴀɴ ʀᴜɢɪ ꜱᴇᴘᴇꜱᴇʀᴘᴜɴ.

ㅤㅤ✦ㅤ━━━━━━━━━━━━━━━━━━━━ㅤ✦

ㅤㅤㅤㅤ🔥 𝙿𝚁𝙾𝙼𝙾 𝙷𝙰𝚁𝙸 𝙸𝙽𝙸 🔥
ㅤㅤ𝙱𝚎𝚕𝚒 𝚅𝙿𝚂 𝟸 𝙶𝙱 𝚔𝚎 𝚊𝚝𝚊𝚜 :
➤ㅤ𝙶𝚁𝙰𝚃𝙸𝚂 𝚂𝚎𝚝𝚞𝚙 𝚅𝙿𝚂 𝚜𝚊𝚖𝚙𝚎 𝚂𝚎𝚕𝚎𝚜𝚊𝚒!
➤ㅤ𝙶𝚁𝙰𝚃𝙸𝚂 𝙿𝚊𝚗𝚎𝚕 𝙿𝚝𝚎𝚛𝚘𝚍𝚊𝚌𝚝𝚢𝚕!

ㅤㅤ✦ㅤ━━━━━━━━━━━━━━━━━━━━ㅤ✦

| Mau order yang mana nih ?
| Langsung klik aja di bawah, 
| jangan sampe kehabisan slotnya

ㅤ「ㅤ𝐒𝐚𝐥𝐚𝐦 𝐬𝐮𝐤𝐬𝐞𝐬 𝐝𝐚𝐫𝐢 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄ㅤ」
ㅤㅤㅤ╰━━━━━━━━━━━━━━━━━━━╯
ㅤㅤ✦ㅤ━━━━━━━━━━━━━━━━━━━━ㅤ✦
ㅤㅤㅤㅤ✨ 𝐆𝐀𝐒 𝐎𝐑𝐃𝐄𝐑 𝐒𝐄𝐊𝐀𝐑𝐀𝐍𝐆 ✨`;

const VPS_LIST = `ㅤㅤㅤ✦ ━━━━━━━━━━━━━━━━━━━ ✦
  ㅤㅤ⚡ 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 - 𝐕𝐏𝐒 𝐌𝐔𝐑𝐀𝐇 ⚡
  ㅤㅤ  𝙽𝚅𝙼𝚎 𝙶𝚎𝚗𝟺 | 𝙺𝚅𝙼 | 𝙵𝚞𝚕𝚕 𝚁𝚘𝚘𝚝
  ㅤㅤ  𝙰𝚔𝚝𝚒𝚏 𝟷-𝟸 𝙼𝚎𝚗𝚒𝚝. 𝚃𝚊𝚗𝚙𝚊 𝚁𝚒𝚋𝚎𝚝.
ㅤㅤㅤ✦ ━━━━━━━━━━━━━━━━━━━ ✦

  ╭─► 1 — VPS 1vGB ─➤ Rp 30.000/Bln
  │     ├─➤ CPUㅤㅤ─➤ㅤ1 vCPU
  │     ├─➤ RAMㅤㅤ─➤ㅤ1GB DDR4
  │     ╰─➤ STORAGE─➤20GB NVMe Gen4
  │
  ├─► 2 — VPS 2 GB ─➤ Rp 40.000/Bln
  │     ├─➤ CPUㅤㅤ─➤ㅤ1 vCPU
  │     ├─➤ RAMㅤㅤ─➤ㅤ2GB DDR4
  │     ╰─➤ STORAGE─➤30GB NVMe Gen4
  │
  ├─► 3 — VPS 4 GB ─➤ Rp 75.000/Bln
  │     ├─➤ CPUㅤㅤ─➤ㅤ2 vCPU
  │     ├─➤ RAMㅤㅤ─➤ㅤ4GB DDR4
  │     ╰─➤ STORAGE─➤60GB NVMe Gen4
  │
  ├─► 4 — VPS 8 GB ─➤ Rp 130.000/Bln
  │     ├─➤ CPUㅤㅤ─➤ㅤ4 vCPU
  │     ├─➤ RAMㅤㅤ─➤ㅤ8GB DDR4
  │     ╰─➤ STORAGE─➤100GB NVMe Gen4
  │
  ├─► 5 — VPS 12 GB ─➤ Rp 195.000/Bln
  │     ├─➤ CPUㅤㅤ─➤ㅤ6 vCPU
  │     ├─➤ RAMㅤㅤ─➤ㅤ12GB DDR4
  │     ╰─➤ STORAGE─➤160GB NVMe Gen4
  │
  ╰─► 6 — VPS 16 GB ─➤ Rp 275.000/Bln
        ├─➤ CPUㅤㅤ─➤ㅤ8 vCPU
        ├─➤ RAMㅤㅤ─➤ㅤ16GB DDR4
        ╰─➤ STORAGE─➤200GB NVMe Gen4

ㅤㅤㅤㅤ𝐊𝐥𝐢𝐤 𝐩𝐚𝐤𝐞𝐭 𝐧𝐲𝐚 𝐝𝐢 𝐛𝐚𝐰𝐚𝐡 👇`;

const LOKASI_TXT = `ㅤㅤ✦ ━━━━━━━━━━━━━━━━ ✦
  ㅤㅤ🌍 𝐋𝐎𝐊𝐀𝐒𝐈 𝐒𝐄𝐑𝐕𝐄𝐑 🌍
ㅤㅤ✦ ━━━━━━━━━━━━━━━━ ✦

      📍 Lokasi ngaruh ke PING !
         Makin deket, makin ngebut!

  ╭─► [1] 𝐈𝐍𝐃𝐎𝐍𝐄𝐒𝐈𝐀  — 140 ms
  │     ├─➤ REKOMENDASI | Paling Stabil
  │     ╰─➤ Cocok Buat Bot / Web
  │
  ├─► [2] 𝐉𝐄𝐑𝐌𝐀𝐍    — 114 ms
  │     ├─➤ REKOMENDASI | Paling Enak
  │     ╰─➤ PING SEDANG, Buat Game / Bot
  │
  ╰─► [3] 𝐒𝐈𝐍𝐆𝐀𝐏𝐔𝐑𝐀 — 30 ms
        ├─➤ STABIL | Buat Asia
        ╰─➤ Alternatif Paling Aman

ㅤㅤKlik lokasi nya 👇`;

const OS_TXT = `ㅤㅤ✦ ━━━━━━━━━━━━━━━━ ✦
  ㅤㅤㅤ🖥️ 𝐒𝐈𝐒𝐓𝐄𝐌 𝐎𝐏𝐄𝐑𝐀𝐒𝐈 🖥️
ㅤㅤ✦ ━━━━━━━━━━━━━━━━ ✦

  ▸ 𝐔𝐁𝐔𝐍𝐓𝐔
    Paling mudah. Cocok buat pemula.

  ▸ 𝐃𝐄𝐁𝐈𝐀𝐍
    Paling stabil. Favorit pro.

  ▸ 𝐀𝐋𝐌𝐀𝐋𝐈𝐍𝐔𝐗
    Rasa enterprise. Tetap ringan.

  ▸ 𝐑𝐎𝐂𝐊𝐘𝐋𝐈𝐍𝐔𝐗
    Kuat dan bisa diandalkan.

ㅤㅤKlik OS nya di bawah 👇`;

function osVersionTxt(fam){
  const judul = fam === 'ubuntu' ? 'UBUNTU' : fam === 'debian' ? 'DEBIAN' : fam === 'alma' ? 'ALMALINUX' : 'ROCKY LINUX';
  const desc = fam === 'ubuntu' ? 'Paling mudah. Cocok buat pemula.' : fam === 'debian' ? 'Paling stabil. Favorit para pro.' : fam === 'alma' ? 'Rasa enterprise. Tetap ringan.' : 'Kuat dan bisa diandalkan.';
    return `ㅤㅤ✦ ━━━━━━━━━━━━━━━ ✦
  ㅤㅤ⚙️ 𝐏𝐈𝐋𝐈𝐇 𝐕𝐄𝐑𝐒𝐈 ${judul} ⚙️
ㅤㅤ✦ ━━━━━━━━━━━━━━━ ✦

  ${desc}

ㅤㅤKlik versi nya di bawah 👇`;
}
function ringkasanTxt(u){
   return `ㅤ✦ ━━━━━━━━━━━━━━━━━━ ✦
  ㅤㅤ✨ 𝐑𝐈𝐍𝐆𝐊𝐀𝐒𝐀𝐍 𝐎𝐑𝐃𝐄𝐑 𝐊𝐀𝐌𝐔 ✨
ㅤ✦ ━━━━━━━━━━━━━━━━━━ ✦

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
    | 𝐃𝐄𝐓𝐀𝐈𝐋 𝐏𝐄𝐒𝐀𝐍𝐀𝐍 𝐊𝐀𝐌𝐔 |
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 📦 𝕻𝕬𝕶𝕰𝕿
  │     ╰─➤ ${u.nama}
  │
  ├─► 🖥️ 𝕮𝕻𝖀
  │     ╰─➤ ${u.cpu} 
  │
  ├─► 🧠 𝕽𝕬𝕸
  │     ╰─➤ ${u.ram} 
  │
  ├─► 💾 𝕾𝕿𝕺𝕽𝕬𝕲𝕰
  │     ╰─➤ ${u.storage} 
  │
  ├─► 📍 𝕷𝕺𝕶𝕬𝕾𝕴
  │     ╰─➤ ${u.lokasi} 
  │
  ├─► 🐧 𝕺𝕻𝕰𝕽𝕬𝕿𝕴𝕹𝕲 𝕾𝖄𝕾𝕿𝕰𝕸
  │     ╰─➤ ${u.os}
  │
  ╰─► 📅 𝕯𝖀𝕽𝕬𝕾𝕴
        ╰─➤ 30 Hari Full + Garansi Kalo Mokad

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃      💰 TOTAL : ${rupiah(u.harga)} 💰      ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

ㅤUdah bener? Klik YA buat lanjut 👇`;
}
const USERNAME_TXT = `ㅤㅤ✦ ━━━━━━━━━━━━━━━━━━ ✦
  ㅤ👤 𝐀𝐓𝐔𝐑 𝐔𝐒𝐄𝐑𝐍𝐀𝐌𝐄 𝐊𝐀𝐌𝐔 👤
ㅤㅤ✦ ━━━━━━━━━━━━━━━━━━ ✦

   Tentuin username buat login VPS kamu 😎
       Contoh: zuanstore

⚠️ Syaratnya:
  ╭─► 🔤 Huruf kecil aja
  ╰─► 🚫 Tanpa spasi

ㅤ⌨️ Ketik username kamu sekarang:`;
function bayarTxt(u){
   return `ㅤ✦ ━━━━━━━━━━━━━━━━━ ✦
  ㅤ🔒 𝐎𝐑𝐃𝐄𝐑 𝐁𝐄𝐑𝐇𝐀𝐒𝐈𝐋 𝐃𝐈𝐋𝐎𝐂𝐊 🔒
ㅤ✦ ━━━━━━━━━━━━━━━━━ ✦

     Terima kasih sudah order di
         👑⚡ 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 ⚡👑

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
   ┃ 💻 𝐃𝐄𝐓𝐀𝐈𝐋 𝐕𝐏𝐒 𝐊𝐀𝐌𝐔 💻  ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 📦 PAKETㅤ:--➤ ${u.nama}
  │
  ├─► 🖥️ CPUㅤㅤ:--➤ ${u.cpu || '-'}
  │
  ├─► 🧠 RAMㅤㅤ:--➤ ${u.ram || '-'}
  │
  ├─► 💾 STORAGEㅤ:--➤ ${u.storage || '-'}
  │
  ├─► 📍 LOKASIㅤ:--➤ ${u.lokasi || '-'}
  │
  ├─► 📀 OSㅤㅤㅤ:--➤ ${u.os || '-'}
  │
  ├─► 👤 USERNAME:--➤ ${u.username}
  │
  ├─► 🔑 PASSWORD:--➤ Dikirim setelah Payment
  │
  ╰─► 📅 DURASIㅤ:--➤ 30 Hari Full + Garansi Kalo Mokad

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       💰 TOTAL PEMBAYARAN 💰       ┃
┃            ${rupiah(u.harga)}              ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
   ┃ 💳 METODE : TRANSFER 💳 ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 🏦 SEABANK
  │     ├─➤ No. Rek : 9012-4214-5662
  │     ╰─➤ A.Nㅤㅤ: MUHAMAD IKHSANDI AKBAR
  │
  ├─► 📱 GOPAY
  │     ├─➤ No. HP : 0858-7225-7850
  │     ╰─➤ A.Nㅤㅤ: MUHAMAD IKHSANDI AKBAR
  │
  ╰─► ⚠️ DANA — SEDANG ADA KENDALA ⚠️
        ├─➤ Akun owner sedang gangguan
        ╰─➤ Mohon pakai : QRIS / Seabank / Gopay dulu ya

Klik tombol QRIS di bawah 👇`;
}
function qrisTxt(u){
   return `ㅤ✦ ━━━━━━━━━━━━━━━━━ ✦
  ㅤ📸 𝐏𝐄𝐌𝐁𝐀𝐘𝐀𝐑𝐀𝐍 𝐕𝐈𝐀 𝐐𝐑𝐈𝐒 📸
ㅤ✦ ━━━━━━━━━━━━━━━━━ ✦

  Halo kak, terima kasih banyak sudah
  percaya order di Store Kami 

  Ini QRIS nya sudah kami kirimkan ya ✨
  Silakan scan QR di atas untuk
  menyelesaikan pembayaran sebesar:

  ╭─► 💰 ${rupiah(u.harga)}
  ╰─► 👤 A.N : MUHAMAD IKHSANDI AKBAR

QR ini bisa di scan melalui:
• DANA
• OVO
• Gopay
• ShopeePay
• atau M-Banking apa saja.

Setelah berhasil, kirim bukti
transfernya ke sini ya kak.
Kami akan segera proses VPS nya
dan aktif dalam 1-2 menit ⚡

Sekali lagi, terima kasih banyak
sudah memilih ZUAN STORE 💎
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
  ┃ 💎 PILIH PAKET PANEL 💎  ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 01 — PANEL 1GB / Rp 5.000
  │     ╰─➤ 1GB RAM | 10GB Disk | 40% CPU
  ├─► 02 — PANEL 2GB / Rp 8.000
  │     ╰─➤ 2GB RAM | 20GB Disk | 80% CPU
  ├─► 03 — PANEL 4GB / Rp 15.000
  │     ╰─➤ 4GB RAM | 40GB Disk | 150% CPU
  ╰─► 04 — PANEL UNLIMITED / Rp 30.000 
        ╰─➤ UNLI RAM | UNLI Disk | UNLI CPU

Klik paket nya 👇`;
const DOMAIN_TXT = `╔═════════════════════════════════╗
          🌐 DOMAIN MURAH 🌐
       🔗 NAMA KEREN BUAT WEB LU
╚═════════════════════════════════╝

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       💎 LIST HARGA DOMAIN 💎       ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► [1] .my.id  — Rp 12.000 /tahun
  ├─► [2] .xyz    — Rp 15.000 /tahun
  ├─► [3] .online — Rp 20.000 /tahun
  ├─► [4] .store  — Rp 25.000 /tahun
  ├─► [5] .com    — Rp 95.000 /tahun
  ╰─► [6] .id     — Rp 180.000 /tahun

Klik eksistensi nya 👇`;
const JASA_TXT = `╔═════════════════════════════════╗
     🛠️ JASA INSTALL / SETTING 🛠️
        ⚙️ DIBANTU SAMPAI BERES
╚═════════════════════════════════╝

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
 ┃    💎 PILIH JASA KAMU 💎   ┃
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

  ╭─► 👨‍💻 ADMIN  : ShanXPLD
  ├─► ⏰ ONLINE : 24 Jam
  ├─► ⚡ RESPON : 1 - 5 Menit
  ╰─► 📱 TELE   : Klik tombol di bawah

Klik tombol ADMIN 👇`;
function validTxt(u){
   return `✦ ━━━━━━━━━━━━━━━━━ ✦
  ✅ PEMBAYARAN BERHASIL ✅
✦ ━━━━━━━━━━━━━━━━━ ✦

  Terima kasih banyak kak 

  Pembayaran kakak untuk:
  ╭─► 📦 ${u.nama}
  ╰─► 💰 ${rupiah(u.harga)}

  Sudah kami VALIDASI dan dinyatakan
  BERHASIL ✅

  ╭─► 👤 USERNAME : ${u.username}
  ╰─► ⚡ STATUS   : VPS sedang diproses
        Aktif 1-2 menit lagi

  Sekali lagi, terima kasih atas
  kepercayaan kakak sudah memilih
  👑 ZUAN STORE 👑

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ZUAN STORE - CEPAT. STABIL. TANPA RIBET. ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}
function tolakTxt(u){
   return `✦ ━━━━━━━━━━━━━━━━━ ✦
  🙏 MOHON MAAF YA KAK 🙏
✦ ━━━━━━━━━━━━━━━━━ ✦

  Mohon maaf sebesar-besarnya ya kak 🙏

  Setelah kami cek dengan teliti,
  bukti transfer yang kakak kirim untuk:
  ╭─► 📦 ${u.nama}
  ╰─► 💰 ${rupiah(u.harga)}

  Belum bisa kami validasi.

  ╭─► 📸 Boleh tolong kirim ulang
  │     bukti yang lebih jelas?
  │     Foto full, jangan terpotong ya kak
  ╰─► 💬 Atau chat admin, kami bantu
        cek bareng-bareng 

  Terima kasih atas pengertiannya kak 

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ZUAN STORE - CEPAT. STABIL. TANPA RIBET. ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

const kbMenu = Markup.inlineKeyboard([
  [Markup.button.callback('💻 VPS MURAH', 'menu_1'), Markup.button.callback('📱 PANEL', 'menu_2')],
  [Markup.button.callback('🌐 DOMAIN MURAH', 'menu_3'), Markup.button.callback('🛠️ JASA INSTALL', 'menu_4')],
  [Markup.button.callback('💬 HUBUNGI ADMIN', 'menu_5')],
]);
const kbVps = Markup.inlineKeyboard([
  [Markup.button.callback('VPS 1GB | Rp 30K', 'vps_1')],
  [Markup.button.callback('VPS 2GB | Rp 40K', 'vps_2')],
  [Markup.button.callback('VPS 4GB | Rp 75K', 'vps_3')],
  [Markup.button.callback('VPS 8GB | Rp 130K', 'vps_4')],
  [Markup.button.callback('VPS 12GB | Rp 195K', 'vps_5')],
  [Markup.button.callback('VPS 16GB | Rp 275K', 'vps_6')],
  [Markup.button.callback('⏪ Kembali', 'back_menu')],
]);
const kbLokasi = Markup.inlineKeyboard([
  [Markup.button.callback('🇮🇩 INDONESIA - 15ms', 'lok_1')],
  [Markup.button.callback('🇩🇪 JERMAN - 114ms', 'lok_2')],
  [Markup.button.callback('🇸🇬 SINGAPURA - 30ms', 'lok_3')],
  [Markup.button.callback('⏪ Kembali', 'back_menu')],
]);
const kbOsFamily = Markup.inlineKeyboard([
  [Markup.button.callback('UBUNTU', 'osfam_ubuntu')],
  [Markup.button.callback('DEBIAN', 'osfam_debian')],
  [Markup.button.callback('ALMALINUX', 'osfam_alma')],
  [Markup.button.callback('ROCKY LINUX', 'osfam_rocky')],
  [Markup.button.callback('⏪ Kembali', 'back_menu')],
]);
function kbOsVersion(fam){
  const btns = OS_VERSIONS_LABEL[fam].map((label, i) => [Markup.button.callback('✅ ' + label, `osver_${fam}_${i}`)]);
  btns.push([Markup.button.callback('⏪ Kembali ke OS', 'back_os')]);
  return Markup.inlineKeyboard(btns);
}
const kbYaBatal = Markup.inlineKeyboard([
  [Markup.button.callback('✅ YA, LANJUT', 'ya'), Markup.button.callback('❌ BATAL', 'batal')],
]);
const kbBayar = Markup.inlineKeyboard([
  [Markup.button.callback('📷 LIAT QRIS', 'qris')],
  [Markup.button.callback('⏪ MENU UTAMA', 'back_menu')],
]);
const kbPanel = Markup.inlineKeyboard([
  [Markup.button.callback('PANEL 1GB | Rp 3K', 'panel_1')],
  [Markup.button.callback('PANEL 2GB | Rp 6K', 'panel_2')],
  [Markup.button.callback('PANEL 4GB | Rp 9K', 'panel_3')],
  [Markup.button.callback('PANEL UNLIMITED | Rp 25K', 'panel_4')],
  [Markup.button.callback('⏪ Kembali', 'back_menu')],
]);
const kbDomain = Markup.inlineKeyboard([
  [Markup.button.callback('.my.id - Rp 12K', 'dom_1'), Markup.button.callback('.xyz - Rp 15K', 'dom_2')],
  [Markup.button.callback('.online - Rp 20K', 'dom_3'), Markup.button.callback('.store - Rp 25K', 'dom_4')],
  [Markup.button.callback('.com - Rp 95K', 'dom_5'), Markup.button.callback('.id - Rp 180K', 'dom_6')],
  [Markup.button.callback('⏪ Kembali', 'back_menu')],
]);
const kbJasa = Markup.inlineKeyboard([
  [Markup.button.callback('🤖 INSTALL BOT WA - Rp 15K', 'jasa_1')],
  [Markup.button.callback('🎮 INSTALL PANEL - Rp 20K', 'jasa_2')],
  [Markup.button.callback('🌐 INSTALL WEB - Rp 25K', 'jasa_3')],
  [Markup.button.callback('🔧 SETTING VPS - Rp 10K', 'jasa_4')],
  [Markup.button.callback('⏪ Kembali', 'back_menu')],
]);
const kbAdmin = Markup.inlineKeyboard([
  [Markup.button.callback('💬 CHAT ADMIN SEKARANG', 'admin_chat')],
  [Markup.button.callback('⏪ MENU UTAMA', 'back_menu')],
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

bot.on('callback_query', async (ctx) => {
  const id = ctx.from.id;
  const data = ctx.callbackQuery.data;
  await ctx.answerCbQuery().catch(()=>{});
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
    if(u.step==='konfirmasi_vps' || u.step==='konfirmasi_simple'){ u.step='username'; return ctx.reply(USERNAME_TXT); }
  }
  if(data==='batal'){ u.step='menu'; return editTo(ctx, MENU, kbMenu); }

  if(data.startsWith('panel_')){ const k=data.split('_')[1]; Object.assign(u, PANEL[k]); u.detail=PANEL[k].spek; u.step='konfirmasi_simple'; return editTo(ctx, `╔═════════════════════════════════╗\n     📦 PILIHAN KAMU 📦\n╚═════════════════════════════════╝\n\n  ╭─► 📦 ${u.nama}\n  ├─► 💰 ${rupiah(u.harga)}\n  ╰─► 📋 ${u.detail}\n\nKlik YA buat lanjut 👇`, kbYaBatal); }
  if(data.startsWith('dom_')){ const k=data.split('_')[1]; u.ekstensi=DOMAIN[k]; u.step='input_domain'; return ctx.reply(`╔═════════════════════════════════╗\n          🌐 DOMAIN 🌐\n╚═════════════════════════════════╝\n\n  Kamu pilih ekstensi ${DOMAIN[k].nama} - ${rupiah(DOMAIN[k].harga)}/tahun\n\nKetik nama domain nya aja, contoh:\nzuanstore\n\n(Nanti otomatis jadi zuanstore${DOMAIN[k].nama})`); }
  if(data.startsWith('jasa_')){ const k=data.split('_')[1]; Object.assign(u, JASA[k]); u.detail=JASA[k].desc; u.step='konfirmasi_simple'; return editTo(ctx, `╔═════════════════════════════════╗\n     🛠️ PILIHAN KAMU 🛠️\n╚═════════════════════════════════╝\n\n  ╭─► 🛠️ ${u.nama}\n  ├─► 💰 ${rupiah(u.harga)}\n  ╰─► 📋 ${u.detail}\n\nKlik YA buat lanjut 👇`, kbYaBatal); }

  if(data==='admin_chat'){ u.step='chat_admin'; await bot.telegram.sendMessage(ADMIN_ID, `🔔 Ada cust minta admin! ID: ${id} (@${ctx.from.username||'-'})`); return ctx.reply('✅ Oke kak, admin sudah dihubungi! Tunggu sebentar ya, admin akan chat kakak langsung 🙏\nKetik /start buat balik.'); }
  if(data==='qris'){
    try{ await ctx.replyWithPhoto({source:'./qris.jpg'}, {caption: qrisTxt(u)}); }
    catch(e){ await ctx.reply(qrisTxt(u) + '\n\n⚠️ Foto QRIS belum ada, taro file qris.jpg di folder bot ya'); }
    return;
  }

  // FIX VALID - DULU CRASH DI SINI
  if(data.startsWith('valid_')){
    if(id !== ADMIN_ID) return ctx.reply('Cuma owner yang bisa VALID.');
    const custId = Number(data.split('_')[1]);
    const cust = users.get(custId);
    if(!cust) return ctx.reply('Order tidak ketemu, mungkin bot restart.');
    cust.step = 'tanya_izin_post';
    await bot.telegram.sendMessage(custId, validTxt(cust));
    await ctx.reply('✅ Udah VALID, cust udah dikirimin notif.');
    await bot.telegram.sendMessage(custId, 'Boleh izin post testimoni nya di grup kak?', Markup.inlineKeyboard([
      [Markup.button.callback('✅ BOLEH', 'izin_ya'), Markup.button.callback('❌ JANGAN', 'izin_tidak')]
    ]));
    return;
  }
  if(data.startsWith('tolak_')){
    if(id !== ADMIN_ID) return ctx.reply('Cuma owner yang bisa TOLAK.');
    const custId = Number(data.split('_')[1]);
    const cust = users.get(custId);
    if(!cust) return ctx.reply('Order tidak ketemu.');
    await bot.telegram.sendMessage(custId, tolakTxt(cust));
    await ctx.reply('❌ Udah DITOLAK, cust udah dikirimin alasan.');
    return;
     }
  if(data==='izin_ya'){
    await ctx.reply('Makasih banyak kak! Testimoni kakak bakal kami post di grup biar makin rame!');
    await bot.telegram.sendMessage(ADMIN_ID, `Cust ${id} (@${ctx.from.username||'-'}) IZIN POST testimoni.`);
    return;
  }
  if(data==='izin_tidak'){
    await ctx.reply('Siap kak, aman! Testimoni kakak NGGAK bakal kami post. Privasi kakak aman.');
    await bot.telegram.sendMessage(ADMIN_ID, `Cust ${id} (@${ctx.from.username||'-'}) TIDAK IZIN POST.`);
    return;
  }
});

// FIX: TEXT HANDLER YANG TADI HILANG - INI WAJIB ADA
bot.on('text', async (ctx) => {
  const id = ctx.from.id;
  if(!users.has(id)) users.set(id, {step:'menu'});
  const u = users.get(id);
  const text = ctx.message.text;
  if(text.startsWith('/')) return;

  if(u.step === 'username'){
    u.username = text.toLowerCase().replace(/\s+/g,'');
    u.step = 'bayar';
    await ctx.reply(bayarTxt(u), kbBayar);
    const orderMsg = `🔥 ORDER BARU MASUK\n> PAKET : ${u.nama}\n> TOTAL : ${rupiah(u.harga)}\n> USER VPS : ${u.username}\n> CUSTOMER : @${ctx.from.username||'-'}\n> LOKASI : ${u.lokasi||'-'}\n> OS : ${u.os||'-'}\n> STATUS : MENUNGGU BAYAR`;
    await kirimKeGrup(orderMsg);
    return;
  }
  if(u.step === 'input_domain'){
    u.nama = text + u.ekstensi.nama; u.harga = u.ekstensi.harga; u.cpu='-'; u.ram='-'; u.storage='-'; u.lokasi='-'; u.os='-';
    u.step='konfirmasi_simple';
    return ctx.reply(`╔═════════════════════════════════╗\n     🌐 PILIHAN KAMU 🌐\n╚═════════════════════════════════╝\n\n  ╭─► 🌐 ${u.nama}\n  ╰─► 💰 ${rupiah(u.harga)}/tahun\n\nKlik YA buat lanjut 👇`, kbYaBatal);
  }
});

// FIX: PHOTO HANDLER YANG TADI HILANG - BUKTI KE OWNER DOANG
bot.on('photo', async (ctx) => {
  const id = ctx.from.id;
  const u = users.get(id) || {};
  const photoId = ctx.message.photo[ctx.message.photo.length-1].file_id;
  await bot.telegram.sendPhoto(ADMIN_ID, photoId, {
    caption: `📸 BUKTI BARU\n> ${u.nama||'-'}\n> ${u.harga?rupiah(u.harga):'-'}\n> @${ctx.from.username||'-'} | ID: ${id}\n> USER VPS: ${u.username||'-'}`,
    ...Markup.inlineKeyboard([
      [Markup.button.callback('✅ VALID', `valid_${id}`), Markup.button.callback('❌ TOLAK', `tolak_${id}`)]
    ])
  });
  await ctx.reply('Bukti udah dikirim ke admin, tunggu divalidasi ya kak 🙏');
});

bot.launch().then(()=> console.log('Bot ZUAN STORE jalan!')).catch(e=>console.log('GAGAL JALAN:', e.message));
process.once('SIGINT', ()=>bot.stop('SIGINT'));
process.once('SIGTERM', ()=>bot.stop('SIGTERM'));
