import {cellValue} from "../types"
export declare function DATE(year: number, month: number, day: number): number
export declare function TIME(hour: number, minute: number, second: number): number
export declare function DAY(date: number): number
export declare function MONTH(date: number): number
export declare function YEAR(date: number): number
export declare function HOUR(date: number): number
export declare function MINUTE(date: number): number
export declare function SECOND(date: number): number
export declare function NOW(): number
export declare function DATEDIF(startN: number, endN: number, unit: string): number
export declare function DATEVALUE(string: string): number
export declare function DAYS(date: cellValue, date2: cellValue): number
export declare function DAYS360(date: cellValue, date2: cellValue, method?: number): number
export declare function EDATE(date: cellValue, month: cellValue): number
export declare function EOMONTH(date: cellValue, month: cellValue): number
export declare function ISOWEEKNUM(date: cellValue): number
export declare function NETWORKDAYS(date1: cellValue, date2: cellValue, holidays?: cellValue[]): number
export declare function NETWORKDAYSINTL(
  date1: cellValue,
  date2: cellValue,
  weekend: number,
  holidays?: cellValue[]
): number
export declare function TIMEVALUE(text: cellValue): number
export declare function WEEKNUM(date: cellValue, type?: number): number
export declare function WEEKDAY(date: cellValue, type?: number): number
export declare function WORKDAY(date1: cellValue, days: cellValue, holidays: cellValue[]): number
export declare function WORKDAYINTL(date1: cellValue, days: cellValue, weekend: number, holidays: cellValue[]): number
export declare function YEARFRAC(date1: cellValue, date2: cellValue, basis?: number): number
