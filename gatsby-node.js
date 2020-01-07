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
  await actions.createPage({
    path: `/list`,
    component: resolve(`./src/Template.List.js`),
    context: { notes },
  })

  const activeYears = [...new Set(notes.map(note => note.date.split(".")[0]))]
  console.log(activeYears)

  await actions.createRedirect({
    fromPath: "https://domfyi.netlify.com/*",
    toPath: "https://dom.fyi/:splat",
    isPermanent: true,
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
  })

  return await actions.createRedirect({
    fromPath: "https://dom.fyi",
    toPath: `https://dom.fyi/${notes[notes.length - 1].date}`,
    redirectInBrowser: true,
    statusCode: 200,
  })
}
