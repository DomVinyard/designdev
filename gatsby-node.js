const { resolve } = require("path")

// dom.fyi. get all notes from dropbox
exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query GetNotes {
      dropbox: allDropboxNode(sort: { fields: name }) {
        notes: nodes {
          note: localFile {
            date: name
            content: childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
  `)
  if (!data) throw "where is dropbox?"
  const isPublished = excerpt => excerpt.trim().startsWith("🚀")
  const isDevMode = process.env.NODE_ENV === "development"
  const notes = data.dropbox.notes
    .filter(({ note }) => note && note.date && note.content) // build every .md file
    .filter(({ note: { date } }) => /^\d{4}\.\d{1,3}$/.test(date)) // with a valid date
    .filter(({ note }) => isDevMode || isPublished(note.content.excerpt)) // and a 🚀
    .map(({ note }) => note)
  notes.forEach((note, i) =>
    actions.createPage({
      path: note.date,
      component: resolve(`./src/note.js`),
      context: {
        date: note.date,
        next: notes[i + 1] && `/${notes[i + 1].date}`,
        first: i > 0 ? "" : `/${notes[0].date}`,
      },
    })
  )

  // list page and home page
  await actions.createPage({
    path: `/list`,
    component: resolve(`./src/list.js`),
    context: { notes },
  })
  return await actions.createRedirect({
    fromPath: "/",
    toPath: `/${notes[notes.length - 1].date}`,
    redirectInBrowser: true,
    statusCode: 200,
  })
}
