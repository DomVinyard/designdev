import React from "react"
import { Link } from "gatsby"
import cheerio from "cheerio"

const Nav = ({ start, previous, next, end, index, total }) => (
  <nav>
    {start ? (
      <Link to={start}>
        <button>start</button>
      </Link>
    ) : (
      <button disabled>start</button>
    )}
    {previous ? (
      <Link to={previous}>
        <button>previous</button>
      </Link>
    ) : (
      <button disabled>previous</button>
    )}
    <Link to="/calendar">
      <button>🗓</button>
    </Link>
    {next ? (
      <Link to={next}>
        <button>next</button>
      </Link>
    ) : (
      <button disabled>next</button>
    )}
    {end ? (
      <Link to={end}>
        <button>end</button>
      </Link>
    ) : (
      <button disabled>end</button>
    )}
    <span>
      {index} of {total}
    </span>
  </nav>
)

const Note = ({ pageContext: { html, date, nav } }) => {
  const body = cheerio.load(html)("body")
  return (
    <React.Fragment>
      <Nav {...nav} />

      <h1>{date}</h1>
      <article>
        <div dangerouslySetInnerHTML={{ __html: body.html() }} />
      </article>
    </React.Fragment>
  )
}

export default Note
