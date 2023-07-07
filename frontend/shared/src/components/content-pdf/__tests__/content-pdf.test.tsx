import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {referenceBookChapterMock} from "../../../__mocks__"
import {BinaryFile} from "../../../models"
import {Option} from "../../../utils"
import {Card} from "../../card"
import {ContentPdf} from "../content-pdf"

const pdfBinaryFile: BinaryFile = referenceBookChapterMock().articles[1].contents[3].pdfBinaryFile!
const openPdf = jest.fn()
const component = <ContentPdf pdfFile={Option.of(pdfBinaryFile)} openPdf={openPdf} title={"test"} />

describe("content-pdf", () => {
  it("renders correctly", () => {
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("handles click", () => {
    const contentPdf = shallow(component).find(Card)
    contentPdf.simulate("click")
    expect(openPdf).toBeCalled()
  })
})
