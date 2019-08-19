import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

export const query = graphql`
  # Get all notes (date, html, excerpt)
  query GetNotes {
    dropbox: allDropboxNode(sort: { fields: name }) {
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
        {dropbox.notes // for each note
          .filter(Boolean)
          .filter(
            ({ note: { date, content } }) =>
              /^\d{4}\.\d{1,3}$/.test(date) && // if date is good
              content &&
              content.excerpt.startsWith("🚀") // and not a draft
          )
          .map((
            { note: { date, content } } // then add to list
          ) => (
            <div>
              <Link to={`/${date}`}>
                <span>{date}</span>
                <span>{content.excerpt.slice(2)}</span>
              </Link>
            </div>
          ))}
      </nav>
    </main>
  )
}
