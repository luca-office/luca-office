import {indexOf} from "lodash"
import * as React from "react"
import {IconName} from "../../enums"
import {HeaderCarousel} from "./header-carousel"

export interface HeaderCarouselBaseElement {
  readonly icon?: IconName
  readonly count?: number
  readonly label: string
}

export interface HeaderCarouselContainerProps<T extends HeaderCarouselBaseElement> {
  readonly elements: T[]
  readonly onChange: (nextActiveElement: T) => void
  readonly defaultSelectedElement?: T
}

export const HeaderCarouselContainer = <T extends HeaderCarouselBaseElement>({
  elements,
  onChange,
  defaultSelectedElement
}: HeaderCarouselContainerProps<T>) => {
  React.useEffect(() => {
    const index = indexOf(elements, defaultSelectedElement)
    setActiveElementIndex(index === -1 ? 0 : index)
  }, [defaultSelectedElement])

  const safeElements = elements.length > 0 ? elements : ([{label: "no elements"}] as T[])

  const [activeElementIndex, setActiveElementIndex] = React.useState(() => {
    const index = indexOf(elements, defaultSelectedElement)
    return index === -1 ? 0 : index
  })

  const handleLeftClick = () => {
    const nextIndex = activeElementIndex === 0 ? safeElements.length - 1 : activeElementIndex - 1
    setActiveElementIndex(nextIndex)
    onChange(safeElements[nextIndex])
  }

  const handleRightClick = () => {
    const nextIndex = activeElementIndex === safeElements.length - 1 ? 0 : activeElementIndex + 1
    setActiveElementIndex(nextIndex)
    onChange(safeElements[nextIndex])
  }

  return (
    <HeaderCarousel
      handleLeftClick={handleLeftClick}
      handleRightClick={handleRightClick}
      activeElement={safeElements[activeElementIndex]}
      elementsCount={safeElements.length}
      activeElementIndex={activeElementIndex}
    />
  )
}
