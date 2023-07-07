import * as React from "react"
import {useRepositionCodingDimension, useRepositionCodingItem} from "shared/graphql/hooks"
import {ResortedEntity} from "../../../../../models"

export interface RepositionCodingDimensionsHook {
  readonly isRepositionLoading: boolean
  readonly isSortModalVisible: boolean
  readonly repositionDimensions: (orderedEntities: ResortedEntity[]) => void
  readonly repositionItems: (orderedEntities: ResortedEntity[]) => void
  readonly setIsSortModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const useRepositionCodingDimensionsOrCodingItems = (): RepositionCodingDimensionsHook => {
  const [isSortModalVisible, setIsSortModalVisible] = React.useState(false)
  const [isRepositionLoading, setIsRepositionLoading] = React.useState(false)

  const {repositionCodingDimension} = useRepositionCodingDimension()
  const {repositionCodingItem} = useRepositionCodingItem()

  const handleReposition = (orderedEntities: ResortedEntity[], areDimensions: boolean) => {
    setIsRepositionLoading(true)
    Promise.all<unknown>(
      orderedEntities.map(({id, predecessorId}) =>
        areDimensions ? repositionCodingDimension(id, predecessorId) : repositionCodingItem(id, predecessorId)
      )
    ).then(() => {
      setIsRepositionLoading(false)
      setIsSortModalVisible(false)
    })
  }

  return {
    isSortModalVisible,
    isRepositionLoading,
    repositionDimensions: entities => handleReposition(entities, true),
    repositionItems: entities => handleReposition(entities, false),
    setIsSortModalVisible
  }
}
