import {action} from "@storybook/addon-actions"
import {number, select} from "@storybook/addon-knobs"
import {storiesOf} from "@storybook/react"
import React from "react"
import {ParticipantScenarioDetail} from "shared/components"
import {ScenarioState} from "shared/enums"

storiesOf("ParticipantProgress", module).add("Default", () => (
  <ParticipantScenarioDetail
    disableFinalScoreButton={false}
    moduleDescription={"Berechnung von Erlösen und Gesamtkosten einer Produktion eines Fahrradherstellers."}
    moduleName={"2. Produktionsmenge und BEP (Szenario)"}
    progressCountsConfig={{
      requiredDocumentsOpened: number("requiredDocumentsOpened", 20),
      requiredDocumentsTotal: number("requiredDocumentsTotal", 20),
      wordsInCompletionMailTotal: 245
    }}
    scenarioState={select(
      "surveyState",
      {
        InProgress: ScenarioState.InProgress,
        Completed: ScenarioState.Completed,
        FinalScore: ScenarioState.ScoringCompleted,
        Ended: ScenarioState.ScoringFinalized
      },
      ScenarioState.InProgress
    )}
    isChatEnabled={false}
    onOpenChat={action("onOpenChat")}
    onShowActivityAndToolUsage={action("onShowActivityAndToolUsage")}
    onShowDocumentsOverview={action("onShowDocumentsOverview")}
    onNavigateBack={action("onNavigateBack")}
    finalScore={number("finalScore", 68)}
    finalScoreAverage={number("finalScoreAverage", 62.4)}
    finalScoreMax={number("finalScoreMax", 78)}
    chatMessageCount={3}
    navigateBackLabel={"Übersicht (Sunstra Maneerattana)"}
    onSetFinalScore={action("onSetFinalScore")}
    isLoading={false}
    showScoringOverlay={action("showScoringOverlay")}
  />
))
