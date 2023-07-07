import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../../enums"
import {projectModulesMock, projectsMock, surveysMock} from "../../../../graphql/__mocks__"
import {ScoringMetadata} from "../scoring-metadata"

const survey = surveysMock[0]
const project = projectsMock[0]
const projectModule = projectModulesMock[0]

const props = {
  dataLoading: false,
  projectName: project.name,
  surveyName: survey.title,
  projectModuleName: projectModule.scenario?.name ?? "",
  projectModuleIcon: IconName.Monitor
}

describe("scoring-metadata", () => {
  it("renders correctly", () => {
    const component = <ScoringMetadata {...props} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
