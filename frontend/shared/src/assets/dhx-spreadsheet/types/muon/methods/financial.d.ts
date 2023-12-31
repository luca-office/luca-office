import {cellValue} from "../types"
export declare function ACCRINT(
  issue: cellValue,
  _first: cellValue,
  settlement: cellValue,
  rate: cellValue,
  par: cellValue,
  frequency: cellValue,
  basis?: cellValue
): number
export declare function PMT(
  rate: cellValue,
  periods: cellValue,
  present: cellValue,
  future?: cellValue,
  type?: cellValue
): number
export declare function FV(
  rate: cellValue,
  periods: cellValue,
  payment: cellValue,
  value?: cellValue,
  type?: cellValue
): number
export declare function DB(
  cost: cellValue,
  salvage: cellValue,
  life: cellValue,
  period: cellValue,
  month?: cellValue
): number
export declare function DDB(
  cost: cellValue,
  salvage: cellValue,
  life: cellValue,
  period: cellValue,
  factor?: cellValue
): number
export declare function DOLLAR(num: cellValue, decimals?: cellValue): string
export declare function DOLLARDE(dollar: cellValue, fraction: cellValue): number
export declare function DOLLARFR(dollar: cellValue, fraction: cellValue): number
export declare function EFFECT(rate: cellValue, periods: cellValue): number
export declare function FVSCHEDULE(principal: cellValue, schedule: cellValue[]): number
export declare function IRR(values: cellValue[], guess?: cellValue): number
export declare function IPMT(
  rate: cellValue,
  period: cellValue,
  periods: cellValue,
  present: cellValue,
  future?: cellValue,
  type?: cellValue
): number
export declare function ISPMT(rate: cellValue, period: cellValue, periods: cellValue, value: cellValue): number
export declare function NPV(...values: cellValue[]): number
export declare function NOMINAL(rate: cellValue, periods: cellValue): number
export declare function NPER(
  rate: cellValue,
  payment: cellValue,
  present: cellValue,
  future?: cellValue,
  type?: cellValue
): number
export declare function PDURATION(rate: cellValue, present: cellValue, future: cellValue): number
export declare function PPMT(
  rate: cellValue,
  period: cellValue,
  periods: cellValue,
  present: cellValue,
  future?: cellValue,
  type?: cellValue
): number
export declare function PV(
  rate: cellValue,
  periods: cellValue,
  payment: cellValue,
  future?: cellValue,
  type?: cellValue
): number
export declare function SYD(cost: cellValue, salvage: cellValue, life: cellValue, per: cellValue): number
export declare function TBILLPRICE(settlement: cellValue, maturity: cellValue, discount: cellValue): number
export declare function TBILLYIELD(settlement: cellValue, maturity: cellValue, pr: cellValue): number
