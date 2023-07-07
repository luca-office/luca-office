export const fakeTranslate = (key: string | string[]) => key as string
export const fakeTranslateWithOptions = (key: string | string[], options?: unknown) =>
  (key as string) + (options !== undefined ? JSON.stringify(options) : "")
