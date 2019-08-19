import React from "react"
import { Helmet } from "react-helmet"
// import ReactMarkdown from "react-markdown"
import { Link, graphql } from "gatsby"

export const query = graphql`
  query($date: String) {
    dropbox: dropboxNode(localFile: { name: { eq: $date } }) {
      note: localFile {
        date: name
        content: childMarkdownRemark {
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
        content: { html },
      },
    },
  },
  pageContext: { content },
}) => {
  console.log(date, html)
  // const date = data.dropbo
  // return <div>hi</div>
  const start = false
  const next = false
  const isFirst = false
  // console.log("hi", { data })
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{date}</title>
        <link rel="canonical" href={`https://dom.fyi/${date}`} />
      </Helmet>
      <header>
        {!isFirst ? (
          <Link to={start} children={"‹ start"} />
        ) : (
          <Link to="/list" children={"‹ view all"} />
        )}
        <h1>🚀{isFirst ? "dom.fyi" : date}</h1>
      </header>
      {html && (
        <article
          dangerouslySetInnerHTML={{
            __html: html.split("<p>🚀</p>\n")[1],
          }}
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
}
