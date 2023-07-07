import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon} from "shared/components"
import {IconName, ViewerToolsType} from "shared/enums"
import wait from "waait"
import * as useSettingsFooterHook from "../hooks/use-settings-footer"
import {UseSettingsFooterHook} from "../hooks/use-settings-footer"
import {SettingsFooter, SettingsFooterProps} from "../settings-footer"

const defaultProps: SettingsFooterProps = {
  isPreviewDisabled: false,
  settingsCount: {
    directories: 5,
    emails: 12,
    files: 3,
    scenarioReferenceBooks: 5,
    interventions: 0,
    filesSampleCompany: 10,
    events: 12,
    codingDimensions: 3,
    erpRowCount: 1
  }
}

const hookValuesDefault: UseSettingsFooterHook = {
  setViewerTools: jest.fn(),
  viewerTools: [
    {type: ViewerToolsType.PDF, icon: IconName.PdfViewer, isActive: true},
    {type: ViewerToolsType.Image, icon: IconName.ImageViewer, isActive: true},
    {type: ViewerToolsType.Video, icon: IconName.Film, isActive: true},
    {type: ViewerToolsType.TableEditor, icon: IconName.TableEditor, isActive: true},
    {type: ViewerToolsType.Text, icon: IconName.TextEditor, isActive: true},
    {
      type: ViewerToolsType.FilesAndDirectories,
      icon: IconName.FolderStack,
      isActive: true
    },
    {type: ViewerToolsType.Erp, icon: IconName.Database, isActive: false},
    {type: ViewerToolsType.Email, icon: IconName.Email, isActive: false},
    {type: ViewerToolsType.ReferenceBook, icon: IconName.Book, isActive: true},
    {type: ViewerToolsType.Notes, icon: IconName.EditPencil, isActive: true},
    {type: ViewerToolsType.Calculator, icon: IconName.Calculator, isActive: true}
  ]
}

const stateSpy = jest.spyOn(useSettingsFooterHook, "useSettingsFooter")

describe("settings-footer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<SettingsFooter {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<SettingsFooter {...defaultProps} />)

    await act(() => wait(0))

    expect(tree.find(Icon)).toHaveLength(11)
  })
})
