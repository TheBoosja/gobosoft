import { format, getDayOfYear, getDaysInYear, getYear } from 'date-fns'
import { P5CanvasInstance } from 'react-p5-wrapper'

export class Day {
  readonly DAY_OF_YEAR: number
  readonly DAYS_IN_YEAR: number
  readonly THETA: number

  constructor(private date: Date = new Date()) {
    this.DAY_OF_YEAR = getDayOfYear(this.date)
    this.DAYS_IN_YEAR = getDaysInYear(this.date)
    this.THETA = 360 / this.DAYS_IN_YEAR
  }

  private dayToDegrees = (date: number) => date * this.THETA
  private degreesToDay = (degrees: number) => degrees / this.THETA

  get indexOfYear(): number {
    return this.getIndexOfYear(this.DAY_OF_YEAR)
  }

  get formatExtinct(): string {
    return format(this.date, 'MMM do yyyy')
  }

  get format(): string {
    if (this.DAY_OF_YEAR === 365) {
      return 'Dec 29th'
    }

    const monthIdx = Math.floor((this.DAY_OF_YEAR - 1) / 28)
    const month = this.getMonth(monthIdx)

    let date = this.DAY_OF_YEAR % 28
    if (date === 0) date = 28

    const dateStr = (date + '').padStart(2, ' ')
    return `${month} ${dateStr}${this.getDateSuffix(date)} ${getYear(
      this.date
    )}`
  }

  getIndexOfYear = (dayOfYear: number): number => {
    const pad = 90 - this.THETA
    const degrees = this.dayToDegrees(dayOfYear)

    let index = dayOfYear - this.degreesToDay(270 + this.THETA)

    if (degrees + pad < 360) {
      index = dayOfYear + this.degreesToDay(pad)
    }

    return Math.floor(index)
  }

  getIndexOfYearFromXY = (
    x: number,
    y: number,
    cx: number,
    cy: number,
    p5: P5CanvasInstance
  ) => {
    // Radius of inner circle
    const r = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy))
    // Angle of point relative to center
    // const angle = p5.degrees(Math.acos(x / r - cx / r))
    let angle = p5.degrees(Math.atan2(y - cy, x - cx))
    if (angle < 0) angle = 360 + angle

    const dayOfYear = Math.floor(angle / this.THETA)
    console.log('asd', { x, y, cx, cy, r, angle })

    return dayOfYear - 1
  }

  getMonth = (month: number) => {
    switch (month) {
      case 0:
      default:
        return 'Jan'
      case 1:
        return 'Feb'
      case 2:
        return 'Mar'
      case 3:
        return 'Apr'
      case 4:
        return 'May'
      case 5:
        return 'Jun'
      case 6:
        return 'Sol'
      case 7:
        return 'Jul'
      case 8:
        return 'Aug'
      case 9:
        return 'Sep'
      case 10:
        return 'Oct'
      case 11:
        return 'Nov'
      case 12:
        return 'Dec'
    }
  }

  getDateSuffix = (date: number) => {
    switch (date) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }
}
