import {shallow} from "enzyme"
import * as React from "react"
import {act as actRenderer, create} from "react-test-renderer"
import {referenceBookChaptersMock} from "shared/__mocks__"
import {CardFooter, Content, ContentBottomActionbar, DetailViewHeader} from "shared/components"
import {scenariosMock} from "shared/graphql/__mocks__"
import {ReferenceBookChapter} from "shared/models"
import wait from "waait"
import {CardOverview} from "../../../../../components"
import {ReferenceBookCard} from "../../.."
import * as useReferenceBooksSelectionHook from "../hooks/use-reference-books-selection"
import {UseReferenceBooksSelectionHook} from "../hooks/use-reference-books-selection"
import {ReferenceBookChaptersSelection, ReferenceBooksSelectionProps} from "../reference-book-chapters-selection"

const defaultProps: ReferenceBooksSelectionProps = {
  scenarioId: scenariosMock[0].id
}

const hookValuesDefault: UseReferenceBooksSelectionHook = {
  createReferenceBookScenario: jest.fn(),
  actionLoading: false,
  createReferenceBookScenarios: jest.fn(),
  deselectReferenceBook: jest.fn(),
  loading: false,
  navigateToCreation: jest.fn(),
  openReferenceBook: jest.fn(),
  openReferenceBookOverview: jest.fn(),
  referenceBookChapters: referenceBookChaptersMock as ReferenceBookChapter[],
  scenarioReferenceBookIds: referenceBookChaptersMock.map(({id}) => id),
  selectedReferenceBookIds: ["8778c1da-af86-4876-9554-79d6019e7a89"],
  selectReferenceBook: jest.fn()
}

const stateSpy = jest.spyOn(useReferenceBooksSelectionHook, "useReferenceBooksSelection")

const getComponent = (props?: Partial<ReferenceBooksSelectionProps>) => (
  <ReferenceBookChaptersSelection {...{...defaultProps, ...props}} />
)

describe("reference-books-for-scenario", () => {
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

    const content = tree.find(Content)
    expect(content).toHaveLength(1)

    const detailViewHeader = content.dive().find(DetailViewHeader)
    expect(detailViewHeader).toHaveLength(1)

    const contentBottomActionbar = content.dive().find(ContentBottomActionbar)
    expect(contentBottomActionbar).toHaveLength(1)

    const cardFooter = contentBottomActionbar.dive().find(CardFooter)
    expect(cardFooter).toHaveLength(1)

    const cardOverview = content.dive().find(CardOverview)
    expect(cardOverview).toHaveLength(1)

    const referenceBookCard = cardOverview.dive().find(ReferenceBookCard)
    expect(referenceBookCard).toHaveLength(1)
  })
})
