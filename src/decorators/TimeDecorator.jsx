import { timeMeasurements } from "../constants/timeMeasurements";
export default class TimeDecorator {
  static hourBasedTimespan = (duration) => {
    return {
      hours: Math.floor(duration / timeMeasurements.msInHour),
      minutes: Math.floor((duration % timeMeasurements.msInHour) / timeMeasurements.msInMinute),
      seconds: Math.floor((duration % timeMeasurements.msInMinute) / timeMeasurements.msInSecond),
      milliSeconds: Math.floor((duration % timeMeasurements.msInSecond))
    }
  }

  static calculateDuration = (timeObject) => {
    return (
      timeObject.hours * timeMeasurements.msInHour +
      timeObject.minutes * timeMeasurements.msInMinute +
      timeObject.seconds * timeMeasurements.msInSecond
    )
  }

  static timeString = (duration) => {
    let timeObject = TimeDecorator.hourBasedTimespan(duration)
    let timeString = timeObject.seconds + 's'
    if (timeObject.minutes > 0 || timeObject.hours > 0) {
      timeString = timeObject.minutes + 'min ' + timeString
    }
    if (timeObject.hours > 0) {
      timeString = timeObject.hours + 'h ' + timeString
    }
    return (timeString)
  }

  static daytime = (dateString) => {
    const date = new Date(dateString)
    return (
      TimeDecorator.leadingZero(date.getHours()) +
      ':' +
      TimeDecorator.leadingZero(date.getMinutes()) +
      ':' +
      TimeDecorator.leadingZero(date.getSeconds())
    )
  }

  static leadingZero = (number) => {
    return number < 10 ? '0' + number : number
  }

  static summary = (workup) => {
    if (!!workup.duration) {
      const durationString = TimeDecorator.timeString(workup.duration)
      if (!!workup.starts_at) {
        return (
          durationString +
          ' (' +
          TimeDecorator.daytime(workup.starts_at) +
          '\xa0–\xa0' +
          TimeDecorator.daytime(workup.ends_at) +
          ')'
        )
      } else {
        return durationString;

      }
    } else {
      return undefined
    }
  }
}
