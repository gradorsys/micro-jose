const { json } = require('micro')
const keystorePromise = require('../keystore')
const decrypt = require('../ciphering/decrypt')

module.exports.POST = async function(req) {
    const keystore = await keystorePromise
    const body = await json(req)
    const decryptedPayload = await decrypt(body, keystore)
    return decryptedPayload
}
