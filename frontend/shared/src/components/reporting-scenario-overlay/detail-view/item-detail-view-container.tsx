import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {ScenarioSurveyResultsForParticipantQuery_scenarioSurveyResultsForParticipant_codingItemResults as CodingItemResult} from "../../../graphql/generated/ScenarioSurveyResultsForParticipantQuery"
import {useAutomatedCodingCriteria, useCodingCriteria} from "../../../graphql/hooks"
import {AutomatedCodingCriterionMetadata, CodingItem} from "../../../models"
import {LucaTFunction} from "../../../translations"
import {getAutomatedCodingCriterionDescriptionData} from "../../../utils"
import {ItemDetailView} from "./item-detail-view"

interface Props {
  readonly t: LucaTFunction
  readonly item: CodingItem
  readonly itemResult: CodingItemResult
}

export type AutomatedCodingCriterionMetadataById = {[criterionId: string]: AutomatedCodingCriterionMetadata}

export const ItemDetailViewContainer: React.FC<Props> = ({t, item, itemResult}) => {
  const {codingCriteria} = useCodingCriteria(item.id)
  const {automatedCodingCriteria} = useAutomatedCodingCriteria(item.id)
  const client = useApolloClient()

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
      selectedCriteriaIds={itemResult.selectedCriteriaIds}
      automatedCriteriaMetadataById={automatedCriteriaMetadataById}
      finalScoreForSingleParticipantConfig={{noCriterionFulfilled: itemResult.noCriterionFulfilled}}
      automatedCodingCriteria={automatedCodingCriteria}
      allCodingCriteria={codingCriteria}
    />
  )
}
