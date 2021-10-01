/*
  Available at https://dom.fyi/list.
  Acts as a directory of all notes.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

const years = [
  { year: '2021', title: 'Ownership App' },
  { year: '2019', title: 'Design & Dev' },
]

export default ({ pageContext: { notes } }) => (
  <div>
    <main class="home" style={{paddingBottom: '3rem', paddingTop: '2.4rem'}}>
      <Helmet>
        <title>dom.vin Blog</title>
        <meta charSet="utf-8" />
        <link rel="canonical" href={`https://dom.vin/list`} />
      </Helmet>
      {/* <GithubCorner
        href={github}
        style={{ position: "fixed", right: 0, top: 0 }}
      /> */}
      <div>
        <header style={{ display: "block" }}>

      <h1>
        <span aria-label="rocket" style={{ marginRight: "1rem" }} role="img">
          <Link to={`/`} children={`‹ dom.vin`} /> Blog
        </span>
      </h1>
        </header>
        {years.map(year => <React.Fragment>
          <h1 style={{ marginTop: "0" }}>
            <Link to={`/blog/${year.year}`}>
              {year.year} <span style={{ opacity: 0.33 }}>{year.title}</span> ›
              </Link>
          </h1>
        </React.Fragment>)}
      </div>
    </main>
  </div>
)

// Truncate each note at the first punctuation mark as a description.
const mark = /[.:;?!~,`"&|()<>{}[\]\r\n/\\]+/
