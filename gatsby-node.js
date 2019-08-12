const Promise = require("promise")
const path = require("path")
const { Dropbox } = require("dropbox")
const fetch = require("isomorphic-fetch")
const JSZip = require("jszip")
const unzip = Object.values
require("dotenv").config()
exports.createPages = async ({ actions: { createPage, createRedirect } }) => {
  try {
    //
    // Connect to dropbox
    const { DROPBOX_TOKEN } = process.env
    if (!DROPBOX_TOKEN) {
      throw new Error("no .env")
    }
    const dropbox = new Dropbox({ accessToken: DROPBOX_TOKEN, fetch })
    const { fileBinary } = await dropbox.filesDownloadZip({ path: "/domfyi" })
    const zip = await JSZip.loadAsync(fileBinary)
    const files = unzip(unzip(unzip(unzip(zip))[0]))
    const pages = (await Promise.all(
      files.map(async file => {
        //
        // Turn each dropbox file into a page object { date, content, firstLine }
        const rawContent = (await file._data).compressedContent
        if (!rawContent) return false
        const [firstLine, ...content] = rawContent.toString().split(`\n`)
        const date = file.name.slice(7).replace(".txt", "")
        return { date, content: content.join(`\n`), firstLine }
      })
    ))
      .filter(file => {
        //
        // Exclude non-dates and unpublished
        if (!file.content) return false
        // TODO: regex match title
        if (!file.firstLine.trim().startsWith("🚀")) return false
        return true
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))
    pages.forEach(async (page, i) => {
      //
      // construct nav and build page object into static html
      const start =
        pages.slice(-1)[0].date !== page.date ? pages.slice(-1)[0].date : null
      const end = pages[0].date !== page.date ? pages[0].date : null
      const previous = (pages[i + 1] || {}).date
      const next = (pages[i - 1] || {}).date
      const isFirst = i === pages.length - 1
      const isLatest = i === 0
      page.nav = { start, next, isFirst, isLatest }
      await createPage({
        path: `${page.date}`,
        component: path.resolve(`./src/note.js`),
        context: page,
      })
    })
    //
    // redirect home to latest
    await createRedirect({
      fromPath: "/",
      toPath: `/${pages[0].date}`,
      redirectInBrowser: true,
      statusCode: 200,
    })
    //
    // build list view
    await createPage({
      path: `/list`,
      component: path.resolve(`./src/list.js`),
      context: { pages },
    })
  } catch (error) {
    console.error(error)
    process.exit()
  }
}
