import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import ReactMarkdown from "react-markdown"

const List = ({ pageContext: { pages } }) => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>dom.fyi</title>
        <link rel="canonical" href={`https://dom.fyi/list`} />
      </Helmet>
      <header>
        <h1>🚀dom.fyi</h1>
      </header>
      <article>A daily update on Design & Dev.</article>
      <nav>
        {pages.map(({ date, content, nav: { isFirst, isLatest } }) => (
          <div>
            <Link to={date}>
              <label>{isFirst ? "start" : date}</label>
              <span>
                <ReactMarkdown
                  source={content
                    .split(`\n`)
                    .filter(Boolean)[0]
                    .replace(/([.?!,:])\s*(?=[A-Z])/g, "$1|")
                    .split("|")[0]
                    .slice(0, -1)}
                />
              </span>
            </Link>
          </div>
        ))}
      </nav>
    </main>
  )
}

export default List
