import React from "react"
import { Link } from "gatsby"
import cheerio from "cheerio"
import styled from "styled-components"

const Styles = styled.div`
  max-width: 90vw !important;
  width: 600px;
  margin: 0 auto;
  article {
    font-size: 1.2rem !important;
  }
  h1 {
    margin-top: 4rem;
  }
`

const NavButton = ({ to, text }) =>
  to ? (
    <Link to={to}>
      <button>{text}</button>
    </Link>
  ) : (
    <button disabled>{text}</button>
  )

const Nav = ({ start, previous, next, end, index, total }) => (
  <nav>
    <NavButton to={start} text="start" />
    <NavButton to={previous} text="previous" />
    <NavButton to="/calendar" text="🗓" />
    <NavButton to={next} text="next" />
    <NavButton to={end} text="end" />
  </nav>
)

const Note = ({ pageContext: { html, date, nav } }) => {
  const body = cheerio.load(html)("body")
  return (
    <Styles>
      <Nav {...nav} />
      <h1>{date}</h1>
      <article dangerouslySetInnerHTML={{ __html: body.html() }}></article>
    </Styles>
  )
}

export default Note
