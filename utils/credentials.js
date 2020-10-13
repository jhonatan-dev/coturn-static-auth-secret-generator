const crypto = require("crypto");

module.exports = {
  getTURNCredentials: (
    nombreUsuario = "admin",
    hashAuthSecret = "admin",
    time_limit = 1
  ) => {
    //Las credenciales serán válidas por las próximas 24 horas
    let unixTimeStamp = parseInt(Date.now() / 1000) + time_limit * 3600;
    let username = [unixTimeStamp, nombreUsuario].join("_");
    let hmac = crypto.createHmac("sha1", hashAuthSecret);
    hmac.setEncoding("base64");
    hmac.write(username);
    hmac.end();
    return {
      username: username,
      credential: String(hmac.read())
    };
  }
};
