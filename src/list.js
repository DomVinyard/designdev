import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import { graphql } from "gatsby"

export const query = graphql`
  # Get all notes (date, html, excerpt)
  query GetNotes {
    dropbox: allDropboxNode(sort: { fields: name, order: ASC }) {
      notes: nodes {
        note: localFile {
          date: name
          content: childMarkdownRemark {
            html
            excerpt
          }
        }
      }
    }
  }
`

export default ({ data: { dropbox } }) => {
  const notes = dropbox.notes // for each note
    .filter(Boolean)
    .filter(
      ({ note: { date, content } }) =>
        content && // if has content
        /^\d{4}\.\d{1,3}$/.test(date) && // and date is good
        content.excerpt.startsWith("🚀") // and not a draft
    )
  return (
    <main>
      <Helmet>
        <title>dom.fyi</title>
        <meta charSet="utf-8" />
        <link rel="canonical" href={`https://dom.fyi/list`} />
      </Helmet>
      <h1>🚀dom.fyi</h1>
      <nav>
        <p>A daily update about Design & Dev.</p>
        {notes.map(({ note: { date, content } }, i) => (
          <div>
            <Link to={`/${date}`}>
              <label style={{ fontWeight: i === 0 ? "bold" : "normal" }}>
                {i === 0 ? "start" : date}
                {i === notes.length - 1 && "⟶ "}
              </label>
              <span>
                {
                  content.excerpt
                    .slice(2)
                    .split(".")[0]
                    .split(",")[0]
                    .split(":")[0]
                }
              </span>
            </Link>
          </div>
        ))}
      </nav>
    </main>
  )
}
