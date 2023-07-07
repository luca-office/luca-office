import * as PopperJS from "@popperjs/core"
import {isEqual} from "lodash-es"
import * as React from "react"
import {usePopper} from "react-popper"
import {useAutoComplete, UseAutoCompleteHook} from "../../../hooks"
import {spacingTiny} from "../../../styles"
import {isPlacedHorizontal} from "../../../utils"

const DEFAULT_MAX_HEIGHT_RESULTS_LIST = 250

type PopperReturnType = ReturnType<typeof usePopper>

export interface UseAutoCompleteInputHook extends Pick<UseAutoCompleteHook, "results"> {
  readonly textInputWrapperRef: React.MutableRefObject<HTMLDivElement | undefined>
  readonly textInputRef: React.MutableRefObject<HTMLInputElement | undefined>
  readonly resultsListRef: React.MutableRefObject<HTMLDivElement | undefined>
  readonly resultsVisible: boolean
  readonly inputValue: string
  readonly onChange: (value: string) => void
  readonly popperStyles: TypeOf<TypeOf<PopperReturnType, "styles">, "key">
  readonly popperAttributes: TypeOf<TypeOf<PopperReturnType, "attributes">, "key">
  readonly setInputFocus: (isFocused: boolean) => void
  readonly onResultClick: (result: string) => void
}

interface UseAutoCompleteInputHookParams {
  readonly value?: string
  readonly defaultValue?: string
  readonly items: string[]
  readonly onChange: (value: string) => void
  readonly showAllResultsForEmptySearch?: boolean
}

export const useAutoCompleteInput = ({
  value,
  defaultValue,
  items,
  onChange,
  showAllResultsForEmptySearch = false
}: UseAutoCompleteInputHookParams): UseAutoCompleteInputHook => {
  const textInputWrapperRef = React.useRef<HTMLDivElement>()
  const textInputRef = React.useRef<HTMLInputElement>()
  const resultsListRef = React.useRef<HTMLDivElement>()

  const inputValueRef = React.useRef<string>("")

  const [inputFocused, setInputFocused] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState<string>(value ?? defaultValue ?? "")

  if (!isEqual(inputValueRef.current, inputValue)) {
    inputValueRef.current = inputValue
  }

  // define popper modifiers with useMemo to prevent endless loop: https://github.com/popperjs/popper-core/issues/794#issuecomment-640747771
  const popperModifiers = React.useMemo<TypeOf<PopperJS.Options, "modifiers">>(
    () => [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: ({placement}: {placement: PopperJS.Placement}) =>
            isPlacedHorizontal(placement) ? [spacingTiny, 0] : [0, spacingTiny]
        }
      },
      {
        name: "sameWidth",
        enabled: true,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: ({state}) => {
          state.styles.popper.width = `${state.rects.reference.width}px`
          state.styles.popper.maxHeight = `${DEFAULT_MAX_HEIGHT_RESULTS_LIST}px`
          state.styles.popper.overflow = "auto"
        },
        effect: ({state}) => {
          state.elements.popper.style.width = `${(state.elements.reference as HTMLElement).offsetWidth}px`
        }
      }
    ],
    []
  )

  const {styles, attributes} = usePopper(textInputWrapperRef.current, resultsListRef.current, {
    placement: "bottom",
    modifiers: popperModifiers,
    strategy: "fixed"
  })
  const {setSearchQuery, results} = useAutoComplete(items, showAllResultsForEmptySearch)

  const resultsVisible = inputFocused && results.length > 0 && (showAllResultsForEmptySearch || inputValue.length > 0)

  const updateInputValue = (text: string) => {
    setInputValue(text)
    setSearchQuery(text)
  }

  const handleOnChange = (text: string) => {
    updateInputValue(text)
    onChange(text)
  }

  const setInputFocus = (isFocused: boolean) => setInputFocused(isFocused)

  const onResultClick = (result: string) => {
    handleOnChange(result)

    // input is re-rendered after result selection. setTimeout is used to make
    // sure that the input has already been rendered before blur is fired
    setTimeout(() => {
      // input must be selected first before blur can be fired
      textInputRef.current?.focus()
      textInputRef.current?.blur()
    }, 0)
  }

  const previousValue = React.useRef<string>()
  const previousDefaultValue = React.useRef<string>()
  React.useEffect(() => {
    if (previousValue.current !== value && value !== inputValueRef.current) {
      updateInputValue(value ?? "")
    } else if (previousDefaultValue.current !== defaultValue && defaultValue !== inputValueRef.current) {
      updateInputValue(defaultValue ?? "")
    }
    previousValue.current = value
    previousDefaultValue.current = defaultValue
  }, [value, defaultValue, inputValueRef.current, previousValue.current, previousDefaultValue.current])

  return {
    results,
    textInputWrapperRef,
    textInputRef,
    resultsListRef,
    resultsVisible,
    inputValue,
    onChange: handleOnChange,
    popperStyles: styles.popper,
    popperAttributes: attributes.popper,
    setInputFocus,
    onResultClick
  }
}
