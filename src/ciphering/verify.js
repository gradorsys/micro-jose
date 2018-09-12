const jose = require('node-jose')

const verify = async function (data, keystore) {
  const result = await jose.JWS
    .createVerify(keystore)
    .verify(data)
  return result.payload.toString()
}

module.exports = verify;