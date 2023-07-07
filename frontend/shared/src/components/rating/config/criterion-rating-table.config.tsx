import * as React from "react"
import {HeadingLevel, IconName} from "../../../enums"
import {QuestionScoringType} from "../../../graphql/generated/globalTypes"
import {FontWeight, TextSize} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {isAutomatedCodingCriterion} from "../../../utils"
import {Checkbox} from "../../checkbox/checkbox"
import {Icon} from "../../icon/icon"
import {RadioButton} from "../../radio-button/radio-button"
import {ColumnProps} from "../../table/table"
import {Tooltip} from "../../tooltip/tooltip"
import {Heading, Text} from "../../typography/typography"
import {PercentagePaperPrefix} from "../common"
import {criterionRatingTableStyles as styles} from "../common/criterion-rating-table/criterion-rating-table.styles"
import {CriterionMetadata, RatingCodingCriterion} from "../models"

interface GetCriterionRatingTableColumnsParams {
  readonly t: LucaTFunction
  readonly getRatingsCount: (criterion: RatingCodingCriterion & CriterionMetadata) => number
  readonly finishedRatersCount: number
  readonly scoringTypeIcon?: IconName
  readonly scoringType: QuestionScoringType
  readonly isComputerRaterSelection?: (criterion: RatingCodingCriterion & CriterionMetadata) => boolean
  readonly readOnly: boolean
  readonly isSelected: (criterion: RatingCodingCriterion & CriterionMetadata) => boolean
  readonly useRadioButtonForHolisticScoringType?: boolean
  readonly showSelectionInputsWhileReadonly?: boolean
  readonly showAdditionalRaterInfos: boolean
  readonly showSelectionInput: boolean
  readonly showRaterCount: boolean
  readonly showRaterPercentage?: boolean
  readonly showDataForAllParticipants: boolean
  readonly participantsCount: number
}

export const getCriterionRatingTableColumns = ({
  t,
  getRatingsCount,
  finishedRatersCount,
  scoringTypeIcon,
  scoringType,
  isComputerRaterSelection,
  readOnly,
  isSelected,
  useRadioButtonForHolisticScoringType = true,
  showSelectionInputsWhileReadonly = false,
  showAdditionalRaterInfos,
  showSelectionInput,
  showRaterCount,
  showRaterPercentage,
  showDataForAllParticipants,
  participantsCount
}: GetCriterionRatingTableColumnsParams): ColumnProps<RatingCodingCriterion & CriterionMetadata>[] => {
  const selectionHeader = (
    <div css={styles.selectionHeader(!!scoringTypeIcon)}>
      <Text customStyles={styles.label} size={TextSize.Medium}>
        {scoringType === QuestionScoringType.Analytical
          ? t("rating__scoring_analytic_title")
          : scoringType === QuestionScoringType.Holistic
          ? t("rating__scoring_holistic_title")
          : t("rating__scoring_title")}
      </Text>
      {scoringTypeIcon && <Icon name={scoringTypeIcon} />}
    </div>
  )

  return [
    {
      key: "score",
      header: (
        <Text customStyles={styles.label} size={TextSize.Medium}>
          {t("rating__criterion_label")}
        </Text>
      ),
      content: criterion => {
        const ratingsCount = getRatingsCount(criterion)

        const label =
          criterion.score === 1
            ? t("coding_criteria__criterion_list_score_singular", {score: criterion.score})
            : t("coding_criteria__criterion_list_score", {score: criterion.score})

        return (
          <div css={styles.scoreContent(showAdditionalRaterInfos || showRaterPercentage === true)}>
            {(showAdditionalRaterInfos || showRaterPercentage === true) && (
              <PercentagePaperPrefix
                customStyles={styles.percentagePrefix}
                ratingsCount={ratingsCount}
                ratersCount={showDataForAllParticipants ? participantsCount : finishedRatersCount}
              />
            )}
            <div css={styles.scoreInfo}>
              <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {showAdditionalRaterInfos && showRaterCount
                  ? `${label} (${t("rating__raters_count", {
                      count: ratingsCount,
                      totalCount: finishedRatersCount
                    })})`
                  : label}
              </Heading>
              <div css={styles.scoreDescription(criterion.automatedData.exists(data => data.icon !== undefined))}>
                {criterion.automatedData
                  .map(data => (data.icon ? <Icon customStyles={styles.automatedDataIcon} name={data.icon} /> : null))
                  .orNull()}
                <Text customStyles={[styles.label, styles.description]} size={TextSize.Medium}>
                  {criterion.automatedData
                    .map(data => data.name)
                    .getOrElse(!isAutomatedCodingCriterion(criterion) ? criterion.description ?? "" : "")}
                </Text>
              </div>
            </div>
          </div>
        )
      },
      sortConfig: {key: "score", isSortable: false}
    },
    {
      key: "selection",
      header:
        scoringType !== QuestionScoringType.None ? (
          <Tooltip
            icon={scoringTypeIcon}
            {...{
              ...(scoringType === QuestionScoringType.Analytical
                ? {
                    title: t("rating__scoring_analytic_title"),
                    text: t("coding_item_update__selection_card_type_analytical_description")
                  }
                : {
                    title: t("rating__scoring_holistic_title"),
                    text: t("rating__holistic_description")
                  })
            }}>
            {selectionHeader}
          </Tooltip>
        ) : (
          selectionHeader
        ),
      content: criterion => {
        const isSelectedByComputerRater =
          isComputerRaterSelection !== undefined ? isComputerRaterSelection(criterion) : false
        return (
          <div css={styles.selectionWrapper(isSelectedByComputerRater, readOnly && !showSelectionInputsWhileReadonly)}>
            {isSelectedByComputerRater && (
              <Heading
                level={HeadingLevel.h4}
                fontWeight={FontWeight.Bold}
                customStyles={styles.selectionLabel(readOnly)}>
                {t("rating__computerrater_radio_label")}
              </Heading>
            )}
            {showSelectionInput && (
              <React.Fragment>
                {(!readOnly || showSelectionInputsWhileReadonly) &&
                  (scoringType === QuestionScoringType.Holistic && useRadioButtonForHolisticScoringType ? (
                    <RadioButton
                      customBorderStyle={styles.selectionCheckboxBorder}
                      selected={isSelected(criterion)}
                      disabled={readOnly}
                    />
                  ) : (
                    <Checkbox
                      customBorderStyle={styles.selectionCheckboxBorder}
                      checked={isSelected(criterion)}
                      disabled={readOnly}
                    />
                  ))}
              </React.Fragment>
            )}
          </div>
        )
      },
      sortConfig: {key: "id", isSortable: false},
      customStyles: styles.selectionColumn
    }
  ]
}
