import React from "react"
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"

// ? font Alegreya

const NavButton = ({ to, text }) =>
  to ? (
    <Link to={to} children={<button>{text}</button>} />
  ) : (
    <button disabled>{text}</button>
  )

const Nav = ({ start, previous, next, end, index, total }) => (
  <nav>
    <NavButton to={start} text="<< start" />
    <NavButton
      to={previous}
      text={previous ? `< ${previous.split(".")[1]}` : "previous"}
    />
    <NavButton to="/calendar" text="🗓" />
    <NavButton to={next} text={next ? `${next.split(".")[1]} >` : "next"} />
    <NavButton to={end} text="latest >>" />
  </nav>
)

const Note = ({ pageContext: { date, nav, content } }) => {
  return (
    <main>
      <h2>{date}</h2>
      <Nav {...nav} />
      <article children={<ReactMarkdown source={content} />}></article>
    </main>
  )
}

export default Note
