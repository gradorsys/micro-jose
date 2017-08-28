// Packages
const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise')
const jose = require('node-jose')

// Service
const service = require('../src')

test('my keys', async t => {
  const microInstance = micro(service)
  console.log(microInstance)
  const url = await listen(microInstance)
  console.log(url)
  const body = await request('http://localhost:3000/')
  console.log(body)

  t.true(typeof body === 'string')
  const parsedBody = JSON.parse(body)
  t.true(typeof parsedBody === 'object')
  t.true(typeof parsedBody.keys === 'object')
  t.true(parsedBody.keys.length > 0)
  t.true(typeof parsedBody.keys[0] === 'object')

  const key = parsedBody.keys[0]
  // {input} is a Buffer
  jose.JWE
    .createEncrypt({ format: 'compact' }, key)
    .update(JSON.stringify({go: "Hallo"}))
    .final()
    .then(result => {
      console.log(result)
      // {result} is a JSON Object -- JWE using the JSON General Serialization
    });  
})