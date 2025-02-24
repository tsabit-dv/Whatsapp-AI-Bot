require('dotenv').config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.API_KEY
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"]
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("🤖 Bot siap menerima pesan!");
});


client.on("message", async (message) => {
  try {
    if (!message.fromMe && message.body.startsWith("!ai")) {
      const startTime = Date.now(); 
      const prompt = message.body.slice(4).trim();

      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "mixtral-8x7b-32768"
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const tokensUsed = response.usage?.total_tokens || 'N/A';
      
      const aiMessage = `${response.choices[0].message.content}\n\n` +
                        `[⏱ ${responseTime}ms | 🪙 ${tokensUsed} tokens]`;

      if (message.isGroupMsg) {
        const chat = await message.getChat();
        await chat.sendMessage(
          `@${message.author.replace(/@.+/, "")} ${aiMessage}`,
          { mentions: [message.author] }
        );
      } else {
        message.reply(aiMessage);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    message.reply(`❌ Gagal memproses: ${error.message}`);
  }
  
// Tag All In Progress
//   try {

//     if (message.body === '!tagall' && message.isGroupMsg) {
//       const chat = await message.getChat();

//       const participants = await chat.participants;
//       const botNumber = client.info.me.user; 

//       const members = participants
//         .filter(member => member.id._serialized !== botNumber)
//         .map(member => member.id._serialized);

//       if (members.length === 0) return message.reply('Tidak ada anggota grup 😢');

//       await chat.sendMessage(
//         `🏷️ *Tag All Members* 🏷️\n` +
//         `${members.map(m => `@${m.split('@')[0]}`).join(' ')}`,
//         {
//           mentions: members 
//         }
//       );
//     }
//   } catch (error) {
//     console.error('Tag All Error:', error);
//     message.reply('Gagal melakukan tag all ⚠️');
//   }
});

client.initialize();
