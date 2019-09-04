/* 
  Parser for YearDay format dates
  Docs at https://dom.fyi/2019.220

  Returns a YearDate object, which is a moment object with 
  additional properties.
*/

import moment from "moment"
export default (arg, options = {}) => {
  if (typeof arg === "string") {
    const valid = /^\d{4}\.\d{1,3}$/.test(arg)
    if (!valid) return new Error("invalid string")
    const [year, day] = arg.split(".")
    const ISO8601 = `${year}-${day.padStart(3, "0")}`
    if (options.world)
      // TODO: add 10,000 years to the date.
      // (https://en.wikipedia.org/wiki/Holocene_calendar)
      return false
    return moment(ISO8601)
  }
  if (typeof arg === "date") {
    const momentObject = moment(arg)
    momentObject.toString = ({ time }) => {
      // TODO: convert js date into YearDay string.
      if (!time) return "xxxx.xxx"
      return "xxxx.xxx.xxxxxxx"
    }
    momentObject.isValid = false // TODO: determine if date valid
    return momentObject
  }
}
