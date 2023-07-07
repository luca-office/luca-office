import * as React from "react"

export const useRefMock = <T extends Element>(current?: T): React.MutableRefObject<T | undefined> => ({current})
