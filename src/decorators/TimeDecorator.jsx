import {timeMeasurements} from "../constants/timeMeasurements";

export default class TimeDecorator {
  static hourBasedTimespan = (duration) => {
    const timeObject = {}
    timeObject.hours = Math.floor(duration / timeMeasurements.msInHour)
    timeObject.minutes = Math.floor(
      (duration % timeMeasurements.msInHour) / timeMeasurements.msInMinute
    )
    timeObject.seconds = Math.floor(
      (duration % timeMeasurements.msInMinute) / timeMeasurements.msInSecond
    )
    timeObject.milliSeconds = Math.floor(
      (duration % timeMeasurements.msInSecond)
    )
    return(timeObject)
  }
  static calculateDuration = (timeObject) => {
    return(
      timeObject.hours * timeMeasurements.msInHour +
      timeObject.minutes * timeMeasurements.msInMinute +
      timeObject.seconds * timeMeasurements.msInSecond
    )
  }
  static timeString = (duration) => {
    let timeObject = TimeDecorator.hourBasedTimespan(duration)
    let timeString = timeObject.seconds + 's'
    if(timeObject.minutes > 0 || timeObject.hours > 0) {
      timeString = timeObject.minutes + 'min ' + timeString
    }
    if(timeObject.hours > 0) {
      timeString = timeObject.hours + 'h ' + timeString
    }
    return(timeString)
  }
}
