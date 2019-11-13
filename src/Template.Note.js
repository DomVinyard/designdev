/* 
  An individual dom.fyi note.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

const ReactMarkdown = require("react-markdown")

// For each note data
export const query = graphql`
  query($date: String) {
    dropbox: dropboxNode(localFile: { name: { eq: $date } }) {
      note: localFile {
        date: name
        content: childMarkdownRemark {
          excerpt
          rawMarkdownBody
        }
      }
    }
  }
`
export default ({
  data: {
    dropbox: {
      note: {
        date,
        content: { excerpt, rawMarkdownBody },
      },
    },
  },
  pageContext: { next, gapAfter },
}) => {
  let [note, console_note] = rawMarkdownBody.split("👤")
  note = note.replace("🚀\n", "")
  //
  // Build a note
  const [year, day] = date.split(".")
  const nextText = gapAfter === 1 ? "next day" : `${gapAfter} days later`
  const isBeforeYearday = year == 2019 && day < 220
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>dom.fyi</title>
        <link rel="canonical" href={`https://dom.fyi/${date}`} />
        <meta property="og:url" content={`https://dom.fyi/${date}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={date} />
        <meta property="og:description" content={excerpt.replace("🚀", "")} />
        <meta property="og:image" content="src/icon.png" />
      </Helmet>
      <header>
        <h1>
          {`🚀`}
          {isBeforeYearday ? "" : date}
        </h1>
        <Link to="/list" children={"‹ view all"} />
      </header>
      {note && <article children={<ReactMarkdown source={note} />} />}
      <footer>
        {next && (
          <h2 children={<Link to={next} children={`${nextText} ›`} />} />
        )}
      </footer>
      {setTimeout(() => {
        //
        // post the console note
        console.clear()
        console_note &&
          setTimeout(() => {
            console.log(`🚀${console_note}`)
            try {
              console.log(window.location, window.location.hostname)
              if (
                window.location.hostname === "localhost" ||
                window.location.hostname === "dom.fyi"
              ) {
                console.log("page", date)
              } else {
                console.log("page", window.location.hostname)
              }
            } catch (error) {
              console.log(error)
            }
          }, 100)
      }, 100) && ""}
    </main>
  )
}
