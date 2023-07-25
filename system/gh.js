const fetch = require("node-fetch");
const FormData = require("form-data");
const { fromBuffer } = require("file-type");
const axios = require("axios");
const { Function, Scraper } = new (require("@neoxr/neoxr-js"))();

let lol = ["BrunoSobrino", "SGWN"];

// Memilih acak indeks dari array key
let randomIndex = Math.floor(Math.random() * lol.length);

// Mengakses kunci yang dipilih secara acak
let key = "BrunoSobrino";

module.exports = class NeoxrApi {
  baseUrl = "https://api.neoxr.my.id/api";
  apiKey = null;

  constructor(apiKey) {
    this.apiKey = apiKey || "";
  }

  check = async () => {
    let json = await Func.fetchJson(this.baseUrl + "/check/" + key);
    return json;
  };

  podcast = async (url) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/podcast?url=" + url + "&apikey=" + key
    );
    return json;
  };

  fb = async (url) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/facebook?apikey=" + key + "&url=" + url
    );
    return json;
  };

  ig = async (url) => {
    let json = await Func.fetchJson(
      "https://xzn.wtf/api/igdl?url=" + url + "&apikey=Ayodya2007"
    );
    return json;
  };

  igs = async (url) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/instagram?apikey=" + key + "&url=" + url
    );
    return json;
  };

  igh = async (str) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/igh?url=" + str + "&apikey=" + key
    );
    return json;
  };

  line = async (url) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/line?url=" + url + "&apikey=" + key
    );
    return json;
  };

  pin = async (url) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/pinterestdl?apikey=" + key + "&url=" + url
    );
    return json;
  };

  mediafire = async (url) => {
    let json = await Func.fetchJson(
      "https://rossy-dl-api.vercel.app/api/downloads/mediafire?url=" + url
    );
    return json;
  };

  tiktok = async (url) => {
    let json = await Func.fetchJson(
      "https://xzn.wtf/api/tiktok?url=" + url + "&apikey=Ayodya2007"
    );
    return json;
  };

  tikmp3 = async (url) => {
    let json = await Func.fetchJson(
      "https://kyyrest.diki6969.repl.co/api/dowloader/tikok?url=" +
        url +
        "&apikey=RnyA4AZs3L"
    );
    return json;
  };

  tiktokwm = async (url) => {
    let json =
      "https://api.lolhuman.xyz/api/tiktokwm?apikey=" + key + "&url=" + url;
    return json;
  };

  twitter = async (url) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/twitterimage?apikey=" + key + "&url=" + url
    );
    return json;
  };

  twittervid = async (url) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/twitter?apikey=" + key + "&url=" + url
    );
    return json;
  };

  soundcloud = async (url) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/soundcloud?apikey=" + key + "&url=" + url
    );
    return json;
  };

  rexdl = async (str) => {
    let json = str.match("rexdl.com")
      ? await Func.fetchJson(
          this.baseUrl + "/rexdl-get?url=" + str + "&apikey=" + key
        )
      : await Func.fetchJson(
          this.baseUrl +
            "/rexdl?q=" +
            encodeURIComponent(str) +
            "&apikey=" +
            key
        );
    return json;
  };

  pinterest = async (query) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/pinterest2?apikey=" +
        key +
        "&query=" +
        query
    );
    return json;
  };

  soundcloud = async (str) => {
    let json = str.match("soundcloud.com")
      ? await Func.fetchJson(
          this.baseUrl + "/soundcloud?url=" + str + "&apikey=" + key
        )
      : await Func.fetchJson(
          this.baseUrl + "/soundcloud-search?q=" + str + "&apikey=" + key
        );
    return json;
  };

  apk = async (query, no) => {
    if (query && no) {
      let json = await Func.fetchJson(
        this.baseUrl + "/apk?q=" + query + "&no=" + no + "&apikey=" + key
      );
      return json;
    } else if (query) {
      let json = await Func.fetchJson(
        this.baseUrl + "/apk?q=" + query + "&apikey=" + key
      );
      return json;
    }
  };

  emojimix = async (emoticon) => {
    let tes = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/emojimix/" +
        encodeURI(emoticon) +
        "?apikey=" +
        key
    );
    if (tes.status) {
      return "https://telegra.ph/file/bd7c397ed84a4819834f6.jpg";
    } else {
      let json =
        "https://api.lolhuman.xyz/api/emojimix/" +
        encodeURI(emoticon) +
        "?apikey=" +
        key +
        "";
      return json;
    }
  };

  wallpaper = async (query) => {
    let tes = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/wallpaper?apikey=" + key + "&query=" + query
    );
    if (tes.status) {
      return "https://telegra.ph/file/bd7c397ed84a4819834f6.jpg";
    } else {
      let json = await Func.fetchBuffer(
        "https://api.lolhuman.xyz/api/wallpaper?apikey=" +
          key +
          "&query=" +
          query
      );
      return json;
    }
  };

  sticker = async (str) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/stickerwa?apikey=" +
        key +
        "&query=" +
        encodeURIComponent(str)
    );
    return json;
  };

  tm = (style, text) => {
    return this.baseUrl + "/" + style + "?text=" + text + "&apikey=" + key;
  };

  ie = (style, image) => {
    return (
      this.baseUrl +
      "/effect?style=" +
      style +
      "&image=" +
      image +
      "&apikey=" +
      key
    );
  };

  nobg = async (image) => {
    let tes = await Func.fetchJson(
      "https://xzn.wtf/api/removebg?url=" + image + "&apikey=Ayodya2007"
    );
    if (tes.status) {
      return "https://telegra.ph/file/bd7c397ed84a4819834f6.jpg";
    } else {
      let json =
        "https://xzn.wtf/api/removebg?url=" + image + "&apikey=Ayodya2007";
      return json;
    }
  };

  ocr = async (image) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/ocr?image=" + image + "&apikey=" + key
    );
    return json;
  };

  brainly = async (query, lang) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/brainly?q=" + query + "&iso=" + lang + "&apikey=" + key
    );
    return json;
  };

  sholat = async (city) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/sholat?q=" + city + "&apikey=" + key
    );
    return json;
  };

  kbbg = async (query) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/kbbg?q=" + query + "&apikey=" + key
    );
    return json;
  };

  chord = async (query) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/chord?apikey=" + key + "&query=" + query
    );
    return json;
  };

  lyric = async (query) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/lirik?apikey=" + key + "&query=" + query
    );
    return json;
  };

  igstalk = async (username) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/stalkig/" + username + "?apikey=" + key + ""
    );
    return json;
  };

  google = async (query, image = false) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/" +
        (image ? "gimage2" : "gsearch") +
        "?apikey=" +
        key +
        "&query=" +
        query
    );
    return json;
  };

  nama = async (query) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/artinama?apikey=" + key + "&nama=" + query
    );
    return json;
  };

  cerpen = async (category) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/cerpen?category=" + category + "&apikey=" + key
    );
    return json;
  };

  cerpenList = async (category) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/cerpen-list?category=" + category + "&apikey=" + key
    );
    return json;
  };

  cerpenFetch = async (url) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/cerpen-get?url=" + url + "&apikey=" + key
    );
    return json;
  };

  cnn = async (url) => {
    let json = url
      ? await Func.fetchJson(
          this.baseUrl + "/cnn?url=" + url + "&apikey=" + key
        )
      : await Func.fetchJson(this.baseUrl + "/cnn?apikey=" + key);
    return json;
  };

  gempa = async () => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/infogempa?apikey=" + key + ""
    );
    return json;
  };

  asahotak = async () => {
    let json = await Func.fetchJson(this.baseUrl + "/asahotak?apikey=" + key);
    return json;
  };

  whoami = async () => {
    let json = await Func.fetchJson(this.baseUrl + "/whoami?apikey=" + key);
    return json;
  };

  whatword = async () => {
    let json = await Func.fetchJson(this.baseUrl + "/whatword?apikey=" + key);
    return json;
  };

  whatflag = async () => {
    let json = await Func.fetchJson(this.baseUrl + "/whatflag?apikey=" + key);
    return json;
  };

  whatsong = async () => {
    let json = await Func.fetchJson(this.baseUrl + "/whatsong?apikey=" + key);
    return json;
  };

  tekateki = async () => {
    let json = await Func.fetchJson(this.baseUrl + "/tekateki?apikey=" + key);
    return json;
  };

  toAnime = async (url) => {
    let json = await Func.fetchJson("https://qq.indocoder.dev/?url=" + url);
    return json;
  };

  spotify = async (url) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/spotify?apikey=" + key + "&url=" + url
    );
    return json;
  };

  play = async (query) => {
    let json = await Func.fetchJson(
      "https://yt.nxr.my.id/yt2?url=" + query + "&type=audio"
    );
    return json;
  };

  remini = async (image) => {
    let json = await Func.fetchJson(
      this.baseUrl + "/remini?image=" + image + "&apikey=" + key
    );
    return json;
  };

  ageDetector = async (image) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/agedetect?apikey=" + key + "&img=" + image
    );
    return json;
  };

  diffusion = async (query) => {
    let tes = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/diffusion-prompt?apikey=" +
        key +
        "&prompt=" +
        query
    );
    if (tes.status) {
      return "https://telegra.ph/file/bd7c397ed84a4819834f6.jpg";
    } else {
      let json = await Func.fetchBuffer(
        "https://api.lolhuman.xyz/api/diffusion-prompt?apikey=" +
          key +
          "&prompt=" +
          query
      );
      return json;
    }
  };

  ai = async (text) => {
    let json = await Func.fetchJson(
      "https://xzn.wtf/api/openai?text=" + text + "&apikey=Ayodya2007"
    );
    return json;
  };
  chatbot = async (cmd, text) => {
    let json = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/openai-turbo?apikey=" +
        key +
        "&text=" +
        cmd +
        "&system=" +
        text
    );
    return json;
  };
  youtube = async (url, type) => {
    const json = await Func.fetchJson(
      "https://yt.nxr.my.id/yt?url=" + url + "&type=" + type
    );
    return json;
  };
  ttsearch = async (query) => {
    const json = await Func.fetchJson(
      "https://xzn.wtf/api/ttsearch?count=3&search=" +
        query +
        "&apikey=Ayodya2007"
    );
    return json;
  };
  aiscene = async (url) => {
    const tes = await Func.fetchJson(
      "https://xzn.wtf/api/aiscene?url=" + url + "&apikey=Ayodya2007"
    );
    if (tes.status) {
      return "https://telegra.ph/file/bd7c397ed84a4819834f6.jpg";
    } else {
      const json =
        "https://xzn.wtf/api/aiscene?url=" + url + "&apikey=Ayodya2007";
      return json;
    }
  };
  toanime = async (url) => {
    const tes = await Func.fetchJson(
      "https://api.lolhuman.xyz/api/imagetoanime?apikey=" + key + "&img=" + url
    );
    if (tes.status) {
      return "https://707a8191-3fe9-4568-a03e-763edd45f0bb.id.repl.co/f/O9aiHK.png";
    } else {
      const json =
        "https://api.lolhuman.xyz/api/imagetoanime?apikey=" +
        key +
        "&img=" +
        url;
      return json;
    }
  };
};
