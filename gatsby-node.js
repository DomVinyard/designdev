/*
  Fetch all notes from Dropbox (configured in /gatsby-config).
  Iterate through, build a page for each.
  Also build pages for index and list.
*/

const { resolve } = require("path")
const YearDay = require("./YearDay")
const redirects = require("./redirects")
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
    .sort((a, b) => (+a.date.split(".")[1] < +b.date.split(".")[1] ? -1 : 1))
  notes.forEach((note, i) => {
    const next = notes[i + 1] && `/${notes[i + 1].date}`
    const isLatest = i + 1 === notes.length
    const gapAfter =
      next && YearDay(next.slice(1)).diff(YearDay(note.date), "days")
    note.gapAfter = gapAfter
    actions.createPage({
      path: note.date,
      component: resolve(`./src/Template.Note.js`),
      context: { date: note.date, next, gapAfter, isLatest },
    })
  })

  const activeYears = [...new Set(notes.map(note => note.date.split(".")[0]))]
  activeYears.map(async year => {
    await actions.createPage({
      path: `/${year}`,
      component: resolve(`./src/Template.List.js`),
      context: {
        year,
        activeYears,
        notes: notes
          .filter(note => note.date.split(".")[0] === year)
          .sort((a, b) =>
            +a.date.split(".")[1] < +b.date.split(".")[1] ? -1 : 1
          ),
      },
    })
  })
  await actions.createRedirect({
    fromPath: `/list`,
    toPath: `/`,
    statusCode: "200!",
  })

  Object.entries(redirects).forEach(async ([key, value]) => {
    await actions.createRedirect({
      fromPath: `https://${key}`,
      toPath: `/${value}`,
      statusCode: "200!",
    })
    await actions.createRedirect({
      fromPath: `https://www.${key}`,
      toPath: `/${value}`,
      statusCode: "200!",
    })
    await actions.createRedirect({
      fromPath: `https://${key}/*`,
      toPath: `/${value}`,
      statusCode: "200!",
    })
    await actions.createRedirect({
      fromPath: `https://www.${key}/*`,
      toPath: `/${value}`,
      statusCode: "200!",
    })
  })

  return await actions.createRedirect({
    fromPath: "https://dom.fyi",
    toPath: `https://dom.fyi/${notes[notes.length - 1].date}`,
    redirectInBrowser: true,
    statusCode: 200,
  })
}
