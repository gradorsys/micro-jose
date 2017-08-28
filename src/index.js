const jose = require('node-jose')
const anyBody = require("body/any")
const { send } = require('micro')

const keystore = jose.JWK.createKeyStore()
console.log(keystore)
keystore.generate('RSA', 2048)
  .then(() => {
    console.log('added key')
  })
  .catch((err) => {
    console.log(err)
  })

function readBody(req, res) {
  return new Promise((resolve,reject) => {
    anyBody(req, res, (err, body) => {
      if (err) {
        reject(err)
      }
      resolve(body)
    })
  })
}

/**
 * Handle POST requests
 */
// async function tryDecryptKey
async function postHandler(request, response) {
  // const body = await readBody(request, response)
  return new Promise((resolve,reject) => {
    anyBody(request, response, (err, body) => {
      if (err) {
        reject(err)
      }
      if (typeof body === 'string') {
        console.log(body)
        jose.JWE
          .createDecrypt(keystore)
          .decrypt(body)
          .then(result => {
            console.log(result.payload)
            resolve(result.payload.toString())
          })
          .catch((err) => {
            console.log(err)
            const key = keystore.get({use: 'enc'})
            jose.JWE
              .createEncrypt({ format: 'compact' }, key)
              .update(body)
              .final()
              .then(result => {
                resolve(result)
              })
              .catch(() => {
                resolve({unmodified: body})
              }) 
          })
      } else {
        const key = keystore.get({use: 'enc'})
        jose.JWE
          .createEncrypt({ format: 'compact' }, key)
          .update(JSON.stringify(body))
          .final()
          .then(result => {
            resolve(result)
          })
          .catch(() => {
            resolve({unmodified: body})
          }) 
      }
    })
  });
}
/**
 * Handle GET requests
 */
async function getHandler() {
  return keystore.toJSON()
}

/**
 * Check the request method and use postHandler or getHandler (or other method handlers)
 */
module.exports = async function (request, response) {
  try {
    switch (request.method) {
    case 'POST':
      return await postHandler(request);
    case 'GET':
      return await getHandler(request);
    default:
      send(response, 405, 'Invalid method');
      break;
    }
  } catch (err) {
    throw err;
  }
}