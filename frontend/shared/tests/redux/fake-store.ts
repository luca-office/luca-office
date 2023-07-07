import {Store} from "redux"

export const fakeStore: <T>(state: T) => Store<T> = state => ({
  default: () => {
    // empty
  },
  // @ts-ignore
  subscribe: (listener: any): any => {
    // empty
  },
  dispatch: (action: any) => action,
  getState: () => {
    return {...state}
  },
  replaceReducer: () => {
    // empty
  },
  [Symbol.observable]: () => null as any
})
