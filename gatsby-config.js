/*
    Configure Gatsby app to read from a Dropbox folder and expose
    the contents as entities in the filesystem.

    Requires .env variable `DROPBOX_TOKEN`
*/

require("dotenv").config()
const logji = require("logji")
const { DROPBOX_TOKEN, DROPBOX_FOLDER } = process.env
if (!DROPBOX_TOKEN || !DROPBOX_TOKEN) {
  logji.middle_finger("Where is dropbox?")
  process.exit(1)
}
const Dropbox = {
  accessToken: DROPBOX_TOKEN,
  extensions: [".md"],
  path: `/${DROPBOX_FOLDER}`, // notes directory
  recursive: false,
}
const Filesystem = { name: `notes`, path: `${__dirname}/src/` }
const Manifest = {
  name: `dom.fyi`,
  short_name: `dom.fyi`,
  start_url: `/`,
  icon: `src/icon.png`,
}
module.exports = {
  siteMetadata: {
    title: `dom.fyi`,
    description: `daily blog.`,
    author: `@domfyi`,
  },
  plugins: [
    { resolve: `gatsby-source-dropbox`, options: Dropbox }, // read from dropbox to filesystem
    { resolve: `gatsby-source-filesystem`, options: Filesystem }, // from filesystem to environment
    `gatsby-plugin-offline`, // works offline
    `gatsby-transformer-remark`, // converts markdown to html
    `gatsby-plugin-react-helmet`, // add page headers
    `gatsby-plugin-netlify`, // add Netlify security headers
    { resolve: `gatsby-plugin-manifest`, options: Manifest }, // metadata
  ],
}
