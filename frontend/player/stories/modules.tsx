import {MockedProvider} from "@apollo/client/testing"
import {action} from "@storybook/addon-actions"
import {text} from "@storybook/addon-knobs"
import {storiesOf} from "@storybook/react"
import * as React from "react"
import {Provider} from "react-redux"
import {interventionsMock} from "shared/__mocks__"
import {AppHeader, Desktop, ModuleQuestionnaireFooter, ModuleStartOverlay} from "shared/components"
import {BinaryViewerTool, OfficeTool} from "shared/enums"
import {questionnaireMock, userAccountMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import {scenariosMock} from "../src/graphql/__mocks__"
import {CreateUserAccountMutationVariables} from "../src/graphql/generated/CreateUserAccountMutation"
import {Salutation} from "../src/graphql/generated/globalTypes"
import {createUserAccountMutation} from "../src/graphql/mutations"
import {DesktopContainer, ProjectEnd, SignUpModal} from "../src/modules"
import {UserInformationLogin} from "../src/modules/auth/login/user-information-login/user-information-login"
import {ProjectInformation} from "../src/modules/auth/start-project/project-information/project-information"
import {TaskbarContainer} from "../src/modules/common/taskbar/taskbar-container"
import {WelcomeModal} from "../src/modules/common/welcome-modal/welcome-modal"
import {initialAppState} from "../src/redux/state/app-state"

storiesOf("Auth", module)
  .add("User Information Login", () => (
    <UserInformationLogin loginLoading={false} login={action("login")} onSignUpClicked={action("onSignUpClicked")} />
  ))
  .add("User Information Login Loading", () => (
    <UserInformationLogin loginLoading={true} login={action("login")} onSignUpClicked={action("onSignUpClicked")} />
  ))
  .add("Signup Modal", () => {
    const accountCreation: CreateUserAccountMutationVariables = {
      creation: {
        firstName: "test",
        lastName: "test",
        email: "tsts@test.de",
        organization: "hello",
        password: "123",
        salutation: Salutation.Mr,
        hasConfirmedBackofficeTermsAndConditions: false
      }
    }
    return (
      <MockedProvider
        mocks={[
          {request: {query: createUserAccountMutation, variables: accountCreation}, result: {data: userAccountMock}}
        ]}
        addTypename={false}>
        <Provider store={fakeStore(initialAppState(null))}>
          <SignUpModal onDismiss={action("onDismiss")} />
        </Provider>
      </MockedProvider>
    )
  })
  .add("Start Project", () => (
    <ProjectInformation
      onStartClicked={action("onStartClicked")}
      durationInMinutes={180}
      isStartLoading={false}
      isPrivacyPolicyChecked={false}
      updateIsPrivacyPolicyChecked={action("updateIsPrivacyPolicyChecked")}
    />
  ))

storiesOf("Common", module)
  .add("App Header - Default", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <AppHeader title="Innerbetriebliche Logistik" maxModuleTimeInSeconds={10} />
      </Provider>
    </MockedProvider>
  ))
  .add("App Header - No Remaining Time", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <AppHeader title="Innerbetriebliche Logistik" />
      </Provider>
    </MockedProvider>
  ))
  .add("Task Bar - Default", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <TaskbarContainer scenarioId={""} />
      </Provider>
    </MockedProvider>
  ))
  .add("Task Bar - Calculator opened", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <TaskbarContainer scenarioId={""} />
      </Provider>
    </MockedProvider>
  ))
  .add("Task Bar - Calculator and email client opened, calculator focussed", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <TaskbarContainer scenarioId={""} />
      </Provider>
    </MockedProvider>
  ))
  .add("Task Bar - Viewer and Tools open", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <TaskbarContainer scenarioId={""} />
      </Provider>
    </MockedProvider>
  ))
  .add("Desktop - Calculator", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <Desktop
          interventions={interventionsMock}
          availableWindows={[]}
          minimizedWindows={[]}
          scenario={scenariosMock[0]}
          closeWindow={action("onCloseTool")}
          openedWindows={[OfficeTool.EmailClient, OfficeTool.Calculator]}
          sendCompletionMail={action("onCompletionMailSent")}
          isScenarioDurationExpired={false}
          confirmScenarioTimeUpModal={action("onScenarioTimeUpModalClicked")}
          isScenarioLoading={false}
          minimizeWindow={action("minimizeWindow")}
          closeQuestionnaireEvent={action("closeQuestionnaireEvent")}
          currentQuestionnaireId={Option.none()}
          abortScenarioFinishModal={action("abortScenarioFinishModal")}
          confirmScenarioFinishModal={action("confirmScenarioFinishModal")}
          isFinishModalVisible={false}
          isStartModalVisible={false}
          onStartScenario={action("startScenario")}
          taskbar={<TaskbarContainer scenarioId={""} />}
          renderTool={() => <div>render tool</div>}
          onClipboardEvent={action("copyToClipboard")}
        />
      </Provider>
    </MockedProvider>
  ))
  .add("Desktop - ImageViewer & Reference Book", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <Desktop
          interventions={interventionsMock}
          availableWindows={[]}
          minimizedWindows={[]}
          scenario={scenariosMock[0]}
          closeWindow={action("onCloseTool")}
          openedWindows={[OfficeTool.ReferenceBookViewer, BinaryViewerTool.ImageViewer]}
          sendCompletionMail={action("onCompletionMailSent")}
          isScenarioDurationExpired={false}
          confirmScenarioTimeUpModal={action("onScenarioTimeUpModalClicked")}
          isScenarioLoading={false}
          minimizeWindow={action("minimizeWindow")}
          closeQuestionnaireEvent={action("closeQuestionnaireEvent")}
          currentQuestionnaireId={Option.none()}
          abortScenarioFinishModal={action("abortScenarioFinishModal")}
          confirmScenarioFinishModal={action("confirmScenarioFinishModal")}
          isFinishModalVisible={false}
          isStartModalVisible={false}
          onStartScenario={action("startScenario")}
          taskbar={<TaskbarContainer scenarioId={""} />}
          renderTool={() => <div>render tool</div>}
          onClipboardEvent={action("copyToClipboard")}
        />
      </Provider>
    </MockedProvider>
  ))
  .add("Desktop Container - Default", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <DesktopContainer scenarioId={Option.none()} />
      </Provider>
    </MockedProvider>
  ))
  .add("Desktop Final - Default", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState(null))}>
        <ProjectEnd token={text("Token", "ZSFlkd98")} />
      </Provider>
    </MockedProvider>
  ))
  .add("Scenario (Desktop) Welcome Modal", () => (
    <WelcomeModal
      title="Ertragspotenziale und Risiken von Venture-Capital-Finanzierungen"
      welcomeText={`Test des Willkommenstextes

      Dieser Text hat Zeilenumbrüche


      Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben. Eines Tages aber beschloß eine kleine Zeile Blindtext, ihr Name war Lorem Ipsum, hinaus zu gehen in die weite Grammatik. Der große Oxmox riet ihr davon ab, da es dort wimmele von bösen Kommata, wilden Fragezeichen und hinterhältigen Semikoli, doch das Blindtextchen ließ sich nicht beirren. Es packte seine sieben Versalien, schob sich sein Initial in den Gürtel und machte sich auf den Weg. Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.`}
      onStartClicked={action("onStartClicked")}
    />
  ))

storiesOf("Questionnaire", module)
  .add("Footer", () => (
    <ModuleQuestionnaireFooter
      onFinishQuestionnaire={action("onFinishQuestionnaire")}
      onChatButtonClicked={action("onChatButtonClicked")}
      questions={questionnaireMock.questions}
      isQuestionnaireFinished={false}
      numberOfAnsweredQuestions={0}
      newMessagesCount={0}
      buttonLabel={"Fragebogen abschließen"}
    />
  ))
  .add("Footer with finished questionnaire", () => (
    <ModuleQuestionnaireFooter
      onFinishQuestionnaire={action("onFinishQuestionnaire")}
      onChatButtonClicked={action("onChatButtonClicked")}
      questions={questionnaireMock.questions}
      isQuestionnaireFinished={true}
      newMessagesCount={0}
      numberOfAnsweredQuestions={questionnaireMock.questions.length}
      buttonLabel={"Fragebogen abschließen"}
    />
  ))
  .add("Footer with chat enabled", () => (
    <ModuleQuestionnaireFooter
      onFinishQuestionnaire={action("onFinishQuestionnaire")}
      onChatButtonClicked={action("onChatButtonClicked")}
      questions={[]}
      isQuestionnaireFinished={false}
      numberOfAnsweredQuestions={0}
      isChatDisabled={false}
      newMessagesCount={22}
      buttonLabel={"Fragebogen abschließen"}
    />
  ))
  .add("Footer with finished questionnaire and chat enabled", () => (
    <ModuleQuestionnaireFooter
      onFinishQuestionnaire={action("onFinishQuestionnaire")}
      onChatButtonClicked={action("onChatButtonClicked")}
      questions={questionnaireMock.questions}
      isQuestionnaireFinished={true}
      numberOfAnsweredQuestions={questionnaireMock.questions.length}
      isChatDisabled={false}
      newMessagesCount={22}
      buttonLabel={"Fragebogen abschließen"}
    />
  ))
  .add("Start Overlay", () => (
    <ModuleStartOverlay
      title="Ertragspotenziale und Risiken von Venture-Capital-Finanzierungen"
      buttonTitle="Start Questionnaire"
      description="onec vitae sapien ut libero venenatis faucibus. Nullam quis ante. onec vitae sapien ut libero venenatis faucibus. Nullam quis ante. onec vitae sapien ut libero venenatis faucibus. Nullam quis ante. onec vitae sapien ut libero venenatis faucibus. Nullam quis ante."
      onStartModule={action("onStartQuestionnaire")}
    />
  ))
