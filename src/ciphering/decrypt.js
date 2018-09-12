const jose = require('node-jose')

const decrypt = async function (data, keystore) {
  const result = await jose.JWE
    .createDecrypt(keystore)
    .decrypt(data)
  return result.payload.toString()
}

module.exports = decrypt;