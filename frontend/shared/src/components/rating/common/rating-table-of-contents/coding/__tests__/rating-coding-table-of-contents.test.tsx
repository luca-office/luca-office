import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {
  codingDimensionsMock,
  scenarioManualCodingItemRatingsMock,
  surveyIdMock,
  surveyInvitationIdMock
} from "../../../../../../graphql/__mocks__"
import {Option} from "../../../../../../utils"
import {Icon} from "../../../../../icon/icon"
import {ScenarioCodingModelTableOfContents} from "../../../../../scenario-coding-model-table-of-contents/scenario-coding-model-table-of-contents"
import {Text} from "../../../../../typography/typography"
import * as useRatingCodingTableOfContentsHook from "../hooks/use-rating-coding-table-of-contents"
import {UseRatingCodingTableOfContentsHook} from "../hooks/use-rating-coding-table-of-contents"
import {RatingCodingTableOfContents, RatingCodingTableOfContentsProps} from "../rating-coding-table-of-contents"

const defaultProps: RatingCodingTableOfContentsProps = {
  surveyId: surveyIdMock,
  codingDimensions: codingDimensionsMock,
  surveyInvitationId: surveyInvitationIdMock,
  selectEntityId: jest.fn(),
  selectedEntityId: Option.none(),
  isReadonly: false,
  ratingId: Option.of(scenarioManualCodingItemRatingsMock[0].ratingId),
  isNotRatable: false
}

const hookValuesDefault: UseRatingCodingTableOfContentsHook = {
  loading: false,
  codingNodes: [],
  scenarioPercentageRated: 0,
  getPercentageRatedForCodingDimensionNode: jest.fn(() => 80),
  allRated: false,
  score: 35,
  maxScore: 60,
  averageScore: 20,
  getPercentageRatedForCodingItemNode: jest.fn(() => 20),
  getScoresForCodingDimension: jest.fn(() => ({maxScore: 6, averageScore: 3})),
  getScoresForCodingItem: jest.fn(() => ({maxScore: 6, averageScore: 3}))
}

const stateSpy = jest.spyOn(useRatingCodingTableOfContentsHook, "useRatingCodingTableOfContents")
const getComponent = (props?: Partial<RatingCodingTableOfContentsProps>) => (
  <RatingCodingTableOfContents {...{...defaultProps, ...props}} />
)

describe("rating-coding-table-of-contents", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure without data", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent({codingDimensions: []}))

    expect(tree.find(ScenarioCodingModelTableOfContents)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(0)
    expect(tree.find(Icon)).toHaveLength(0)
  })
})
