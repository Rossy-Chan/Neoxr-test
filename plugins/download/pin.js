exports.run = {
   usage: ['pin'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://pin.it/5fXaAWE'), m)
         if (!args[0].match(/pin(?:terest)?(?:\.it|\.com)/)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '💛', m.key)
         let old = new Date()
         let json = await Api.pin(args[0])
         const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status))  return client.reply(m.chat, Func.jsonFormat(json), m)
         client.sendFile(m.chat, json.result, !json.result.endsWith(".jpg")

 ? Func.filename('mp4') : Func.filename('jpg'), `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}