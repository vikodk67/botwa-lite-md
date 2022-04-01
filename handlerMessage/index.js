//External Modules
const {
	Presence,
	mentionedJid,
    processTime,
	MessageOptions,
	WALocationMessage,
	MessageType,
	Mimetype,
	downloadContentFromMessage
} = require("@adiwajshing/baileys");
const {
	fromBuffer
} = require("file-type");
const perf = require("perf_hooks").performance;
const chalk = require("chalk");
const util = require("util");
const axios = require("axios");
const moment = require("moment-timezone");
const speed = require("performance-now");
const child = require("child_process");
const os = require("os");
const fs = require("fs");

// modul EK
const titikkoma = require("titikoma-ed");
const translate = require('translate-google')
const ffmpeg = require("fluent-ffmpeg");
const  googleIt = require('google-it');
const brainly = require('brainly-scraper');
const countapi = require('countapi-js');
let game = fs.readFileSync("./src/game.json")

const knights = require("knights-canvas");
// modul EK end
// database game
let tebakgambar = game.tebakgambar = []

request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
//internal Modules
require("./../configs");
const {
	getBuffer,
	getJson,
	runtime,
	sizeFormat,
	h2k,
	getRandom,
	getNumberAdminsGroups,
	exif,
	uploader
} = require("./../functions");

const {
	help,
	stats
} = require("./../helpers");

const {
	sendButtonsMenu,
	buttonsDownload,
	butonku,
	sendImage,
	sendAudio,
	sendVideo
} = require("./../sendingMessage");

//global configs
let owners = global.ownerNumber;
let apikeys = global.apikeys;
let watermark = global.watermark;
let packname = global.packname;
let authorname = global.authorname;
let multiprefix = global.multiprefix;
let nonprefix = global.nonprefix;
let thumbnail = global.thumbnail;
let participantRequest = [];

module.exports = async (xcoders, x) => {
	try {
		const type = Object.keys(x.message)[0];
		const content = JSON.stringify(x.message);
		const from = x.key.remoteJid;
		const cmd = (type === "conversation" && x.message.conversation) ? x.message.conversation : (type == "imageMessage") && x.message.imageMessage.caption ? x.message.imageMessage.caption : (type == "videoMessage") && x.message.videoMessage.caption ? x.message.videoMessage.caption : (type == "extendedTextMessage") && x.message.extendedTextMessage.text ? x.message.extendedTextMessage.text : "".slice(1).trim().split(/ +/).shift().toLowerCase();
		let prefix;
	  if (multiprefix) {
			prefix = /^[°⊳π÷×¶∆£¢€¥®™✓=|~zZ+×_!#$%^&./\\©^]/.test(cmd) ? cmd.match(/^[°⊳π÷×¶∆£¢€¥®™✓=|~zZ+×_!#$,|`÷?;:%abcdefghijklmnopqrstuvwxyz%^&./\\©^]/gi) : ".";
		} else {
			if (nonprefix) prefix = "";
			else prefix = global.prefix;
		}
		
		
		const buttonsResponseText = (type == "buttonsResponseMessage") ? x.message.buttonsResponseMessage.selectedDisplayText : "";
		const buttonsResponseID = (type == "buttonsResponseMessage") ? x.message.buttonsResponseMessage.selectedButtonId : "";
		const body = (type === "conversation" && x.message.conversation.startsWith(prefix)) ? x.message.conversation : (type == "imageMessage") && x.message[type].caption.startsWith(prefix) ? x.message[type].caption : (type == "videoMessage") && x.message[type].caption.startsWith(prefix) ? x.message[type].caption : (type == "extendedTextMessage") && x.message[type].text.startsWith(prefix) ? x.message[type].text : (type == "templateButtonReplyMessage") && x.message.templateButtonReplyMessage.selectedId ? x.message.templateButtonReplyMessage.selectedId : buttonsResponseID;
		const budy = (type === "conversation") ? x.message.conversation : (type === "extendedTextMessage") ? x.message.extendedTextMessage.text : "";
		const isCmd = body.startsWith(prefix);
		const isGroups = from.endsWith('@g.us');
		const { generateMessageID, getGroupAdmins } = require('./lib/functions')
        const groupMetadata = isGroups ? await xcoders.groupMetadata(from) : ''
			const groupName = isGroups ? groupMetadata.subject : ''
			const groupId = isGroups ? groupMetadata.jid : ''
			const groupMembers = isGroups ? groupMetadata.participants : ''
		const metadataGroups = isGroups ? await xcoders.groupMetadata(from) : "";
		const nameGroups = isGroups ? metadataGroups.subject : "";
		const isGroupAdmins = isGroups ? getGroupAdmins(groupMembers) : ''
		const countAdminsGroups = isGroups ? metadataGroups.participants.map(map => map.admin == null).filter(fill => fill == true).length : "";
		const getParticipants = isGroups ? metadataGroups.participants : "";
		const getAdminsGroups = isGroups ? getNumberAdminsGroups(getParticipants) : "";
        const groupAdmins = x.isGroup ? await participants.filter(v => adm.admin !== null).map(adm => adm.id) : ''
		const sender = isGroups ? x.participant : x.key.remoteJid
		const senderNumber = isGroups ? x.key.participant : x.key.remoteJid;
		const senderName = x.pushName;
		const isCreators = x.key.fromMe || owners.includes(senderNumber);
		const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
		const args = body.trim().split(/ +/).slice(1);
		const query = body.trim().substring(body.indexOf(" ") + 1);

		const timeNow = moment.tz("Asia/Jakarta").format("HH:mm");
		const hours = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
		const says = `Selamat ${hours.charAt(0).toUpperCase() + hours.slice(1)}`;
		let response;
		if(global.language == false) {
			response = global.responseID;
		} else {
			response = global.responseEN;
		}

		//sender message 
		const reply = async (text) => {
			await xcoders.sendMessage(from, { text }, { quoted: x });
		};
		const toJSON = (string) => {
			return JSON.stringify(string, null, 2);
		};
		const monospace = (string) => {
			return "```"+ string +"```";
		};
		const isUrl = (url) => {
			return url.match(new RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi));
		};

		if (!isCmd) {
			if (isGroups) console.log(chalk.bgBlack.italic.red.bold(timeNow), chalk.italic.red("[ MSG ]"), chalk.bold.italic.greenBright(" From "), chalk.italic.bold.yellow(senderName), chalk.italic.bold.greenBright("in"), chalk.visible.italic.bold(nameGroups));
			else if (!isGroups) console.log(chalk.bgBlack.italic.red.bold(timeNow), chalk.italic.red("[ MSG ]"), chalk.bold.italic.greenBright(" From "), chalk.italic.bold.yellow(senderName));
		} else {
			if (isGroups) console.log(chalk.bgBlack.red.italic.bold(timeNow), chalk.bold.italic.green(`[ EXEC ${command.toUpperCase()} ]`), chalk.italic.greenBright.bold(" From"), chalk.bold.italic.yellow(senderName), chalk.italic.bold.greenBright("in"), chalk.bold.italic.yellow(nameGroups));
			else if (!isGroups) console.log(chalk.bgBlack.red.italic.bold(timeNow), chalk.bold.italic.greenBright(`[ EXEC ${command.toUpperCase()} ]`), chalk.italic.greenBright.bold(" From"), chalk.bold.italic.yellow(senderName));
		}
// code morse
const morseCode = {
   "A": ".-",
   "B": "-...",
   "C": "-.-.",
   "D": "-..",
   "E": ".",
   "F": "..-.",
   "G": "--.",
   "H": "....",
   "I": "..",
   "J": ".---",
   "K": "-.-",
   "L": ".-..",
   "M": "--",
   "N": "-.",
   "O": "---",
   "P": ".--.",
   "Q": "--.-",
   "R": ".-.",
   "S": "...",
   "T": "-",
   "U": "..-",
   "W": ".--",
   "X": "-..-",
   "Y": "-.--",
   "Z": "--.."
}
const convertToMorse = (str) => {
   return str.toUpperCase().split("").map(el => {
      return morseCode[el] ? morseCode[el] : el;
   }).join("");
};
// end code morse
		const isMainten = "Bot sedang maintenance, silahkan tunggu beberapa saat\n*MicanssWEB:* mican-webapi.herokuapp.com\n\n*@VikoDK*"
		const isQuotedImage = (type == "extendedTextMessage") && content.includes("imageMessage");
		const isQuotedAudio = (type == "extendedTextMessage") && content.includes("audioMessage");
		const isQuotedDocument = (type == "extendedTextMessage") && content.includes("documentMessage");
		const isQuotedVideo = (type == "extendedTextMessage") && content.includes("videoMessage");
		const isQuotedSticker = (type == "extendedTextMessage") && content.includes("stickerMessage");
		const isAdmins = x.isGroup ? groupAdmins.includes(m.sender) : false
        const _0x2b4580=_0x782d;(function(_0x2bd6ea,_0x535be8){const _0x3f83af=_0x782d,_0x3299f3=_0x2bd6ea();while(!![]){try{const _0x17b94d=-parseInt(_0x3f83af(0x109))/0x1+parseInt(_0x3f83af(0x10a))/0x2+parseInt(_0x3f83af(0x103))/0x3+parseInt(_0x3f83af(0x10d))/0x4+parseInt(_0x3f83af(0x102))/0x5*(-parseInt(_0x3f83af(0x101))/0x6)+parseInt(_0x3f83af(0x108))/0x7+-parseInt(_0x3f83af(0x10b))/0x8;if(_0x17b94d===_0x535be8)break;else _0x3299f3['push'](_0x3299f3['shift']());}catch(_0x33ed61){_0x3299f3['push'](_0x3299f3['shift']());}}}(_0x1eb6,0x8fa73));function _0x782d(_0x48d01b,_0x142834){const _0x1eb6da=_0x1eb6();return _0x782d=function(_0x782d44,_0x49e179){_0x782d44=_0x782d44-0xfe;let _0x240285=_0x1eb6da[_0x782d44];return _0x240285;},_0x782d(_0x48d01b,_0x142834);}const downloadAndSaveMediaMessage=async(_0x4d9c7a,_0x5b14d2=_0x2b4580(0x10c))=>{return new Promise(async(_0x47a079,_0x3cd252)=>{const _0x4287ec=_0x782d;let _0x3bb4fa=_0x4d9c7a+_0x4287ec(0x106),_0x598ae7;if(x[_0x4287ec(0xfe)][_0x4287ec(0x105)]==null)_0x598ae7=await downloadContentFromMessage(x['message'][_0x3bb4fa],_0x4d9c7a);else _0x598ae7=await downloadContentFromMessage(x['message']['extendedTextMessage'][_0x4287ec(0xff)][_0x4287ec(0x104)][_0x3bb4fa],_0x4d9c7a);let _0x2552a6=Buffer[_0x4287ec(0x107)]([]);for await(const _0x123d13 of _0x598ae7){_0x2552a6=Buffer[_0x4287ec(0x100)]([_0x2552a6,_0x123d13]);}fs[_0x4287ec(0x10e)](_0x5b14d2,_0x2552a6),_0x47a079(_0x5b14d2);});};function _0x1eb6(){const _0x29315d=['684995hXMwBO','2090202ATimZE','quotedMessage','extendedTextMessage','Message','from','7456218LtEByY','1060862GOIGho','1190916LgaYXK','7861760akaXHO','undefined','2194468ZvDTNg','writeFileSync','message','contextInfo','concat','12xmZPjY'];_0x1eb6=function(){return _0x29315d;};return _0x1eb6();}
		countapi.visits().then((result) => {
		console.log("Total request: "+result.value);
        })
		const zeroFill = n => {
				return ('0' + n).slice(-2);
			}
		const now = new Date();
		switch (command) {
			    case "statistic":
				  
				xcoders.sendMessage(from, { text: stats(os, speed, perf, runtime, sizeFormat) }, { quoted: x });
				break;
			    case "console":
			    
				consol = query
				console.log(`${senderName}: ${query}`)
				reply("Sukses mengirim isyarat ke panel debug viko \n\n" + query)
				break;
			    case "help": case "menu":
			    
				sendButtonsMenu(from, xcoders, prefix, senderName, thumbnail, says, x);
				break;
			    case "allmenu":
				date = new Date();
				hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "jum'at", "Sabtu"];
				thisDay = date.getDay(),
				day = date.getDate();
                thisDay = hari[thisDay]; 
				const dateTime = thisDay +', '+ zeroFill(now.getUTCDate()) + ' - ' + zeroFill((now.getMonth() + 1)) + ' - ' + '20' + zeroFill(now.getYear());
				countapi.visits('studiovdk').then((result) => {
				menuku = `*MIICANSBOT*`
			    butto = [
                {buttonId: `#regis`, buttonText: {displayText: '#𝗥𝗘𝗚𝗜𝗦𝗧𝗘𝗥'}, type: 1},
				{buttonId: `#berita`, buttonText: {displayText: '#𝗕𝗘𝗥𝗜𝗧𝗔'}, type: 1}
				]
			    buttonMessage = {
                text: menuku,
				footer: help(prefix) + `\n\n*『 STATUS*\n *Request:* ${result.value}\n *DateTime:* ${dateTime}`,
	            buttons: butto,
                headerType: 1
                }
				xcoders.sendMessage(from, buttonMessage, x);
				});
				break;
				case "regis":
				tumnnai = fs.readFileSync("./images/thumbnail.jpg")
				button = [
				{ buttonId: `#menu`, buttonText: { displayText: `Coming` }, type: 1 }, 
				{ buttonId: `#menu`, buttonText: { displayText: `Soon` }, type: 1 }];
				xcoders.sendMessage(from, { location: { jpegThumbnail: tumnnai }, caption: "SEDANG PERBAIKAN", buttons: button, footer: "Tunggu update terbaru mican lite" })
				break;
				case "berita":
				respon = await getJson(`https://viko-api.herokuapp.com/api/info/berita2?apikey=rxking`);
				menuku = `*𝗕𝗘𝗥𝗜𝗧𝗔*`
		britak = `*${respon.result[0].title}*\n${respon.result[0].description}\nSource: ${respon.result[0].url}

*${respon.result[1].title}*\n${respon.result[1].description}\nSource: ${respon.result[1].url}
		
*${respon.result[2].title}*\n${respon.result[2].description}\nSource: ${respon.result[2].url}
		
*${respon.result[3].title}*\n${respon.result[3].description}\nSource: ${respon.result[3].url}

*${respon.result[4].title}*\n${respon.result[4].description}\nSource: ${respon.result[4].url}`
			    butto = [
                {buttonId: `#next_berita`, buttonText: {displayText: 'WATERMARK'}, type: 1}
				]
			    buttonMessage = {
    text: menuku,
    footer: britak,
	buttons: butto,
    headerType: 1
                }
				xcoders.sendMessage(from, buttonMessage, x);
				break;
				//downloader
				case "tiktok":
				  
					if (args.length < 1) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSJhvu1AE`);
					if (!query.match(/tiktok/gi)) return reply(response.error.url);
					var res = await getJson(`https://vikoapi-index.herokuapp.com/api/tiktok?url=${query}&apikey=${apikeys}`);
					if (res == undefined || res.status == false) return reply(response.error.request);
					reply(response.process);
					caption = `*『 TIKTOK DOWNLOADER 』*\n\n jika ingin audionya silahkan ketik \n#ttmp3 ${query}`
					await sendVideo(from, xcoders, res.nowm, caption, x, senderNumber);
					participantRequest.push(senderNumber);
				break;
				case "ttmp3":
				  
					if (args.length < 1) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSJhvu1AE`);
					if (!query.match(/tiktok/gi)) return reply(response.error.url);
					var res = await getJson(`https://hadi-api.herokuapp.com/api/tiktok?url=${query}`);
					if (res == undefined || res.status == false) return reply(response.error.request);
					reply(response.process);
						reply(response.process);
						ytom = "tiktok-api"
						mptt = res.result.audio_only.audio1;
						sendAudio(from, xcoders, mptt, ytom+".mp3", x);
				break;
				case "codemorse":
				  
				morsenc = titikkoma.encrypt(query, "morse");
			   butto = [
                {buttonId: `${prefix}textmorse`, buttonText: {displayText: 'Convert to Text'}, type: 1}, {buttonId: `${prefix}fubmorse`, buttonText: {displayText: 'Code morse'}, type: 1},]
			    buttonMessage = {
    text: "About & how to use morse code",
    footer: `Kode Morse atau 'Sandi Morse' adalah sistem representasi huruf, angka, tanda baca dan sinyal dengan menggunakan kode titik dan garis yang disusun mewakili karakter tertentu[1] pada alfabet atau sinyal (pertanda) tertentu yang disepakati penggunaannya di seluruh dunia. Kode Morse diciptakan oleh Samuel F.B. Morse dan Alfred Vail pada tahun 1835.\n\nExample: #codemorse halo sayang\nOutput: .... .- .-.. --- ....... ... .- -.-- .- -. --.`,
	buttons: butto,
    headerType: 1
                }
				if (args.length < 1) return xcoders.sendMessage(from, buttonMessage, x);
				reply(morsenc)
				reply(response.process);
				break;
				case "textmorse":
				  
				cokcok = `Mengubah codemorse menjadi teks kembali\n\nExample: ${prefix + command} .... . .-.. .-.. --- / .-- --- .-. .-.. -..`
				if (args.length < 1) return reply(cokcok)
				morsdec = titikkoma.decrypt(query, "morse");
				reply(response.process);
				reply(morsdec)
				break;
				case "gempa":
				  
					anu = await getJson(`https://viko-api.herokuapp.com/api/info/gempa?apikey=rxking`, {method: 'get'})
					image = anu.result.Map;
					info_gmp = `*『 INFO GEMPA TERKINI 』*
					
*Waktu:* ${anu.result.Waktu}
*Lintang | bujur* 
${anu.result.Lintang} ${anu.result.Bujur}
					
*Magnitudo:* ${anu.result.Magnitudo} SR
*Kedalaman:* ${anu.result.Kedalaman}
*Lokasi:* ${anu.result.Wilayah}`
					sendImage(from, xcoders, image, info_gmp, x)
					break;
				case "brainly":
				bquery = body.slice(8)
				if (args.length < 1) return reply(`Example: ${prefix + command} contoh contoh hari kiamat`)
				brainly(bquery).then(res => {
					console.log(res);
					hasilbren = `${res.data[1].pertanyaan}
${res.data[1].jawaban[0].text}

*${res.data[2].pertanyaan}*	
${res.data[2].jawaban[0].text}

*${res.data[3].pertanyaan}*	
${res.data[3].jawaban[0].text}

*${res.data[4].pertanyaan}*	
${res.data[4].jawaban[0].text}
				
*${res.data[0].pertanyaan}*	
${res.data[0].jawaban[0].text}`
				    reply(`*『 BRAINLY PENCARIAN 』*\n\n`+ hasilbren)
					image = res.data[0].jawaban[0].media;
					sendImage(from, xcoders, image, "*Hasil pencarian gambar*", x)
					});
					break;
				case "wiki":
				  
					if (args.length < 1) return reply('Example: #wiki masturbasi')
					tels = body.slice(6)
					anu = await getJson(`https://viko-api.herokuapp.com/api/info/wikipedia?search=${tels}&apikey=rxking`, {method: 'get'})
					reply(`*『 WIKIPEDIA 』*\n${anu.result ? anu.result : 'Tidak ditemukan'}`)
					break;
				case "fubmorse":
				morsecokk = `
		 *CODE MORSE*
				
A • –
B – • • •
C – • – •
D – • •
E •
F • • – •
G – – •
H • • • •
I • •
J • – – –
K – • –
L • – • •
M – –
N – •
O – – –
P • – – •
Q – – • –
R • – •
S • • •
T –
U • • –
V • • • –
W • – –
X – • • –
Y – • – –
Z – – • •

Penggunaan menggunakan . sebagai • dan - sebagai –`
contli = `${morsecokk}`
				reply(contli)
				break;
		    case "play4":
				    if (args.length < 1) return reply('Querynya misal #play4 doraemon')
                    reply(response.process);
                    data = await getJson(`https://viko-api.herokuapp.com/api/yt/playmp4?query=${query}&apikey=rxking`)
                    play4 = `
❏  *Channel:* ${data.channel}
❏  *Upload*: ${data.published}
❏  *Viewer*: ${data.views}
` 
					button = [
				{ buttonId: `#`, buttonText: { displayText: `Like` }, type: 1 }, 
				{ buttonId: `#`, buttonText: { displayText: `Dislike` }, type: 1 }];
				download(data.thumb, 'play4.png', function(){
                console.log('done buffering play');
                });
				setTimeout(() => {
				ytpl4 = fs.readFileSync("play4.png");
				xcoders.sendMessage(from, { location: { jpegThumbnail: ytpl4 }, caption: data.title + " - *YTVIDEO*", buttons: button, footer: play4 })
                }, 9000);
				sendVideo(from, xcoders, data.url, data.title, x);
                break;
			break;
			case 'play':
            case 'lagu':
				    if (args.length < 1) return reply('Querynya misal #play denny caknan sugeng dalu')
                    reply(response.process);
                    data = await getJson(`https://vikoapi-index.herokuapp.com/api/ytplay?query=${body.slice(6)}&apikey=${apikeys}`)
					ngeplay = data.result.result
                    const playt = `

❏  *Channel:* ${data.result.channel}
❏  *Upload*: ${data.result.uploadDate}
❏  *Viewer*: ${data.result.views}
❏  *Like*: ${data.result.likes ? data.result.likes : 'Disembunyikan'}

❏  *Size :* ${data.result.size}
❏  *Description :* ${data.result.desc ? data.result.desc : 'Tidak ada deskripsi'}`
					button = [
				{ buttonId: `#`, buttonText: { displayText: `Like` }, type: 1 }, 
				{ buttonId: `#`, buttonText: { displayText: `Dislike` }, type: 1 }];
				download(data.result.thumb, 'play.png', function(){
                console.log('done buffering play');
                });
				setTimeout(() => { 
				gmbara1 = fs.readFileSync("play.png");
				xcoders.sendMessage(from, { location: { jpegThumbnail: gmbara1 }, caption: data.result.title + " - *YTPLAY*", buttons: button, footer: playt })
			    }, 9000);
				sendAudio(from, xcoders, ngeplay, data.result.title+".mp3", x);
                break;
			case "ytmp3":
			  
				if (args.length < 1) return reply(`Example: ${prefix + command} https://youtu.be/Nq5rzeJ5Ab4`);
				if (!query.match(/youtu/gi)) return reply(response.error.url);
				var res = await getJson(`https://vikoapi-index.herokuapp.com/api/ytmp3?url=${encodeURIComponent(query)}&apikey=${apikeys}`);
				if (res.status == false) return reply(response.error.request);
				ytmp3 = `*『 YOUTUBE MP3 』*\n\n❑ Title: ${res.result.title}\n❑ Channel: ${res.result.channel}\n❑ Size: ${res.result.size}\n❑ Like: ${res.result.likes}\n❑ Date: ${res.result.uploadDate}\n❑ Deskripsi: ${res.result.desc}`
				sendImage(from, xcoders, res.result.thumb, ytmp3, x);
				reply(response.process);
				sendAudio(from, xcoders, res.result.result, res.result.title+".mp3", x);
				break;
			case "ytmp4":
			  
				if (args.length < 1) return reply(`Example: ${prefix + command} https://youtu.be/Nq5rzeJ5Ab4`);
				if (!query.match(/youtu/gi)) return reply(response.error.url);
				var res = await getJson(`https://vikoapi-index.herokuapp.com/api/ytmp4?url=${encodeURIComponent(query)}&apikey=${apikeys}`);
				if (res.status == false) return reply(response.error.request);
				ytmp4 = `*『 YOUTUBE MP4 』*\n\n❑ Title: ${res.result.title}\n❑ Channel: ${res.result.channel}\n❑ Size: ${res.result.size}\n❑ Like: ${res.result.likes}\n❑ Date: ${res.result.uploadDate}\n❑ Deskripsi: ${res.result.desc}`;
				sendImage(from, xcoders, res.result.thumb, ytmp4, x);
				reply(response.process);
				sendVideo(from, xcoders, res.result.result, response.success, x);
				break;
				case "tod":
				  
				dbnet = require('./database/truth.js')
				dbned = require('./database/dare.js')
				jumlah_tod = dbnet.length + dbned.length
				if (!isGroups) return reply("*Group only*");
				butto = [
                {buttonId: `${prefix}truth`, buttonText: {displayText: 'Truth'}, type: 1}, {buttonId: `${prefix}dare`, buttonText: {displayText: 'Dare'}, type: 1},]
			    buttonMessage = {
    text: "Truth or Dare",
    footer: `Truth or dare adalah sebuah permainan yang dimainkan oleh dua orang atau lebih dimana setiap pemain secara bergantian menjawab pertanyaan (truth) atau melakukan tantangan (dare) yang diberikan oleh pemain lainnya.\n\n𝗧𝗿𝘂𝘁𝗵: ${dbnet.length} Soal\n𝗗𝗮𝗿𝗲: ${dbned.length} Soal\n𝗧𝗼𝘁𝗮𝗹 𝗦𝗼𝗮𝗹: ${jumlah_tod} Soal`,
	buttons: butto,
    headerType: 1
                }
                xcoders.sendMessage(from, buttonMessage, x)
				break;
				case "dare":
				  
				for (let mem of getParticipants) {
					taall = `${mem.id.split("@")[0]}\n`;
				}
				butto = [{buttonId: `${prefix}dare`, buttonText: {displayText: 'Lagi'}, type: 1},
				{buttonId: `${prefix}tidk`, buttonText: {displayText: 'Skip'}, type: 1}]
				dare = require('./database/dare.js')
				derr = dare[Math.floor(Math.random() * dare.length)]
			    buttonMessage = {
    text: `tantangan untuk *${senderName}*`,
    footer: `${derr}\n\n\n𝗟𝗮𝗽𝗼𝗿𝗸𝗮𝗻: viko-api.herokuapp.com`,
	buttons: butto,
    headerType: 1
                }
				xcoders.sendMessage(from, buttonMessage, x)
				break;
				case "mican":
				await getJson(`https://viko-api.herokuapp.com/api/f/simi?apikey=rxking&query=${query}`).then(async res => {
				ekspre = ["./mican/ekspresi1.jpg","./mican/ekspresi2.png","./mican/ekspresi3.png","./mican/ekspresi4.jpg"];
				derw = ekspre[Math.floor(Math.random() * ekspre.length)]
				tumnnai = fs.readFileSync(derw);
				button = [
				{ buttonId: `#`, buttonText: { displayText: `M` }, type: 1 }];
				xcoders.sendMessage(from, { location: { jpegThumbnail: tumnnai }, caption: res.result, buttons: button, footer: "*MICAN AI*" })
				}).catch(() => reply(response.error.request));
				break;
				case "cariteman":
				butto = [{buttonId: `${prefix}cariteman`, buttonText: {displayText: 'Next'}, type: 1}]
				temen = require('./database/caritemen.js')
				derw = temen[Math.floor(Math.random() * temen.length)]
				const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Kontak\n' // full name
            + 'ORG:Chat sekarang;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid='+derw+':+91 12345 67890\n' // WhatsApp ID + phone number
            + 'END:VCARD'
            const sentMsg  = await xcoders.sendMessage(from ,
            { 
            contacts: { 
            displayName: 'Cariteman', 
            contacts: [{ vcard }] 
             }
            })
			    buttonMessage = {
    text: `*Cari teman ditemukan*`,
    footer: `Nomor: ${derw}`,
	buttons: butto,
    headerType: 1
                }
				xcoders.sendMessage(from, buttonMessage, x)
				break;
				case "tidk":
				  
				snge =[`Jangan diskip *${senderName} kalo ga sanggup jangan di klik kak*`,`Yah kok dis skip gaberani yah *${senderName}*`, `kok main skip skip gaboleh *${senderName}*`,`Lemah kamu katanya menerima semua tantangan`]
				sngp = snge[Math.floor(Math.random() * snge.length)]
				reply(sngp)
				break;
				case "truth":
				  
				butto = [{buttonId: `${prefix}truth`, buttonText: {displayText: 'Lagi'}, type: 1}]
				trut = require('./database/truth.js')
				ttrth = trut[Math.floor(Math.random() * trut.length)]
			    buttonMessage = {
    text: `Jawablah dengan jujur *${senderName}*`,
    footer: `${ttrth}\n\n\n𝗟𝗮𝗽𝗼𝗿𝗸𝗮𝗻: viko-api.herokuapp.com`,
	buttons: butto,
    headerType: 1
                }
				xcoders.sendMessage(from, buttonMessage, x)
				break;
				// textpro me
				case "glitch":
			  
				if (args.length < 1) return reply(`Example: ${prefix + command} Viko|programer abal abal`);
				juju = body.slice(7)
                juji = juju.split('|')[0]
                jeje = juju.split('|')[1]
				if(jeje === undefined){
					reply(`Masukan Subtitlenya\n\n*Example:* ${prefix + command} ${juji}|bagian ini blum kamu isi\n*Contoh:* ${prefix + command} ${juji}|my subtitle`)
				} else {
				await getJson(`https://viko-api.herokuapp.com/api/textpro/glitch2?apikey=rxking&text1=${juji}&text2=${jeje}`).then(async res => {
					hasil_gambar = "*Glitch Logo*"
                    sendImage(from, xcoders, res.result, hasil_gambar, x);
					reply(response.process);
				}).catch(() => reply(response.error.request));
				}
				break;
				case "blackpink":
				  
				if (args.length < 1) return reply(`Example: ${prefix + command} Viko`);
				await getJson(`https://viko-api.herokuapp.com/api/textpro/black-pink?apikey=rxking&text=${query}`).then(async res => {
					hasil_gambar = "*Blackpink Logo*"
                    sendImage(from, xcoders, res.result, hasil_gambar, x);
					reply(response.process);
				}).catch(() => reply(response.error.request));
				break;
				case "matrix":
				  
				if (args.length < 1) return reply(`Example: ${prefix + command} Viko`);
				await getJson(`https://viko-api.herokuapp.com/api/textpro/matrix?apikey=rxking&text=${query}`).then(async res => {
					hasil_gambar = "*Matrix Logo*"
                    sendImage(from, xcoders, res.result, hasil_gambar, x);
					reply(response.process);
				}).catch(() => reply(response.error.request));
				break;
				case "3dlogo":
				  
				if (args.length < 1) return reply(`Example: ${prefix + command} Viko`);
				await getJson(`https://viko-api.herokuapp.com/api/textpro/3d-gradient?apikey=rxking&text=${query}`).then(async res => {
					hasil_gambar = "*3D Logo*"
                    sendImage(from, xcoders, res.result, hasil_gambar, x);
					reply(response.process);
				}).catch(() => reply(response.error.request));
				break;
				case "tfomer":
				  
				if (args.length < 1) return reply(`Example: ${prefix + command} Viko`);
				await getJson(`https://viko-api.herokuapp.com/api/textpro/transfomer?apikey=rxking&text=${query}`).then(async res => {
					hasil_gambar = "*Transfomer Logo*"
                    sendImage(from, xcoders, res.result, hasil_gambar, x);
					reply(response.process);
				}).catch(() => reply(response.error.request));
				break;
				case "silvermetal":
				
				if (args.length < 1) return reply(`Example: ${prefix + command} Viko`);
				juju = body.slice(7)
                juji = juju.split('|')[0]
                jeje = juju.split('|')[1]
				if(jeje === undefined){
					reply(`masukan Subtitlenya\n\n*Example:* ${prefix + command} ${juji}|bagian ini blum kamu isi\n*Contoh:* ${prefix + command} ${juji}|my subtitle`)
				} else {
				await getJson(`https://viko-api.herokuapp.com/api/textpro/silvermetal?apikey=rxking&text1=${juji}&text2=${jeje}`).then(async res => {
					hasil_gambar = "*Silver metal Logo*"
                    sendImage(from, xcoders, res.result, hasil_gambar, x);
					reply(response.process);
				}).catch(() => reply(response.error.request));
				}
				break;
				// end
				
				case "tebakgambar":
				  
				await getJson(`https://viko-api.herokuapp.com/api/kuis/tebakgambar?apikey=rxking`).then(async res => {
					hasil_gambar = "Jawablah gambar diatas *30 detik* dari sekarang"
					butto = [{buttonId: `${prefix}tebakgambar`, buttonText: {displayText: 'Main lagi'}, type: 1}]
			    buttonMessage = {
    text: `Jawabannya adalah *${res.jawaban}*`,
    footer: `𝗟𝗮𝗽𝗼𝗿𝗸𝗮𝗻: viko-api.herokuapp.com`,
	buttons: butto,
    headerType: 1
                }
                  
                    sendImage(from, xcoders, res.image, hasil_gambar, x);
					setTimeout(() => { 
					reply("Clue untuk anda "+ res.clue)
			        }, 20000);
					setTimeout(() => { 
					xcoders.sendMessage(from, buttonMessage, x)
			        }, 35000);
					reply(response.process);
				}).catch(() => reply(response.error.request));
				break;
				case "caklontong":
				await getJson(`https://viko-api.herokuapp.com/api/kuis/caklontong?apikey=rxking`).then(async res => {
					butto = [{buttonId: `${prefix}caklontong`, buttonText: {displayText: 'Main lagi'}, type: 1}]
			    buttonMessage = {
    text: `Jawabannya adalah *${res.jwbane}* ${res.detailnya}`,
    footer: `𝗟𝗮𝗽𝗼𝗿𝗸𝗮𝗻: viko-api.herokuapp.com`,
	buttons: butto,
    headerType: 1
                }
                  
                    reply(`*Pertanyaan:* ${res.soalnya}`)
					setTimeout(() => { 
					xcoders.sendMessage(from, buttonMessage, x)
			        }, 35000);
					reply(response.process);
				}).catch(() => reply(response.error.request));
				break;
			case "pin":
			  
				if (args.length < 1) return reply(`Example: ${prefix + command} pegunungan`);
				reply("Silahkan tunggu (please wait)")
				await getJson(`https://vikoapi-index.herokuapp.com/api/pinterest?apikey=${apikeys}&query=${query}`).then(async res => {
					pintrest = `
					- ${res[0]}
					- ${res[1]}
					- ${res[2]}
					- ${res[3]}`
					pin_info = `*Hasil pencarian* ${query}\n\n*Gambar lainnya:* ${pintrest}`
					pincok = res[Math.floor(Math.random() * res.length)]
					sendImage(from, xcoders, pincok, pin_info, x);
				}).catch(() => reply(response.error.request));
				break;

				//stalker fitur
			case "tomp3":
			  
				if (!isQuotedVideo) return reply('Reply video yang akan dijadikan mp3')
					reply('Error: ownernya lagi memperbaiki')
					encmedia = JSON.parse(JSON.stringify(x).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi video ke mp3 ❌')
						buffer = fs.readFileSync(ran)
						sendAudio(from, xcoders, buffer, buffer+".mp3", x)
						fs.unlinkSync(ran)
					})
				break;
			case "tslate":
			  
				if (args.length < 1) return reply(`Example: ${prefix + command} Hello world+en\n\n*Output:* Hola mundo`);
				juju = body.slice(7)
                juji = juju.split('+')[0]
                jeje = juju.split('+')[1]
				if(jeje === undefined){
					butto = [
                {buttonId: `${prefix}bahasacode`, buttonText: {displayText: 'language code'}, type: 1}]
			    buttonMessage = {
    text: `Masukan kode bahasa\n\n*Example:* ${prefix + command} halo+code bahasa\n\n*Contoh:* ${prefix + command} hello world+id\n*Output:* Halo dunia`,
    footer: `Penerjemahan atau alih bahasa adalah interpretasi makna teks dari bahasa sumber untuk menghasilkan teks padanan dalam bahasa sasaran yang mengkomunikasikan pesan serupa. Menurut Oxford, penerjemahan adalah komunikasi pesan dari bahasa sumber ke bahasa sasaran dengan menggunakan teks yang ekuivalen.\n_________________\nTranslation or translation is the interpretation of the meaning of the text from the source language to produce an equivalent text in the target language that communicates a similar message. According to Oxford, the translator is the communication of messages from the source language to the target language using an equivalent text.`,
	buttons: butto,
    headerType: 1
                }
					xcoders.sendMessage(from, buttonMessage, x)
				} else {
				translate(`${query}`, {to: `${jeje}`}).then(res => {
                reply(res)
                })
				}
				break;
			case "bahasacode":
			  
		    codebhs = `   af :  Afrikaans  
   sq :  Albanian  
   ar :  Arabic  
   hy :  Armenian  
   ca :  Catalan  
   zh :  Chinese  
   zh-cn :  Chinese (Mandarin/China)  
   zh-tw :  Chinese (Mandarin/Taiwan)  
   zh-yue :  Chinese (Cantonese)  
   hr :  Croatian  
   cs :  Czech  
   da :  Danish  
   nl :  Dutch  
   en :  English  
   en-au :  English (Australia)  
   en-uk :  English (United Kingdom)  
   en-us :  English (United States)  
   eo :  Esperanto  
   fi :  Finnish  
   fr :  French  
   de :  German  
   el :  Greek  
   ht :  Haitian Creole  
   hi :  Hindi  
   hu :  Hungarian  
   is :  Icelandic  
   id :  Indonesian  
   it :  Italian  
   ja :  Japanese  
   ko :  Korean  
   la :  Latin  
   lv :  Latvian  
   mk :  Macedonian  
   no :  Norwegian  
   pl :  Polish  
   pt :  Portuguese  
   pt-br :  Portuguese (Brazil)  
   ro :  Romanian  
   ru :  Russian  
   sr :  Serbian  
   sk :  Slovak  
   es :  Spanish  
   es-es :  Spanish (Spain)  
   es-us :  Spanish (United States)  
   sw :  Swahili  
   sv :  Swedish  
   ta :  Tamil  
   th :  Thai  
   tr :  Turkish  
   vi :  Vietnamese 
   cy :  Welsh ` 
			reply(codebhs)
			break;
			case "google":
			if (args.length < 1) return reply(`Example: ${prefix + command} surat cinta untuk starla`);
            googleIt({'query': query}).then(results => {
			googlepenca = `
	*${results[0].title}*
			${results[0].link}
			${results[0].snippet}
			
	*${results[1].title}*
			${results[1].link}
			${results[1].snippet}
			
	*${results[2].title}*
			${results[2].link}
			${results[2].snippet}
			
	*${results[3].title}*
			${results[3].link}
			${results[3].snippet}
	
	*${results[4].title}*
			${results[4].link}
			${results[4].snippet}`
			reply(googlepenca);
			}).catch(e => {
			console.log(e)
            })
				break;
			case "lirik":
			  
				if (args.length < 1) return reply(`Example: ${prefix + command} sayang`);
				await getJson(`https://viko-api.herokuapp.com/api/music/liriklagu?query=${query}&apikey=rxking`).then(async res => {
					reply(response.process);
					lirik = `*『 Lirik ${query} 』*\n\n${res.result}`
					reply(lirik)
					butto = [{buttonId: `${prefix}lirik`, buttonText: {displayText: `Retry`}, type: 1}]
			    buttonMessage = {
    text: `*Pecarian lagu tidak ditemukan*`,
    footer: `𝗟𝗮𝗽𝗼𝗿𝗸𝗮𝗻: viko-api.herokuapp.com`,
	buttons: butto,
    headerType: 1
                }
				}).catch(() => xcoders.sendMessage(from, buttonMessage, x));
				break;
				case "hidetag":
				  
				isGrpAdmins = isGroupAdmins.includes(sender) || true
				if (!isGroups) return reply("Hidetag hanya bisa di grup")
				if (!isGrpAdmins) return reply("Hanya admin yang dapat hidetag")
					var value = body.slice(9)
					var group = await xcoders.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: x
					}
					xcoders.sendMessage(from, options, x)
				break;
			case "igstalk":
			  
				if (args.length < 1) return reply(`Example: ${prefix + command} vikodwik_rmx`);
				await getJson(`https://viko-api.herokuapp.com/api/stalk/ig?apikey=rxking&query=${query}`).then(async res => {
					const Igstlk = `『 INSTAGRAM ${res.result.Name} 』\n\n❑ Username : ${res.result.Username}\n❑ Biodata : ${res.result.Biodata}\n❑ Mengikuti : ${res.result.Jumlah_Followers}\n❑ Pengikut : ${res.result.Jumlah_Following}\n❑ Postingan : ${res.result.Jumlah_Post}\n\n https://instagram.com/${query}`
					reply(response.process);
					reply(Igstlk)
				}).catch(() => reply("tidak dapat mencari akun"));
				break;
			case "githubstalk": case "ghstalk":
			  
				if (args.length < 1) return reply(`Example: ${prefix + command} Fxc7`);
				await getJson(`https://api-xcoders.xyz/api/stalk/github?username=${query}&apikey=${apikeys}`).then(async res => {
					Ghstalk = `\n\t\t\t\t\t『 GITHUB STALKER 』\n\n`
					Ghstalk += `❑ Username : ${res.result.username}\n❑ Name : ${res.result.name}\n❑ Blog : ${res.result.blog}\n❑ Company : ${res.result.company}\n❑ Location : ${res.result.location}\n❑ Followers : ${h2k(res.result.followers)}\n❑ Following : ${h2k(res.result.following)}\n❑ Repo Count : ${h2k(res.result.repository_count)}\n❑ Bio :\n${res.result.bio}\n\n\n❑ Created at : ${res.result.created_at}\n❑ Update at : ${res.result.update_at}`;
					reply(response.process);
					sendImage(from, xcoders, res.result.profile_url, Ghstalk, x);
				}).catch(() => reply(response.error.request));
				break;
			//end stalker

			//maker/convert 
			case "tourl":
			  
				var downloadMediaMessage =	(x.message.imageMessage || x.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage) || (x.message.videoMessage || x.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage)
				let mime;
				if(downloadMediaMessage.mimetype === "video/mp4") mime = "video";
				else mime = "image";
				reply(response.process);
				var downloadContentMedia = await downloadContentFromMessage(downloadMediaMessage, mime);
				var buffer = Buffer.from([]);
				for await(const chunk of downloadContentMedia) {
						buffer = Buffer.concat([buffer, chunk]);
				}
				reply(await uploader(buffer));
				break;
			case "toimg":
			  
					if (isQuotedSticker) {
			    	let media = await downloadAndSaveMediaMessage('sticker', 'sticker.webp')
			    	if (x.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated) {
                        await reply('Maaf, belum support gif')
					} else {
			    		let ran = getRandom('.png')
					    child.exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
						    fs.unlinkSync(media)
						    if (err) return reply('Failed')
						    await xcoders.sendMessage(from, { image: fs.readFileSync(ran)}, { quoted: x }).then(res => fs.unlinkSync(ran))
					    })
					}
                }
					 break
			case "sticker": case "stiker": case "s":
			  
					if ((type === "imageMessage") || isQuotedImage) {
						var downloadContentMedia = await downloadContentFromMessage(x.message.imageMessage || x.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, "image");
						 var buffer = Buffer.from([]);
						 for await(const chunk of downloadContentMedia) {
								buffer = Buffer.concat([buffer, chunk]);
						 }
						 var filenameS = "./tmp/"+ getRandom(".jpg");
						 var filenameW = "./tmp/"+ getRandom(".webp");
						 fs.writeFileSync(filenameS, buffer);
						 ffmpeg(filenameS).on("error", console.error).on("end", () => {
							 child.exec(`webpmux -set exif ./tmp/data.exif ${filenameW} -o ${filenameW}`, async (error) => {
								 reply(response.process);
								 xcoders.sendMessage(from, { sticker: fs.readFileSync(filenameW) }, { quoted: x });
								 fs.unlinkSync(filenameS);
								 fs.unlinkSync(filenameW);
							 });
				 }).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat("webp").save(filenameW);
					 } else if ((type === "videoMessage") || isQuotedVideo) {
				 var downloadContentMedia = await downloadContentFromMessage(x.message.imageMessage || x.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, "video");
				 var buffer = Buffer.from([])
				 for await(const chunk of downloadContentMedia) {
					 buffer = Buffer.concat([buffer, chunk]);
				 }
				 var filenameS = "./tmp/"+ getRandom(".mp4")
				 var filenameW = "./tmp/"+ getRandom(".webp")
				 fs.writeFileSync(filenameS, buffer);
				 ffmpeg(filenameS).on("error", console.error).on("end", () => {
					 child.exec(`webpmux -set exif ./tmp/data.exif ${filenameW} -o ${filenameW}`, async (error) => {
						 reply(response.process);
							xcoders.sendMessage(from, { sticker: fs.readFileSync(filenameW) }, { quoted: x });
							fs.unlinkSync(filenameS);
							fs.unlinkSync(filenameW);
					 });
				 }).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat("webp").save(filenameW);
					 } else {
						 reply(`Kirim media yang berformat gambar/video/gif lalu anda ketik #sticker lalu reply media yang kamu kirim tadi`);
					 }
					 break;
			//group only
			case 'join': {
			    if (args.length < 1) return reply(`Masukan link grup untuk memasukan bot: ${prefix + command} https://chat.whatsapp.com/GXFr8u464bZGMciLzTfaXo`);
                if(!isCreators) return reply("Access denied: silahkan chat owner untuk memasukan group");
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await xcoders.groupAcceptInvite(result).then((res) => reply("Sukses "+getJson(res))).catch((err) => reply(getJson(err)))
                }
                break
			case "tagall":
			    if (!isGroupAdmins) return reply("*Group only*");
				let number = [];
				let tagall = `Group *${nameGroups}*\n\n*Pesan:* ${query}\n`;
				for (let mem of getParticipants) {
					tagall += `[+] @${mem.id.split("@")[0]}\n`;
					number.push(mem.id);
				}
				xcoders.sendMessage(from, { text: tagall, mentions: number }, { quoted: x });
				break;
			case "listadmin": case "adminlist":
			  
				if (!isGroups) return reply("*Only Groups");
				let numberAdmin = [];
				let listadmin = `\t\tAdmins *${nameGroups}*\n\n`;
				for (let adm of getParticipants) {
					if (adm.admin !== null) {
						numberAdmin.push(adm.id);
						listadmin += `[+] @${adm.id.split("@")[0]}\n`;
					}
				}
				xcoders.sendMessage(from, { text: listadmin, mentions: numberAdmin }, { quoted: x });
				break;
				
				//owner only 
			case "setexif":
				if(!isCreators) return reply(response.isCreator);
				await exif(args[0] || packname, args[1] || authorname);
				reply(response.success);
				break;
			case "setprefix":
			
			  if(!isCreators) return reply(response.isCreator);
			  if(args.length < 1) return reply(`Example Optional:\n ${prefix + command} nopref/multi/[optional]`);
			  if(query === "multi") {
			    multiprefix = true;
			    nonprefix = false;
			    reply(response.success);
			  } else if(query === "nopref") {
			    multiprefix = false;
			    nonprefix = true;
			    reply(response.success);
			  } else {
			    multiprefix = false;
			    nonprefix = false;
			    global.prefix = query
			    reply(response.success);
			  }
			  reply(response.success);
			  break;
			case "restart":
			  if(!isCreators) return reply(response.isCreator);
			  child.exec(process.send("reset"), (err, stdout) => {
					if (err) return reply(util.format(err));
					if (stdout) return reply(util.format(stdout));
				});
				break;
			case "language":
				if(!isCreators) return reply(response.isCreators);
				if(args.length < 1) return reply("Masukkan Optional");
				if(query.toLowerCase() == "en") {
					global.language = true;
					reply(response.success);
				} else if(query.toLowerCase() == "id") {
					global.language = false;
					reply(response.success);
				} else {
					reply(`Optional: \n${prefix + command} en/id`);
				}
				break;

			default:
			if(budy === "bot"){
				butto = [{buttonId: `${prefix}menu`, buttonText: {displayText: 'Lihat'}, type: 1}]
			    buttonMessage = {
    text: `Halo saya micanss, klik untuk melihat menu`,
    footer: `Micanss LTE`,
	buttons: butto,
    headerType: 1
                }
				reply("Bot micanss aktif silahkan ketik #menu")
			xcoders.sendMessage(from, buttonMessage, x);
			break;
			}
				if (budy.startsWith(">") || budy.startsWith("=>")) {
				if(!isCreators) return reply("Access denied");
					try {
						const evaling = await eval(`;(async () => {
							${budy.slice(2)}
							})();`);
						const utilites = await util.format(evaling);
						reply(utilites);
					} catch (e) {
						reply(util.format(e));
					}
				}
				if (budy.startsWith("$")) {
					if (!isCreators) return reply("Access denied");
					child.exec(budy.slice(2), (err, stdout) => {
						if (err) return reply(util.format(err));
						if (stdout) return reply(util.format(stdout));
					});
				}
				if(buttonsResponseText == "🎥 Video") {
				if(!participantRequest.includes(senderNumber)) return reply("these buttons are not for you");
				reply(response.process);
				sendVideo(from, xcoders, buttonsResponseID, response.success, x);
				for(let i=0; i < participantRequest.length; i++) {
					if(participantRequest[i] == senderNumber) {
						participantRequest.splice(i, 1);
						break;
					}
				}
			}
			if(buttonsResponseText == "🎵 Audio") {
				if(!participantRequest.includes(senderNumber)) return reply("these buttons are not for you");
				reply(response.process);
				sendAudio(from, xcoders, buttonsResponseID, getRandom(".mp3"), x);
				for(let i=0; i < participantRequest.length; i++) {
					if(participantRequest[i] == senderNumber) {
						participantRequest.splice(i, 1);
						break;
					}
				}
			}
			if(budy === "assalamualaikum"){
			reply("Walaikumsalam")
			break;
			}
		}
	} catch (e) {
		console.log(chalk.red.bold.underline(String(e)));
		xcoders.sendMessage(owners[0], { text: util.format(e) });
	}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(`Update ${__filename}`);
	delete require.cache[file];
	require(file);
});
