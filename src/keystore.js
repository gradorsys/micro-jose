const jose = require('node-jose')

const keystore = getKeyStore()

async function getKeyStore() {
  const store = jose.JWK.createKeyStore()
  await store.generate('RSA', 2048, { use: 'enc' })
  await store.generate('RSA', 2048, { use: 'sig' })
  return store
}

module.exports = keystore;