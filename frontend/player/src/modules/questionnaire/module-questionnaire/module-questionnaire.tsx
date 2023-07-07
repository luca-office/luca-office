import {css, keyframes} from "@emotion/react"
import React from "react"
import {useSelector} from "react-redux"
import {
  AppHeader,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ChatWindow,
  ContentLoadingIndicator,
  DesktopBackground,
  FinishModal,
  Icon,
  ModuleQuestionnaireFooter,
  ModuleStartOverlay,
  Overlay,
  QuestionnaireView,
  Text
} from "shared/components"
import {DEFAULT_PROJECT_MODULE_DURATION_IN_S} from "shared/components/desktop/config"
import {ProjectModuleTimeElapsedModal} from "shared/components/desktop/scenario-time-up-modal"
import {IconName} from "shared/enums"
import {ProjectModuleEndType} from "shared/enums/project-module-end-type"
import {ProjectModuleType, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {
  boxSizeLarge,
  Flex,
  flex1,
  footerBoxShadow,
  spacingHeader,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes, Option} from "shared/utils"
import {AppState} from "../../../redux/state/app-state"
import {useChat} from "../hooks/use-chat"
import {useModuleQuestionnaire} from "./hooks/use-module-questionnaire"

export interface ModuleQuestionnaireProps {
  readonly questionnaireIdOption: Option<UUID>
}

export const ModuleQuestionnaire: React.FC<ModuleQuestionnaireProps> = ({questionnaireIdOption}) => {
  const {t} = useLucaTranslation()
  const executionTypeOption = useSelector<AppState, Option<SurveyExecutionType>>(
    s => s.data.surveyInvitation.executionType
  )

  const isAsyncExecution = executionTypeOption.exists(execType => execType !== SurveyExecutionType.ManualSynchronous)

  const isAutomaticExecution = executionTypeOption.contains(SurveyExecutionType.AutomaticAsynchronous)

  const {
    questionnaire: questionnaireOption,
    loading,
    isQuestionnaireFinished,
    numberOfAnsweredQuestions,
    onSelectAnswer,
    onDeselectAnswer,
    getQuestionnaireDurationInMillis,
    onUpdateFreeText,
    isStartModalVisible,
    setIsStartModalVisible,
    onFinishQuestionnaire,
    isFinishModalVisible,
    setIsFinishModalVisible,
    surveyEvents,
    isQuestionnaireDurationExpired,
    onTimeUpConfirm
  } = useModuleQuestionnaire({id: questionnaireIdOption, isManualSurvey: !isAutomaticExecution})

  const {
    supervisorName,
    isChatVisible,
    openChat,
    closeChat,
    messages,
    unreadMessageCount,
    sendParticipantMessage,
    isChatAccessible
  } = useChat(questionnaireIdOption)

  const questionnaireMaxDurationInSeconds = questionnaireOption
    .map(questionnaire => (getQuestionnaireDurationInMillis(questionnaire) ?? 0) / 1000)
    .orUndefined()

  const onStartQuestionnaire = () => {
    setIsStartModalVisible(false)
  }

  const showFinishDialog = () => {
    setIsFinishModalVisible(true)
  }

  const hideFinishDialog = () => {
    setIsFinishModalVisible(false)
  }

  return loading ? (
    <ContentLoadingIndicator customStyles={styles.loadingIndicator} />
  ) : (
    questionnaireOption
      .map(questionnaire => (
        <>
          <div css={styles.container}>
            <AppHeader maxModuleTimeInSeconds={questionnaireMaxDurationInSeconds} title={questionnaire.title} />
            <DesktopBackground customStyles={styles.desktopBackgroundContainer}>
              <div css={styles.questionnaireContainer}>
                <div css={{padding: spacingHeader}}>
                  <Card customStyles={styles.card} hasShadow={true}>
                    <CardHeader hasGreyBackground={true} hasShadow={true}>
                      <Icon name={IconName.Questionnaire} />
                      <Text customStyles={styles.headerTitle} size={TextSize.Medium}>
                        {t("questionnaire__title")}
                      </Text>
                    </CardHeader>
                    <CardContent>
                      <QuestionnaireView
                        customStyles={styles.questionnaireView}
                        questionnaire={questionnaire}
                        onSelectAnswer={onSelectAnswer}
                        onDeselectAnswer={onDeselectAnswer}
                        onChangeFreeText={onUpdateFreeText}
                        surveyEvents={surveyEvents}
                      />
                    </CardContent>
                    <CardFooter />
                  </Card>
                </div>
              </div>
            </DesktopBackground>
            <div css={[styles.footerContainer, !isFinishModalVisible && styles.footerContainerWithShadow]}>
              <ModuleQuestionnaireFooter
                isQuestionnaireFinished={isQuestionnaireFinished}
                numberOfAnsweredQuestions={numberOfAnsweredQuestions}
                questions={questionnaire.questions}
                onFinishQuestionnaire={showFinishDialog}
                onChatButtonClicked={openChat}
                newMessagesCount={unreadMessageCount}
                buttonLabel={t("questionnaire__finish_questionnaire")}
                isVisible={!isFinishModalVisible}
                isChatDisabled={false}
                isChatVisible={!isAutomaticExecution}
              />
            </div>
            {isStartModalVisible && (
              <ModuleStartOverlay
                title={questionnaire.title}
                description={questionnaire.description}
                buttonTitle={t("questionnaire__start_button_label")}
                onStartModule={onStartQuestionnaire}
              />
            )}
            {isFinishModalVisible && (
              <FinishModal
                title={questionnaire.title}
                onFinish={() => onFinishQuestionnaire(ProjectModuleEndType.ByParticipant)}
                onAbort={hideFinishDialog}
                moduleType={ProjectModuleType.Questionnaire}
              />
            )}
            {isQuestionnaireDurationExpired && (
              <Overlay>
                <ProjectModuleTimeElapsedModal
                  onConfirm={onTimeUpConfirm}
                  title={questionnaire.title}
                  textKey="questionnaire__time_up_modal"
                  textKeyOptions={{
                    duration: convertSecondsToMinutes(
                      questionnaire.maxDurationInSeconds ?? DEFAULT_PROJECT_MODULE_DURATION_IN_S
                    )
                  }}
                />
              </Overlay>
            )}
          </div>
          {!isAutomaticExecution && isChatVisible && (
            <Overlay>
              <ChatWindow
                chatTitle={supervisorName}
                attendeeView={true}
                messages={messages}
                onClose={closeChat}
                onMessageSend={sendParticipantMessage}
                isChatAccessible={isChatAccessible}
                instructionTitle={isAsyncExecution ? t("chat__supervisor_unapproachable") : undefined}
                instructionText={isAsyncExecution ? t("chat__supervisor_unapproachable_text") : undefined}
              />
            </Overlay>
          )}
        </>
      ))
      .orNull()
  )
}

const shadow = keyframes`
  0% {
    box-shadow: 0px 0px 0px 0px rgba(46, 48, 50, 0.16);
  }

  75% {
    box-shadow: 0px 0px 0px 0px rgba(46, 48, 50, 0.16);
  }

  100% {
    box-shadow: 0px -2px 4px 0px rgba(46, 48, 50, 0.16);
  }
`

const styles = {
  loadingIndicator: css({
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box"
  }),
  container: css(Flex.column, {
    height: "100vh"
  }),
  headerTitle: css({
    marginLeft: spacingSmall
  }),
  desktopBackgroundContainer: css({
    overflowY: "auto",
    flex: flex1
  }),
  questionnaireContainer: css(Flex.column, {
    alignItems: "center",
    flex: flex1,
    overflowY: "auto"
  }),
  questionnaireView: css({
    marginBottom: spacingMedium
  }),
  card: css({
    flex: flex1,
    width: 900
  }),
  footerContainer: css({
    position: "relative",
    height: boxSizeLarge,
    overflow: "hidden",
    boxShadow: "0px 0px 0px 0px rgba(46, 48, 50, 0.16)",
    animationFillMode: "forwards",
    flexShrink: 0
  }),
  footerContainerWithShadow: css({
    position: "relative",
    height: boxSizeLarge,
    overflow: "hidden",
    animation: `${shadow} 0.9s ease`,
    animationFillMode: "forwards",
    boxShadow: footerBoxShadow
  })
}
