/*
  Available at https://dom.fyi/list.
  Acts as a directory of all notes.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

export default ({ pageContext: { notes } }) => (
  <div>
    <main class="home" style={{paddingBottom: '3rem', paddingTop: '2.4rem'}}>
      <Helmet>
        <title>dom.vin</title>
        <meta charSet="utf-8" />
        <link rel="canonical" href={`https://dom.vin/list`} />
      </Helmet>
      <div>
        <img src="dom.png" style={{marginTop: '2.5rem', maxWidth: '90%', width: 230}}/>
        <header style={{ display: "block" }}>
          <h1>
            <span style={{ marginRight: "1rem", marginBottom: 0, fontSize: '2.5rem'}}>
              Dom Vinyard
            </span>
            <div>
              <span style={{ marginRight: "1rem", marginBottom: 0, color: '#279BCC' }}>
                Dom is a designer and software developer, the creator of Ownership and a teacher at Code Your Future.
              </span>
            </div>
          </h1>
        </header>
        <React.Fragment>
          <h1 style={{ marginTop: "0" }}>
            <Link to={`/blog`}>Blog ›</Link>
          </h1>
        </React.Fragment>
      </div>
    </main>
  </div>
)

// Truncate each note at the first punctuation mark as a description.
const mark = /[.:;?!~,`"&|()<>{}[\]\r\n/\\]+/
