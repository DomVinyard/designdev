const Promise = require("promise")
const { resolve } = require("path")
const { graphql } = require("gatsby")
const isDevMode = process.env.NODE_ENV === "development"

// dom.fyi. get all notes from dropbox
exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    # Get all notes (date, html, excerpt)
    query GetNotes {
      dropbox: allDropboxNode(sort: { fields: name }) {
        notes: nodes {
          note: localFile {
            date: name
            content: childMarkdownRemark {
              html
              excerpt
            }
          }
        }
      }
    }
  `)
  const notes = data.dropbox.notes
    .filter(({ note }) => note && note.date && note.content) // build every .md file
    .filter(({ note: { content } }) => content.excerpt && content.html) // with content
    .filter(({ note: { date } }) => /^\d{4}\.\d{1,3}$/.test(date)) // a valid date
    .filter(({ note: { content } }) => content.excerpt.trim().startsWith("🚀")) // and published
    .map(({ note }) => note)
  notes.forEach((note, i) => {
    actions.createPage({
      path: note.date,
      component: resolve(`./src/note.js`),
      context: {
        date: note.date,
        next: notes[i + 1] && `/${notes[i + 1].date}`,
        first: i > 0 && `/${notes[0].date}`,
      },
    })
  })

  // list page and home page
  await actions.createPage({
    path: `/list`,
    component: resolve(`./src/list.js`),
  })
  return await actions.createRedirect({
    fromPath: "/",
    toPath: `/${notes[notes.length - 1].date}`,
    redirectInBrowser: true,
    statusCode: 200,
  })
}
