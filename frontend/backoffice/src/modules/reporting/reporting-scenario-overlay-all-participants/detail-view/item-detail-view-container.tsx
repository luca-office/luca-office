import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {ItemDetailView} from "shared/components/reporting-scenario-overlay/detail-view/item-detail-view"
import {ScenarioSurveyResultsForParticipantQuery_scenarioSurveyResultsForParticipant_codingItemResults as CodingItemResult} from "shared/graphql/generated/ScenarioSurveyResultsForParticipantQuery"
import {useAutomatedCodingCriteria, useCodingCriteria} from "shared/graphql/hooks"
import {AutomatedCodingCriterionMetadata, CodingItem} from "shared/models"
import {LucaTFunction} from "shared/translations"
import {getAutomatedCodingCriterionDescriptionData} from "shared/utils"

interface Props {
  readonly t: LucaTFunction
  readonly item: CodingItem
  readonly itemResults: CodingItemResult[]
  readonly participantsCount: number
}

export type AutomatedCodingCriterionMetadataById = {[criterionId: string]: AutomatedCodingCriterionMetadata}

export const ItemDetailViewContainer: React.FC<Props> = ({t, item, itemResults, participantsCount}) => {
  const {codingCriteria} = useCodingCriteria(item.id)
  const {automatedCodingCriteria} = useAutomatedCodingCriteria(item.id)
  const client = useApolloClient()

  const noCriterionFulfilledCount = itemResults.filter(result => result.noCriterionFulfilled).length
  const [
    automatedCriteriaMetadataById,
    setAutomatedCriteriaMetadataById
  ] = React.useState<AutomatedCodingCriterionMetadataById>({})

  React.useEffect(() => {
    if (automatedCodingCriteria.length > 0) {
      getAutomatedCriterionMetadata()
    }
  }, [automatedCodingCriteria.length])

  const getAutomatedCriterionMetadata = () => {
    automatedCodingCriteria.forEach(criterion =>
      getAutomatedCodingCriterionDescriptionData(t, client, criterion).then(response =>
        setAutomatedCriteriaMetadataById({...automatedCriteriaMetadataById, [criterion.id]: response})
      )
    )
  }

  return (
    <ItemDetailView
      t={t}
      item={item}
      selectedCriteriaIds={itemResults.flatMap(result => result.selectedCriteriaIds)}
      finalScoreForAllParticipantsConfig={{
        participantsCount,
        showPercentageOfCriteriaSelections: true,
        noCriterionFulfilledCount
      }}
      automatedCriteriaMetadataById={automatedCriteriaMetadataById}
      automatedCodingCriteria={automatedCodingCriteria}
      allCodingCriteria={codingCriteria}
    />
  )
}
