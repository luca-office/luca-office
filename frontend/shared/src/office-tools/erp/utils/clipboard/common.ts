export const toDataString = <T extends Object>(data: T): string =>
  Object.keys(data).reduce((accumulator, key, index) => {
    const value = data[key as keyof T]
    return index === 0 ? `${key}:${value}` : `${accumulator};${key}:${value}`
  }, "")
