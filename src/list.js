import React from "react"
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"

const List = ({ pageContext: { pages } }) => {
  return (
    <main>
      <h1>dom.fyi</h1>
      <nav>
        {pages.map(({ date, content }) => (
          <div>
            <Link to={date}>
              <label>{date}</label>
              <span>
                <ReactMarkdown
                  source={content.split(`\n`).filter(Boolean)[0]}
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
