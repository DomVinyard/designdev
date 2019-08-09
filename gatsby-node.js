const Evernote = require("evernote")
const enml2html = require("enml2html")
const Promise = require("promise")
const GitHub = require("github-api")
const { createFilePath } = require(`gatsby-source-filesystem`)
const chalk = require("chalk")
const path = require("path")
require("dotenv").config()
exports.createPages = async ({ actions }) => {
  // Use environment variables
  const { token, webApiUrlPrefix, notebookGuid } = process.env
  if (!token || !webApiUrlPrefix || !notebookGuid) {
    console.error(chalk.red("Error: .env not set"))
    process.exit()
  }
  const { createPage } = actions

  // to get all notes
  try {
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

    // and compile them.
    pages.forEach(async (page, i) => {
      console.log(chalk.green("->"), page.date)
      await createPage({
        path: `${page.date}`,
        component: path.resolve(`./src/note.js`),
        context: {
          ...page,
          nav: {
            start:
              pages.slice(-1)[0].date !== page.date
                ? pages.slice(-1)[0].date
                : undefined,
            previous: (pages[i + 1] || {}).date,
            next: (pages[i - 1] || {}).date,
            end: pages[0].date !== page.date ? pages[0].date : undefined,
            index: pages.length - i,
            total: pages.length,
          },
        },
      })
    })

    // build homepage and calendar
    await createPage({
      path: `/`,
      component: path.resolve(`./src/index.js`),
      context: { slug: pages[0].date },
    })
    await createPage({
      path: `/calendar`,
      component: path.resolve(`./src/calendar.js`),
      context: { notes: pages.map(({ date }) => date) },
    })
    console.log(chalk.green("->"), "index")

    return "published"
  } catch (error) {
    console.log(chalk.red(error))
  }
}
