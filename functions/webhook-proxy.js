/*
    Every time Dropbox updates (because a note was added or edited),
    Dropbox will fire a webhook to here 👇📝👇.

    Requires .env variable `NETLIFY_BUILD_HOOK` (see /gatsby-node)
*/

require("dotenv").config()
if (!process.env.NETLIFY_BUILD_HOOK) throw "where is prod?"
exports.handler = ({ queryStringParameters: challenge }) => {
  if (challenge) return callback(null, { statusCode: 200, body: challenge }) // confirm webhook location with dropbox
  require("axios").post(process.env.NETLIFY_BUILD_HOOK)
}
