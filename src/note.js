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
        {start ? (
          <NavButton to={start} text="‹ start" />
        ) : (
          <NavButton to="/calendar" text={"‹ view all"} />
        )}
        <h1>🚀{date}</h1>
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
      </footer>
    </main>
  )
}

export default Note
