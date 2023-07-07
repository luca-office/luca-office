import {css} from "@emotion/react"
import {noop} from "lodash-es"
import * as React from "react"
import {ColumnProps, Heading, Icon, Table, Text, Tooltip} from "../../components"
import {getScoringTypeIconName} from "../../components/rating/utils"
import {HeadingLevel, IconName} from "../../enums"
import {ScoringType} from "../../graphql/generated/globalTypes"
import {BaseCodingCriterion} from "../../models"
import {
  backgroundColorDarker,
  border,
  borderRadius,
  CustomStyle,
  deepShadow,
  Flex,
  FontWeight,
  selectedBorderColor,
  spacing,
  spacingCard,
  spacingMedium,
  spacingSmall,
  spacingSmaller,
  spacingTiny,
  TextSize
} from "../../styles"
import {LucaI18nLangKey, LucaTFunction} from "../../translations"
import {Option} from "../../utils"
import {PercentagePaperPrefix} from "../rating"

export interface FinalScoreForAllParticipantsConfig {
  readonly showPercentageOfCriteriaSelections: boolean
  readonly participantsCount: number
  readonly noCriterionFulfilledCount: number
}
export interface FinalScoreForSingleParticipantConfig {
  readonly noCriterionFulfilled: boolean
}

interface Props<T extends BaseCodingCriterion> extends CustomStyle {
  readonly t: LucaTFunction
  readonly criteria: T[]
  readonly selectedCriteriaIds: UUID[]
  readonly scoringType: ScoringType
  readonly noCriterionFulfilled?: boolean
  readonly finalScoreForAllParticipantsConfig?: FinalScoreForAllParticipantsConfig
  readonly customTitleKey?: LucaI18nLangKey
  readonly customTooltipTextKey?: LucaI18nLangKey
}

export const ReportingCriteriaTable = <T extends BaseCodingCriterion>(props: Props<T>) => {
  const {
    t,
    customStyles,
    criteria,
    selectedCriteriaIds,
    noCriterionFulfilled,
    scoringType,
    customTitleKey,
    customTooltipTextKey,
    finalScoreForAllParticipantsConfig
  } = props
  const isHolisticScoring = scoringType === ScoringType.Holistic
  const isNoCriterionFulfilledItemVisible =
    (!isHolisticScoring && noCriterionFulfilled !== undefined) ||
    (finalScoreForAllParticipantsConfig?.noCriterionFulfilledCount !== undefined &&
      finalScoreForAllParticipantsConfig?.noCriterionFulfilledCount > 0)
  const visibleCriteria = criteria.filter(criterion => isHolisticScoring || criterion.score !== 0)

  const scoreColumn: ColumnProps<T> = {
    key: "score",
    header: (
      <Text customStyles={styles.label} size={TextSize.Medium}>
        {t("rating__criterion_label")}
      </Text>
    ),
    content: criterion => {
      const key =
        criterion.score === 1
          ? "coding_criteria__criterion_list_score_singular"
          : "coding_criteria__criterion_list_score"
      const label = t(key, {score: criterion.score})

      return (
        <div css={styles.scoreColumnContent(finalScoreForAllParticipantsConfig !== undefined)}>
          {finalScoreForAllParticipantsConfig !== undefined && (
            <PercentagePaperPrefix
              ratersCount={finalScoreForAllParticipantsConfig.participantsCount ?? 0}
              ratingsCount={selectedCriteriaIds.filter(id => id === criterion.id).length}
            />
          )}
          <div css={styles.scoreColumnInfo}>
            <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
              {label}
            </Heading>
            <div css={styles.scoreColumnDescription}>
              <Text customStyles={[styles.label, styles.description]} size={TextSize.Medium}>
                {criterion.description}
              </Text>
            </div>
          </div>
        </div>
      )
    }
  }

  const questionTypeColumn: ColumnProps<T> = {
    key: "scoring-type",
    header: (
      <Tooltip
        icon={getScoringTypeIconName(scoringType)}
        {...(scoringType === ScoringType.Analytical
          ? {
              title: t("rating__scoring_analytic_title"),
              text: t("coding_item_update__selection_card_type_analytical_description")
            }
          : {
              title: t("rating__scoring_holistic_title"),
              text: t("coding_item_update__selection_card_type_holistic_description")
            })}>
        <div css={styles.scoringTypeColumnHeader}>
          <Text customStyles={styles.label} size={TextSize.Medium}>
            {scoringType === ScoringType.Analytical
              ? t("questionnaire_question__scoring_analytic_title")
              : scoringType === ScoringType.Holistic
              ? t("questionnaire_question__scoring_holistic_title")
              : t("questionnaires__detail_questions_scoring_title")}
          </Text>
          <Icon name={getScoringTypeIconName(scoringType)} />
        </div>
      </Tooltip>
    ),
    content: () => null,
    customStyles: styles.scoringTypeColumn
  }

  const footer = (
    <div css={styles.footerCard(noCriterionFulfilled === true)}>
      {finalScoreForAllParticipantsConfig !== undefined && (
        <PercentagePaperPrefix
          customStyles={styles.marginRight}
          ratersCount={finalScoreForAllParticipantsConfig.participantsCount}
          ratingsCount={finalScoreForAllParticipantsConfig.noCriterionFulfilledCount}
        />
      )}
      <div css={styles.footerCardContent}>
        <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating__no_criterion_title_readonly")}
        </Heading>
        <Text customStyles={styles.label} size={TextSize.Medium}>
          {t("rating__no_criterion_description_readonly")}
        </Text>
      </div>
    </div>
  )

  return (
    <div css={customStyles}>
      <div css={Flex.row}>
        <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t(customTitleKey ?? "rating__manual_rating_label")} ({criteria.length})
        </Heading>
        <Tooltip
          title={t(customTitleKey ?? "rating__manual_rating_label")}
          text={t(customTooltipTextKey ?? "rating__manual_rating_description_questionnaire")}
          icon={IconName.MouseLined}>
          <Icon name={IconName.Information} customStyles={styles.tooltipIcon} />
        </Tooltip>
      </div>
      <Table<T>
        customStyles={styles.table}
        customHeaderRowStyles={styles.tableHeader}
        customRowStyles={criterion => styles.tableRow(selectedCriteriaIds.includes(criterion.id))}
        customTableFooterStyles={styles.footerWrapper}
        sortedEntities={visibleCriteria}
        columns={[scoreColumn, questionTypeColumn]}
        entityKey={codingCriterion => codingCriterion.id}
        onSortIconClicked={noop}
        sortInfo={Option.none()}
        showFooter={isNoCriterionFulfilledItemVisible}
        tableFooter={footer}
      />
    </div>
  )
}

const styles = {
  label: css({
    textAlign: "initial"
  }),
  description: css({
    whiteSpace: "initial"
  }),
  table: {
    marginTop: spacingTiny
  },
  tableHeader: {
    padding: spacing(spacingSmall, spacingMedium)
  },
  tableRow: (isSelected: boolean) => ({
    border: border(2, isSelected ? selectedBorderColor : "transparent"),
    borderRadius
  }),
  scoreColumnContent: (showPrefix: boolean) => ({
    display: showPrefix ? "flex" : "grid",
    gridTemplateColumns: "1fr",
    gridColumnGap: spacingCard
  }),
  scoreColumnInfo: {
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingSmaller
  },
  scoreColumnDescription: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridColumnGap: spacingSmall
  },
  footerWrapper: {
    height: "initial",
    padding: spacing(0, spacingSmall, spacingSmall, spacingSmall),
    backgroundColor: backgroundColorDarker
  },
  footerCard: (noCriterionFulfilled: boolean) => ({
    width: "100%",
    padding: spacingSmall,
    border: border(2, noCriterionFulfilled ? selectedBorderColor : "transparent"),
    borderRadius,
    backgroundColor: "white",
    boxShadow: deepShadow,
    display: "flex"
  }),
  footerCardContent: {
    display: "grid",
    gridRowGap: spacingSmaller
  },
  scoringTypeColumn: {
    flex: "0 0 auto"
  },
  scoringTypeColumnHeader: {
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  },
  tooltipIcon: {
    marginLeft: spacingTiny
  },
  marginRight: {
    marginRight: spacingSmall
  }
}
