import {css} from "@emotion/react"
import {noop} from "lodash-es"
import * as React from "react"
import {AnswerBaseType, CustomSelect, Heading, Label, SelectableAnswer, SelectOptionCustomized} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {QuestionType} from "shared/graphql/generated/globalTypes"
import {Flex, spacingMedium, spacingTiny} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

interface Props {
  readonly questionTitle: string
  readonly onChange: (value: string) => void
  readonly isNegated: boolean
  readonly selectedAnswer: AnswerBaseType
}

export enum RuntimeSurveyAnswerSelectionState {
  WasSelected = "was-selected",
  WasNotSelected = "was-not-selected"
}

export const SurveyEventAnswerSelectionTriggerCondition: React.FC<Props> = ({
  questionTitle,
  onChange,
  isNegated,
  selectedAnswer
}) => {
  const {t} = useLucaTranslation()
  const selectOptions: SelectOptionCustomized[] = [
    {
      label: t("interventions__interventions_create_modal_title_survey_event_selected_label"),
      value: RuntimeSurveyAnswerSelectionState.WasSelected,
      renderOptionLabel: label => <div css={Flex.row}>{label}</div>
    },
    {
      label: t("interventions__interventions_create_modal_title_survey_event_not_selected_label"),
      value: RuntimeSurveyAnswerSelectionState.WasNotSelected,
      renderOptionLabel: label => <div css={Flex.row}>{label}</div>
    }
  ]
  return (
    <div>
      <Label label={t("question_description")} />
      <Heading customStyles={styles.marginBottom} level={HeadingLevel.h1}>
        {questionTitle}
      </Heading>

      <CustomSelect
        customStyles={styles.select}
        onChange={onChange}
        optionList={selectOptions}
        labelKey="selection"
        value={
          isNegated ? RuntimeSurveyAnswerSelectionState.WasNotSelected : RuntimeSurveyAnswerSelectionState.WasSelected
        }
      />

      <Label label={t("questionnaires__detail_questions_answer_singular")} />
      <SelectableAnswer
        questionType={QuestionType.SingleChoice}
        isSelected={!isNegated}
        answer={selectedAnswer}
        handleSelectionChange={noop}
      />
    </div>
  )
}

const styles = {
  select: css({
    width: "100%",
    marginBottom: spacingMedium
  }),
  marginBottom: css({
    marginBottom: spacingMedium
  }),
  radioButton: css({
    marginRight: spacingTiny
  })
}
