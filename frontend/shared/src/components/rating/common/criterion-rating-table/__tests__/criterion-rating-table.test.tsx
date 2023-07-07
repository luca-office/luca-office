import {shallow} from "enzyme"
import {pick} from "lodash-es"
import * as React from "react"
import {create} from "react-test-renderer"
import {fakeTranslateWithOptions} from "../../../../../../tests/utils/translate-mock"
import {IconName, RaterMode} from "../../../../../enums"
import {codingCriteriaMock, surveyIdMock} from "../../../../../graphql/__mocks__"
import {QuestionScoringType} from "../../../../../graphql/generated/globalTypes"
import {Option} from "../../../../../utils"
import {Button} from "../../../../button/button"
import {CardFooter} from "../../../../card"
import {Checkbox} from "../../../../checkbox/checkbox"
import {Icon} from "../../../../icon/icon"
import {Paper} from "../../../../paper/paper"
import {Table} from "../../../../table/table"
import {Tooltip} from "../../../../tooltip/tooltip"
import {Heading, Text} from "../../../../typography/typography"
import {getCriterionRatingTableColumns} from "../../../config"
import {RatingDetailActionElement} from "../../rating-detail-action-element/rating-detail-action-element"
import {CriterionRatingTable, CriterionRatingTableProps} from "../criterion-rating-table"
import * as useCriterionRatingTableHook from "../hooks/use-criterion-rating-table"
import {UseCriterionRatingTableHook} from "../hooks/use-criterion-rating-table"

const defaultProps: CriterionRatingTableProps = {
  criteria: codingCriteriaMock,
  scoringType: QuestionScoringType.Analytical,
  isSelected: jest.fn(),
  updateCriterionSelection: jest.fn(),
  noCriterionFulfilled: false,
  setNoCriterionFulfilled: jest.fn(),
  dataLoading: false,
  actionLoading: false,
  hasRatingChanged: false,
  applyRatingChanges: jest.fn(),
  readOnly: false,
  mode: RaterMode.FinalRater,
  surveyId: surveyIdMock
}

const stateHookValuesDefault: UseCriterionRatingTableHook = {
  dataLoading: false,
  isFinalRater: true,
  sortedEntities: codingCriteriaMock.map(mock => ({...mock, automatedData: Option.none()})),
  showNoCriterionFulfilledFooter: false,
  finishedRatersCount: 8,
  totalRatersCount: 12,
  noCriterionFulfilledCount: 0,
  participantsCount: 3,
  columns: getCriterionRatingTableColumns({
    t: fakeTranslateWithOptions,
    getRatingsCount: jest.fn(() => 4),
    showAdditionalRaterInfos: true,
    finishedRatersCount: 12,
    readOnly: false,
    showSelectionInput: true,
    showRaterCount: false,
    showDataForAllParticipants: false,
    participantsCount: 3,
    ...pick(defaultProps, ["scoringType", "updateCriterionSelection", "isSelected"])
  }),
  showAutomatedCodingItemRuleField: false,
  isComputerRater: false,
  showAdditionalRaterInfos: true
}

const stateSpy = jest.spyOn(useCriterionRatingTableHook, "useCriterionRatingTable")

const getComponent = (props?: Partial<CriterionRatingTableProps>) => (
  <CriterionRatingTable {...{...defaultProps, ...props}} />
)

describe("criterion-rating-table", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault as unknown as UseCriterionRatingTableHook)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (has scoringTypeIcon)", () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      columns: getCriterionRatingTableColumns({
        t: fakeTranslateWithOptions,
        getRatingsCount: jest.fn(() => 4),
        showAdditionalRaterInfos: true,
        finishedRatersCount: 12,
        readOnly: false,
        scoringTypeIcon: IconName.SpeechBubble,
        showSelectionInput: true,
        showRaterCount: false,
        showDataForAllParticipants: false,
        participantsCount: 3,
        ...pick(defaultProps, ["scoringType", "updateCriterionSelection", "isSelected"])
      })
    } as unknown as UseCriterionRatingTableHook)
    const component = create(getComponent({scoringTypeIcon: IconName.SpeechBubble}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (has freeTextAnswer)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault as unknown as UseCriterionRatingTableHook)
    const component = create(
      getComponent({
        freeTextAnswer: Option.of(
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
        )
      })
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (readonly)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault as unknown as UseCriterionRatingTableHook)
    const component = create(getComponent({readOnly: true}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no criterion fulfilled)", () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      showNoCriterionFulfilledFooter: true
    } as unknown as UseCriterionRatingTableHook)
    const component = create(getComponent({noCriterionFulfilled: true}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no coding criteria)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault as unknown as UseCriterionRatingTableHook)
    const component = create(getComponent({criteria: []}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (computerrater)", () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      isComputerRater: true,
      columns: getCriterionRatingTableColumns({
        t: fakeTranslateWithOptions,
        getRatingsCount: jest.fn(() => 4),
        showAdditionalRaterInfos: true,
        finishedRatersCount: 12,
        isComputerRaterSelection: jest.fn(),
        readOnly: false,
        showSelectionInput: true,
        showRaterCount: false,
        participantsCount: 3,
        showDataForAllParticipants: false,
        ...pick(defaultProps, ["scoringType", "updateCriterionSelection", "isSelected"])
      })
    } as unknown as UseCriterionRatingTableHook)
    const component = create(getComponent({isComputerRaterSelection: jest.fn()}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (holistic)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault as unknown as UseCriterionRatingTableHook)
    const component = create(getComponent({scoringType: QuestionScoringType.Holistic}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault as unknown as UseCriterionRatingTableHook)
    const tree = shallow(getComponent())

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(0)

    const tooltip = tree.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Icon)).toHaveLength(2)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()

    const tableFooter = tableContent.find(CardFooter)
    expect(tableFooter).toHaveLength(1)

    const tableFooterContent = tableFooter.dive()
    expect(tableFooterContent.find(Heading)).toHaveLength(0)
    expect(tableFooterContent.find(Text)).toHaveLength(0)
    expect(tableFooterContent.find(Button)).toHaveLength(0)
    expect(tableFooterContent.find(RatingDetailActionElement)).toHaveLength(1)

    expect(tableContent.find(".table-placeholder")).toHaveLength(0)
    expect(tableContent.find(".entity-row")).toHaveLength(5)
    expect(tableContent.find(Heading)).toHaveLength(5)
    expect(tableContent.find(Text)).toHaveLength(7)
    expect(tableContent.find(Icon)).toHaveLength(0)
    expect(tableContent.find(Checkbox)).toHaveLength(5)
  })
  it("has correct structure (no criterion fulfilled)", () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      showNoCriterionFulfilledFooter: true
    } as unknown as UseCriterionRatingTableHook)
    const tree = shallow(getComponent({noCriterionFulfilled: true}))

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(0)

    const tooltip = tree.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Icon)).toHaveLength(2)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()

    const tableFooter = tableContent.find(CardFooter)
    expect(tableFooter).toHaveLength(1)

    const tableFooterContent = tableFooter.dive()
    expect(tableFooterContent.find(Heading)).toHaveLength(1)
    expect(tableFooterContent.find(Text)).toHaveLength(1)
    expect(tableFooterContent.find(Button)).toHaveLength(1)
    expect(tableFooterContent.find(RatingDetailActionElement)).toHaveLength(1)

    expect(tableContent.find(".table-placeholder")).toHaveLength(0)
    expect(tableContent.find(".entity-row")).toHaveLength(5)
    expect(tableContent.find(Heading)).toHaveLength(6)
    expect(tableContent.find(Text)).toHaveLength(8)
    expect(tableContent.find(Icon)).toHaveLength(0)
    expect(tableContent.find(Checkbox)).toHaveLength(5)
  })
  it("has correct structure (no coding criteria)", () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      sortedEntities: []
    } as unknown as UseCriterionRatingTableHook)
    const tree = shallow(getComponent({criteria: []}))

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(0)

    const tooltip = tree.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Icon)).toHaveLength(2)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()

    const tableFooter = tableContent.find(CardFooter)
    expect(tableFooter).toHaveLength(1)

    const tableFooterContent = tableFooter.dive()
    expect(tableFooterContent.find(Heading)).toHaveLength(0)
    expect(tableFooterContent.find(Text)).toHaveLength(0)
    expect(tableFooterContent.find(Button)).toHaveLength(0)
    expect(tableFooterContent.find(RatingDetailActionElement)).toHaveLength(1)

    expect(tableContent.find(".table-placeholder")).toHaveLength(1)
    expect(tableContent.find(".entity-row")).toHaveLength(0)
    expect(tableContent.find(Heading)).toHaveLength(0)
    expect(tableContent.find(Text)).toHaveLength(2)
    expect(tableContent.find(Icon)).toHaveLength(0)
    expect(tableContent.find(Checkbox)).toHaveLength(0)
  })
  it("has correct structure (has scoringTypeIcon)", () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      columns: getCriterionRatingTableColumns({
        t: fakeTranslateWithOptions,
        getRatingsCount: jest.fn(() => 4),
        showAdditionalRaterInfos: true,
        finishedRatersCount: 12,
        readOnly: false,
        scoringTypeIcon: IconName.SpeechBubble,
        showSelectionInput: true,
        showRaterCount: false,
        participantsCount: 3,
        showDataForAllParticipants: false,
        ...pick(defaultProps, ["scoringType", "updateCriterionSelection", "isSelected"])
      })
    } as unknown as UseCriterionRatingTableHook)
    const tree = shallow(getComponent({scoringTypeIcon: IconName.SpeechBubble}))

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(0)

    const tooltip = tree.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Icon)).toHaveLength(2)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()

    const tableFooter = tableContent.find(CardFooter)
    expect(tableFooter).toHaveLength(1)

    const tableFooterContent = tableFooter.dive()
    expect(tableFooterContent.find(Heading)).toHaveLength(0)
    expect(tableFooterContent.find(Text)).toHaveLength(0)
    expect(tableFooterContent.find(Button)).toHaveLength(0)
    expect(tableFooterContent.find(RatingDetailActionElement)).toHaveLength(1)

    expect(tableContent.find(".table-placeholder")).toHaveLength(0)
    expect(tableContent.find(".entity-row")).toHaveLength(5)
    expect(tableContent.find(Heading)).toHaveLength(5)
    expect(tableContent.find(Text)).toHaveLength(7)
    expect(tableContent.find(Icon)).toHaveLength(1)
    expect(tableContent.find(Checkbox)).toHaveLength(5)
  })
  it("has correct structure (has freeTextAnswer)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault as unknown as UseCriterionRatingTableHook)
    const tree = shallow(
      getComponent({
        freeTextAnswer: Option.of(
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
        )
      })
    )

    expect(tree.find(Heading)).toHaveLength(2)
    expect(tree.find(Paper)).toHaveLength(1)

    const tooltip = tree.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Icon)).toHaveLength(2)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()

    const tableFooter = tableContent.find(CardFooter)
    expect(tableFooter).toHaveLength(1)

    const tableFooterContent = tableFooter.dive()
    expect(tableFooterContent.find(Heading)).toHaveLength(0)
    expect(tableFooterContent.find(Text)).toHaveLength(0)
    expect(tableFooterContent.find(Button)).toHaveLength(0)
    expect(tableFooterContent.find(RatingDetailActionElement)).toHaveLength(1)

    expect(tableContent.find(".table-placeholder")).toHaveLength(0)
    expect(tableContent.find(".entity-row")).toHaveLength(5)
    expect(tableContent.find(Heading)).toHaveLength(5)
    expect(tableContent.find(Text)).toHaveLength(7)
    expect(tableContent.find(Icon)).toHaveLength(0)
    expect(tableContent.find(Checkbox)).toHaveLength(5)
  })
  it("has correct structure (computerrater)", () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      isComputerRater: true,
      columns: getCriterionRatingTableColumns({
        t: fakeTranslateWithOptions,
        getRatingsCount: jest.fn(() => 4),
        finishedRatersCount: 12,
        isComputerRaterSelection: jest.fn(),
        readOnly: false,
        showAdditionalRaterInfos: true,
        showSelectionInput: true,
        showRaterCount: false,
        participantsCount: 3,
        showDataForAllParticipants: false,
        ...pick(defaultProps, ["scoringType", "updateCriterionSelection", "isSelected"])
      })
    } as unknown as UseCriterionRatingTableHook)
    const tree = shallow(getComponent({isComputerRaterSelection: jest.fn()}))

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(0)

    const tooltip = tree.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Icon)).toHaveLength(2)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()

    const tableFooter = tableContent.find(CardFooter)
    expect(tableFooter).toHaveLength(1)

    const tableFooterContent = tableFooter.dive()
    expect(tableFooterContent.find(Heading)).toHaveLength(0)
    expect(tableFooterContent.find(Text)).toHaveLength(0)
    expect(tableFooterContent.find(Button)).toHaveLength(0)
    expect(tableFooterContent.find(RatingDetailActionElement)).toHaveLength(1)

    expect(tableContent.find(".table-placeholder")).toHaveLength(0)
    expect(tableContent.find(".entity-row")).toHaveLength(5)
    expect(tableContent.find(Heading)).toHaveLength(5)
    expect(tableContent.find(Text)).toHaveLength(7)
    expect(tableContent.find(Icon)).toHaveLength(0)
    expect(tableContent.find(Checkbox)).toHaveLength(5)
  })
  it("has correct structure without 0 Score button (holistic)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault as unknown as UseCriterionRatingTableHook)
    const tree = shallow(getComponent({scoringType: QuestionScoringType.Holistic}))
    expect(tree.find(Button)).toHaveLength(0)
  })
})
