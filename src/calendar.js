import React from "react"
import { Link } from "gatsby"

const Calendar = ({ pageContext: { notes } }) => {
  return (
    <React.Fragment>
      <h1>dom.fyi</h1>
      <ul>
        {notes.map(date => (
          <li>
            <Link to={date}>{date}</Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default Calendar
