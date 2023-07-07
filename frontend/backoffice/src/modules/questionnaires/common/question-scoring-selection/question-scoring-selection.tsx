import {css} from "@emotion/react"
import * as React from "react"
import {Label, SelectableCard, SelectionIconType} from "shared/components"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "shared/models"
import {spacingLarge, spacingMedium} from "shared/styles"
import {WithLucaTranslation} from "shared/translations"

export interface QuestionScoringSelectionProps extends WithLucaTranslation {
  readonly isEditable: boolean
  readonly onScoringTypeChange: (type: QuestionScoringType) => void
  readonly questionnaireQuestion: QuestionnaireQuestion
}

export const QuestionScoringSelection: React.FunctionComponent<QuestionScoringSelectionProps> = ({
  isEditable,
  onScoringTypeChange,
  questionnaireQuestion,
  t
}) => {
  const hasNoneScoreSetting = questionnaireQuestion.scoringType === QuestionScoringType.None
  const isFreeTextQuestion = questionnaireQuestion.questionType === QuestionType.FreeText
  return (
    <div className="question-scoring-selection">
      <Label label={t("questionnaires__detail_questions_scoring_title")} customStyles={styles.spacedLabel} />
      <div css={styles.scoringWrapper(isFreeTextQuestion ? 3 : 2)}>
        <SelectableCard
          title={t("questionnaire_question__scoring_none_title")}
          text={t("questionnaire_question__scoring_none_text")}
          selectionIconType={SelectionIconType.RADIO}
          selected={hasNoneScoreSetting}
          onClick={() => onScoringTypeChange(QuestionScoringType.None)}
          disabled={!isEditable}
        />
        {questionnaireQuestion.questionType !== QuestionType.MultipleChoice && (
          <SelectableCard
            title={t("questionnaire_question__scoring_holistic_title")}
            text={
              questionnaireQuestion.questionType === QuestionType.SingleChoice
                ? t("questionnaire_question__answer_holistic_text")
                : t("questionnaire_question__scoring_holistic_text")
            }
            selectionIconType={SelectionIconType.RADIO}
            selected={questionnaireQuestion.scoringType === QuestionScoringType.Holistic}
            onClick={() => onScoringTypeChange(QuestionScoringType.Holistic)}
            disabled={!isEditable}
          />
        )}
        {questionnaireQuestion.questionType !== QuestionType.SingleChoice && (
          <SelectableCard
            title={t("questionnaire_question__scoring_analytic_title")}
            text={
              questionnaireQuestion.questionType === QuestionType.MultipleChoice
                ? t("questionnaire_question__answer_analytic_text")
                : t("questionnaire_question__scoring_analytic_text")
            }
            selectionIconType={SelectionIconType.RADIO}
            selected={questionnaireQuestion.scoringType === QuestionScoringType.Analytical}
            onClick={() => onScoringTypeChange(QuestionScoringType.Analytical)}
            disabled={!isEditable}
          />
        )}
      </div>
    </div>
  )
}

const styles = {
  spacedLabel: css({
    marginTop: spacingLarge
  }),
  scoringWrapper: (columns: number) =>
    css({
      display: "grid",
      gridTemplateColumns: new Array(columns).fill("1fr").join(" "),
      columnGap: spacingMedium
    })
}
