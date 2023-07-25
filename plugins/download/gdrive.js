const { decode } = require('html-entities')
const fg = require('api-dylux')
exports.run = {
   usage: ['gdrive'],
   hidden: ['gd'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://drive.google.com/file/d/1xMh-XiqyTvcYgBy-_11umWSbo20Yf-8E/view?usp=drivesdk'), m)
         if (!args[0].match(/(https:\/\/www.mediafire.com\/)/gi)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '💛', m.key)
         let old = new Date()
         let json = await fg.GDriveDl(args[0])
       //if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let text = `乂 *G - D R I V E*\n\n`
         text += '	◦  *Name* : ' + unescape(decode(json.fileName)) + '\n'
         text += '	◦  *Size* : ' + json.fileSize + '\n'
         text += '	◦  *Mime* : ' + json.mimetype + '\n'
         text += `	◦  *Fetching* : ${((new Date - old) * 1)} ms\n\n`
         text += global.footer
         let chSize = Func.sizeLimit(json.size, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `💀 File size (${json.fileSize}) exceeds the maximum limit, download it by yourself via this link : ${await (await Api.tinyurl(json.url)).data}`, m)
         client.sendMessageModify(m.chat, text, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/157ba232b3c8a2b06b004.png')
         }).then(async () => {
            client.sendFile(m.chat, json.downloadUrl, unescape(decode(json.fileName)), '', m)
         })
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}