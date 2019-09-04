/*
    Every time Dropbox updates (because a note was added or edited),
    Dropbox will fire a webhook to here 👇👇👇.

    Requires .env variable `NETLIFY_BUILD_HOOK`
*/

require("dotenv").config()
if (!process.env.NETLIFY_BUILD_HOOK) throw "where is prod?"
exports.handler = () => require("axios").post(process.env.NETLIFY_BUILD_HOOK)

/*
    The `NETLIFY_BUILD_HOOK` env variable contains an endpoint 
    which will triggers all pages to build and deploy (see /gatsby-node). 
*/
