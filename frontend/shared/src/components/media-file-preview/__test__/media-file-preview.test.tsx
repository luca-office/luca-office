// importing from direct file because of issues of babel loader and spyOn
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {MediaFile} from "../../../models"
import {MediaFilePreview} from "../.."
import {ImageView} from "../../binary-viewer"
import {PdfView} from "../../pdf-viewer/pdf-view"
import {fileMockPDF, fileMockPNG} from "../__mocks__/file.mock"

const mediaFile = fileMockPNG as MediaFile

const fileDetail = <MediaFilePreview showInlinePreview onPreviewButtonClick={jest.fn()} file={mediaFile} />

jest.mock("../../spreadsheet/dhx-spreadsheet/dhx-spreadsheet", () => ({
  DhxSpreadsheet: () => <div>mockedSheet</div>
}))

describe("Media File Preview", () => {
  it("renders correctly", async () => {
    const component = create(fileDetail)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure - image view", async () => {
    const component = mount(fileDetail)
    expect(component.find(ImageView)).toHaveLength(1)
    expect(component.find(PdfView)).toHaveLength(0)
  })

  it("has correct structure - pdf view", async () => {
    const component = mount(
      <MediaFilePreview showInlinePreview onPreviewButtonClick={jest.fn()} file={fileMockPDF as MediaFile} />
    )
    expect(component.find(ImageView)).toHaveLength(0)
    expect(component.find(PdfView)).toHaveLength(1)
  })
})
