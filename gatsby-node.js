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
  const notes = [
    ...[...data.dropbox.notes]
      .map(({ note }) => note)
      .filter(
        note =>
          note &&
          note.content && // build every .md file
          /^\d{4}\.\d{1,3}$/.test(note.date) && // with valid date
          (isPublished(note.content.excerpt) || isDevMode) // and a 🚀 on line 1
      ),
  ].sort((a, b) =>
    YearDay(a.date).format("YYYY-MM-DD") > YearDay(b.date).format("YYYY-MM-DD")
      ? 1
      : -1
  )

  console.log({ notesPublished: notes.map(n => n.date) })

  actions.createPage({
    path: "/",
    component: resolve(`./src/Template.Home.js`),
  })

  actions.createPage({
    path: "/blog",
    component: resolve(`./src/Template.Blog.js`),
  })

  notes.forEach((note, i) => {
    const next = notes[i + 1] && `${notes[i + 1].date}`
    const isLatest = i + 1 === notes.length
    const gapAfter =
      next &&
      notes[i + 1] &&
      YearDay(notes[i + 1].date).diff(YearDay(note.date), "days")
    note.gapAfter = gapAfter
    actions.createPage({
      path: `blog/${note.date}`,
      component: resolve(`./src/Template.Note.js`),
      context: { date: note.date, next, gapAfter, isLatest },
    })
  })

  const activeYears = [...new Set(notes.map(note => note.date.split(".")[0]))]
  activeYears.map(async year => {
    console.log("📅 year list", year)
    await actions.createPage({
      path: `/blog/${year}`,
      component: resolve(`./src/Template.Year.js`),
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
  // await actions.createRedirect({
  //   fromPath: `/list`,
  //   toPath: `/`,
  //   statusCode: "200!",
  // })

  // from articles instead of redirects

  // Object.entries(redirects).forEach(async ([key, value]) => {
  //   await actions.createRedirect({
  //     fromPath: `https://${key}`,
  //     toPath: `/${value}`,
  //     statusCode: "200!",
  //   })
  //   await actions.createRedirect({
  //     fromPath: `https://www.${key}`,
  //     toPath: `/${value}`,
  //     statusCode: "200!",
  //   })
  //   await actions.createRedirect({
  //     fromPath: `https://${key}/*`,
  //     toPath: `/${value}`,
  //     statusCode: "200!",
  //   })
  //   await actions.createRedirect({
  //     fromPath: `https://www.${key}/*`,
  //     toPath: `/${value}`,
  //     statusCode: "200!",
  //   })
  // })

  // return await actions.createRedirect({
  //   fromPath: "https://dom.fyi",
  //   toPath: `https://dom.fyi/2019}`,
  //   redirectInBrowser: true,
  //   statusCode: 200,
  // })
}
