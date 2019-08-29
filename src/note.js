import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
//
export const query = graphql`
  query($date: String) {
    dropbox: dropboxNode(localFile: { name: { eq: $date } }) {
      note: localFile {
        date: name
        content: childMarkdownRemark {
          html
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
        content: { html },
      },
    },
  },
  pageContext: { next, first },
}) => (
  <main>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{date}</title>
      <link rel="canonical" href={`https://dom.fyi/${date}`} />
    </Helmet>
    <header>
      {first ? (
        <Link to={`./${first}`} children={"‹ start"} />
      ) : (
        <Link to="/list" children={"‹ view all"} />
      )}
      <h1>🚀{!first ? "dom.fyi" : date}</h1>
    </header>
    {html && (
      <article
        dangerouslySetInnerHTML={{ __html: html.replace("<p>🚀</p>\n", "") }}
      />
    )}
    <footer>
      {next && (
        <h2>
          <Link to={next} children={"next day ›"} />
        </h2>
      )}
    </footer>
  </main>
)
