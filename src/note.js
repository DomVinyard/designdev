import React from "react"
import { Helmet } from "react-helmet"
// import ReactMarkdown from "react-markdown"
import { Link, graphql } from "gatsby"

export const query = graphql`
  query($title: String) {
    dropbox: dropboxNode(name: { eq: $title }) {
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

export default ({ data, pageContext: { content } }) => {
  console.log(data)
  // const date = data.dropbo
  return <div>hi</div>
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
      {data.html && (
        <article
          dangerouslySetInnerHTML={{
            __html: data.html.split("<p>🚀</p>\n")[1],
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
