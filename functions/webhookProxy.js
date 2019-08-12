const axios = require("axios")
const BUILD = "https://api.netlify.com/build_hooks/5d517857c295bc8c9d0a8bca"
exports.handler = async function(event, context, callback) {
  const challenge = event.queryStringParameters.challenge
  console.log({ challenge })

  // TODO return if no actionable changes
  // get latest build date
  // filter publishable files (rocket no edit)
  // check if any latest file date is after latest build

  await axios.post(BUILD)
  callback(null, { statusCode: 200 })
}
