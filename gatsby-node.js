const Evernote = require("evernote")
const enml2html = require("enml2html")
const Promise = require("promise")
const GitHub = require("github-api")
const { createFilePath } = require(`gatsby-source-filesystem`)
const chalk = require("chalk")
const path = require("path")
const TurndownService = require("turndown")
const { Dropbox } = require("dropbox")
const fetch = require("isomorphic-fetch")
const JSZip = require("jszip")
require("dotenv").config()
const Index = path.resolve(`./src/index.js`)
const Note = path.resolve(`./src/note.js`)
const Calendar = path.resolve(`./src/calendar.js`)
const sortByDate = (a, b) => (a.date < b.date ? 1 : -1)
const val = Object.values

// * Trigger build

const deploy = async ({ actions: { createPage, createRedirect }, pages }) => {}

// * Get content from Dropbox (iA Writer)

const fromDropbox = async createPage => {}

// * Entry point
exports.createPages = async ({ actions }) => {
  try {
    const { createPage, createRedirect } = actions
    const { DROPBOX_TOKEN } = process.env
    if (!DROPBOX_TOKEN) {
      throw new Error("no .env")
    }
    const dropbox = new Dropbox({ accessToken: DROPBOX_TOKEN, fetch })
    const { fileBinary } = await dropbox.filesDownloadZip({ path: "/domfyi" })
    const zip = await JSZip.loadAsync(fileBinary)
    const files = val(val(val(val(zip))[0]))
    const pages = (await Promise.all(
      files.map(async file => {
        const rawContent = (await file._data).compressedContent
        if (!rawContent) return false
        const [firstLine, ...content] = rawContent.toString().split(`\n`)
        const date = file.name.slice(7).replace(".txt", "")
        const data = { date, content: content.join(`\n`), firstLine }
        return data
      })
    ))
      .filter(file => {
        if (!file.content) return false
        // TODO: regex match title
        if (!file.firstLine.trim().startsWith("🚀")) return false
        return true
      })
      .sort(sortByDate)
    if (!pages || !pages.length || !pages[0].date || !pages[0].content) {
      throw "no pages"
    }
    pages.forEach(async (page, i) => {
      const start =
        pages.slice(-1)[0].date !== page.date ? pages.slice(-1)[0].date : null
      const end = pages[0].date !== page.date ? pages[0].date : null
      const previous = (pages[i + 1] || {}).date
      const next = (pages[i - 1] || {}).date
      await createPage({
        path: `${page.date}`,
        component: Note,
        context: { ...page, nav: { start, previous, next, end } },
      })
    })
    const latest = pages[0].date
    await createRedirect({
      fromPath: "/",
      toPath: `/${latest}`,
      redirectInBrowser: true,
      statusCode: 200,
    })
    await createPage({
      path: `/calendar`,
      component: Calendar,
      context: { pages },
    })
  } catch (error) {
    console.error(chalk.red(JSON.stringify(error)))
    process.exit()
  }
}
