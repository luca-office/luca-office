import {EmailDirectory} from "shared/graphql/generated/globalTypes"

/**
 * map input values according to selected directory and delay
 * @param delay - input delay
 * @param directory - selected directory
 */
export const cleanEmailDelay = (delay: number, directory: EmailDirectory): number => {
  if (directory !== EmailDirectory.Inbox && delay > 0) {
    return -delay
  } else if (directory !== EmailDirectory.Inbox && delay === 0) {
    return -1
  } else if (Number.isNaN(delay) && (directory === EmailDirectory.Trash || directory === EmailDirectory.Sent)) {
    return -1
  } else if (Number.isNaN(delay)) {
    return 0
  } else {
    return delay
  }
}
