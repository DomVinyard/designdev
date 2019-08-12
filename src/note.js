import React from "react"
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"

// ? font Alegreya
// ? styling from https://basecamp.com/shapeup/1.5-chapter-06 // ff-meta-serif-web-pro

const NavButton = ({ to, text }) =>
  to ? <Link to={to} children={text} /> : " "

const Note = ({
  pageContext: {
    date,
    nav: { start, previous, next, end, index, total },
    content,
  },
}) => {
  return (
    <main>
      <h2>🚀{date}</h2>
      <nav>
        <NavButton
          to={previous}
          text={previous ? `< ${previous.split(".")[1]}` : "previous"}
        />
        {" - "}
        <NavButton to={next} text={next ? `${next.split(".")[1]} >` : "next"} />
      </nav>
      <article children={<ReactMarkdown source={content} />}></article>
      <footer>
        <nav>
          <NavButton to={start} text="<< start" />
          <NavButton to="/calendar" text="🗓" />
          <NavButton to={end} text="latest >>" />
        </nav>
      </footer>
    </main>
  )
}

export default Note
