const yts = require('yt-search')
exports.run = {
   usage: ['yts'],
   hidden: ['ytsearch', 'getyt'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         client.sendReact(m.chat, '💛', m.key)
         const search = await (await yts(text)).all
         if (!search || search.length == 0) return client.reply(m.chat, global.status.fail, m)
         let results = await yts(text)
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
*${v.title}* (${v.url})
Duration: ${v.timestamp}
Uploaded ${v.ago}
${v.views} views
Upload by ${v.author.name}
      `.trim()
      case 'channel': return `
*${v.name}* (${v.url})
_${v.subCountLabel} (${v.subCount}) Subscriber_
${v.videoCount} video
`.trim()
    }
  }).filter(v => v).join('\n╌╍═╌╍═╌╍═╌╍═╌╍═╌╍═╌╍═╴\n')
  let jwb = '乂  *Y T  S E A R C H*\n\n'
  jwb += '╌╍═╌╍═╌╍═╌╍═╌╍═╌╍═╌╍═╴\n'
  jwb += teks +'\n\n'
  jwb += global.footer
         client.reply(m.chat, jwb, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}