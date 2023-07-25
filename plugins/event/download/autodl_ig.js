exports.run = {
  regex:
    /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/,
  async: async (m, { client, body, users, setting }) => {
    try {
      const regex =
        /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/;
      const extract = body ? Func.generateLink(body) : null;
      if (extract) {
        const links = extract.filter((v) => Func.igFixed(v).match(regex));
        if (links.length != 0) {
          if (users.limit > 0) {
            let limit = 1;
            if (users.limit >= limit) {
              users.limit -= limit;
            } else
              return client.reply(
                m.chat,
                Func.texted(
                  "bold",
                  `🚩 Your limit is not enough to use this feature.`
                ),
                m
              );
          }
          client.sendReact(m.chat, "🕒", m.key);
          let old = new Date();
          Func.hitstat("ig", m.sender);
          links.map(async (link) => {
            let json = await Api.ig(Func.igFixed(link));
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
          });
        }
      }
    } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m);
    }
  },
  limit: true,
  download: true,
};
