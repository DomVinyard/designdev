import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import ReactMarkdown from "react-markdown"

const PageLink = ({ date, content, nav: { isFirst, isLatest } }) => (
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
)

const List = ({ pageContext: { pages } }) => {
  const first = pages.slice(-1)[0]
  const latest = pages[0]
  const pastWeek = pages.slice(1, 7)
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
      <article>
        <p>A daily update about Design & Dev.</p>
        <nav>
          {pages.reverse().map(page => (
            <PageLink {...page} />
          ))}
        </nav>
        {false && (
          <nav>
            <PageLink {...first} />
            {pastWeek.reverse().map(page => (
              <PageLink {...page} />
            ))}
            <PageLink {...latest} />
          </nav>
        )}
      </article>
    </main>
  )
}

export default List
