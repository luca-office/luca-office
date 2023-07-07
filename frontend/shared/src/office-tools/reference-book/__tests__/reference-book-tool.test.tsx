// importing from direct file because of issues of babel loader and spyOn
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {BookTableOfContents, OfficeWindow, ReferenceBookChapter} from "../../../components"
import {tocChaptersMock} from "../../../components/book-table-of-contents/__mocks__/toc-chapters.mock"
import {Option} from "../../../utils"
import {ReferenceBookTool, ReferenceBookToolProps} from "../reference-book-tool"

const defaultProps: ReferenceBookToolProps = {
  chapterTitle: Option.none(),
  referenceBookChapters: Option.of([tocChaptersMock[0]]),
  dataLoading: false,
  selectedElementId: Option.none(),
  selectElementId: jest.fn(),
  hideChapters: false,
  selectedArticle: Option.none(),
  selectedChapter: Option.none(),
  onSearch: jest.fn(),
  openImage: jest.fn(),
  openVideo: jest.fn(),
  onClose: jest.fn(),
  openPdf: jest.fn()
}

const getComponent = (props?: Partial<ReferenceBookToolProps>) => <ReferenceBookTool {...{...defaultProps, ...props}} />

describe("reference-book-tool", () => {
  it("renders correctly", async () => {
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (nothing selected)", async () => {
    const component = mount(getComponent())
    await act(() => wait(0))

    expect(component.find(OfficeWindow)).toHaveLength(1)
    expect(component.find(BookTableOfContents)).toHaveLength(1)
    expect(component.find(ReferenceBookChapter)).toHaveLength(1)
  })
  it("has correct structure (article selected)", async () => {
    const component = mount(getComponent())
    await act(() => wait(0))

    expect(component.find(OfficeWindow)).toHaveLength(1)
    expect(component.find(BookTableOfContents)).toHaveLength(1)
    expect(component.find(ReferenceBookChapter)).toHaveLength(1)
  })
})
