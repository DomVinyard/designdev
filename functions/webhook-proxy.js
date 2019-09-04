/*
Every time Dropbox updates (because a note was added or edited),
Dropbox will fire a webhook to here 👇👇👇.
*/

require("dotenv").config()
const { BUILD_PROD } = process.env
if (!BUILD_PROD) throw "where is prod?"
exports.handler = () => require("axios").post(NETLIFY_BUILD_HOOK)

/*
The `NETLIFY_BUILD_HOOK` environment variable contains an endpoint 
which triggers all of the pages to build and deploy (see /gatsby-node). 
*/
