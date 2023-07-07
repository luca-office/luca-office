import {css} from "@emotion/react"
import React from "react"
import {OfficeWindow, QuestionnaireFooter, QuestionnaireView, useQuestionnaireQuestionState} from "shared/components"
import {IconName} from "shared/enums"
import {Questionnaire} from "shared/models"
import {Flex, spacingHeader} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface EventQuestionnairePreviewProps {
  questionnaire: Questionnaire
  onClose: () => void
}

export const EventQuestionnairePreview: React.FC<EventQuestionnairePreviewProps> = ({questionnaire, onClose}) => {
  const {t} = useLucaTranslation()

  const {
    onSelectAnswer,
    onDeselectAnswer,
    onUpdateFreeText,
    isQuestionnaireFinished,
    numberOfAnsweredQuestions
  } = useQuestionnaireQuestionState(questionnaire.questions)

  return (
    <OfficeWindow
      icon={IconName.Bell}
      label={t("events__preview_title")}
      isFooterVisible={false}
      customStyles={styles.window}
      onClose={onClose}
      closeButtonLabel={t("events__end_preview")}>
      <QuestionnaireView
        customQuestionsContainerStyles={styles.questionsContainer}
        questionnaire={questionnaire}
        onSelectAnswer={onSelectAnswer}
        onDeselectAnswer={onDeselectAnswer}
        onChangeFreeText={onUpdateFreeText}
      />
      <QuestionnaireFooter
        answeredQuestionsCount={numberOfAnsweredQuestions}
        isButtonDisabled={!isQuestionnaireFinished}
        onButtonClick={onClose}
        buttonLabel={t("questionnaire__finish_event")}
        totalQuestionsCount={questionnaire.questions.length}
      />
    </OfficeWindow>
  )
}

const styles = {
  window: css(Flex.column, {
    width: 900,
    maxHeight: "90vh"
  }),
  questionsContainer: css({
    marginBottom: spacingHeader
  })
}
