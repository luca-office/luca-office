import {MockedProvider} from "@apollo/client/testing"
import {action} from "@storybook/addon-actions"
import {text} from "@storybook/addon-knobs"
import {storiesOf} from "@storybook/react"
import {partial} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {interventionsMock} from "shared/__mocks__"
import {filesMock} from "shared/graphql/__mocks__"
import {directoriesForScenarioQuery} from "shared/graphql/queries"
import {
  Calculator,
  EmailClientContainer,
  FilesAndDirectoriesContainer,
  Notes,
  useFilesAndDirectoriesRemoteState
} from "shared/office-tools"
import {useEmailClientRemoteState} from "shared/office-tools/email-client/hook/use-email-client-remote-state"
import {FilesAndDirectoriesState} from "shared/redux/state/ui"
import {Option} from "shared/utils"
import {scenarioIdMock} from "sharedTests/__mocks__"
import {fakeStore} from "sharedTests/redux/fake-store"
import {directoriesMock} from "../src/graphql/__mocks__/directories.mock"
import {filesForScenarioQuery} from "../src/graphql/queries"
import {
  useEmailClientState,
  useEmailClientStateActions,
  useEmailClientSurveyEvents
} from "../src/office-tools/email-client/hooks"
import {
  useFilesAndDirectoriesState,
  useFilesAndDirectoriesStateActions,
  useFilesAndDirectoriesSurveyEvents
} from "../src/office-tools/files-and-directories/hooks"
import {AppState, initialAppState} from "../src/redux/state/app-state"

const scenarioId = ""

storiesOf("E-Mail Client", module).add("Default", () => (
  <MockedProvider>
    <Provider store={fakeStore(initialAppState(null))}>
      <EmailClientContainer
        scenarioId={scenarioId}
        interventions={interventionsMock}
        onClose={action("onClose")}
        onMinimize={action("on_minimize")}
        onCompletionMailSent={action("onCompletionMailSent")}
        scenarioCompletionEmailAddress={"test@test.de"}
        useState={useEmailClientState}
        useRemoteState={useEmailClientRemoteState<AppState>(state => state)}
        useStateActions={useEmailClientStateActions}
        useSurveyEvents={partial(useEmailClientSurveyEvents, scenarioIdMock)}
        sampleCompanyId={Option.none()}
        sampleCompanyTitle={Option.none()}
        useFilesAndDirectoriesState={useFilesAndDirectoriesState}
        useFilesAndDirectoriesStateActions={useFilesAndDirectoriesStateActions}
        useFilesAndDirectoriesRemoteState={useFilesAndDirectoriesRemoteState}
        useFilesAndDirectoriesSurveyEvents={partial(useFilesAndDirectoriesSurveyEvents, scenarioIdMock)}
      />
    </Provider>
  </MockedProvider>
))

storiesOf("Calculator", module)
  .add("Default", () => <Calculator onClose={action("onClose")} onKeyPress={action("onKeyPress")} isFocussed={true} />)
  .add("with minimize button", () => (
    <Calculator
      onClose={action("onClose")}
      onMinimize={action("on_minimize")}
      onKeyPress={action("onKeyPress")}
      isFocussed={true}
    />
  ))

storiesOf("Notes", module).add("Default", () => (
  <Notes
    onClose={action("onClose")}
    onMinimize={action("onMinimize")}
    updateNotes={action("onChange")}
    text={text("Text", "Default Value")}
    onOutsideClick={action("onOutsideClick")}
  />
))

const directoriesForScenarioQueryMock = {
  request: {
    query: directoriesForScenarioQuery,
    variables: {scenarioId}
  },
  result: {
    data: {
      directories: directoriesMock
    }
  }
}

const filesForScenarioQueryMock = {
  request: {
    query: filesForScenarioQuery,
    variables: {scenarioId}
  },
  result: {
    data: {
      filesForScenario: filesMock
    }
  }
}

const createStore = (params: Partial<FilesAndDirectoriesState>) => ({
  ...initialAppState(null),
  ui: {
    ...initialAppState(null).ui,
    filesAndDirectories: {
      ...initialAppState(null).ui.filesAndDirectories,
      ...params
    }
  }
})

storiesOf("Files and Directories", module)
  .add("Default", () => (
    <MockedProvider mocks={[directoriesForScenarioQueryMock, filesForScenarioQueryMock]}>
      <Provider store={fakeStore(initialAppState(null))}>
        <FilesAndDirectoriesContainer
          sampleCompanyTitle={Option.none()}
          sampleCompanyId={Option.none()}
          onClose={action("onClose")}
          onMinimize={action("onMinimize")}
          scenarioId={scenarioId}
          useState={useFilesAndDirectoriesState}
          useRemoteState={useFilesAndDirectoriesRemoteState}
          useStateActions={useFilesAndDirectoriesStateActions}
          useSurveyEvents={partial(useFilesAndDirectoriesSurveyEvents, scenarioIdMock)}
        />
      </Provider>
    </MockedProvider>
  ))
  .add("Selected Directory", () => (
    <MockedProvider mocks={[directoriesForScenarioQueryMock, filesForScenarioQueryMock]}>
      <Provider
        store={fakeStore(createStore({selectedDirectoryId: Option.of("6b183a2e-0af6-4006-95b5-e2daca778616")}))}>
        <FilesAndDirectoriesContainer
          sampleCompanyId={Option.none()}
          sampleCompanyTitle={Option.none()}
          onClose={action("onClose")}
          onMinimize={action("onMinimize")}
          scenarioId={scenarioId}
          useState={useFilesAndDirectoriesState}
          useRemoteState={useFilesAndDirectoriesRemoteState}
          useStateActions={useFilesAndDirectoriesStateActions}
          useSurveyEvents={partial(useFilesAndDirectoriesSurveyEvents, scenarioIdMock)}
        />
      </Provider>
    </MockedProvider>
  ))
  .add("Selected File (Image)", () => (
    <MockedProvider mocks={[directoriesForScenarioQueryMock, filesForScenarioQueryMock]}>
      <Provider store={fakeStore(createStore({selectedFileId: Option.of("92bbaaa0-c6a8-4d04-a545-76f669fd0d9e")}))}>
        <FilesAndDirectoriesContainer
          sampleCompanyId={Option.none()}
          sampleCompanyTitle={Option.none()}
          onClose={action("onClose")}
          onMinimize={action("onMinimize")}
          scenarioId={scenarioId}
          useState={useFilesAndDirectoriesState}
          useRemoteState={useFilesAndDirectoriesRemoteState}
          useStateActions={useFilesAndDirectoriesStateActions}
          useSurveyEvents={partial(useFilesAndDirectoriesSurveyEvents, scenarioIdMock)}
        />
      </Provider>
    </MockedProvider>
  ))
  .add("Selected File (PDF)", () => (
    <MockedProvider mocks={[directoriesForScenarioQueryMock, filesForScenarioQueryMock]}>
      <Provider store={fakeStore(createStore({selectedFileId: Option.of("9a03812f-29fd-487b-b008-6e4e3b24a73c")}))}>
        <FilesAndDirectoriesContainer
          onClose={action("onClose")}
          sampleCompanyTitle={Option.none()}
          sampleCompanyId={Option.none()}
          onMinimize={action("onMinimize")}
          scenarioId={scenarioId}
          useState={useFilesAndDirectoriesState}
          useRemoteState={useFilesAndDirectoriesRemoteState}
          useStateActions={useFilesAndDirectoriesStateActions}
          useSurveyEvents={partial(useFilesAndDirectoriesSurveyEvents, scenarioIdMock)}
        />
      </Provider>
    </MockedProvider>
  ))
