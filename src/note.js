import React from "react"
import { Link } from "gatsby"
import cheerio from "cheerio"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import TurndownService from "turndown"
import ReactMarkdown from "react-markdown"

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
  }
  main {
    max-width: 80vw !important;
    width: 600px;
    margin: 0 auto;
    padding-bottom: 4rem;
    padding-top: 3rem;
  }
  article {
    margin-top: 4rem;
    font-size: 1.175rem !important;
    text-align: justify;
    line-height: 1.45rem;
  }
  h2 {
    text-align: center;
  }
  nav {
    margin-top: 0rem;
    text-align: center;
    button {
      padding: 4px 8px;
      font-size: 0.9rem;
    }
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

const Note = ({ pageContext: { html, date, nav } }) => {
  const $ = cheerio.load(html)
  var turndown = new TurndownService()
  var markdown = turndown.turndown($("body").html())
  return (
    <main>
      <h2>{date}</h2>
      <Nav {...nav} />
      <article>
        <ReactMarkdown source={markdown} />
      </article>
      <GlobalStyle />
    </main>
  )
}

export default Note
