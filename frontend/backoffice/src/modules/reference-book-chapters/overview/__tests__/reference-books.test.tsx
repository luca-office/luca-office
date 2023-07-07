import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import wait from "waait"
import {CardOverview} from "../../../../components"
import * as useReferenceBooksHook from "../hooks/use-reference-book-chapters"
import {UseReferenceBookChaptersHook} from "../hooks/use-reference-book-chapters"
import {ReferenceBookChapters} from "../reference-book-chapters"

const referenceBookChapters = [referenceBookChapterMock()]

const hookValuesDefault: UseReferenceBookChaptersHook = {
  referenceBookChapters,
  referenceBooksLoading: false,
  navigateToCreation: jest.fn(),
  navigateToDetail: jest.fn()
}

const stateSpy = jest.spyOn(useReferenceBooksHook, "useReferenceBookChapters")

describe("Reference-Book-Overview", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<ReferenceBookChapters />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<ReferenceBookChapters />)

    await act(() => wait(0))

    const cardOverview = tree.find(CardOverview)
    expect(cardOverview).toHaveLength(1)

    const overviewCard = cardOverview.dive().find(OverviewCard)
    expect(overviewCard).toHaveLength(1)

    const cardFooter = overviewCard.dive().find(CardFooter)
    expect(cardFooter).toHaveLength(1)

    const cardFooterItem = cardFooter.dive().find(CardFooterItem)
    expect(cardFooterItem).toHaveLength(3)
  })
})
