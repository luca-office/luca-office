// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardContent, CardHeader, LabelledCard, ReadonlyActionField, Table} from "shared/components"
import {ProjectProgressType} from "shared/enums"
import {projectModulesMock, projectsMock, surveyInvitationsProgressMock, surveysMock} from "shared/graphql/__mocks__"
import {computeSurveyProgress, Option} from "shared/utils"
import {surveyResultsOverviewMock} from "../../../../graphql/__mocks__"
import * as hook from "../hooks/use-participant-overview"
import {UseParticipantOverviewHook} from "../hooks/use-participant-overview"
import {ParticipantOverview} from "../participant-overview"

const hookValuesDefault: UseParticipantOverviewHook = {
  dataLoading: false,
  navigateToModule: jest.fn,
  surveyProgress: Option.of(computeSurveyProgress(projectModulesMock, Option.of(surveyInvitationsProgressMock))[0]),
  participantIndex: 1,
  projectModuleScores: projectModulesMock.map(_ => {
    return {score: 1, maxScore: 50, questionnaireId: "abc", scenarioId: null}
  }),
  surveyResultsOverview: Option.of(surveyResultsOverviewMock),
  completedParticipantsCount: {
    numCompletedParticipants: 3,
    totalParticipants: 6
  },
  projectProgress: ProjectProgressType.SurveyInProgress
}

const getComponent = () => (
  <MockedProvider>
    <ParticipantOverview
      projectId={projectsMock[0].id}
      surveyId={surveysMock[0].id}
      surveyInvitationId={surveyInvitationsProgressMock[0].id}
      navigateToQuestionnaireDetail={jest.fn()}
      navigateToScenarioDetail={jest.fn()}
    />
  </MockedProvider>
)

const stateSpy = jest.spyOn(hook, "useParticipantOverview")

describe("attendee-dashboard", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (with attendee)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    expect(component.find(LabelledCard)).toHaveLength(2)
    expect(component.find(Card)).toHaveLength(3)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(Table)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(4)
  })
})
