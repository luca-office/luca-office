import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text} from "shared/components"
import {Option} from "shared/utils"
import {
  participantProjectProgressMock,
  participantProjectProgressStartedMock
} from "sharedTests/__mocks__/participant-project-progress.mock"
import {ProgressStepsColumn, ProgressTableColumnProps} from "../progress-steps-column"

const getComponent = (props?: Partial<ProgressTableColumnProps>) => (
  <ProgressStepsColumn
    moduleCount={participantProjectProgressMock.moduleProgress.length}
    progressElement={participantProjectProgressMock}
    lastProjectModuleOfSurvey={Option.none()}
    {...props}
  />
)

describe("progress-steps-column", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (incomplete)", () => {
    const component = getComponent({progressElement: participantProjectProgressStartedMock})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Text).html()).toContain("4 / 4")
    expect(component.find(".progress-item")).toHaveLength(participantProjectProgressMock.moduleProgress.length)
  })
  it("has correct structure (incomplete)", () => {
    const component = shallow(
      getComponent({
        progressElement: participantProjectProgressStartedMock
      })
    )

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(0)
    expect(component.find(Text).html()).toContain("0 / 4")
    expect(component.find(".progress-item")).toHaveLength(participantProjectProgressStartedMock.moduleProgress.length)
  })
})
