const originalWarn = console.warn

/**
 * suppress item not found warnings in console
 * @param args - original console.warn args
 */
const warnWithoutSpreadsheet = (...args: unknown[]) => {
  //Example - Customize for your needs...
  const messages: string[] = args.filter(e => typeof e == "string") as string[]

  for (const m in messages) {
    if (messages[m].indexOf("item not found") != -1) {
      return
    }
  }

  // eslint-disable-next-line consistent-return
  return originalWarn(...args)
}

console.warn = warnWithoutSpreadsheet
