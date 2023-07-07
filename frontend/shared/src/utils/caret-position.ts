import {CaretPosition} from "../models"

export const getCaretPosition = (element: HTMLInputElement | HTMLTextAreaElement): CaretPosition => ({
  start: element.selectionStart ?? 0,
  end: element.selectionEnd ?? 0
})

export const setCaretPosition = (element: HTMLInputElement | HTMLTextAreaElement, {start, end}: CaretPosition) => {
  element.focus()
  element.setSelectionRange(start, end)
}
