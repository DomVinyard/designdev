const Promise = require("promise")
const path = require("path")
const { Dropbox } = require("dropbox")
const fetch = require("isomorphic-fetch")
const JSZip = require("jszip")
const unzip = Object.values
require("dotenv").config()

// dom.fyi

exports.createPages = async ({ actions: { createPage, createRedirect } }) => {
  const isDevMode = process.env.NODE_ENV === "development"
  try {
    //
    // Connect to Dropbox
    const { DROPBOX_TOKEN } = process.env
    if (!DROPBOX_TOKEN) {
      throw new Error("no .env")
    }
    const dropbox = new Dropbox({ accessToken: DROPBOX_TOKEN, fetch })
    const { fileBinary } = await dropbox.filesDownloadZip({ path: "/domfyi" })
    const zip = await JSZip.loadAsync(fileBinary)
    const unzipped = unzip(unzip(unzip(unzip(zip))[0]))
    const notes = unzipped.filter(({ name }) => name.startsWith("domfyi/notes"))
    const pages = (await Promise.all(
      notes.map(async file => {
        //
        // Turn each dropbox file into a page object { date, content, firstLine }
        const rawContent = (await file._data).compressedContent
        if (!rawContent) return false
        const [firstLine, ...content] = rawContent.toString().split(`\n`)
        const date = file.name.slice(13, -3)
        return { date, content: content.join(`\n`), firstLine }
      })
    ))
      .filter(file => {
        //
        // Exclude non-dates and unpublished
        if (!file || !file.content || !file.date) return false
        const isValid = /^\d{4}\.\d{1,3}$/.test(file.date)
        if (!isValid) return false
        if (!isDevMode && !file.firstLine.trim().startsWith("🚀")) return false
        return true
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))
    pages.forEach(async (page, i) => {
      //
      // construct nav and build page object into static html
      const start = pages.slice(-1)[0].date
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
    //
    // Upload images
    const images = (await Promise.all(
      unzipped
        .filter(({ name }) => name.startsWith("domfyi/images"))
        .filter(img => img)
        .map(async img => {
          const filename = img.name.slice(14)
          const data = (await img._data).compressedContent
          if (!filename || !data) return false
          return { filename, data }
        })
    )).filter(Boolean)
    console.log(images)
    // console.log(zip.folder("/images"))
  } catch (error) {
    console.error(error)
    process.exit()
  }
}
