import {css} from "@emotion/react"
import * as React from "react"
import {ChatWindow, Content, Overlay} from "shared/components"
import {IconName} from "shared/enums"
import {Children, Flex, headerHeight, zIndex1} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SubHeaderDetailContainer, SubHeaderDetailContainerProps} from "../../components"
import {Route} from "../../routes"
import {DashboardActionFooter} from "../dashboard/common"
import {SynchronousActionFooterLocation} from "../dashboard/common/synchronous-action-footer/synchronous-action-footer"
import {SynchronousActionFooterContainer} from "../dashboard/common/synchronous-action-footer/synchronous-action-footer-container"
import {useSupervisorChat} from "./dashboard/hooks/use-supervisor-chat"
import {useMonitoring} from "./use-monitoring"

export interface MonitoringProps extends Children {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly headerConfig?: Partial<Omit<SubHeaderDetailContainerProps, "customStyles" | "deleteButtonConfig">>
}

export const Monitoring: React.FunctionComponent<MonitoringProps> = ({projectId, surveyId, headerConfig, children}) => {
  const {t} = useLucaTranslation()

  const {
    projectOption,
    isManualExecutionTypeSurvey,
    isManualSynchronExecutionTypeSurvey,
    surveyProgress
  } = useMonitoring(projectId, surveyId)

  const {
    isChatVisible,
    openChat,
    closeChat,
    chatParticipants,
    messages,
    sendSupervisorMessage,
    isChatAccessible,
    navigateBackToDashboard,
    newParticipantMessages
  } = useSupervisorChat(surveyId, projectId, surveyProgress)

  const footer = isManualExecutionTypeSurvey ? (
    <SynchronousActionFooterContainer
      surveyId={surveyId}
      isAsynchronousSurvey={!isManualSynchronExecutionTypeSurvey}
      projectId={projectId}
      location={SynchronousActionFooterLocation.SurveyProgress}
      onClickChatButton={openChat}
      projectOption={projectOption}
      chatParticipantsIds={chatParticipants.map(participant => participant.id)}
      unreadParticipantMessages={newParticipantMessages}
    />
  ) : (
    <DashboardActionFooter projectId={projectId} surveyId={surveyId} hideNavigationButton={true} />
  )

  return (
    <>
      <Content
        customContentContainerStyles={styles.container}
        customFooterStyles={styles.zIndex}
        customStyles={styles.contentWrapper}
        subHeader={
          <SubHeaderDetailContainer
            customStyles={styles.zIndex}
            returnTo={{
              text: t("dashboard__project_header_navigate_back_label"),
              route: Route.SurveyDetail,
              params: {id: projectId, surveyId}
            }}
            title={t("dashboard__project_header_label")}
            {...headerConfig}
          />
        }
        actionBar={footer}>
        {children}
      </Content>
      {isChatVisible && chatParticipants !== undefined && (
        <Overlay>
          <ChatWindow
            chatTitle={
              chatParticipants.length > 1
                ? t("chat__group_title", {count: chatParticipants.length})
                : chatParticipants[0].displayName
            }
            messages={messages}
            onClose={closeChat}
            onMessageSend={sendSupervisorMessage}
            headerButtonConfig={{
              icon: IconName.Student,
              textKey: "chat__supervisor_back",
              onBackNavigation: navigateBackToDashboard
            }}
            isChatAccessible={isChatAccessible}
            instructionTitle={t("chat__instruction", {count: chatParticipants.length})}
            instructionText={chatParticipants.map(_ => _.displayName).join(", ")}
          />
        </Overlay>
      )}
    </>
  )
}

export const styles = {
  zIndex: css({
    zIndex: zIndex1
  }),
  container: css(Flex.column, {
    overflow: "auto"
  }),
  contentWrapper: css({
    padding: 0,
    maxHeight: `calc(100vh - ${headerHeight}px)`,
    overflow: "hidden"
  })
}
