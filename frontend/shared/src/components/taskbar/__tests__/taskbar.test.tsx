import * as React from "react"
import {create} from "react-test-renderer"
import {BinaryViewerTool, OfficeTool, OfficeWindowType} from "../../../enums"
import {Option} from "../../../utils"
import {binaryViewerWindows, officeToolWindows} from "../../desktop/config"
import {Taskbar, TaskbarProps} from "../taskbar"

const allWindows = officeToolWindows.concat(binaryViewerWindows).map(window => window.tool)

const defaultProps: TaskbarProps = {
  availableWindows: allWindows,
  focussedWindow: Option.none(),
  onOpenWindow: jest.fn(),
  openedWindows: [],
  unreadEmailsCount: 0,
  newEmailDownloadsCount: 0,
  unreadMessageCount: 0
}

const getComponent = (props?: Partial<TaskbarProps>) => <Taskbar {...{...defaultProps, ...props}} />

describe("taskbar", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly (hidden + disabled)", () => {
    const component = create(getComponent({isHidden: true, isDisabled: true}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with opened tools and focussed tool", () => {
    const component = create(
      getComponent({
        openedWindows: [OfficeTool.Calculator, OfficeTool.EmailClient, BinaryViewerTool.PDFViewer],
        focussedWindow: Option.of<OfficeWindowType>(OfficeTool.Calculator)
      })
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
