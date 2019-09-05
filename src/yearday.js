/* 
  Parser for YearDay format dates
  Docs at https://dom.fyi/2019.220

  Returns a YearDate object, which is actually just a momentjs object
*/

import moment from "moment" // https://momentjs.com

// string to date
export default (arg, options = {}) => {
  if (typeof arg === "string") {
    const valid = /^\d{4,5}\.\d{1,3}\.\d{1,8}?$/.test(arg)
    if (!valid) return moment.invalid()
    const [year, day, time] = arg.split(".")
    const paddedDay = day.padStart(3, "0")
    const ISO8601 = [year, paddedDay].join("-")
    const yeardayDate = moment(ISO8601)
    if (time) yeardayDate.add(time, "milliseconds")
    if (options.world) yeardayDate.add(10000, "years") // https://en.wikipedia.org/wiki/Holocene_calendar
    return yeardayDate
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
