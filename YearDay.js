/* 
  Parser for YearDay format dates
  Docs at https://dom.vin/2019.220

  Returns a YearDate object, which is actually just a momentjs object
*/

const moment = require("moment") // https://momentjs.com

// string to date
const StringToDate = (arg, options = {}) => {
  if (typeof arg === "string") {
    try {
      const valid = /^\d{4}\.\d{0,3}\.?\d{1,8}$/.test(arg.trim())
      if (!valid) throw new Error("invalid")
      const [year, day, time] = arg.split(".")
      const paddedDay = day.padStart(3, "0")
      const ISO8601 = [year, paddedDay].join("-")
      const yeardayDate = moment(ISO8601, "YYYY-DDD")
      if (time) yeardayDate.add(time, "milliseconds")
      if (options.world) yeardayDate.add(10000, "years") // https://en.wikipedia.org/wiki/Holocene_calendar
      return yeardayDate
    } catch (error) {
      return moment.invalid()
    }
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

module.exports = StringToDate
