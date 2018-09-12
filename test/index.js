// Packages
const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const axios = require('axios')
const jose = require('node-jose')

// Service
const service = require('../src')

test('get "/keys" returns a keystore with "enc" and "sig" keys', async (t) => {
  const microInstance = micro(service)
  const url = await listen(microInstance)
  const response = await axios.get(`${url}/keys`)
  const body = response.data
  const keystore = await jose.JWK.asKeyStore(body)
  t.true(jose.JWK.isKeyStore(keystore))
  const encKey = keystore.get({use: 'enc'})
  t.true(jose.JWK.isKey(encKey))
  const sigKey = keystore.get({use: 'sig'})
  t.true(jose.JWK.isKey(sigKey))
})

test('messages encrypted with POST "/encrypt" will be decrypted with POST "/decrypt"', async (t) => {
  const microInstance = micro(service)
  const url = await listen(microInstance)
  const testValue = [ 'bye', {go: 5} ]
  const firstResponse = await axios.post(`${url}/encrypt`, testValue)
  const body = firstResponse.data
  const secondResponse = await axios.post(`${url}/decrypt`, JSON.stringify(body))
  t.deepEqual(testValue, secondResponse.data)
})

test('post messages encrypted with public key will be decrypted', async (t) => {
  const microInstance = micro(service)
  const url = await listen(microInstance)
  const keystore = await jose.JWK.asKeyStore((await axios.get(`${url}/keys`)).data)
  const encKey = keystore.get({use: 'enc'})
  const testValue = [ 'bye', {go: 5} ]
  const message = await jose.JWE
    .createEncrypt({ format: 'compact' }, encKey)
    .update(JSON.stringify(testValue))
    .final()
  const response = await axios.post(`${url}/decrypt`, JSON.stringify(message))
  t.deepEqual(testValue, response.data)
})