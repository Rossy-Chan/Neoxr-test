exports.run = {
  usage: ["ig"],
  hidden: ["igdl"],
  use: "link",
  category: "downloader",
  async: async (m, { client, args, isPrefix, command }) => {
    try {
      if (!args || !args[0])
        return client.reply(
          m.chat,
          Func.example(
            isPrefix,
            command,
            "https://www.instagram.com/p/CK0tLXyAzEI"
          ),
          m
        );
      if (!args[0].match(/(https:\/\/www.instagram.com)/gi))
        return client.reply(m.chat, global.status.invalid, m);
      client.sendReact(m.chat, "💛", m.key);
      let old = new Date();
      let json = await Api.ig(Func.igFixed(args[0]));
      for (let i in json.media) {
        await Func.delay(2500);
        client.sendFile(
          m.chat,
          json.media[i],
          !/jpg/.test(json.media[i])
            ? Func.filename("mp4")
            : Func.filename("jpg"),
          `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
          m
        );
      }
    } catch (e) {
      console.log(e);
      return client.reply(m.chat, global.status.error, m);
    }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename,
};
