import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import ReactMarkdown from "react-markdown"

// ? font Alegreya
// ? styling from https://basecamp.com/shapeup/1.5-chapter-06 // ff-meta-serif-web-pro

const NavButton = ({ to, text }) =>
  to ? <Link to={to} children={text} /> : <span>{text}</span>

const Note = ({
  pageContext: {
    date,
    nav: { start, previous, next, end, index, total },
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
        <nav>{start && <NavButton to={start} text="< start" />}</nav>
      </header>
      <article>
        <ReactMarkdown source={content} />
        {next && (
          <h2>
            <NavButton to={next} text="next day >" />
          </h2>
        )}
      </article>
      <footer>
        <nav>
          <NavButton to="/calendar" text={"  🗓 "} />
        </nav>
      </footer>
    </main>
  )
}

export default Note
