exports.run = {
   usage: ['igs'],
   hidden: ['igstory'],
   use: 'username / link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://instagram.com/stories/pandusjahrir/3064777897102858938?igshid=MDJmNzVkMjY='), m)
         client.sendReact(m.chat, '💛', m.key)
         let old = new Date()
         let json = await Api.igs(args[0])
         const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status)) return client.reply(m.chat, '*Instagram Story Missing Or Expired*', m)
         client.sendFile(m.chat, json.result[0], !/jpg/.test(json.result[0]) ? Func.filename('mp4') : Func.filename('jpg'), `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
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