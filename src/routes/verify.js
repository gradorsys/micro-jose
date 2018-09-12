const { json } = require('micro')
const keystorePromise = require('../keystore')
const verify = require('../ciphering/verify')


module.exports.POST = async function(req) {
    const keystore = await keystorePromise
    const body = await json(req)
    const verifiedPayload = verify(body, keystore)
    return verifiedPayload
}
