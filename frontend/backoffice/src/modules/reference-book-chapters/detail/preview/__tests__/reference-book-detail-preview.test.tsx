import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {act, create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {ReferenceBookArticle, ReferenceBookChapter, TocChapter} from "shared/models"
import {ReferenceBookTool} from "shared/office-tools/reference-book"
import {Option} from "shared/utils"
import wait from "waait"
import {UseReferenceBookDetailPreviewHook} from "../hooks/use-reference-book-detail-preview"
import * as hook from "../hooks/use-reference-book-detail-preview"
import {ReferenceBookDetailPreview, ReferenceBookDetailPreviewProps} from "../reference-book-detail-preview"

const book = referenceBookChapterMock()

const defaultProps: ReferenceBookDetailPreviewProps = {
  referenceBookChapterId: book.id,
  onClose: jest.fn
}

const defaultHookValues: UseReferenceBookDetailPreviewHook = {
  selectedArticle: Option.of((book.articles[0] as unknown) as ReferenceBookArticle),
  chapterTitle: Option.of(book.title),
  dataLoading: false,
  onSearch: jest.fn,
  referenceBookChapters: Option.of(([book] as unknown) as TocChapter[]),
  selectedChapter: Option.of((book as unknown) as ReferenceBookChapter),
  selectedElementId: Option.none(),
  selectElementId: jest.fn
}

const getComponent = (props?: ReferenceBookDetailPreviewProps) => (
  <MockedProvider>
    <ReferenceBookDetailPreview {...defaultProps} {...props} />
  </MockedProvider>
)
const stateSpy = jest.spyOn(hook, "useReferenceBookDetailPreview")

describe("reference-book-detail", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(defaultHookValues)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with selected article", async () => {
    stateSpy.mockReturnValue({
      ...defaultHookValues,
      selectedElementId: Option.of(referenceBookChapterMock().articles[0].id)
    })
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(defaultHookValues)
    const tree = mount(getComponent())

    await act(() => wait(0))

    expect(tree.find(ReferenceBookTool)).toHaveLength(1)
  })
})
