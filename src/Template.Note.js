/* 
  An individual dom.fyi note.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

import showdown from "showdown"
const converter = new showdown.Converter()

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
  const [blog_post, console_post] = rawMarkdownBody.split("👤")
  const new_html = converter.makeHtml(blog_post)
  const nextText = gapAfter === 1 ? "next day" : `${gapAfter} days later`
  const [year, day] = date.split(".")
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
          {year == 2019 && day < 220
            ? ""
            : date /* otherwise yearday wasn't invented yet */}
        </h1>
        <Link to="/list" children={"‹ view all"} />
      </header>
      {new_html && (
        <article
          dangerouslySetInnerHTML={{
            __html: new_html.replace("<p>🚀</p>\n", ""),
          }}
        />
      )}
      {console_post
        ? console.log(
            `${eval(`clear()`)} ${setTimeout(
              () => console.log(`🚀${console_post}`),
              1000
            )}`
          )
        : ""}
      <footer>
        {next && (
          <h2 children={<Link to={next} children={`${nextText} ›`} />} />
        )}
      </footer>
    </main>
  )
}
