const { decode } = require('html-entities')
exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('mediafire', m.sender)
               links.map(async link => {
                  let json = await Api.mediafire(link)
                  const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status))  return client.reply(m.chat, Func.jsonFormat(json), m)
                  let text = `乂  *M E D I A F I R E*\n\n`
         text += '	◦  *Name* : ' + unescape(decode(json.result.filename)) + '\n'
         text += '	◦  *Size* : ' + json.result.filesize + '\n'
         text += '	◦  *Extension* : ' + json.result.filetype + '\n'
         text += '	◦  *Uploaded* : ' + json.result.uploaded + '\n\n'
         text += global.footer
         let chSize = Func.sizeLimit(json.result.filesize, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `💀 File size (${json.result.filesize}) exceeds the maximum limit, download it by yourself via this link : ${await (await scrap.shorten(json.result.link)).data.url}`, m)
         client.sendMessageModify(m.chat, text, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/fcf56d646aa059af84126.jpg')
         }).then(async () => {
            client.sendFile(m.chat, json.result.link, unescape(decode(json.result.filename)), '', m)
         })
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}