import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {TableContainer} from "shared/components"
import {codingDimensionsMock} from "shared/graphql/__mocks__"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {ratingProjectModulesMock} from "../../../../../__mocks__/rating-project-modules.mock"
import {getRaterRatingProjectModuleColumns} from "../../../../../config/project-module-table.config"
import * as useRaterRatingProjectModuleTableHook from "../hooks/use-rater-rating-project-module-table"
import {UseRaterRatingProjectModuleTableHook} from "../hooks/use-rater-rating-project-module-table"
import {RaterRatingProjectModuleTable, RaterRatingProjectModuleTableProps} from "../rater-rating-project-module-table"

const ratingProjectModules = ratingProjectModulesMock.map(mock => ({
  ...mock,
  participantCount: 12,
  ratedParticipantCount: 8
}))

const defaultProps: RaterRatingProjectModuleTableProps = {
  fullyRatedParticipantCount: 8,
  codingDimensions: codingDimensionsMock,
  ratingProjectModules
}

const stateHookValuesDefault: UseRaterRatingProjectModuleTableHook = {
  columns: getRaterRatingProjectModuleColumns(
    fakeTranslate,
    codingDimensionsMock,
    ratingProjectModules.length * ratingProjectModules[0].ratedParticipantCount
  )
}

const stateSpy = jest.spyOn(useRaterRatingProjectModuleTableHook, "useRaterRatingProjectModuleTable")

const getComponent = (props?: Partial<RaterRatingProjectModuleTableProps>) => (
  <RaterRatingProjectModuleTable {...{...defaultProps, ...props}} />
)

describe("rater-rating-project-module-table", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(TableContainer)).toHaveLength(1)
  })
})
