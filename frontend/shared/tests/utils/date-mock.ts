export const getDateValueMock = (year: number, month: number, day: number): DateConstructor => {
  const mockDate = new Date(Date.UTC(year, month > 0 ? month - 1 : month, day, 0, 0, 0))
  const MockDate = () => mockDate
  MockDate.UTC = Date.UTC
  MockDate.now = () => mockDate.getTime()
  MockDate.parse = Date.parse
  MockDate.toString = Date.toString
  MockDate.prototype = Date.prototype
  MockDate.prototype.toISOString = Date.prototype.toISOString

  return (MockDate as unknown) as DateConstructor
}
