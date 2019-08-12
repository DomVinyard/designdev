require("dotenv").config()
const axios = require("axios")
exports.handler = async function(event, context, callback) {
  const { NETLIFY_BUILD_HOOK } = process.env
  const challenge = event.queryStringParameters.challenge

  // TODO return if no actionable changes
  // get latest build date
  // filter publishable files (rocket no edit)
  // check if any latest file date is after latest build

  await axios.post(NETLIFY_BUILD_HOOK)
  callback(null, { statusCode: 200, body: challenge })
}
