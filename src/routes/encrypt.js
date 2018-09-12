const { json } = require('micro')
const keystorePromise = require('../keystore')
const encrypt = require('../ciphering/encrypt')

module.exports.POST = async function(req) {
    const keystore = await keystorePromise
    const body = await json(req)
    const encryptedPayload = encrypt(JSON.stringify(body), keystore)
    return encryptedPayload
}
