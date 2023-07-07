import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {act, create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {BookTableOfContents, Content, DetailViewHeader} from "shared/components"
import {tocChaptersMock} from "shared/components/book-table-of-contents/__mocks__/toc-chapters.mock"
import {Option} from "shared/utils"
import wait from "waait"
import {ReferenceBookArticleDetail} from "../article-detail/reference-book-article-detail"
import * as hook from "../hooks/use-reference-book-detail"
import {UseReferenceBookDetailHook} from "../hooks/use-reference-book-detail"
import {ReferenceBookDetail, ReferenceBookDetailProps} from "../reference-book-detail"

const book = referenceBookChapterMock()

const defaultProps: ReferenceBookDetailProps = {
  referenceBookChapterId: book.id
}

const defaultHookValues: UseReferenceBookDetailHook = {
  bookChapters: [tocChaptersMock[0]],
  dataLoading: false,
  duplicateReferenceBook: jest.fn(),
  navigateToArticleCreation: jest.fn(),
  navigateToOverview: jest.fn,
  publishReferenceBook: jest.fn(),
  referenceBookChapter: Option.of(book),
  selectEntityId: jest.fn(),
  selectedEntityId: Option.none(),
  showPreview: jest.fn(),
  hidePreview: jest.fn(),
  isPreviewVisible: false,
  userMayArchive: false
}

const getComponent = (props?: ReferenceBookDetailProps) => (
  <MockedProvider>
    <ReferenceBookDetail {...defaultProps} {...props} />
  </MockedProvider>
)
const stateSpy = jest.spyOn(hook, "useReferenceBookDetail")

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
      selectedEntityId: Option.of(referenceBookChapterMock().articles[0].id)
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

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(Content)).toHaveLength(1)
    expect(tree.find(BookTableOfContents)).toHaveLength(1)
    expect(tree.find(ReferenceBookArticleDetail)).toHaveLength(1)
  })
})
