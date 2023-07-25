exports.run = {
   regex: /pin(?:terest)?(?:\.it|\.com)/,
   async: async (m, {
      client,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /pin(?:terest)?(?:\.it|\.com)/;
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
               Func.hitstat('pin', m.sender)
               links.map(async link => {
                  let json = await Api.pin(link)
                  const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status))  return client.reply(m.chat, Func.jsonFormat(json), m)
                  client.sendFile(m.chat, json.result, !json.result.endsWith(".jpg")
 ? Func.filename('mp4') : Func.filename('jpg'), `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
                  
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