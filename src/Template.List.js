/*
  Available at https://dom.fyi/list.
  Acts as a directory of all notes.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import GithubCorner from "react-github-corner"
const github = "https://github.com/domfyi/dom.fyi"

const breakLength = 10 // If no post for this many days, consider it a new content group

const Rocket = () => <div className="list_divider">🚀</div>

export default ({ pageContext: { notes } }) => (
  <main>
    <Helmet>
      <title>dom.fyi</title>
      <meta charSet="utf-8" />
      <link rel="canonical" href={`https://dom.fyi/list`} />
    </Helmet>
    <GithubCorner
      href={github}
      style={{ position: "fixed", right: 0, top: 0 }}
    />
    <header>
      <h1>{`🚀`}dom.fyi</h1>
      <a children="spacer" style={{ opacity: 0 }}></a>
    </header>
    <nav>
      {notes.map(({ date, content, gapAfter }, i) => (
        <React.Fragment>
          <div
            style={{ marginBottom: gapAfter > breakLength ? "2rem" : "auto" }}
          >
            <Link to={`/${date}`}>
              <label>
                <span style={{ fontSize: "0.85em" }}>{date.split(".")[0]}</span>
                .{date.split(".")[1]}
              </label>
              <span style={{ marginLeft: 4 }}>
                {content.excerpt.replace("🚀", "").split(mark)[0]}
              </span>
            </Link>
          </div>
          {gapAfter > breakLength && <Rocket />}
        </React.Fragment>
      ))}
    </nav>
    <div>
      <Rocket />
    </div>
  </main>
)

// Truncate each note at the first punctuation mark as a description.
const mark = /[.:;?!~,`"&|()<>{}[\]\r\n/\\]+/
