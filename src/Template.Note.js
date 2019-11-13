/*
 * An individual dom.fyi note.
 */

import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

const ReactMarkdown = require("react-markdown")
//
// * Note data
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
  let [note, dev_note] = rawMarkdownBody.split("👤")
  note = note.replace("🚀\n", "")
  const [year, day] = date.split(".")
  const nextText = gapAfter === 1 ? "next day" : `${gapAfter} days later`
  const isBeforeYearday = year == 2019 && day < 220
  const getTitle = ({ location: { hostname } }) => {
    const isExternal = hostname !== "localhost" && hostname !== "dom.fyi"
    if (isExternal) return hostname
    return date
  }
  //
  // * Main note
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

          {setTimeout(() => {
            //
            // post the console note
            setTimeout(() => {
              try {
                console.log("🚀", getTitle(window))
              } catch (error) {
                console.log(error)
              }
            }, 300)
          }, 300) && ""}
        </h1>
        <Link to="/list" children={"‹ view all"} />
      </header>
      {note && <article children={<ReactMarkdown source={note} />} />}
      <footer>
        {next && (
          <h2 children={<Link to={next} children={`${nextText} ›`} />} />
        )}
      </footer>
      {/* dev note */}
      {setTimeout(() => {
        //
        // post the console note
        console.clear()
        dev_note &&
          setTimeout(() => {
            console.log(`🚀${dev_note}`)
          }, 100)
      }, 100) && ""}
    </main>
  )
}
