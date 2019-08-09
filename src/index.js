import React from "react"

const Index = ({ pageContext: { slug } }) => {
  return <meta http-equiv="refresh" content={`2;url=${slug}`} />
}

export default Index
