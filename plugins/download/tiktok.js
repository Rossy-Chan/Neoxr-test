exports.run = {
   usage: ['tiktok', 'tikmp3', 'tikwm'],
   hidden: ['tt'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://vm.tiktok.com/ZSLJhSBFR/'), m)
         if (!args[0].match('tiktok.com')) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '💛', m.key)
         let old = new Date()
         if (command == 'tiktok' || command == 'tt') {
           let json = await Api.tiktok(Func.ttFixed(args[0]))
           if (json.code !== 0) return client.reply(m.chat, global.status.fail, m)
           client.sendFile(m.chat, json.data.play, json.data.title +'.mp4', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
         }
         if (command == 'tikwm') {
           const json = await Api.tiktok(Func.ttFixed(args[0]))
           if (json.code !== 0) return client.reply(m.chat, global.status.fail, m)
           client.sendFile(m.chat, json.data.wmplay, json.data.title+'.mp4', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
         }
         if (command == 'tikmp3') {
           const json = await Api.tiktok(Func.ttFixed(args[0]))
           if (json.code !== 0) return client.reply(m.chat, global.status.fail, m)
           client.sendFile(m.chat, json.data.play, json.data.title+'.mp3', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}