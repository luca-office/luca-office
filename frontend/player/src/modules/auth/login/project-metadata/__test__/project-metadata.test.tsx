// importing from direct file because of issues of babel loader and spyOn
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Columns, Heading, Paper} from "shared/components"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {surveyInvitationMock} from "../../../../../graphql/__mocks__"
import {MetadataColumn} from "../../metadata-column/metadata-column"
import {ProjectMetadata} from "../project-metadata"

describe("Project Metadata", () => {
  const {startsAt, endsAt, project} = surveyInvitationMock.survey
  it("renders correctly", async () => {
    const component = create(
      <ProjectMetadata
        t={fakeTranslate}
        metadata={{startsAt, endsAt, projectName: project.name, maxDurationInSeconds: project.maxDurationInSeconds}}
      />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = shallow(
      <ProjectMetadata
        t={fakeTranslate}
        metadata={{startsAt, endsAt, projectName: project.name, maxDurationInSeconds: project.maxDurationInSeconds}}
      />
    )
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Columns)).toHaveLength(1)
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(MetadataColumn)).toHaveLength(3)
  })
})
