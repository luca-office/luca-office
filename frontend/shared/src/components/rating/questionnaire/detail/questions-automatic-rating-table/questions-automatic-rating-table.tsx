import {css} from "@emotion/react"
import {noop} from "lodash-es"
import * as React from "react"
import {HeadingLevel, IconName} from "../../../../../enums"
import {QuestionScoringType, QuestionType} from "../../../../../graphql/generated/globalTypes"
import {QuestionnaireAnswer, QuestionnaireQuestion} from "../../../../../models"
import {
  backgroundMenuInactive,
  border,
  borderRadius,
  boxSizeLarge,
  Flex,
  flex0,
  fontColor,
  fontColorBright,
  fontColorLight,
  FontWeight,
  iconDefaultColor,
  primaryColor,
  selectedBorderColor,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTinier,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../../../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../../../../translations"
import {Option, sortByPosition} from "../../../../../utils"
import {Checkbox} from "../../../../checkbox/checkbox"
import {Icon} from "../../../../icon/icon"
import {getQuestionTypeIconName, getQuestionTypeTitle} from "../../../../questionnaire"
import {RadioButton} from "../../../../radio-button/radio-button"
import {ColumnProps, Table} from "../../../../table/table"
import {Tooltip} from "../../../../tooltip/tooltip"
import {Heading, Text} from "../../../../typography/typography"
import {PercentagePaperPrefix} from "../../../common"
import {useQuestionsAutomaticRatingTable} from "./hooks/use-questions-automatic-rating-table"

export interface QuestionsAutomaticRatingTableProps {
  readonly surveyId: UUID
  readonly surveyInvitationId?: UUID
  readonly question: QuestionnaireQuestion
  readonly answers: QuestionnaireAnswer[]
  readonly showDataForAllParticipants?: boolean
  readonly titleKey?: LucaI18nLangKey
  readonly showTitleTooltip?: boolean
  readonly showQuestionType?: boolean
  readonly participantsCount: number
}

export const QuestionsAutomaticRatingTable: React.FC<QuestionsAutomaticRatingTableProps> = ({
  surveyId,
  surveyInvitationId,
  question,
  answers,
  showDataForAllParticipants = false,
  titleKey = "rating__automatic_rating_label",
  showTitleTooltip = true,
  showQuestionType = false,
  participantsCount
}) => {
  const {t} = useLucaTranslation()

  const {dataLoading, isSelected, ratersCount, getRatingsCount} = useQuestionsAutomaticRatingTable({
    surveyId,
    surveyInvitationId,
    question,
    showDataForAllParticipants
  })
  const sortedAnswers = sortByPosition(answers)

  const columns: ColumnProps<QuestionnaireAnswer>[] = [
    {
      key: "text",
      header: (
        <Text customStyles={styles.label} size={TextSize.Medium}>
          {t("rating_questionnaire_answer__automatic_rating_text_label")}
        </Text>
      ),
      customStyles: styles.answerTextCell(showDataForAllParticipants),
      content: answer => {
        const selected = isSelected(answer)

        return (
          <div css={styles.answerTextContent}>
            {showDataForAllParticipants ? (
              <PercentagePaperPrefix
                customStyles={styles.percentagePrefix(answer.isCorrect)}
                customLabelStyles={styles.percentagePrefixLabel(answer.isCorrect)}
                {...{
                  ...(ratersCount === 1 && selected
                    ? {ratingsCount: 1, ratersCount: sortedAnswers.length}
                    : {ratingsCount: getRatingsCount(answer), ratersCount: participantsCount})
                }}
              />
            ) : (
              <React.Fragment>
                {question.questionType === QuestionType.SingleChoice ? (
                  <RadioButton customStyles={styles.answerRadioButton} disabled={true} selected={selected} />
                ) : (
                  <Checkbox disabled={true} checked={selected} />
                )}
              </React.Fragment>
            )}
            <Text customStyles={styles.answerLabel(selected, showDataForAllParticipants)} size={TextSize.Medium}>
              {answer.text}
            </Text>
          </div>
        )
      },
      sortConfig: {key: "text", isSortable: false}
    },
    {
      key: "isCorrect",
      header: showQuestionType ? (
        <div css={styles.isCorrectHeader}>
          <Text customStyles={styles.label} size={TextSize.Medium}>
            {getQuestionTypeTitle(t, question.questionType)}
          </Text>
          <Icon name={getQuestionTypeIconName(question.questionType)} />
        </div>
      ) : (
        <Tooltip
          icon={getQuestionTypeIconName(question.questionType)}
          {...{
            ...(question.scoringType === QuestionScoringType.Analytical
              ? {
                  title: t("rating__scoring_analytic_title"),
                  text: t("coding_item_update__selection_card_type_analytical_description")
                }
              : question.scoringType === QuestionScoringType.None
              ? {
                  title: t("rating__scoring_none_title")
                }
              : {
                  title: t("rating__scoring_holistic_title"),
                  text: t("coding_item_update__selection_card_type_holistic_description")
                })
          }}>
          <div css={styles.isCorrectHeader}>
            <Text customStyles={styles.label} size={TextSize.Medium}>
              {question.scoringType === QuestionScoringType.Analytical
                ? t("questionnaire_question__scoring_analytic_title")
                : question.scoringType === QuestionScoringType.Holistic
                ? t("questionnaire_question__scoring_holistic_title")
                : t("questionnaires__detail_questions_scoring_title")}
            </Text>
            <Icon name={getQuestionTypeIconName(question.questionType)} />
          </div>
        </Tooltip>
      ),
      content: answer => (
        <Icon
          customStyles={styles.isCorrectIcon(showDataForAllParticipants)}
          name={answer.isCorrect ? IconName.Check : IconName.Close}
          color={isSelected(answer) ? iconDefaultColor : fontColorLight}
        />
      ),
      sortConfig: {key: "isCorrect", isSortable: false},
      customStyles: styles.isCorrectColumn
    }
  ]

  return (
    <div css={styles.container}>
      <div css={Flex.row}>
        <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {`${t(titleKey)} (${answers.length})`}
        </Heading>
        {showTitleTooltip && (
          <Tooltip
            title={t("rating__automatic_rating_label")}
            text={t("rating__automatic_rating_description")}
            icon={IconName.Gear}>
            <Icon name={IconName.Information} customStyles={styles.tooltipIcon} />
          </Tooltip>
        )}
      </div>
      <div>
        <Table<QuestionnaireAnswer>
          customHeaderRowStyles={styles.tableHeader}
          customTableFooterStyles={styles.tableFooter}
          customRowStyles={answer => styles.tableRow(answer.isCorrect, showDataForAllParticipants)}
          onSortIconClicked={noop}
          sortInfo={Option.none()}
          sortedEntities={sortedAnswers}
          columns={columns}
          entityKey={answer => answer.id}
          showFooter={true}
          showLoadingIndicator={dataLoading}
        />
      </div>
    </div>
  )
}

const styles = {
  container: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  label: css(textEllipsis),
  answerLabel: (selected: boolean, showDataForAllParticipants: boolean) =>
    css(textEllipsis, {
      color: selected ? fontColor : fontColorLight,
      ...(selected && {
        borderTop: border(2, "transparent"),
        borderBottom: border(2, "transparent")
      }),
      ...(showDataForAllParticipants && {padding: spacing(spacingSmall + spacingTiny + spacingTinier, 0)})
    }),
  tableHeader: css({
    padding: spacing(spacingSmall, spacingMedium)
  }),
  tableFooter: css({
    height: "initial"
  }),
  tableRow: (selected: boolean, showDataForAllParticipants: boolean) =>
    css({
      border: showDataForAllParticipants && !selected ? 0 : border(2, selected ? selectedBorderColor : "transparent"),
      borderRadius,
      padding: showDataForAllParticipants ? 0 : spacing(spacingTiny, spacingSmall)
    }),
  isCorrectHeader: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  answerTextContent: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingMedium,
    alignItems: "center"
  }),
  answerRadioButton: css({
    marginRight: spacingSmall
  }),
  isCorrectColumn: css({
    flex: flex0
  }),
  tooltipIcon: css({
    marginLeft: spacingTiny
  }),
  automatedCodingItemRuleField: css({
    marginBottom: spacingLarge - spacingTiny
  }),
  answerTextCell: (showDataForAllParticipants: boolean) =>
    css({
      ...(showDataForAllParticipants && {padding: 0})
    }),
  percentagePrefix: (selected: boolean) =>
    css({
      height: "100%",
      boxSizing: "border-box",
      ...(selected
        ? {
            backgroundColor: primaryColor,
            width: boxSizeLarge - spacingTinier,
            borderRadius: 0
          }
        : {
            borderTop: border(2, backgroundMenuInactive),
            borderBottom: border(2, backgroundMenuInactive),
            borderLeft: border(2, backgroundMenuInactive)
          })
    }),
  percentagePrefixLabel: (selected: boolean) =>
    css({
      color: selected ? fontColorBright : fontColor
    }),
  isCorrectIcon: (showDataForAllParticipants: boolean) =>
    css({
      ...(showDataForAllParticipants && {padding: spacingSmall})
    })
}
