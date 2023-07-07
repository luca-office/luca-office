import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {
  participantProjectProgressMock,
  participantProjectProgressStartedMock
} from "sharedTests/__mocks__/participant-project-progress.mock"
import {ProgressElementColumn, ProgressTableColumnProps} from "../progress-element-column"

const getComponent = (props?: Partial<ProgressTableColumnProps>) => (
  <ProgressElementColumn
    moduleCount={participantProjectProgressMock.moduleProgress.length}
    progressElement={participantProjectProgressMock}
    {...props}
  />
)

describe("progress-element-column", () => {
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
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Icon).prop("name")).toEqual(IconName.Check)
    expect(component.find(Text).html()).toContain("dashboard__project_table_progress_done")
  })
  it("has correct structure (started)", () => {
    const component = shallow(
      getComponent({
        progressElement: participantProjectProgressStartedMock
      })
    )

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Icon).prop("name")).toEqual(IconName.Monitor)
    expect(component.find(Text).html()).toContain(participantProjectProgressStartedMock.moduleProgress[0].name)
  })
  it("has correct structure (not started)", () => {
    const component = shallow(
      getComponent({
        progressElement: {
          ...participantProjectProgressStartedMock,
          moduleProgress: [{...participantProjectProgressMock.moduleProgress[0], status: undefined}]
        },
        moduleCount: 1
      })
    )

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Icon).prop("name")).toEqual(IconName.Sandglass)
    expect(component.find(Text).html()).toContain("dashboard__project_table_progress_none")
  })
})
