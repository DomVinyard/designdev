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
  <div>
    <main class="home" style={{paddingBottom: '3rem', paddingTop: '2.4rem'}}>
      <Helmet>
        <title>dom.vin</title>
        <meta charSet="utf-8" />
        <link rel="canonical" href={`https://dom.fyi/list`} />
      </Helmet>
      {/* <GithubCorner
        href={github}
        style={{ position: "fixed", right: 0, top: 0 }}
      /> */}
      <div>
        <img src="dom.png" style={{marginTop: '2.5rem', maxWidth: '90%', width: 230}}/>
        <header style={{ display: "block" }}>
          <h1>
            <span aria-label="rocket" style={{ marginRight: "1rem", marginBottom: 0 , fontSize: '2.5rem'}} role="img">
              Dom Vinyard
            </span>
          </h1>
        </header>
        <React.Fragment>
          <h1 style={{ marginTop: "0" }}>
            <Link to={`/2021`}>
              2021 <span style={{opacity: 0.33}}>Ownership</span> ›
              </Link>
          </h1>
        </React.Fragment>
        <React.Fragment>
          <h1 style={{ marginTop: "0" }}>
            <Link to={`/2019`}>
              2019 <span style={{opacity: 0.33}}>Design & Dev</span> ›
              </Link>
          </h1>
        </React.Fragment>
      </div>
    </main>
  </div>
)

// Truncate each note at the first punctuation mark as a description.
const mark = /[.:;?!~,`"&|()<>{}[\]\r\n/\\]+/
