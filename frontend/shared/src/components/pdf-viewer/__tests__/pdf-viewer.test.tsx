import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {Option} from "../../../utils"
import {Button} from "../.."
import {ToolsHeader, ViewerToolsSubHeader} from "../../viewer-tools"
import {pdfBinariesMock} from "../__mocks__/binaries.mock"
import * as usePdfViewerHook from "../hooks/use-pdf-viewer"
import {UsePdfViewerHook} from "../hooks/use-pdf-viewer"
import {PdfView} from "../pdf-view"
import {PdfViewer, PdfViewerProps} from "../pdf-viewer"

const defaultProps: PdfViewerProps = {
  binaries: pdfBinariesMock,
  onClose: jest.fn(),
  onMinimize: jest.fn(),
  closeBinary: jest.fn,
  selectBinaryId: jest.fn,
  selectedBinaryId: Option.of(pdfBinariesMock[pdfBinariesMock.length - 1].id)
}

const hookValuesDefault: UsePdfViewerHook = {
  areControlsDisabled: false,
  onLeftClick: jest.fn(),
  onRightClick: jest.fn(),
  selectPdf: jest.fn,
  selectedPdf: Option.of(pdfBinariesMock[0]),
  binaries: pdfBinariesMock,
  closeBinary: jest.fn
}

const stateSpy = jest.spyOn(usePdfViewerHook, "usePdfViewer")

const getComponent = (props?: Partial<PdfViewerProps>) => <PdfViewer {...{...defaultProps, ...props}} />

describe("pdf-viewer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent())

    await act(() => wait(0))

    expect(tree.find(ToolsHeader)).toHaveLength(1)
    expect(tree.find(ViewerToolsSubHeader)).toHaveLength(1)
    expect(tree.find(PdfView)).toHaveLength(1)
  })
  it("calls onClose", async () => {
    const mockOnClose = jest.fn()
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent({onClose: mockOnClose}))

    await act(() => wait(0))

    const header = tree.find(ToolsHeader)
    const buttons = header.dive().find(Button)
    expect(buttons).toHaveLength(2)

    buttons.at(1).simulate("click")
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
  it("calls onMinimize", async () => {
    const mockOnMinimize = jest.fn()
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent({onMinimize: mockOnMinimize}))

    await act(() => wait(0))

    const header = tree.find(ToolsHeader)
    const buttons = header.dive().find(Button)
    expect(buttons).toHaveLength(2)

    buttons.at(0).simulate("click")
    expect(mockOnMinimize).toHaveBeenCalledTimes(1)
  })
})
