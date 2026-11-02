const CIPHER_KEY = "BuetCricketClubSeason5SecuredPayload2026";

function encryptPayload(data) {
  const jsonStr = JSON.stringify(data);
  const utf8Bytes = Buffer.from(jsonStr, "utf8");
  const keyBytes = Buffer.from(CIPHER_KEY, "utf8");
  const out = Buffer.alloc(utf8Bytes.length);

  for (let i = 0; i < utf8Bytes.length; i++) {
    out[i] = utf8Bytes[i] ^ keyBytes[i % keyBytes.length];
  }

  return out.toString("base64");
}

module.exports = {
  CIPHER_KEY,
  encryptPayload,
};

