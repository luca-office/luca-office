import {css} from "@emotion/react"
import {noop} from "lodash-es"
import * as React from "react"
import {ColumnProps, getQuestionScoringTypeIconName, Heading, Icon, Table, Text, Tooltip} from "../../components"
import {HeadingLevel, IconName} from "../../enums"
import {QuestionScoringType} from "../../graphql/generated/globalTypes"
import {QuestionnaireAnswer, QuestionnaireQuestion} from "../../models"
import {
  border,
  borderRadius,
  Flex,
  fontColor,
  fontColorLight,
  FontWeight,
  iconDefaultColor,
  selectedBorderColor,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../styles"
import {LucaTFunction} from "../../translations"
import {Option, sortByPosition} from "../../utils"

export type AnswerCountById = {[id: string]: number}

export interface ReportingClosedQuestionAnswersTableProps {
  readonly t: LucaTFunction
  readonly question: QuestionnaireQuestion
  readonly selectedAnswerIds: UUID[]
  readonly renderAnswerContentColumn: (answer: QuestionnaireAnswer) => JSX.Element
}

export const ReportingClosedQuestionAnswersTable: React.FC<ReportingClosedQuestionAnswersTableProps> = ({
  t,
  question,
  selectedAnswerIds,
  renderAnswerContentColumn
}) => {
  const sortedAnswers = sortByPosition(question.answers)

  const textColumn: ColumnProps<QuestionnaireAnswer> = {
    key: "text",
    header: (
      <Text customStyles={styles.label} size={TextSize.Medium}>
        {t("rating_questionnaire_answer__automatic_rating_text_label")}
      </Text>
    ),
    content: answer => renderAnswerContentColumn(answer)
  }

  const isCorrectColumn: ColumnProps<QuestionnaireAnswer> = {
    key: "is-correct",
    header: (
      <Tooltip
        icon={getQuestionScoringTypeIconName(question.scoringType)}
        {...(question.scoringType === QuestionScoringType.Analytical
          ? {
              title: t("rating__scoring_analytic_title"),
              text: t("coding_item_update__selection_card_type_analytical_description")
            }
          : {
              title: t("rating__scoring_holistic_title"),
              text: t("coding_item_update__selection_card_type_holistic_description")
            })}>
        <div css={styles.isCorrectColumnHeader}>
          <Text customStyles={styles.label} size={TextSize.Medium}>
            {question.scoringType === QuestionScoringType.Analytical
              ? t("questionnaire_question__scoring_analytic_title")
              : question.scoringType === QuestionScoringType.Holistic
              ? t("questionnaire_question__scoring_holistic_title")
              : t("questionnaires__detail_questions_scoring_title")}
          </Text>
          <Icon name={getQuestionScoringTypeIconName(question.scoringType)} />
        </div>
      </Tooltip>
    ),
    content: answer => (
      <Icon
        name={answer.isCorrect ? IconName.Check : IconName.Close}
        color={selectedAnswerIds.includes(answer.id) ? iconDefaultColor : fontColorLight}
      />
    ),
    customStyles: styles.isCorrectColumn
  }

  return (
    <div>
      <div css={Flex.row}>
        <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating__automatic_rating_label")} ({sortedAnswers.length})
        </Heading>
        <Tooltip
          title={t("rating__automatic_rating_label")}
          text={t("rating__automatic_rating_description_questionnaire")}
          icon={IconName.Gear}>
          <Icon name={IconName.Information} customStyles={styles.tooltipIcon} />
        </Tooltip>
      </div>
      <Table<QuestionnaireAnswer>
        customStyles={styles.table}
        customHeaderRowStyles={styles.tableHeader}
        customRowStyles={answer => styles.tableRow(selectedAnswerIds.includes(answer.id))}
        customTableFooterStyles={styles.tableFooter}
        onSortIconClicked={noop}
        sortInfo={Option.none()}
        sortedEntities={sortedAnswers}
        columns={[textColumn, isCorrectColumn]}
        entityKey={answer => answer.id}
        showFooter={true}
      />
    </div>
  )
}

const styles = {
  label: textEllipsis,
  answerLabel: (isSelected: boolean) =>
    css(textEllipsis, {
      color: isSelected ? fontColor : fontColorLight,
      ...(isSelected && {
        borderTop: border(2, "transparent"),
        borderBottom: border(2, "transparent")
      })
    }),
  table: {
    marginTop: spacingTiny
  },
  tableHeader: {
    padding: spacing(spacingSmall, spacingMedium)
  },
  tableFooter: {
    height: "initial"
  },
  tableRow: (isSelected: boolean) => ({
    border: border(2, isSelected ? selectedBorderColor : "transparent"),
    borderRadius,
    padding: spacing(spacingTiny, spacingSmall)
  }),
  answerTextContent: {
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingMedium,
    alignItems: "center"
  },
  isCorrectColumn: {
    flex: "0 0 auto"
  },
  isCorrectColumnHeader: {
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  },
  tooltipIcon: {
    marginLeft: spacingTiny
  }
}
