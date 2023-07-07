import {isEqual} from "lodash-es"
import * as React from "react"

type Callback<T> = (value?: T) => void

export type UseStateWithCallbackHook<T> = [
  value: T | undefined,
  setValue: (newValue: T | undefined, callback?: Callback<T>) => void
]

export const useStateWithCallback = <T>(initialValue?: T): UseStateWithCallbackHook<T> => {
  const callbackRef = React.useRef<Callback<T>>()
  const valueRef = React.useRef<T>()

  const [value, setValue] = React.useState<T | undefined>(initialValue)

  if (!isEqual(valueRef.current, value)) {
    valueRef.current = value
  }

  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(valueRef.current)
      callbackRef.current = undefined
    }
  }, [valueRef.current])

  const handleSetValue = (newValue: T | undefined, callback?: Callback<T>) => {
    callbackRef.current = callback
    setValue(newValue)
  }

  return [valueRef.current, handleSetValue]
}
