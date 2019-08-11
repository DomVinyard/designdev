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

// Trigger build - pages: [{ date, content }]
const deploy = async ({ createPage, pages }) => {
  if (!pages || !pages.length || !pages[0].date || !pages[0].content) {
    throw "no pages" // ❗️
  }
  if (!createPage) {
    throw "no createPage function" // ❗️
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
  await createPage({ path: `/`, component: Index, context: { slug: latest } })
  await createPage({
    path: `/calendar`,
    component: Calendar,
    context: { pages },
  })
}

// Get content from Dropbox (iA Writer)
const fromDropbox = async createPage => {
  const { DROPBOX_TOKEN } = process.env
  if (!DROPBOX_TOKEN) {
    throw new Error("no .env")
  }
  const dropbox = new Dropbox({ accessToken: DROPBOX_TOKEN, fetch })
  const { fileBinary } = await dropbox.filesDownloadZip({ path: "/domfyi" })
  const zip = await JSZip.loadAsync(fileBinary)
  const files = val(val(val(val(zip))[0]))
  return (await Promise.all(
    files.map(async file => {
      const content = (await file._data).compressedContent
      const data = {
        date: file.name.slice(7).replace(".txt", ""),
        content: content ? content.toString() : false,
      }
      return data
    })
  ))
    .filter(file => {
      if (!file.content) return false
      // regex match title
      // emoji match title
      return true
    })
    .sort(sortByDate)
}

// Get content from Evernote
const fromEvernote = async createPage => {
  const { EVERNOTE_TOKEN, EVERNOTE_PREFIX, EVERNOTE_NOTEBOOK } = process.env
  if (!EVERNOTE_TOKEN || !EVERNOTE_PREFIX || !EVERNOTE_NOTEBOOK) {
    throw new Error("no .env") // ❗️
  }
  const evernote = new Evernote.Client({
    token: EVERNOTE_TOKEN,
    sandbox: false,
  })
  const notestore = evernote.getNoteStore()
  const query = new Evernote.NoteStore.NoteFilter({
    notebookGuid: EVERNOTE_NOTEBOOK,
  })
  const { notes } = await notestore.findNotesMetadata(query, 0, 250, 0) // 📡 // 250 limit
  if (!notes || !notes.length) {
    throw new Error("could not connect to evernote") // ❗️
  }
  return (await Promise.all(
    notes.map(async ({ guid }) => {
      const turndownService = new TurndownService()
      const note = await notestore.getNote(guid, 1, 1, 1, 1)
      const config = { webApiUrlPrefix: EVERNOTE_PREFIX, noteKey: note.title }
      const html = enml2html(Object.assign(note, config))
      const content = turndownService.turndown(html)
      return { content, date: note.title }
    })
  )).sort(sortByDate)
}

// Entry point
exports.createPages = async ({ actions: { createPage } }) => {
  try {
    const pages = await fromDropbox(createPage) // fromEvernote(createPage) //
    console.log({ pages })
    await deploy({ createPage, pages }) // 🎉
  } catch (error) {
    console.error(chalk.red(JSON.stringify(error)))
  }
}
