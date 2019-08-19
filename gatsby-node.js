const Promise = require("promise")
const { resolve } = require("path")
const { graphql } = require("gatsby")
const isDevMode = process.env.NODE_ENV === "development"

// dom.fyi

exports.createPages = async ({ graphql, actions }) => {
  // Get all notes from dropbox
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
  const first = data.dropbox.notes[0]

  // make a page for each markdown file
  data.dropbox.notes.forEach(({ note }, i) => {
    if (note && note.date && note.content) {
      const { html, excerpt } = note.content
      if (!excerpt || !html) return false // if has content
      if (!/^\d{4}\.\d{1,3}$/.test(note.date)) return false // and is valid date
      if (!isDevMode && !excerpt.trim().startsWith("🚀")) return false // and is published
      const next = data.dropbox.notes[i + 1]
      actions.createPage({
        path: note.date,
        component: resolve(`./src/note.js`),
        context: {
          date: note.date,
          next: next && `/${next.note.date}`,
          first: i > 0 && `/${first.note.date}`,
        },
      })
    }
  })

  // list page
  await actions.createPage({
    path: `/list`,
    component: resolve(`./src/list.js`),
  })

  // home page
  return await actions.createRedirect({
    fromPath: "/",
    toPath: `/${first.note.date}`,
    redirectInBrowser: true,
    statusCode: 200,
  })
}
