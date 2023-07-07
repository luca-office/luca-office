import {css} from "@emotion/react"
import React from "react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Icon,
  QuestionnaireFooter,
  QuestionnaireView,
  Text,
  useQuestionnaireQuestionState
} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {Questionnaire} from "shared/models"
import {Flex, flex1, footerBoxShadow, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface ProjectQuestionnairePreviewProps {
  questionnaire: Questionnaire
  onClose: () => void
}

export const ProjectQuestionnairePreview: React.FC<ProjectQuestionnairePreviewProps> = ({questionnaire, onClose}) => {
  const {
    isQuestionnaireFinished,
    numberOfAnsweredQuestions,
    onDeselectAnswer,
    onSelectAnswer,
    onUpdateFreeText
  } = useQuestionnaireQuestionState(questionnaire.questions)

  const {t} = useLucaTranslation()

  return (
    <div css={styles.container}>
      <Card customStyles={styles.card} hasShadow={true}>
        <CardHeader customStyles={styles.header} hasGreyBackground={true} hasShadow={true}>
          <div css={Flex.row}>
            <Icon name={IconName.Questionnaire} />
            <Text customStyles={styles.headerTitle} size={TextSize.Medium}>
              {t("questionnaires__title_preview")}
            </Text>
          </div>
          <Button variant={ButtonVariant.Secondary} onClick={onClose}>
            {t("events__end_preview")}
          </Button>
        </CardHeader>
        <CardContent customStyles={styles.content}>
          <QuestionnaireView
            customQuestionsContainerStyles={styles.questionnaireView}
            questionnaire={questionnaire}
            onSelectAnswer={onSelectAnswer}
            onDeselectAnswer={onDeselectAnswer}
            onChangeFreeText={onUpdateFreeText}
          />
        </CardContent>
        <QuestionnaireFooter
          customStyles={styles.footer}
          isButtonDisabled={!isQuestionnaireFinished}
          answeredQuestionsCount={numberOfAnsweredQuestions}
          totalQuestionsCount={questionnaire.questions.length}
          onButtonClick={onClose}
          customIcon={IconName.QuestionnaireCascade}
          buttonLabel={t("questionnaire__finish_questionnaire")}
        />
      </Card>
    </div>
  )
}

const styles = {
  header: css({
    justifyContent: "space-between"
  }),
  headerTitle: css({
    marginLeft: spacingSmall
  }),
  container: css(Flex.column, {
    alignItems: "center",
    flex: flex1
  }),
  content: css({
    overflowY: "auto",
    flex: flex1
  }),
  questionnaireView: css({
    marginBottom: spacingMedium
  }),
  card: css({
    flex: flex1,
    width: 900,
    maxHeight: "90vh"
  }),
  footer: css({
    boxShadow: footerBoxShadow
  })
}
