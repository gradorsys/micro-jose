const jose = require('node-jose')

const sign = async function (data, keystore) {
  const key = keystore.get({use: 'sig'})
  const result = await jose.JWS
    .createSign({ format: 'compact' }, key)
    .update(data)
    .final()
  return result
}

module.exports = sign;
