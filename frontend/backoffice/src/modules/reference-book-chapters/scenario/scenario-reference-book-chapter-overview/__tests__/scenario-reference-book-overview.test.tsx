import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {act as actRenderer, create} from "react-test-renderer"
import {BookTableOfContents, Content, TableOfContentsEntry} from "shared/components"
import {tocChaptersMock} from "shared/components/book-table-of-contents/__mocks__/toc-chapters.mock"
import {scenariosMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import wait from "waait"
import {SubHeaderDetailContainer} from "../../../../../components"
import * as useScenarioReferenceBookOverviewHook from "../hooks/use-scenario-reference-book-overview"
import {UseScenarioReferenceBookOverviewHook} from "../hooks/use-scenario-reference-book-overview"
import {ScenarioReferenceBookOverview, ScenarioReferenceBookOverviewProps} from "../scenario-reference-book-overview"

const defaultProps: ScenarioReferenceBookOverviewProps = {
  scenarioId: scenariosMock[0].id
}

const hookValuesDefault: UseScenarioReferenceBookOverviewHook = {
  loading: false,
  showPreview: jest.fn(),
  hidePreview: jest.fn(),
  isPreviewVisible: false,
  addChapter: jest.fn(),
  removeChapter: jest.fn(() => ({
    deleteEntity: jest.fn(() => Promise.resolve()),
    deleteEntityLoading: false
  })),
  isBundled: false,
  isScenarioReadOnly: false,
  scenarioChapters: Option.of(tocChaptersMock),
  scenarioReferenceBooks: Option.none(),
  selectEntityId: jest.fn(),
  selectedEntityId: Option.none(),
  selectedArticle: Option.none(),
  selectedReferenceBook: Option.none(),
  handleBundleChapters: jest.fn(),
  sortChaptersOverlayVisible: false,
  showSortOverlay: jest.fn(),
  hideSortOverlay: jest.fn(),
  sortableChapters: tocChaptersMock,
  repositionChapterLoading: false,
  repositionChapter: jest.fn(),
  hidePdf: jest.fn(),
  selectedPdf: Option.none(),
  openPdf: jest.fn()
}

const stateSpy = jest.spyOn(useScenarioReferenceBookOverviewHook, "useScenarioReferenceBookOverview")

const getComponent = (props?: Partial<ScenarioReferenceBookOverviewProps>) => (
  <ScenarioReferenceBookOverview {...{...defaultProps, ...props}} />
)

describe("Scenario-Reference-Book-Overview", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    await actRenderer(() => wait(0))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent())

    await act(() => wait(0))

    const content = tree.find(Content)
    expect(content).toHaveLength(1)

    const subHeaderDetailContainer = content.dive().find(SubHeaderDetailContainer)
    expect(subHeaderDetailContainer).toHaveLength(1)

    const bookTableOfContents = content.dive().find(BookTableOfContents)
    expect(bookTableOfContents).toHaveLength(1)

    const bookChapterEntries = bookTableOfContents.dive().find(TableOfContentsEntry)
    expect(bookChapterEntries).toHaveLength(3)
  })
})
