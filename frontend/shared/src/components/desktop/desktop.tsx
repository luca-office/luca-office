import {CSSInterpolation} from "@emotion/serialize"
import partial from "lodash-es/partial"
import * as React from "react"
import {OfficeWindowType} from "../../enums"
import {ProjectModuleType, SurveyEventType} from "../../graphql/generated/globalTypes"
import {Intervention, QuestionnaireSurveyEvents, Scenario} from "../../models"
import {CustomStyle, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {convertSecondsToMinutes, Option} from "../../utils"
import {
  AppHeader,
  DesktopBackgroundOverlay,
  EventQuestionnaire,
  FinishModal,
  LoadingIndicator,
  ModuleStartOverlay,
  Overlay,
  Text
} from ".."
import {styles} from "./desktop.styles"
import {DesktopBackground} from "./desktop-background"
import {ProjectModuleTimeElapsedModal} from "./scenario-time-up-modal"
import {findVisibleWindows} from "./utils"

export interface PlaceholderConfig {
  readonly title: string
  readonly description: string
}

export interface ToolRenderConfig {
  readonly tool: OfficeWindowType
  readonly openedIndex: number
  readonly isMinimized: boolean
  readonly isClosed: boolean
  readonly interventions: Intervention[]
  readonly onClose: () => void
  readonly onMinimize: () => void
  readonly scenario: Scenario
  readonly scenarioCompletionEmailAddress: string
  readonly onCompletionMailSent: () => void
}

export interface DesktopProps extends CustomStyle {
  readonly abortScenarioFinishModal: () => void
  readonly availableWindows: OfficeWindowType[]
  readonly closeQuestionnaireEvent: () => void
  readonly closeWindow: (window: OfficeWindowType) => void
  readonly confirmScenarioFinishModal: () => void
  readonly confirmScenarioTimeUpModal: () => void
  readonly currentQuestionnaireId: Option<UUID>
  readonly isFinishModalVisible: boolean
  readonly isScenarioDurationExpired: boolean
  readonly isScenarioLoading: boolean
  readonly interventions: Intervention[]
  readonly minimizedWindows: OfficeWindowType[]
  readonly minimizeWindow: (window: OfficeWindowType, withSurveyEvent?: boolean) => void
  readonly openedWindows: OfficeWindowType[]
  readonly scenario: Scenario
  readonly sendCompletionMail: () => void
  readonly isStartModalVisible: boolean
  readonly onStartScenario: () => void
  readonly taskbar: React.ReactNode
  readonly isHeaderVisible?: boolean
  readonly renderTool: (config: ToolRenderConfig) => React.ReactNode
  readonly questionnaireSurveyEvents?: QuestionnaireSurveyEvents
  readonly placeholderConfig?: PlaceholderConfig
  readonly showPlaceholder?: boolean
  readonly scenarioDurationInSeconds?: number
  readonly onClipboardEvent: (eventType: SurveyEventType) => void
  readonly customDesktopBackgroundOverlayStyles?: CSSInterpolation
  readonly customDesktopPlaceholderStyles?: CSSInterpolation
  readonly customDesktopBackgroundOverlayBackgroundStyles?: CSSInterpolation
  readonly customDesktopBackgroundPlaceholderContainerStyles?: CSSInterpolation
}

export const Desktop: React.FC<DesktopProps> = ({
  availableWindows,
  closeWindow,
  confirmScenarioTimeUpModal,
  isScenarioDurationExpired,
  minimizeWindow,
  minimizedWindows,
  openedWindows,
  scenario,
  isScenarioLoading,
  interventions,
  sendCompletionMail,
  closeQuestionnaireEvent,
  currentQuestionnaireId,
  isFinishModalVisible,
  abortScenarioFinishModal,
  confirmScenarioFinishModal,
  isStartModalVisible,
  onStartScenario,
  taskbar,
  isHeaderVisible = true,
  renderTool,
  questionnaireSurveyEvents,
  placeholderConfig,
  showPlaceholder,
  scenarioDurationInSeconds,
  onClipboardEvent,
  customDesktopBackgroundOverlayStyles,
  customDesktopPlaceholderStyles,
  customDesktopBackgroundOverlayBackgroundStyles,
  customDesktopBackgroundPlaceholderContainerStyles,
  customStyles
}) => {
  const {t} = useLucaTranslation()
  const scenarioCompletionEmailAddress = scenario.completionEmailAddress || ""
  const windowOrdering = findVisibleWindows(openedWindows, minimizedWindows)

  // Close all windows when the finish Modal is displayed
  React.useEffect(() => {
    if (isFinishModalVisible) {
      availableWindows.forEach(window => {
        minimizeWindow(window, false)
      })
    }
  }, [isFinishModalVisible])

  const content = (
    <div css={styles.contentBody}>
      <div
        css={styles.content}
        className={"desktop-content"}
        onPaste={() => onClipboardEvent(SurveyEventType.PasteFromClipboard)}
        onCopy={() => onClipboardEvent(SurveyEventType.CopyToClipboard)}>
        {availableWindows.map(window =>
          renderTool({
            tool: window,
            openedIndex: windowOrdering.indexOf(window),
            isMinimized: minimizedWindows.some(minWindow => minWindow === window),
            isClosed: !openedWindows.some(openWindow => openWindow === window),
            interventions,
            onClose: partial(closeWindow, window),
            onMinimize: partial(minimizeWindow, window),
            scenario,
            scenarioCompletionEmailAddress,
            onCompletionMailSent: sendCompletionMail
          })
        )}
      </div>

      <div css={styles.taskbarWrapper}>{taskbar}</div>

      {currentQuestionnaireId
        .map(id => (
          <Overlay customStyles={styles.eventQuestionnaireOverlay}>
            <EventQuestionnaire
              customStyles={styles.questionnaireWindow}
              questionnaireId={id}
              onClose={closeQuestionnaireEvent}
              surveyEvents={questionnaireSurveyEvents}
            />
          </Overlay>
        ))
        .orNull()}
    </div>
  )

  return (
    <div css={[styles.container, customStyles]}>
      <div css={styles.header}>
        {isHeaderVisible && (
          <AppHeader
            fictiveDate={scenario.date ? new Date(scenario.date) : undefined}
            title={scenario.name}
            maxModuleTimeInSeconds={scenarioDurationInSeconds}
          />
        )}
      </div>
      {showPlaceholder && placeholderConfig !== undefined ? (
        <DesktopBackgroundOverlay
          customStyles={[styles.backgroundOverlay, customDesktopBackgroundOverlayStyles]}
          customContentStyles={styles.backgroundOverlayContentWrapper}
          customBackgroundStyles={customDesktopBackgroundOverlayBackgroundStyles}>
          <div css={[styles.backgroundOverlayContent, customDesktopPlaceholderStyles]}>
            <div css={[styles.placeholderContainer, customDesktopBackgroundPlaceholderContainerStyles]}>
              <div css={styles.placeholder}>
                <Text customStyles={styles.placeholderText} size={TextSize.Medium}>
                  {placeholderConfig.title}
                </Text>
                <Text customStyles={styles.placeholderText}>{placeholderConfig.description}</Text>
              </div>
            </div>
            {content}
          </div>
        </DesktopBackgroundOverlay>
      ) : (
        <DesktopBackground customStyles={styles.contentWrapper}>{content}</DesktopBackground>
      )}

      {isScenarioDurationExpired && (
        <ProjectModuleTimeElapsedModal
          textKey="scenario_time_up_text"
          textKeyOptions={{duration: convertSecondsToMinutes(scenarioDurationInSeconds ?? 0)}}
          onConfirm={confirmScenarioTimeUpModal}
          title={scenario.name}
        />
      )}
      {isStartModalVisible ? (
        <ModuleStartOverlay
          title={scenario.name}
          description={scenario.description}
          buttonTitle={t("scenario__start_button_label")}
          onStartModule={onStartScenario}
        />
      ) : (
        isScenarioLoading && (
          <Overlay>
            <LoadingIndicator />
          </Overlay>
        )
      )}
      {isFinishModalVisible && (
        <FinishModal
          moduleType={ProjectModuleType.Scenario}
          title={scenario.name}
          onAbort={abortScenarioFinishModal}
          onFinish={confirmScenarioFinishModal}
        />
      )}
    </div>
  )
}
