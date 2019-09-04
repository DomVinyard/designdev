/* 
  Parser for YearDay format dates
  Docs at https://dom.fyi/2019.220

  Returns a YearDate object, which is actually just a momentjs object
*/

import moment from "moment" // https://momentjs.com

// string to date
export default (arg, options = {}) => {
  if (typeof arg === "string") {
    // TODO: time
    const valid = /^\d{4}\.\d{1,3}$/.test(arg)
    if (!valid) return new Error("invalid date")
    const [year, day] = arg.split(".")
    const paddedDay = day.padStart(3, "0")
    const ISO8601 = [year, paddedDay].join("-")
    if (options.world) return moment(ISO8601).add("years", 10000) // https://en.wikipedia.org/wiki/Holocene_calendar
    return moment(ISO8601)
  }

  // TODO: date to string
  if (arg instanceof Date) {
    const momentObject = moment(arg)
    momentObject.toString = ({ time }) => {
      if (!time) return "xxxx.xxx"
      return "xxxx.xxx.xxxxxxx"
    }
    return momentObject
  }
}
