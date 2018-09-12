const { json } = require('micro')
const keystorePromise = require('../keystore')
const sign = require('../ciphering/sign')


module.exports.POST = async function(req) {
    const keystore = await keystorePromise
    const body = await json(req)
    const signedPayload = sign(JSON.stringify(body), keystore)
    return signedPayload
}
