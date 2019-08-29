import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

import moment from 'moment'
const YearDay = (arg, options) => {
  if (typeof arg === "string") {
    const valid = /^\d{4}\.\d{1,3}$/.test(arg)
    if (!valid) return new Error("invalid string")
    const [year, day] = arg.split(".")
    const ISO8601 = `${year}-${day.padStart(3, "0")}`
    // console.log(moment(ISO8601))
    return moment(ISO8601)
  }
}

export const query = graphql`
  query($date: String) {
    dropbox: dropboxNode(localFile: { name: { eq: $date } }) {
      note: localFile {
        date: name
        content: childMarkdownRemark {
          html
          excerpt
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
        content: { html, excerpt },
      },
    },
  },
  pageContext: { next, first },
}) => {
  const diff = next && YearDay(next.slice(1)).diff(YearDay(date), "days")
  const nextText = diff === 1 ? "next day" : `${diff} days later`
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{date}</title>
        <link rel="canonical" href={`https://dom.fyi/${date}`} />
        <meta property="og:url" content={`https://dom.fyi/${date}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`dom.fyi ${date}`} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content="images/icon.png" />
      </Helmet>
      <header>
        <Link to="/list" children={first ? "‹ view all" : "‹ start"} />
        <h1><span role="img">🚀</span>{first ? "dom.fyi" : date}</h1>
      </header>
      {html && (
        <article
          dangerouslySetInnerHTML={{ __html: html.replace("<p>🚀</p>\n", "") }}
        />
      )}
      <footer>
        {next && (
          <h2 children={<Link to={next} children={`${nextText} ›`} />} />
        )}
      </footer>
    </main>
  )
}
