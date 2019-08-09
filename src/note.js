import React from "react"
import { Link } from "gatsby"
import cheerio from "cheerio"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
  }
  main {
    max-width: 80vw !important;
    width: 600px;
    margin: 0 auto;
    padding-bottom: 4rem;
  }
  article {
    font-size: 1.175rem !important;
    text-align: justify;
  }
  h2 {
    margin-top: 4rem;
  }
  nav {
    margin-top: 2rem;
    text-align: center;
  }
  `

const Styles = styled.div``

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

const cleanEvernote = html => {
  const $ = cheerio.load(html)
  $("*").each(function() {
    $(this).css({ "font-size": "", "font-family": "" })
  })
  return $("body").html()
}

const Note = ({ pageContext: { html, date, nav } }) => {
  const __html = cleanEvernote(html)
  return (
    <main>
      <Nav {...nav} />
      <h2>{date}</h2>
      <article dangerouslySetInnerHTML={{ __html }}></article>
      <GlobalStyle whiteColor />
    </main>
  )
}

export default Note
