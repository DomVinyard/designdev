/*
  Available at https://dom.fyi/list.
  Acts as a directory of all notes.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link, navigate } from "gatsby"
import GithubCorner from "react-github-corner"
const github = "https://github.com/domfyi/dom.fyi"

const Rocket = () => <div className="list_divider">🚀</div>

export default ({ pageContext: { notes } }) => (
  <main>
    <Helmet>
      <title>dom.vin</title>
      <meta charSet="utf-8" />
      <link rel="canonical" href={`https://dom.fyi/list`} />
    </Helmet>
    {/* <GithubCorner
      href={github}
      style={{ position: "fixed", right: 0, top: 0 }}
    /> */}
    <header style={{ display: "block" }}>
      <h1>
        <span aria-label="rocket" style={{ marginRight: "1rem" , fontSize: '3rem'}} role="img">
          Dom Vinyard
        </span>
      </h1>
    </header>
    <div>
      <img src="dom.png" style={{marginBottom: '3rem', width: '100%', maxWidth: 490}}/>
      <h1 style={{opacity: 0.33}}>
        Project notes
      </h1>
      <React.Fragment>
        <h1 style={{ marginTop: "0" }}>
          <Link to={`/2021`} children={`2021 ›`} />
        </h1>
      </React.Fragment>
      <React.Fragment>
        <h1 style={{ marginTop: "0" }}>
          <Link to={`/2019`} children={`2019 ›`} />
        </h1>
      </React.Fragment>
    </div>
  </main>
)

// Truncate each note at the first punctuation mark as a description.
const mark = /[.:;?!~,`"&|()<>{}[\]\r\n/\\]+/
