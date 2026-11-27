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

✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦

ㅤㅤㅤㅤ🔥 𝙿𝚁𝙾𝙼𝙾 𝙷𝙰𝚁𝙸 𝙸𝙽𝙸 🔥
ㅤㅤ𝙱𝚎𝚕𝚒 𝚅𝙿𝚂 𝟸 𝙶𝙱 𝚔𝚎 𝚊𝚝𝚊𝚜 :
➤ㅤ𝙶𝚁𝙰𝚃𝙸𝚂 𝚂𝚎𝚝𝚞𝚙 𝚅𝙿𝚂 𝚜𝚊𝚖𝚙𝚎 𝚂𝚎𝚕𝚎𝚜𝚊𝚒!
➤ㅤ𝙶𝚁𝙰𝚃𝙸𝚂 𝙿𝚊𝚗𝚎𝚕 𝙿𝚝𝚎𝚛𝚘𝚍𝚊𝚌𝚝𝚢𝚕!

✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦

| Mau order yang mana nih ?
| Langsung klik aja di bawah, 
| jangan sampe kehabisan slotnya

ㅤㅤ「ㅤ𝐒𝐚𝐥𝐚𝐦 𝐬𝐮𝐤𝐬𝐞𝐬 𝐝𝐚𝐫𝐢 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄ㅤ」

✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦

ㅤㅤㅤㅤ✨ 𝐆𝐀𝐒 𝐎𝐑𝐃𝐄𝐑 𝐒𝐄𝐊𝐀𝐑𝐀𝐍𝐆 ✨`;

const VPS_LIST = `ㅤㅤㅤ✦ ━━━━━━━━━━━━━━━━━━━ ✦
  ㅤㅤ⚡ 𝐙𝐔𝐀𝐍 𝐒𝐓𝐎𝐑𝐄 - 𝐕𝐏𝐒 𝐌𝐔𝐑𝐀𝐇 ⚡
  ㅤㅤ  𝙽𝚅𝙼𝚎 𝙶𝚎𝚗𝟺 | 𝙺𝚅𝙼 | 𝙵𝚞𝚕𝚕 𝚁𝚘𝚘𝚝
  ㅤㅤ  𝙰𝚔𝚝𝚒𝚏 𝟷-𝟸 𝙼𝚎𝚗𝚒𝚝. 𝚃𝚊𝚗𝚙𝚊 𝚁𝚒𝚋𝚎𝚝.
✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦

  ┌─► 1 - VPS 1GB -> Rp 30.000/Bln
  │     ├─► CPU     -> 1 vCPU
  │     ├─► RAM     -> 1GB DDR4
  │     └─► STORAGE -> 20GB NVMeGen4
  │
  ├─► 2 - VPS 2GB -> Rp 40.000/Bln
  │     ├─► CPU     -> 1 vCPU
  │     ├─► RAM     -> 2GB DDR4
  │     └─► STORAGE -> 30GB NVMeGen4
  │
  ├─► 3 - VPS 4GB -> Rp 75.000/Bln
  │     ├─► CPU     -> 2 vCPU
  │     ├─► RAM     -> 4GB DDR4
  │     └─► STORAGE -> 60GB NVMeGen4
  │
  ├─► 4 - VPS 8GB -> Rp 130.000/Bln
  │     ├─► CPU     -> 4 vCPU
  │     ├─► RAM     -> 8GB DDR4
  │     └─► STORAGE -> 100GB NVMeGen4
  │
  ├─► 5 - VPS 12GB -> Rp 195.000/Bln
  │     ├─► CPU     -> 6 vCPU
  │     ├─► RAM     -> 12GB DDR4
  │     └─► STORAGE -> 160GB NVMeGen4
  │
  └─► 6 - VPS 16GB -> Rp 275.000/Bln
        ├─► CPU     -> 8 vCPU
        ├─► RAM     -> 16GB DDR4
        └─► STORAGE -> 200GB NVMeGen4
✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦  

🚨 𝐍𝐎𝐓𝐄 : 𝙷𝚊𝚛𝚐𝚊 𝚈𝚊𝚗𝚐 𝚂𝚞𝚍𝚊𝚑 𝚃𝚎𝚛𝚝𝚎𝚛𝚊 
𝚍𝚒𝚊𝚝𝚊𝚜 𝙸𝚝𝚞 𝚂𝚞𝚍𝚊𝚑 𝚃𝚎𝚛𝚖𝚊𝚜𝚞𝚔 1 𝙰𝚔𝚞𝚗 𝚅𝙿𝚂 
𝙿𝚛𝚒𝚋𝚊𝚍𝚒, 𝙱𝚞𝚔𝚊𝚗 𝚂𝚎𝚛𝚟𝚎𝚛 𝚅𝙿𝚂 𝚂𝚊𝚓𝚊 
𝙷𝚊𝚛𝚊𝚙 𝙳𝚒𝚋𝚊𝚌𝚊 𝚃𝚎𝚛𝚕𝚎𝚋𝚒𝚑 𝙳𝚊𝚑𝚞𝚕𝚞 
𝚂𝚎𝚋𝚎𝚕𝚞𝚖 𝙼𝚎𝚖𝚋𝚎𝚕𝚒

✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦
ㅤㅤㅤㅤ𝐊𝐥𝐢𝐤 𝐩𝐚𝐤𝐞𝐭 𝐧𝐲𝐚 𝐝𝐢 𝐛𝐚𝐰𝐚𝐡 👇`;

const LOKASI_TXT = `ㅤㅤㅤ✦ ━━━━━━━━━━━━━━━━━━━ ✦
  ㅤㅤㅤㅤㅤ🌍 𝐋𝐎𝐊𝐀𝐒𝐈 𝐒𝐄𝐑𝐕𝐄𝐑 🌍
✦━━━━━━━━━━━━━━━━━━━━━━━━━━✦

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

ㅤㅤㅤㅤㅤKlik lokasi nya 👇`;

const OS_TXT = `ㅤㅤ✦ ━━━━━━━━━━━━━━━━ ✦
  ㅤㅤㅤ🖥️ 𝐒𝐈𝐒𝐓𝐄𝐌 𝐎𝐏𝐄𝐑𝐀𝐒𝐈 🖥️
✦━━━━━━━━━━━━━━━━━━━━━━━━━✦

  ▸ 𝐔𝐁𝐔𝐍𝐓𝐔
    Paling mudah. Cocok buat pemula.

  ▸ 𝐃𝐄𝐁𝐈𝐀𝐍
    Paling stabil. Favorit pro.

  ▸ 𝐀𝐋𝐌𝐀𝐋𝐈𝐍𝐔𝐗
    Rasa enterprise. Tetap ringan.

  ▸ 𝐑𝐎𝐂𝐊𝐘𝐋𝐈𝐍𝐔𝐗
    Kuat dan bisa diandalkan.

ㅤㅤㅤㅤㅤKlik OS nya di bawah 👇`;

function osVersionTxt(fam){
  const judul = fam === 'ubuntu' ? '𝐔𝐁𝐔𝐍𝐓𝐔' : fam === 'debian' ? '𝐃𝐄𝐁𝐈𝐀𝐍' : fam === 'alma' ? '𝐀𝐋𝐌𝐀𝐋𝐈𝐍𝐔𝐗' : '𝐑𝐎𝐂𝐊𝐘 𝐋𝐈𝐍𝐔𝐗';
  const desc = fam === 'ubuntu' ? '𝐏𝐚𝐥𝐢𝐧𝐠 𝐦𝐮𝐝𝐚𝐡. 𝐂𝐨𝐜𝐨𝐤 𝐛𝐮𝐚𝐭 𝐩𝐞𝐦𝐮𝐥𝐚.' : fam === 'debian' ? '𝐏𝐚𝐥𝐢𝐧𝐠 𝐬𝐭𝐚𝐛𝐢𝐥. 𝐅𝐚𝐯𝐨𝐫𝐢𝐭 𝐩𝐚𝐫𝐚 𝐩𝐫𝐨.' : fam === 'alma' ? '𝐑𝐚𝐬𝐚 𝐞𝐧𝐭𝐞𝐫𝐩𝐫𝐢𝐬𝐞. 𝐓𝐞𝐭𝐚𝐩 𝐫𝐢𝐧𝐠𝐚𝐧.' : '𝐊𝐮𝐚𝐭 𝐝𝐚𝐧 𝐛𝐢𝐬𝐚 𝐝𝐢𝐚𝐧𝐝𝐚𝐥𝐤𝐚𝐧.';
    return `ㅤㅤ✦━━━━━━━━━━━━━━━━━━✦
  ㅤㅤ⚙️ 𝐏𝐈𝐋𝐈𝐇 𝐕𝐄𝐑𝐒𝐈 ${judul} ⚙️
✦━━━━━━━━━━━━━━━━━━━━━━━━✦

  ${desc}

ㅤㅤ𝙺𝚕𝚒𝚔 𝚟𝚎𝚛𝚜𝚒 𝚗𝚢𝚊 𝚍𝚒 𝚋𝚊𝚠𝚊𝚑 👇`;
}
function ringkasanTxt(u){
   return `✦━━━━━━━━━━━━━━━━━━━━━━━━✦
  ㅤ✨ 𝐑𝐈𝐍𝐆𝐊𝐀𝐒𝐀𝐍 𝐎𝐑𝐃𝐄𝐑 𝐊𝐀𝐌𝐔 ✨
✦━━━━━━━━━━━━━━━━━━━━━━━━✦

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
    ㅤㅤㅤ| 𝐃𝐄𝐓𝐀𝐈𝐋 𝐏𝐄𝐒𝐀𝐍𝐀𝐍 𝐊𝐀𝐌𝐔 |
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 📦 𝐏𝐀𝐊𝐄𝐓
  │     ╰─➤ ${u.nama}
  │
  ├─► 🖥️ 𝐂𝐏𝐔
  │     ╰─➤ ${u.cpu} 
  │
  ├─► 🧠 𝐑𝐀𝐌
  │     ╰─➤ ${u.ram} 
  │
  ├─► 💾 𝐒𝐓𝐎𝐑𝐀𝐆𝐄
  │     ╰─➤ ${u.storage} 
  │
  ├─► 📍 𝐋𝐎𝐊𝐀𝐒𝐈
  │     ╰─➤ ${u.lokasi} 
  │
  ├─► 🐧 𝐎𝐏𝐄𝐑𝐀𝐓𝐈𝐍𝐆 𝐒𝐘𝐒𝐓𝐄𝐌
  │     ╰─➤ ${u.os}
  │
  ╰─► 📅 𝐃𝐔𝐑𝐀𝐒𝐈
        ╰─➤ 30 Hari Full + Garansi Kalo Mokad

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
ㅤㅤ┃      💰 TOTAL : ${rupiah(u.harga)} 💰      ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

ㅤ𝚄𝚍𝚊𝚑 𝚋𝚎𝚗𝚎𝚛? 𝙺𝚕𝚒𝚔 𝚈𝙰 𝚋𝚞𝚊𝚝 𝚕𝚊𝚗𝚓𝚞𝚝 👇`;
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

╭─➤ 📦 PAKET    :--➤ ${u.nama}
│
│   ╰─➤ 🖥️ CPU      :--➤ ${u.cpu || '-'}
│
│   ╰─➤ 🧠 RAM      :--➤ ${u.ram || '-'}
│
│   ╰─➤ 💾 STORAGE  :--➤ ${u.storage || '-'}
│
│   ╰─➤ 📍 LOKASI   :--➤ ${u.lokasi || '-'}
│
│   ╰─➤ 💿 OS       :--➤ ${u.os || '-'}
│
│   ╰─➤ 👤 USERNAME :--➤ ${u.username}
│
│   ╰─➤ 🔑 PASSWORD :--➤ Dikirim setelah Payment
│
╰─➤ 📅 DURASI   :--➤ 30 Hari Full + Garansi Ka

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       💰 TOTAL PEMBAYARAN 💰       ┃
┃            ${rupiah(u.harga)}              ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
   ┃ 💳 METODE : TRANSFER 💳 ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ╭─► 🏦 SEABANK
  │     ├─➤ No. Rek : 9012-4214-5662
  │     ╰─➤ MUHAMAD IKHSANDI AKBAR
  │
  ├─► 📱 GOPAY
  │     ├─➤ No. HP : 0858-7225-7850
  │     ╰─➤ MUHAMAD IKHSANDI AKBAR
  │
  ╰─► ⚠️ DANA — SEDANG ADA KENDALA ⚠️
        ├─➤ Akun owner sedang gangguan
        ╰─➤ Mohon pakai : 
        QRIS / Seabank / Gopay dulu ya

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
  ╰─► 👤 MUHAMAD IKHSANDI AKBAR

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
ㅤㅤㅤㅤㅤ⚡ ZUAN STORE ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}
const PANEL_TXT = `✦ ───────────────────── ✦
📱 PANEL PTERODACTYL 📱
🎮 SERVER GAME & BOT
✦ ━━━━━━━━━━━━━━━━━━━━━━━━ ✦

│ 💎 PILIH PAKET PANEL 💎 │

╭─➤ 01 — PANEL 1GB / Rp 10.000
│   ╰─➤ 1GB RAM | 10GB Disk | 40% CPU
╭─➤ 02 — PANEL 2GB / Rp 15.000
│   ╰─➤ 2GB RAM | 20GB Disk | 80% CPU
╭─➤ 03 — PANEL 4GB / Rp 25.000
│   ╰─➤ 4GB RAM | 40GB Disk | 150% CPU
╰─➤ 04 — PANEL UNLIMITED / Rp 30.000
    ╰─➤ UNLI RAM | UNLI Disk | UNLI CPU

✦ ───────────────────── ✦
Harga di atas untuk 30 Hari!
Ada juga 1H / 3H / 5H / 7H / 14H!
✦ ───────────────────── ✦

Klik paket nya 👇`;

const JASA_TXT = `✦ ───────────────────── ✦
🛠️ JASA INSTALL / SETTING 🛠️
⚙️ DIBANTU SAMPAI BERES
✦ ───────────────────── ✦

│ 💎 PILIH JASA KAMU 💎 │

╭─➤ [1] 🤖 INSTALL BOT WA — Rp 15.000
│   ╰─➤ Sampai Jalan & Online
╭─➤ [2] 🎮 INSTALL PANEL — Rp 20.000
│   ╰─➤ Pterodactyl Full Setting
╭─➤ [3] 🌐 INSTALL WEB / STORE — Rp 25.000
│   ╰─➤ Domain + SSL + Tampilan
╰─➤ [4] 🔧 SETTING VPS — Rp 10.000
    ╰─➤ Optimasi Biar Ngebut

✦ ───────────────────── ✦

Klik jasa nya 👇`;
const ADMIN_TXT = `✦ ───────────────────── ✦
💬 HUBUNGI ADMIN 💬
✦ ───────────────────── ✦

Butuh bantuan? Santai, admin kita
fast respon kok! 😎👇

╭─➤ 👨‍💻 ADMIN : ShanXPLD
│   ╰─➤ ⏰ ONLINE : 24 Jam
│   ╰─➤ ⚡ RESPON : 1 - 5 Menit
╰─➤ 📱 TELE : Klik tombol di bawah

✦ ───────────────────── ✦

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
  [
    { text: '✅💻 VPS MURAH', callback_data: 'menu_1' },
    { text: '✅📱 PANEL', callback_data: 'menu_2' }
  ],
  [
    { text: '✅🌐 DOMAIN MURAH', callback_data: 'menu_3' },
    { text: '✅🛠️ JASA INSTALL', callback_data: 'menu_4' }
  ],
  [
    { text: '✅💬 HUBUNGI ADMIN', callback_data: 'menu_5' }
  ],
]);

const kbVps = Markup.inlineKeyboard([
  [
    { text: '✅1', callback_data: 'vps_1' },
    { text: '✅4', callback_data: 'vps_4' }
  ],
  [
    { text: '✅2', callback_data: 'vps_2' },
    { text: '✅5', callback_data: 'vps_5' }
  ],
  [
    { text: '✅3', callback_data: 'vps_3' },
    { text: '✅6', callback_data: 'vps_6' }
  ],
  [{ text: '❌ BACK', callback_data: 'back_menu' }],
]);

const kbLokasi = Markup.inlineKeyboard([
  [{ text: '🇮🇩 INDONESIA', callback_data: 'lok_1' }],
  [{ text: '🇩🇪 JERMAN', callback_data: 'lok_2' }],
  [{ text: '🇸🇬 SINGAPURA', callback_data: 'lok_3' }],
  [{ text: '⏪ Kembali', callback_data: 'back_vps' }],
]);

const kbOsFamily = Markup.inlineKeyboard([
  [
    { text: 'UBUNTU', callback_data: 'osfam_ubuntu' },
    { text: 'DEBIAN', callback_data: 'osfam_debian' }
  ],
  [
    { text: 'ALMALINUX', callback_data: 'osfam_alma' },
    { text: 'ROCKY LINUX', callback_data: 'osfam_rocky' }
  ],
  [{ text: '❌ Kembali', callback_data: 'back_lokasi' }],
]);

function kbOsVersion(fam){
  const btns = OS_VERSIONS_LABEL[fam].map((label, i) => [{ text: '✅ ' + label, callback_data: `osver_${fam}_${i}` }]);
  btns.push([{ text: '❌ Kembali ke OS', callback_data: 'back_os' }]);
  return Markup.inlineKeyboard(btns);
}

const kbYaBatal = Markup.inlineKeyboard([
  [
    { text: '✅ YA, LANJUT', callback_data: 'ya' },
    { text: '❌ BATAL', callback_data: 'batal' }
  ],
]);

const kbBayar = Markup.inlineKeyboard([
  [{ text: '📷 LIAT QRIS', callback_data: 'qris' }],
  [{ text: '❌ MENU UTAMA', callback_data: 'back_menu' }],
]);

const kbPanel = Markup.inlineKeyboard([
  [
    { text: '✅ PANEL 1GB', callback_data: 'panel_1gb' },
    { text: '✅ PANEL 2GB', callback_data: 'panel_2gb' }
  ],
  [
    { text: '✅ PANEL 4GB', callback_data: 'panel_4gb' },
    { text: '✅ PANEL UNLI', callback_data: 'panel_unli' }
  ],
  [{ text: '❌ Kembali', callback_data: 'back_menu' }],
]);

// KALO PILIH 1GB, MUNCUL ANGKA 1-6
const kbDurasi1GB = Markup.inlineKeyboard([
  [
    { text: '✅ [1] 1 Hari - 1K', callback_data: 'buy_1gb_1' },
    { text: '✅ [2] 3 Hari - 2K', callback_data: 'buy_1gb_3' }
  ],
  [
    { text: '✅ [3] 5 Hari - 3K', callback_data: 'buy_1gb_5' },
    { text: '✅ [4] 7 Hari - 4K', callback_data: 'buy_1gb_7' }
  ],
  [
    { text: '✅ [5] 14 Hari - 6K', callback_data: 'buy_1gb_14' },
    { text: '✅ [6] 30 Hari - 10K', callback_data: 'buy_1gb_30' }
  ],
  [{ text: '❌ Kembali', callback_data: 'menu_panel' }],
]);

// KALO PILIH 2GB
const kbDurasi2GB = Markup.inlineKeyboard([
  [
    { text: '✅ [1] 1 Hari - 2K', callback_data: 'buy_2gb_1' },
    { text: '✅ [2] 3 Hari - 3.5K', callback_data: 'buy_2gb_3' }
  ],
  [
    { text: '✅ [3] 5 Hari - 5K', callback_data: 'buy_2gb_5' },
    { text: '✅ [4] 7 Hari - 7K', callback_data: 'buy_2gb_7' }
  ],
  [
    { text: '✅ [5] 14 Hari - 10K', callback_data: 'buy_2gb_14' },
    { text: '✅ [6] 30 Hari - 15K', callback_data: 'buy_2gb_30' }
  ],
  [{ text: '❌ Kembali', callback_data: 'menu_panel' }],
]);

// KALO PILIH 4GB
const kbDurasi4GB = Markup.inlineKeyboard([
  [
    { text: '✅ [1] 1 Hari - 3K', callback_data: 'buy_4gb_1' },
    { text: '✅ [2] 3 Hari - 5K', callback_data: 'buy_4gb_3' }
  ],
  [
    { text: '✅ [3] 5 Hari - 7K', callback_data: 'buy_4gb_5' },
    { text: '✅ [4] 7 Hari - 10K', callback_data: 'buy_4gb_7' }
  ],
  [
    { text: '✅ [5] 14 Hari - 15K', callback_data: 'buy_4gb_14' },
    { text: '✅ [6] 30 Hari - 25K', callback_data: 'buy_4gb_30' }
  ],
  [{ text: '❌ Kembali', callback_data: 'menu_panel' }],
]);

// KALO PILIH UNLI
const kbDurasiUNLI = Markup.inlineKeyboard([
  [
    { text: '✅ [1] 1 Hari - 4K', callback_data: 'buy_unli_1' },
    { text: '✅ [2] 3 Hari - 6K', callback_data: 'buy_unli_3' }
  ],
  [
    { text: '✅ [3] 5 Hari - 9K', callback_data: 'buy_unli_5' },
    { text: '✅ [4] 7 Hari - 12K', callback_data: 'buy_unli_7' }
  ],
  [
    { text: '✅ [5] 14 Hari - 18K', callback_data: 'buy_unli_14' },
    { text: '✅ [6] 30 Hari - 30K', callback_data: 'buy_unli_30' }
  ],
  [{ text: '❌ Kembali', callback_data: 'menu_panel' }],
]);

// === PENYAMBUNG PANEL -> DURASI ===
bot.action('panel_1gb', async (ctx) => {
  await ctx.editMessageText(
`✦ ───────────────────── ✦
📱 PANEL 1GB - PILIH DURASI 📱
✦ ───────────────────── ✦

1GB RAM | 10GB Disk | 40% CPU

Pilih angka 1 - 6 👇`,
    kbDurasi1GB
  );
});

bot.action('panel_2gb', async (ctx) => {
  await ctx.editMessageText(
`✦ ───────────────────── ✦
📱 PANEL 2GB - PILIH DURASI 📱
✦ ───────────────────── ✦

2GB RAM | 20GB Disk | 80% CPU

Pilih angka 1 - 6 👇`,
    kbDurasi2GB
  );
});

bot.action('panel_4gb', async (ctx) => {
  await ctx.editMessageText(
`✦ ───────────────────── ✦
📱 PANEL 4GB - PILIH DURASI 📱
✦ ───────────────────── ✦

4GB RAM | 40GB Disk | 150% CPU

Pilih angka 1 - 6 👇`,
    kbDurasi4GB
  );
});

bot.action('panel_unli', async (ctx) => {
  await ctx.editMessageText(
`✦ ───────────────────── ✦
📱 PANEL UNLI - PILIH DURASI 📱
✦ ───────────────────── ✦

UNLI RAM | UNLI Disk | UNLI CPU

Pilih angka 1 - 6 👇`,
    kbDurasiUNLI
  );
});

// === DATA HARGA PANEL (YANG UDAH KITA CATET) ===
const PANEL_DATA = {
  '1gb': { nama: 'PANEL 1GB', spek: '1GB RAM | 10GB Disk | 40% CPU', harga: { 1: 1000, 3: 2000, 5: 3000, 7: 4000, 14: 6000, 30: 10000 } },
  '2gb': { nama: 'PANEL 2GB', spek: '2GB RAM | 20GB Disk | 80% CPU', harga: { 1: 2000, 3: 3500, 5: 5000, 7: 7000, 14: 10000, 30: 15000 } },
  '4gb': { nama: 'PANEL 4GB', spek: '4GB RAM | 40GB Disk | 150% CPU', harga: { 1: 3000, 3: 5000, 5: 7000, 7: 10000, 14: 15000, 30: 25000 } },
  'unli': { nama: 'PANEL UNLIMITED', spek: 'UNLI RAM | UNLI Disk | UNLI CPU', harga: { 1: 4000, 3: 6000, 5: 9000, 7: 12000, 14: 18000, 30: 30000 } },
};

const kbBayarPanel = Markup.inlineKeyboard([
  [
    { text: '✅ BAYAR VIA QRIS', callback_data: 'bayar_qris' },
    { text: '✅ BAYAR VIA TRANSFER', callback_data: 'bayar_transfer' }
  ],
  [{ text: '❌ Kembali', callback_data: 'menu_panel' }],
]);

// === 1 CODINGAN BUAT SEMUA TOMBOL [1] - [6] ===
bot.action(/^buy_(1gb|2gb|4gb|unli)_(\d+)$/, async (ctx) => {
  const paket = ctx.match[1]; // 1gb / 2gb / 4gb / unli
  const durasi = ctx.match[2]; // 1 / 3 / 5 / 7 / 14 / 30
  const data = PANEL_DATA[paket];
  const harga = data.harga[durasi];

  await ctx.editMessageText(
`✦ ───────────────────── ✦
🧾 DETAIL PESANAN PANEL 🧾
✦ ───────────────────── ✦

╭─➤ 📦 PAKET    :--➤ ${data.nama}
│   ╰─➤ 🖥️ SPEK     :--➤ ${data.spek}
│   ╰─➤ 📅 DURASI   :--➤ ${durasi} Hari
╰─➤ 💰 HARGA    :--➤ Rp ${harga.toLocaleString('id-ID')}

✦ ───────────────────── ✦
Silahkan pilih metode pembayaran 👇`,
    kbBayarPanel
  );
});

const kbDomain = Markup.inlineKeyboard([
  [
    { text: '.my.id - Rp 12K', callback_data: 'dom_1' },
    { text: '.xyz - Rp 15K', callback_data: 'dom_2' }
  ],
  [
    { text: '.online - Rp 20K', callback_data: 'dom_3' },
    { text: '.store - Rp 25K', callback_data: 'dom_4' }
  ],
  [
    { text: '.com - Rp 95K', callback_data: 'dom_5' },
    { text: '.id - Rp 180K', callback_data: 'dom_6' }
  ],
  [{ text: '❌ Kembali', callback_data: 'back_menu' }],
]);

const kbJasa = Markup.inlineKeyboard([
  [
    { text: '✅🤖 BOT WA - 15K', callback_data: 'jasa_1' },
    { text: '✅🎮 PANEL - 20K', callback_data: 'jasa_2' }
  ],
  [
    { text: '✅🌐 WEB - 25K', callback_data: 'jasa_3' },
    { text: '✅🔧 VPS - 10K', callback_data: 'jasa_4' }
  ],
  [{ text: '❌ Kembali', callback_data: 'back_menu' }],
]);

const kbAdmin = Markup.inlineKeyboard([
  [{ text: '✅💬 CHAT ADMIN SEKARANG', callback_data: 'admin_chat' }],
  [{ text: '❌ MENU UTAMA', callback_data: 'back_menu' }],
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
  if(data==='back_vps'){ u.step='pilih_vps'; return editTo(ctx, VPS_LIST, kbVps); }
  if(data==='back_lokasi'){ u.step='pilih_lokasi'; return editTo(ctx, LOKASI_TXT, kbLokasi); }
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
  try{ await ctx.replyWithPhoto({source:'./qris.jpg'}); }
  catch(e){ await ctx.reply(qrisTxt(u)); }
  return;
}

  if(data.startsWith('valid_')){
    if(id !== ADMIN_ID) return ctx.reply('Cuma admin yang bisa validasi!');
    const custId = Number(data.split('_')[1]);
    const cust = users.get(custId);
    if(!cust) return ctx.reply('Order tidak ketemu!');
    cust.step = 'tanya_izin_post';
    await bot.telegram.sendMessage(custId, validTxt(cust));
    await ctx.reply('✅ Udah VALID, cust udah dikabarin!');
    await bot.telegram.sendMessage(custId, 'Boleh izin post testi?', {
      reply_markup: { inline_keyboard: [[
        Markup.button.callback('✅ BOLEH', 'izin_boleh'),
        Markup.button.callback('❌ JANGAN', 'izin_jangan')
      ]]}
    });
    return;
  }

  if(data.startsWith('tolak_')){
    if(id !== ADMIN_ID) return ctx.reply('Cuma admin yang bisa tolak!');
    const custId = Number(data.split('_')[1]);
    const cust = users.get(custId);
    if(!cust) return ctx.reply('Order tidak ketemu!');
    await bot.telegram.sendMessage(custId, tolakTxt(cust));
    await ctx.reply('❌ Udah DITOLAK, cust udah dikabarin!');
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
  [{ text: '✅ VALID', callback_data: `valid_${id}`, style: 'success' }, { text: '❌ TOLAK', callback_data: `tolak_${id}`, style: 'danger' }]
])
  });
  await ctx.reply('Bukti udah dikirim ke admin, tunggu divalidasi ya kak 🙏');
});

bot.launch().then(()=> console.log('Bot ZUAN STORE jalan!')).catch(e=>console.log('GAGAL JALAN:', e.message));
process.once('SIGINT', ()=>bot.stop('SIGINT'));
process.once('SIGTERM', ()=>bot.stop('SIGTERM'));
