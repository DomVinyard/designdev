import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
export default ({ pageContext: { notes } }) => (
  <main>
    <Helmet>
      <title>dom.fyi</title>
      <meta charSet="utf-8" />
      <link rel="canonical" href={`https://dom.fyi/list`} />
    </Helmet>
    <h1>🚀dom.fyi</h1>
    <nav>
      {notes.map(({ date, content }, i) => (
        <div>
          <Link to={`/${date}`}>
            <label style={{ fontWeight: i === 0 ? "bold" : "normal" }}>
              {i === 0 ? "start" : date}
              {i === notes.length - 1 && "⟶ "}
            </label>
            <span>{content.excerpt.replace("🚀", "").split(mark)[0]}</span>
          </Link>
        </div>
      ))}
    </nav>
  </main>
)

const mark = /[.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/
