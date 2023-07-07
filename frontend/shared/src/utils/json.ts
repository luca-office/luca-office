import {Option} from "./option"

export const parseJson = (value: string) => {
  try {
    return Option.of(JSON.parse(value))
  } catch {
    return Option.none()
  }
}
