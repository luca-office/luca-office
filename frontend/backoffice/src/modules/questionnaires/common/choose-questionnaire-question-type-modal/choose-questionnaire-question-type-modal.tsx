import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, SelectableCard, Text} from "shared/components"
import {IconName} from "shared/enums"
import {QuestionType} from "shared/graphql/generated/globalTypes"
import {errorColor, Flex, spacing, spacingMedium, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"

export interface ChooseQuestionnaireQuestionTypeModalProps {
  readonly disabled?: boolean
  readonly onDismiss: () => void
  readonly onConfirm: (questionType: QuestionType) => void
  readonly selectedQuestionType: Option<QuestionType>
  readonly setSelectedQuestionType: (questionType: QuestionType) => void
  readonly errorMessage?: string
}

export const ChooseQuestionnaireQuestionTypeModal: React.FC<ChooseQuestionnaireQuestionTypeModalProps> = ({
  disabled = false,
  onDismiss,
  onConfirm,
  selectedQuestionType,
  setSelectedQuestionType,
  errorMessage
}) => {
  const {t} = useLucaTranslation()
  const questionType = selectedQuestionType.orNull()

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        onConfirm={() => selectedQuestionType.forEach(onConfirm)}
        confirmButtonDisabled={!questionType || disabled}
        onDismiss={onDismiss}
        title={t("questionnaire_question__creation_title")}
        preventDismissOnEscape={true}
        preventSubmitOnEnter={true}>
        <div css={styles.content}>
          <SelectableCard
            title={t("questionnaire_question__multiple_choice_label")}
            iconName={IconName.MultipleChoice}
            text={t("questionnaire_question__multiple_choice_description")}
            selected={questionType === QuestionType.MultipleChoice}
            onClick={() => setSelectedQuestionType(QuestionType.MultipleChoice)}
          />
          <SelectableCard
            title={t("questionnaire_question__single_choice_label")}
            iconName={IconName.SingleChoice}
            text={t("questionnaire_question__single_choice_description")}
            selected={questionType === QuestionType.SingleChoice}
            onClick={() => setSelectedQuestionType(QuestionType.SingleChoice)}
          />
          <SelectableCard
            title={t("questionnaire_question__free_text_label")}
            iconName={IconName.SpeechBubble}
            text={t("questionnaire_question__free_text_description")}
            selected={questionType === QuestionType.FreeText}
            onClick={() => setSelectedQuestionType(QuestionType.FreeText)}
          />
        </div>
        {!!errorMessage && (
          <div css={styles.errorMessageWrapper} className={"error-message"}>
            <Text size={TextSize.Small} customStyles={styles.errorMessage}>
              {errorMessage}
            </Text>
          </div>
        )}
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({
    width: 900
  }),
  content: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: spacingMedium
  }),
  errorMessageWrapper: css(Flex.row, {
    justifyContent: "flex-end",
    margin: spacing(spacingMedium, 0)
  }),
  errorMessage: css({
    color: errorColor
  })
}
