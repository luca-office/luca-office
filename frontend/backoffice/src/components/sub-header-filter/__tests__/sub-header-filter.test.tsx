import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CustomSelect, SubHeader, TextInput} from "shared/components"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {initialAppState} from "../../../redux/state/app-state"
import {computeFilterAndSortingForEntity} from "../../../utils"
import {SubHeaderFilter, SubHeaderFilterProps} from "../.."

const optionsConfig = computeFilterAndSortingForEntity(
  initialAppState.ui.common.entityFilters.referenceBookChapters,
  "referenceBookChapters",
  fakeTranslate
)
const updateSpy = jest.fn()
const searchSpy = jest.fn()

const defaultProps: SubHeaderFilterProps = {
  typeOptions: optionsConfig.type,
  sortOptions: optionsConfig.sort,
  stateOptions: optionsConfig.state,
  searchText: optionsConfig.search,
  onChange: updateSpy,
  onSearchTextChange: searchSpy
}

const getComponent = (props?: Partial<React.PropsWithChildren<SubHeaderFilterProps>>) => (
  <SubHeaderFilter {...{...defaultProps, ...props}} />
)

describe("sub-header-filter", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(SubHeader)).toHaveLength(1)
    expect(tree.find(TextInput)).toHaveLength(1)
    expect(tree.find(CustomSelect)).toHaveLength(3)
  })

  it("triggers update correctly", () => {
    const component = getComponent()
    const tree = shallow(component)

    // When I change a select option
    const value = optionsConfig.type[1].value
    act(() => {
      tree.find(CustomSelect).first().simulate("change", value)
    })
    // onUpdate should be called with correct params
    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith("type", "owned_entities")

    // When I change a select option
    const search = "test"
    act(() => {
      tree.find(TextInput).first().simulate("change", search)
    })
    // onUpdate should be called with correct params
    expect(searchSpy).toHaveBeenCalledTimes(1)
    expect(searchSpy).toHaveBeenCalledWith("test")
  })
})
