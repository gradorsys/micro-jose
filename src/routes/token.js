const { json } = require('micro')
const keystorePromise = require('../keystore')
const sign = require('../ciphering/sign')


module.exports.POST = async function(req) {
    const defaultToken = {
        iss: 'localhost:3000',
        sub: 'userId',
        aud: 'clientId',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() + 1000) * 60 * 15,
        roles: ['admin', 'roleX']
    }
    const keystore = await keystorePromise
    const body = await json(req)
    const signedPayload = sign(JSON.stringify(Object.assign({}, defaultToken, body)), keystore)
    return signedPayload
}
