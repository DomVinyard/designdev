/*
  Available at https://dom.fyi/list.
  Acts as a directory of all notes.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link, navigate } from "gatsby"
import GithubCorner from "react-github-corner"
const github = "https://github.com/domfyi/dom.fyi"

const breakLength = 10 // If no post for this many days, consider it a new content group

const Rocket = () => <div className="list_divider">🚀</div>

export default ({ pageContext: { notes, year } }) => (
  <main>
    <Helmet>
      <title>dom.fyi</title>
      <meta charSet="utf-8" />
      <link rel="canonical" href={`https://dom.fyi/list`} />
    </Helmet>
    {year === '2019' && <GithubCorner
      href={github}
      style={{ position: "fixed", right: 0, top: 0 }}
    />}
    <header style={{ display: "block" }}>
      <h1>
        <span aria-label="rocket" style={{ marginRight: "1rem" }} role="img">
          <Link to={`/`} children={`‹ dom.vin`} /> 🚀{year}
        </span>
      </h1>
    </header>

    {year === '2019' && <h1 style={{opacity: 0.33, marginBottom: '3rem'}}>
        On Design and Dev and starting a blog.
    </h1>
    }

    {year === '2021' && <h1 style={{opacity: 0.33, marginBottom: '3rem'}}>
        On launching a startup.
    </h1>
    }
    

    <nav>
      {notes.filter(note => note.content.excerpt.indexOf("🚀") === 0).map(({ date, content, gapAfter }, i) => (
        <React.Fragment key={date}>
          <div
            style={{ marginBottom: gapAfter > breakLength ? "2rem" : "auto" }}
          >
            <Link to={`/${date}`}>
              <label>
                <span style={{ fontSize: "0.85em" }}>{i + 1}</span>
              </label>
              <span style={{ marginLeft: 4 }}>
                {content.excerpt.replace("🚀", "").split(mark)[0]}
              </span>
            </Link>
          </div>
          {gapAfter > breakLength && i + 1 < notes.length && <Rocket />}
        </React.Fragment>
      ))}
    </nav>
  </main>
)

// Truncate each note at the first punctuation mark as a description.
const mark = /[.:;?!~,`"&|()<>{}[\]\r\n/\\]+/
