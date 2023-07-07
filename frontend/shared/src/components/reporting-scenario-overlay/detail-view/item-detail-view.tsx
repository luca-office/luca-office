import * as React from "react"
import {
  AutomatedCodingItemRuleField,
  FinalScoreForAllParticipantsConfig,
  FinalScoreForSingleParticipantConfig,
  Heading,
  ReportingCriteriaTable
} from "../../../components"
import {HeadingLevel} from "../../../enums"
import {
  AutomatedCodingCriterion,
  AutomatedCodingItem,
  BaseCodingCriterion,
  CodingCriterion,
  CodingItem
} from "../../../models"
import {spacingMedium} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {isAutomatedCodingItem} from "../../../utils"
import {AutomatedCodingCriterionMetadataById} from "./item-detail-view-container"

interface Props {
  readonly t: LucaTFunction
  readonly item: CodingItem
  readonly selectedCriteriaIds: UUID[]
  readonly allCodingCriteria: CodingCriterion[]
  readonly automatedCriteriaMetadataById: AutomatedCodingCriterionMetadataById
  readonly automatedCodingCriteria: AutomatedCodingCriterion[]
  readonly finalScoreForAllParticipantsConfig?: FinalScoreForAllParticipantsConfig
  readonly finalScoreForSingleParticipantConfig?: FinalScoreForSingleParticipantConfig
}

export const ItemDetailView: React.FC<Props> = ({
  t,
  selectedCriteriaIds,
  allCodingCriteria,
  item,
  automatedCodingCriteria,
  automatedCriteriaMetadataById,
  finalScoreForAllParticipantsConfig,
  finalScoreForSingleParticipantConfig
}) => {
  const automatedCriteriaWithDescription: BaseCodingCriterion[] = automatedCodingCriteria.map(criterion => ({
    ...criterion,
    description: automatedCriteriaMetadataById[criterion.id]?.name
  }))

  const isAutomatedItem = isAutomatedCodingItem(item)

  const noCriterionFulfilled =
    (finalScoreForAllParticipantsConfig !== undefined &&
      finalScoreForAllParticipantsConfig?.noCriterionFulfilledCount > 0) ||
    (finalScoreForSingleParticipantConfig !== undefined && finalScoreForSingleParticipantConfig.noCriterionFulfilled)

  return (
    <div>
      <Heading customStyles={styles.heading} level={HeadingLevel.h2}>
        {item.title}
      </Heading>
      {isAutomatedItem && (
        <AutomatedCodingItemRuleField
          customStyles={styles.ruleField}
          automatedCodingItem={item as AutomatedCodingItem}
        />
      )}
      <ReportingCriteriaTable
        t={t}
        scoringType={item.scoringType}
        criteria={isAutomatedItem ? automatedCriteriaWithDescription : allCodingCriteria}
        noCriterionFulfilled={noCriterionFulfilled}
        selectedCriteriaIds={selectedCriteriaIds}
        finalScoreForAllParticipantsConfig={finalScoreForAllParticipantsConfig}
        customTitleKey={isAutomatedItem ? "rating__automatic_rating_label" : "rating__manual_rating_label"}
        customTooltipTextKey={
          isAutomatedItem ? "rating__automatic_rating_description" : "rating__manual_rating_description"
        }
      />
    </div>
  )
}

const styles = {
  heading: {
    marginBottom: spacingMedium
  },
  ruleField: {
    marginBottom: spacingMedium
  }
}
