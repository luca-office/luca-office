import {css, keyframes} from "@emotion/react"
import React from "react"
import {IconName} from "../../../enums"
import {QuestionnaireQuestion} from "../../../models"
import {
  backgroundColorBright,
  backgroundColorLight,
  borderRadius,
  boxSizeLarge,
  Flex,
  insetShadow,
  spacing,
  spacingSmall,
  spacingTiny,
  zIndexToolbar
} from "../../../styles"
import {QuestionnaireFooter} from ".."
import {QuestionnaireChatButton} from "./questionnaire-chat-button"

export interface ModuleQuestionnaireFooterProps {
  readonly questions: Array<QuestionnaireQuestion>
  readonly newMessagesCount: number
  readonly onFinishQuestionnaire: () => void
  readonly onChatButtonClicked: () => void
  readonly isChatDisabled?: boolean
  readonly isChatVisible?: boolean
  readonly isQuestionnaireFinished: boolean
  readonly numberOfAnsweredQuestions: number
  readonly buttonLabel: string
  readonly isVisible?: boolean
}

export const ModuleQuestionnaireFooter: React.FC<ModuleQuestionnaireFooterProps> = ({
  questions,
  onFinishQuestionnaire,
  onChatButtonClicked,
  newMessagesCount,
  isQuestionnaireFinished,
  numberOfAnsweredQuestions,
  buttonLabel,
  isChatVisible = true,
  isChatDisabled = true,
  isVisible = true
}) => {
  return (
    <div css={isVisible ? styles.footerVisible : styles.footer}>
      <div css={styles.container}>
        <QuestionnaireFooter
          answeredQuestionsCount={numberOfAnsweredQuestions}
          totalQuestionsCount={questions.length}
          isButtonDisabled={!isQuestionnaireFinished}
          buttonLabel={buttonLabel}
          onButtonClick={onFinishQuestionnaire}
          customIcon={IconName.QuestionnaireCascade}
          customStyles={styles.footerContainer}
        />
        {isChatVisible && (
          <QuestionnaireChatButton
            isDisabled={isChatDisabled}
            onClick={onChatButtonClicked}
            newMessagesCount={newMessagesCount}
          />
        )}
      </div>
    </div>
  )
}

const showAnimation = keyframes`
  from {
    transform: translateY(${boxSizeLarge + spacingSmall}px);
  }
  
  to {
    transform: translateY(0);
  }
`

const hideAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  
  to {
    transform: translateY(${boxSizeLarge + spacingSmall}px);
  }
`

const styles = {
  container: css(Flex.row, {
    boxSizing: "border-box",
    backgroundColor: backgroundColorBright,
    height: boxSizeLarge,
    width: "100%",
    padding: spacing(spacingTiny, spacingSmall)
  }),
  footerContainer: css({
    flex: "1 1 auto",
    backgroundColor: backgroundColorLight,
    borderRadius: borderRadius,
    boxShadow: insetShadow
  }),
  footer: css({
    flex: "0 0 auto",
    height: boxSizeLarge,
    animation: `${hideAnimation} 0.9s ease`,
    position: "fixed",
    transform: `translateY(${boxSizeLarge + spacingSmall}px)`,
    right: 0,
    left: 0
  }),
  footerVisible: css({
    animation: `${showAnimation} 0.9s ease`,
    animationFillMode: "forwards",
    opacity: 1,
    transform: "translateY(0)",
    zIndex: zIndexToolbar
  })
}
