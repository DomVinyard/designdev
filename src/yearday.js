
import moment from 'moment'
export default (arg, options = {}) => {
    if (typeof arg === "string") {
      const valid = /^\d{4}\.\d{1,3}$/.test(arg)
      if (!valid) return new Error("invalid string")
      const [year, day] = arg.split(".")
      const ISO8601 = `${year}-${day.padStart(3, "0")}`
      return moment(ISO8601)
    }
    if (typeof arg === 'date') {
      arg.toString = ({time}) => 'xxxx.xxx'
      arg.isValid = false
    }
  }

// YearDay(string) // to date (with properties)
// YearDay(string).isValid // unless native invalid date
// YearDay(date).toString({ time: false }) // default true if present 
// YearDay(date, { world: true })