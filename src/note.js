import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import ReactMarkdown from "react-markdown"

const NavButton = ({ to, text }) =>
  to ? <Link to={to} children={text} /> : <span>{text}</span>

const Note = ({
  pageContext: {
    date,
    nav: { start, next },
    content,
  },
}) => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{date}</title>
        <link rel="canonical" href={`https://dom.fyi/${date}`} />
      </Helmet>
      <header>
        <h2>🚀{date}</h2>
        {start && <NavButton to={start} text="< start" />}
      </header>
      <article>
        <ReactMarkdown source={content} />
      </article>
      <footer>
        {next && (
          <h2>
            <NavButton to={next} text="next day >" />
          </h2>
        )}
        <NavButton to="/calendar" text={"  🗓 "} />
      </footer>
    </main>
  )
}

export default Note
