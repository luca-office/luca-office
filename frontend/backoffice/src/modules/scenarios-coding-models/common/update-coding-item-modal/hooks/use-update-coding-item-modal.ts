import * as React from "react"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {useCodingItem, useUpdateManualCodingItem} from "shared/graphql/hooks"
import {Option} from "shared/utils"

export enum UpdateCodingItemType {
  Type,
  Method
}

export interface UseUpdateCodingItemModalHook {
  readonly selectedIndex: Option<number>
  readonly selectIndex: (index: number) => void
  readonly updateCodingItem: (onSuccess: () => void) => void
}

export const useUpdateCodingItemModal = (
  codingItemId: UUID,
  type: UpdateCodingItemType
): UseUpdateCodingItemModalHook => {
  const [selectedIndex, setSelectedIndex] = React.useState<Option<number>>(Option.none())

  const {codingItem, codingItemLoading} = useCodingItem(codingItemId)
  const {updateManualCodingItem} = useUpdateManualCodingItem()

  React.useEffect(
    () =>
      codingItem.forEach(({scoringType}) => {
        // TODO LUCA-992 handle selection of method type (manual / automatic)
        if (type === UpdateCodingItemType.Method) {
          setSelectedIndex(Option.of(0))
          return
        }
        setSelectedIndex(Option.of(scoringType === ScoringType.Holistic ? 0 : 1))
      }),
    [codingItemLoading]
  )

  const getScoringTypeByIndex = () =>
    selectedIndex.map(index => (index === 0 ? ScoringType.Holistic : ScoringType.Analytical))

  const selectIndex = (index: number) => setSelectedIndex(Option.of(index))

  const handleUpdateCodingItem = (onSuccess: () => void) =>
    codingItem.forEach(item => {
      // TODO LUCA-992 handle method type update (manual / automatic)
      if (type === UpdateCodingItemType.Method) {
        onSuccess()
        return
      }
      updateManualCodingItem(item.id, {
        title: item.title,
        description: item.description,
        scoringType: getScoringTypeByIndex().getOrElse(item.scoringType)
      }).then(() => onSuccess())
    })

  return {selectedIndex, selectIndex, updateCodingItem: handleUpdateCodingItem}
}
