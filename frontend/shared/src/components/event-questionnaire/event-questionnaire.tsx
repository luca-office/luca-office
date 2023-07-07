import {css} from "@emotion/react"
import React from "react"
import {IconName} from "../../enums"
import {QuestionnaireSurveyEvents} from "../../models"
import {CustomStyle, Flex, spacingHeader} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {LoadingIndicator, OfficeWindow, QuestionnaireFooter, QuestionnaireView} from ".."
import {useEventQuestionnaire} from "./hooks/use-event-questionnaire"

export interface EventQuestionnaireProps extends CustomStyle {
  readonly questionnaireId: UUID
  readonly onClose: () => void
  readonly surveyEvents?: QuestionnaireSurveyEvents
}

export const EventQuestionnaire: React.FC<EventQuestionnaireProps> = ({
  questionnaireId,
  onClose,
  surveyEvents,
  customStyles
}) => {
  const {
    questionnaire: questionnaireOption,
    onSelectAnswer,
    onDeselectAnswer,
    onUpdateFreeText,
    isQuestionnaireFinished,
    numberOfAnsweredQuestions
  } = useEventQuestionnaire({id: questionnaireId})

  const {t} = useLucaTranslation()

  return (
    <OfficeWindow icon={IconName.Bell} label={t("events__title")} isFooterVisible={false} customStyles={customStyles}>
      {questionnaireOption
        .map(questionnaire => (
          <>
            <QuestionnaireView
              customQuestionsContainerStyles={styles.questionsContainer}
              questionnaire={questionnaire}
              onSelectAnswer={onSelectAnswer}
              onDeselectAnswer={onDeselectAnswer}
              onChangeFreeText={onUpdateFreeText}
              surveyEvents={surveyEvents}
            />
            <QuestionnaireFooter
              answeredQuestionsCount={numberOfAnsweredQuestions}
              isButtonDisabled={!isQuestionnaireFinished}
              onButtonClick={onClose}
              buttonLabel={t("questionnaire__finish_event")}
              totalQuestionsCount={questionnaire.questions.length}
            />
          </>
        ))
        .getOrElse(
          <div css={styles.loading}>
            <LoadingIndicator />
          </div>
        )}
    </OfficeWindow>
  )
}

const styles = {
  questionsContainer: css({
    marginBottom: spacingHeader
  }),
  loading: css(Flex.column, {
    height: 400,
    justifyContent: "center",
    alignItems: "center"
  })
}
