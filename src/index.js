const path = require('path')
const { send } = require('micro')
const cors = require('micro-cors')()
const compose = require('micro-compose')
const visualize = require('micro-visualize')
const router = require('fs-router')

const match = router(path.join(__dirname, 'routes'))

const handler = function(req, res) {
  const matched = match(req)
  if (matched) {
    return matched(req, res)
  }
  send(res, 404, { error: 'Not found' })
}

module.exports = compose(
  cors,  
  process.env.NODE_ENV !== 'production' && visualize
)(handler)
