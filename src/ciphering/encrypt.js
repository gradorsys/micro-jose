const jose = require('node-jose')

const encrypt = async function (data, keystore) {
  const key = keystore.get({use: 'enc'})
  const result = await jose.JWE
    .createEncrypt({ format: 'compact' }, key)
    .update(data)
    .final()
  return result
}

module.exports = encrypt;