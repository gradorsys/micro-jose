const keystorePromise = require('../keystore')

module.exports.GET = async function(req) {
    console.log(req.headers)
    const keystore = await keystorePromise
    return keystore.toJSON()
}