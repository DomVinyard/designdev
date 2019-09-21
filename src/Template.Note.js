/* 
  An individual dom.fyi note.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import GithubCorner from "react-github-corner"
const github = "https://github.com/domfyi/dom.fyi/blob/dom.fyi/README.md"

export const query = graphql`
  query($date: String) {
    dropbox: dropboxNode(localFile: { name: { eq: $date } }) {
      note: localFile {
        date: name
        content: childMarkdownRemark {
          excerpt
          html
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
        content: { html, excerpt, rawMarkdownBody },
      },
    },
  },
  pageContext: { next, first, gapAfter },
}) => {
  const nextText = gapAfter === 1 ? "next day" : `${gapAfter} days later`
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
      <GithubCorner
        href={github}
        style={{ position: "fixed", right: 0, top: 0 }}
      />
      <header>
        <Link to="/list" children={first ? "‹ view all" : "‹ start"} />
        <h1>
          {`🚀`}
          {date}
        </h1>
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
