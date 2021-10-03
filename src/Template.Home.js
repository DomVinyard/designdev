/*
  Available at https://dom.fyi/list.
  Acts as a directory of all notes.
*/

import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

const smoothScroll = h => {
  let i = h || 0
  if (i < window.innerHeight * 2) {
    setTimeout(() => {
      window.scrollTo(0, i)
      smoothScroll(i + 50)
    }, 10)
  }
}

const MobileTitle = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "space-around",
      }}
      className="mobile_title"
    >
      <div>
        <div>
          <img
            src="dom.png"
            style={{
              maxWidth: "90%",
              width: 230,
              margin: "0 1.5rem",
              marginBottom: 48,
              justifyContent: "center",
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: "3.5rem",
              color: "#fff",
              fontFamily: "Bungee",
              marginBottom: -16,
            }}
          >
            Dom
          </div>
          <div
            style={{
              fontSize: "3.5rem",
              color: "#fff",
              fontFamily: "Bungee",
            }}
          >
            Vinyard
          </div>
        </div>
      </div>
    </div>
  )
}

const DesktopTitle = () => {
  return (
    <div
      className="desktop_title"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "4.5rem",
          color: "#fff",
          fontFamily: "Bungee",
        }}
      >
        Dom
      </span>
      <img
        src="dom.png"
        style={{
          maxWidth: "90%",
          width: 230,
          margin: "0 1.5rem",
          cursor: "pointer",
        }}
        onClick={() => smoothScroll()}
      />
      <span
        style={{
          fontSize: "4.5rem",
          color: "#fff",
          fontFamily: "Bungee",
        }}
      >
        Vinyard
      </span>
    </div>
  )
}
export default ({ pageContext: { notes } }) => (
  <div>
    <Helmet>
      <title>dom.vin</title>
      <meta charSet="utf-8" />
      <link rel="canonical" href={`https://dom.vin/list`} />
    </Helmet>
    <div
      style={{
        backgroundColor: "#279BCC",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DesktopTitle />
      <MobileTitle />
    </div>
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Roboto",
        lineHeight: 1.4,
        fontWeight: "500",
      }}
    >
      <div style={{ maxWidth: "60%" }}>
        <div>
          <span
            className="bio"
            style={{
              marginRight: "1rem",
              marginBottom: 0,
              color: "#454C52",
            }}
          >
            Dom is a designer and software developer, creator of{" "}
            <a
              href="https://ownershipapp.com"
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              Ownership
            </a>{" "}
            and a teacher at{" "}
            <a
              href="https://codeyourfuture.io"
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              Code Your Future
            </a>
            .
          </span>
        </div>
        <Link to={`/blog`}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              color: "#279BCC",
              marginTop: 48,
            }}
          >
            <div>
              <img src="dom.png" style={{ width: 42, marginRight: 10 }} />
            </div>
            <div className="blog_link" style={{ marginTop: -6 }}>
              Blog →
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
)
