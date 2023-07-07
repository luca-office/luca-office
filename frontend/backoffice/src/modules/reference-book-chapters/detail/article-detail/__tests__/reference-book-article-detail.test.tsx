import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {Card, CardHeader, Heading, Icon, TableContainer} from "shared/components"
import {ReferenceBookArticle} from "shared/models"
import {Option} from "shared/utils"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {CreationBar, InlineEditableHeaderContainer, OverlayEditField} from "../../../../../components"
import {ReferenceBookArticleDetail, ReferenceBookArticleDetailProps} from "../../.."
import {getBookArticleTableProps} from "../../../config"
import * as useReferenceBookArticleDetail from "../hooks/use-reference-book-article-detail"
import {UseReferenceBookDetailHook} from "../hooks/use-reference-book-article-detail"

const referenceBookChapter = referenceBookChapterMock()
const defaultProps: ReferenceBookArticleDetailProps = {
  referenceBookChapter: referenceBookChapter,
  selectedEntityId: Option.none(),
  selectEntityId: jest.fn()
}

const articleTableProps = getBookArticleTableProps({
  articles: referenceBookChapter.articles,
  isArticleActionbarVisible: false,
  isPublished: false,
  moveArticleDownwards: jest.fn(),
  moveArticleUpwards: jest.fn(),
  navigateToArticleCreation: jest.fn(),
  referenceBookChapterId: referenceBookChapter.id,
  repositionArticleLoading: false,
  selectEntityId: jest.fn(),
  setIsArticleActionbarVisible: jest.fn(),
  t: fakeTranslate
})

const hookValuesDefault: UseReferenceBookDetailHook = {
  articles: [],
  articleTableProps: articleTableProps,
  contentTypeModalVisible: false,
  createReferenceBookContent: jest.fn(),
  dataLoading: false,
  hideSortModal: jest.fn(),
  isPublished: false,
  updateDescriptionModalVisible: false,
  navigateToChapterOverview: jest.fn(),
  repositionArticleContent: jest.fn(),
  repositionReferenceBookContentLoading: false,
  selectContentType: jest.fn(),
  selectedArticle: Option.none(),
  selectedContentType: Option.none(),
  selectedEntityIsAnArticle: false,
  showSortModal: jest.fn(),
  sortableArticleContents: Option.none(),
  sortModalVisible: false,
  title: "Test",
  toggleContentTypeModal: jest.fn(),
  toggleUpdateDescriptionModal: jest.fn(),
  updateArticleTitle: jest.fn(),
  updateReferenceBook: jest.fn(),
  updateTextContent: jest.fn()
}

const stateSpy = jest.spyOn(useReferenceBookArticleDetail, "useReferenceBookArticleDetail")

const getComponent = (props?: Partial<ReferenceBookArticleDetailProps>) => (
  <MockedProvider>
    <ReferenceBookArticleDetail {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("reference-books-for-scenario", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should have the correct structure (no selectedArticle)", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent())

    const root = tree.find(ReferenceBookArticleDetail)
    expect(root).toHaveLength(1)

    expect(root.dive().find(Card)).toHaveLength(1)
    expect(root.dive().find(CardHeader)).toHaveLength(1)
    expect(root.dive().find(Icon)).toHaveLength(1)
    expect(root.dive().find(Heading)).toHaveLength(2)
    expect(root.dive().find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(root.dive().find(OverlayEditField)).toHaveLength(1)
    expect(root.dive().find(TableContainer)).toHaveLength(1)
  })

  it("should have the correct structure (with selectedArticle)", () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      selectedArticle: Option.of(referenceBookChapter.articles[0] as ReferenceBookArticle)
    })
    const tree = shallow(getComponent({selectedEntityId: Option.of("fdspof-sdfpgofjds-sdf")}))

    const root = tree.find(ReferenceBookArticleDetail)
    expect(root).toHaveLength(1)

    expect(root.dive().find(Card)).toHaveLength(1)
    expect(root.dive().find(CardHeader)).toHaveLength(1)
    expect(root.dive().find(Icon)).toHaveLength(1)
    expect(root.dive().find(Heading)).toHaveLength(1)
    expect(root.dive().find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(root.dive().find(CreationBar)).toHaveLength(1)
  })
})
