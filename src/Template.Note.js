/*
 * An individual dom.fyi note.
 */

import React from "react"
import YearDay from "../YearDay"
import TimeAgo from "react-timeago"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

// in your react component

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
  pageContext: { next, gapAfter, isLatest },
}) => {
  let [note, dev_note] = rawMarkdownBody.split("👤")
  note = note.replace("🚀\n", "")
  const [year, day] = date.split(".")
  const nextText = gapAfter === 1 ? "next day" : `${gapAfter} days later`
  const isBeforeYearday = year == 2019 && day < 220
  const formatter = (value, unit, suffix, epochSeconds) => {
    const secondsAgo = new Date() - epochSeconds
    const oneDay = 1000 * 60 * 60 * 24
    if (secondsAgo < oneDay) return " today"
    if (secondsAgo < oneDay * 2) return " yesterday"
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
      {typeof window !== "undefined" &&
      !["dom.fyi", "localhost"].includes(window.location.hostname) ? (
        <header>
          <h1>{typeof window !== "undefined" && window.location.hostname}</h1>
          <Link to="/list" children={"‹ dom.fyi"} />
        </header>
      ) : (
        <header>
          <h1>
            {`🚀`}
            {isBeforeYearday ? (
              ""
            ) : isLatest ? (
              <TimeAgo date={YearDay(date)} formatter={formatter} />
            ) : (
              date
            )}
          </h1>
          <Link to="/list" children={"‹ view all"} />
        </header>
      )}

      {note && <article children={<ReactMarkdown source={note} />} />}
      <footer>
        {next &&
          (typeof window === "undefined" ||
            ["dom.fyi", "localhost"].includes(window.location.hostname)) && (
            <h2 children={<Link to={next} children={`${nextText} ›`} />} />
          )}
      </footer>
      {/* dev note */}
      {setTimeout(() => {
        if (!dev_note) return
        console.clear()
        dev_note &&
          setTimeout(() => {
            console.log(`🚀${dev_note}`)
          }, 250)
      }, 250) && ""}
    </main>
  )
}
