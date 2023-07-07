import {noop} from "lodash-es"
import * as React from "react"
import {HeadingLevel, IconName, RaterMode, RatingActionOption} from "../../../../enums"
import {QuestionScoringType} from "../../../../graphql/generated/globalTypes"
import {AutomatedCodingItem, CodingItem, NoCriterionFulfilledConfig} from "../../../../models"
import {Flex, FontWeight, TextSize} from "../../../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../../../translations"
import {Option} from "../../../../utils"
import {AutomatedCodingItemRuleField} from "../../../automated-coding-item-rule-field/automated-coding-item-rule-field"
import {Button} from "../../../button/button"
import {ContentLoadingIndicator} from "../../../content-loading-indicator/content-loading-indicator"
import {Icon} from "../../../icon/icon"
import {Paper} from "../../../paper/paper"
import {Table} from "../../../table/table"
import {Tooltip} from "../../../tooltip/tooltip"
import {Heading, Text} from "../../../typography/typography"
import {CriterionMetadata, RatingCodingCriterion} from "../../models"
import {EvaluationParticipationBar} from "../evaluation-participation-bar/evaluation-participation-bar"
import {PercentagePaperPrefix} from "../percentage-paper-prefix/percentage-paper-prefix"
import {RatingDetailActionElement} from "../rating-detail-action-element/rating-detail-action-element"
import {criterionRatingTableStyles as styles} from "./criterion-rating-table.styles"
import {useCriterionRatingTable} from "./hooks/use-criterion-rating-table"

export interface CriterionRatingTableProps {
  readonly codingItem?: CodingItem
  readonly criteria: RatingCodingCriterion[]
  readonly scoringType: QuestionScoringType
  readonly scoringTypeIcon?: IconName
  readonly isSelected: (criterion: RatingCodingCriterion) => boolean
  readonly updateCriterionSelection?: (criterion: RatingCodingCriterion, selected: boolean) => void
  readonly noCriterionFulfilled: boolean
  readonly setNoCriterionFulfilled?: () => void
  readonly dataLoading?: boolean
  readonly freeTextAnswer?: Option<string>
  readonly actionLoading: boolean
  readonly hasRatingChanged: boolean
  readonly applyRatingChanges?: (action: RatingActionOption) => void
  readonly readOnly?: boolean
  readonly isComputerRaterSelection?: (criterion: RatingCodingCriterion) => boolean
  readonly selectedRatingAction?: RatingActionOption
  readonly setSelectedRatingAction?: React.Dispatch<React.SetStateAction<RatingActionOption>>
  readonly mode: RaterMode
  readonly surveyId: UUID
  readonly isScenario?: boolean
  readonly actionButtonTooltipKey?: LucaI18nLangKey
  readonly showNoCriterionFulfilledDescription?: boolean
  readonly useRadioButtonForHolisticScoringType?: boolean
  readonly showSelectionInputsWhileReadonly?: boolean
  readonly showSelectionInput?: boolean
  readonly showAdditionalRaterInfos?: boolean
  readonly useOnlyFinalScores?: boolean
  readonly showRaterCount?: boolean
  readonly showRaterPercentage?: boolean
  readonly selectedSurveyInvitationIdForFinalRating?: UUID
  readonly noCriterionFulfilledConfig?: NoCriterionFulfilledConfig
  readonly isNoCriterionFulfilledButtonVisible?: boolean
  readonly isRatingDetailActionElementVisible?: boolean
  readonly showDataForAllParticipants?: boolean
  readonly wasNoCriterionFulfilledByComputerRater?: boolean
}

export const CriterionRatingTable: React.FC<CriterionRatingTableProps> = ({
  codingItem,
  criteria,
  scoringType,
  scoringTypeIcon,
  isSelected,
  updateCriterionSelection,
  noCriterionFulfilled,
  setNoCriterionFulfilled,
  dataLoading,
  freeTextAnswer,
  actionLoading,
  hasRatingChanged,
  applyRatingChanges,
  readOnly = false,
  isComputerRaterSelection,
  selectedRatingAction,
  setSelectedRatingAction,
  mode,
  surveyId,
  isScenario = false,
  actionButtonTooltipKey,
  showNoCriterionFulfilledDescription = true,
  useRadioButtonForHolisticScoringType,
  showSelectionInputsWhileReadonly,
  showSelectionInput = true,
  showAdditionalRaterInfos: parentShowAdditionalRaterInfos = true,
  useOnlyFinalScores,
  showRaterCount = true,
  selectedSurveyInvitationIdForFinalRating,
  showRaterPercentage,
  noCriterionFulfilledConfig,
  isNoCriterionFulfilledButtonVisible = true,
  isRatingDetailActionElementVisible = true,
  showDataForAllParticipants = false,
  wasNoCriterionFulfilledByComputerRater = false
}) => {
  const {t} = useLucaTranslation()

  const {
    sortedEntities,
    showNoCriterionFulfilledFooter,
    finishedRatersCount,
    totalRatersCount,
    columns,
    dataLoading: hookDataLoading,
    isFinalRater,
    noCriterionFulfilledCount,
    showAutomatedCodingItemRuleField,
    isComputerRater,
    showAdditionalRaterInfos,
    participantsCount
  } = useCriterionRatingTable({
    criteria,
    scoringType,
    setNoCriterionFulfilled,
    scoringTypeIcon,
    isSelected,
    isComputerRaterSelection,
    readOnly,
    mode,
    surveyId,
    isScenario,
    codingItem,
    useRadioButtonForHolisticScoringType,
    showSelectionInputsWhileReadonly,
    useOnlyFinalScores,
    showSelectionInput,
    showRaterCount,
    showRaterPercentage,
    showDataForAllParticipants,
    selectedQuestionId: noCriterionFulfilledConfig?.selectedQuestionIdForFinalRating,
    selectedSurveyInvitationIdForFinalRating
  })

  const noCriterionFulfilledLabelKey = noCriterionFulfilledConfig?.labelKey ?? "rating__no_criterion_title"
  const noCriterionFulfilledDescriptionKey =
    noCriterionFulfilledConfig?.descriptionKey ?? "rating__no_criterion_description"
  const showFooterPercentage = (showAdditionalRaterInfos || showRaterPercentage === true) && !noCriterionFulfilled

  return (
    <div css={styles.container(freeTextAnswer !== undefined, isFinalRater, showAutomatedCodingItemRuleField)}>
      {parentShowAdditionalRaterInfos && showAdditionalRaterInfos && (
        <EvaluationParticipationBar finishedRaters={finishedRatersCount} totalRaters={totalRatersCount} />
      )}
      {showAutomatedCodingItemRuleField && (
        <AutomatedCodingItemRuleField automatedCodingItem={codingItem as AutomatedCodingItem} />
      )}
      {freeTextAnswer && (
        <div css={styles.freeTextAnswerWrapper}>
          <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {`${t("rating__freetext_answer_label")}:`}
          </Heading>
          <Paper customStyles={[styles.freeTextPaper, dataLoading && styles.freeTextLoading]}>
            {dataLoading ? (
              <ContentLoadingIndicator />
            ) : (
              freeTextAnswer
                .map(answer => <Text size={TextSize.Medium}>{answer}</Text>)
                .getOrElse(
                  <Text customStyles={styles.freeTextPlaceholder} size={TextSize.Medium}>
                    {t("common__no_data")}
                  </Text>
                )
            )}
          </Paper>
        </div>
      )}
      {scoringType !== QuestionScoringType.None && (
        <div css={styles.criteriaWrapper}>
          <div css={Flex.row}>
            <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
              {`${isComputerRater ? t("rating__automatic_rating_label") : t("rating__manual_rating_label")} (${
                criteria.length
              })`}
            </Heading>
            <Tooltip
              title={isComputerRater ? t("rating__automatic_rating_label") : t("rating__manual_rating_label")}
              text={
                isComputerRater ? t("rating__automatic_rating_description") : t("rating__manual_rating_description")
              }
              icon={isComputerRater ? IconName.Gear : IconName.MouseLined}>
              <Icon name={IconName.Information} customStyles={styles.tooltipIcon} />
            </Tooltip>
          </div>
          <div>
            <Table<RatingCodingCriterion & CriterionMetadata>
              customHeaderRowStyles={styles.tableHeader}
              customTableFooterStyles={styles.footerWrapper}
              onClick={
                !readOnly ? criterion => updateCriterionSelection?.(criterion, !isSelected(criterion)) : undefined
              }
              onSortIconClicked={noop}
              sortInfo={Option.none()}
              sortedEntities={sortedEntities}
              columns={columns}
              entityKey={codingCriterion => codingCriterion.id}
              showFooter={true}
              showLoadingIndicator={hookDataLoading}
              tableFooter={
                <div css={styles.footer(showNoCriterionFulfilledFooter)}>
                  {showNoCriterionFulfilledFooter && (
                    <div css={styles.footerCard(showFooterPercentage)}>
                      {showFooterPercentage && (
                        <PercentagePaperPrefix
                          customStyles={styles.percentagePrefix}
                          ratingsCount={noCriterionFulfilledCount}
                          ratersCount={
                            showDataForAllParticipants
                              ? useOnlyFinalScores
                                ? participantsCount
                                : totalRatersCount * sortedEntities.length
                              : totalRatersCount
                          }
                        />
                      )}
                      <div css={styles.footerCardContentWrapper(isNoCriterionFulfilledButtonVisible)}>
                        <div css={styles.footerCardContent(showNoCriterionFulfilledDescription)}>
                          <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                            {showFooterPercentage && showRaterCount
                              ? `${t(noCriterionFulfilledLabelKey)} (${t("rating__raters_count", {
                                  count: noCriterionFulfilledCount,
                                  totalCount: finishedRatersCount
                                })})`
                              : t(noCriterionFulfilledLabelKey)}
                          </Heading>
                          {showNoCriterionFulfilledDescription && (
                            <Text customStyles={styles.label} size={TextSize.Medium}>
                              {t(noCriterionFulfilledDescriptionKey)}
                            </Text>
                          )}
                        </div>
                        {isNoCriterionFulfilledButtonVisible && (
                          <div css={styles.noCriterionFulfilledButtonWrapper(wasNoCriterionFulfilledByComputerRater)}>
                            {wasNoCriterionFulfilledByComputerRater && (
                              <Heading
                                level={HeadingLevel.h4}
                                fontWeight={FontWeight.Bold}
                                customStyles={styles.selectionLabel(readOnly)}>
                                {t("rating__computerrater_radio_label")}
                              </Heading>
                            )}
                            <Button
                              customStyles={styles.footerCardButton}
                              disabled={noCriterionFulfilled || readOnly}
                              icon={noCriterionFulfilled ? IconName.Check : undefined}
                              onClick={() => !readOnly && setNoCriterionFulfilled?.()}>
                              {noCriterionFulfilled ? `0 ${t("rating__scoring_unit")}` : t("rating__no_score_button")}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div css={styles.subFooter}>
                    {isRatingDetailActionElementVisible && (
                      <RatingDetailActionElement
                        isScenario={isScenario}
                        onClick={action => applyRatingChanges?.(action)}
                        disabled={readOnly || !hasRatingChanged || dataLoading || actionLoading || hookDataLoading}
                        ratingDetailAction={selectedRatingAction}
                        onRatingDetailActionChange={setSelectedRatingAction}
                        tooltipKey={actionButtonTooltipKey}
                      />
                    )}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}
