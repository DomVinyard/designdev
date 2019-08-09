const Evernote = require("evernote")
const enml2html = require("enml2html")
const Promise = require("promise")
const GitHub = require("github-api")
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")
require("dotenv").config()
exports.createPages = async ({ actions }) => {
  const { token, webApiUrlPrefix, notebookGuid } = process.env
  const { createPage } = actions
  try {
    // get all notes
    const evernote = new Evernote.Client({ token, sandbox: false })
    const notestore = evernote.getNoteStore()
    const query = new Evernote.NoteStore.NoteFilter({ notebookGuid })
    const { notes } = await notestore.findNotesMetadata(query, 0, 250, 0) // 250 limit

    // convert them into html
    const pages = (await Promise.all(
      notes.map(async ({ guid }) => {
        const note = await notestore.getNote(guid, 1, 1, 1, 1)
        const enml = Object.assign(note, {
          webApiUrlPrefix,
          noteKey: note.title,
        })
        return { html: enml2html(enml), date: note.title }
      })
    )).sort((a, b) => (a.date < b.date ? 1 : -1))

    // add css

    // build pages

    // build homepage

    // compile
    pages.forEach(async page => {
      console.log("building", page.date)
      await createPage({
        path: `${page.date}`,
        component: path.resolve(`./src/note.js`),
        context: page,
      })
    })

    return "published"
    // return { page: pages }
  } catch (error) {
    return error
  }
}
