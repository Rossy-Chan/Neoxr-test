exports.run = {
   async: async (m, {
      client,
      body,
      users,
      groupSet,
      setting,
      isAdmin,
      isBotAdmin
   }) => {
      try {
         if (groupSet.filter && isBotAdmin && !m.fromMe) {
            let toxic = setting.toxic
            if (body && (new RegExp('\\b' + toxic.join('\\b|\\b') + '\\b')).test(body.toLowerCase()))
               return client.sendMessage(m.chat, {
                  delete: {
                     remoteJid: m.chat,
                     fromMe: isBotAdmin ? false : true,
                     id: m.key.id,
                     participant: m.sender
                  }
               })
            }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   group: true
}