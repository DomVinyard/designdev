import React from "react"
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"

const List = ({ pageContext: { pages } }) => {
  return (
    <main>
      <h1>🚀dom.fyi</h1>
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
