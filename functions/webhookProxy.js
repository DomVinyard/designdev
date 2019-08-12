require("dotenv").config()
const axios = require("axios")
exports.handler = async function(event, context, callback) {
  const { NETLIFY_BUILD_HOOK } = process.env
  const challenge = event.queryStringParameters.challenge
  await axios.post(NETLIFY_BUILD_HOOK)
  callback(null, { statusCode: 200, body: challenge })
}
