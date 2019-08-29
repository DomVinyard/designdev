require("dotenv").config()
const axios = require("axios")
exports.handler = async function(event, context, callback) {
  const challenge = event.queryStringParameters.challenge
  if (challenge) return callback(null, { statusCode: 200, body: challenge })
  const { NETLIFY_BUILD_HOOK } = process.env
  if (!NETLIFY_BUILD_HOOK) throw "where is prod?"
  await axios.post(NETLIFY_BUILD_HOOK)
}

// require("dotenv").config()
// const { BUILD_PROD } = process.env
// if (!BUILD_PROD) throw "where is prod?"
// exports.handler = () => require("axios").post(BUILD_PROD)
