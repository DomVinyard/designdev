/*
  Fetch all notes from Dropbox (configured in /gatsby-config).
  Iterate through, build a page for each.
  Also build pages for index and list.
*/

const { resolve } = require("path")
const YearDay = require("./YearDay")
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
    .map(({ note }) => note)
    .filter(
      note =>
        note &&
        note.content && // build every .md file
        /^\d{4}\.\d{1,3}$/.test(note.date) && // with valid date
        (isPublished(note.content.excerpt) || isDevMode) // and a 🚀 on line 1
    )
  notes.forEach((note, i) => {
    const next = notes[i + 1] && `/${notes[i + 1].date}`
    const first = i > 0 ? "" : `/${notes[0].date}`
    const gapAfter =
      next && YearDay(next.slice(1)).diff(YearDay(note.date), "days")
    note.gapAfter = gapAfter
    actions.createPage({
      path: note.date,
      component: resolve(`./src/Template.Note.js`),
      context: { date: note.date, next, first, gapAfter },
    })
  })
  await actions.createPage({
    path: `/list`,
    component: resolve(`./src/Template.List.js`),
    context: { notes },
  })

  // return await actions.createRedirect({
  //   fromPath: "/",
  //   toPath: `/${notes[notes.length - 1].date}`,
  //   redirectInBrowser: true,
  //   statusCode: 200,
  // })
}
