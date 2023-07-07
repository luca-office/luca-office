import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button} from "../.."
import {FeatureDisabledMarker} from "../feature-disabled-marker"

describe("feature-disabled-marker", () => {
  it("renders correctly", () => {
    const component = (
      <FeatureDisabledMarker>
        <Button>test</Button>
      </FeatureDisabledMarker>
    )
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(
      <FeatureDisabledMarker>
        <Button>test</Button>
      </FeatureDisabledMarker>
    )
    expect(component.find(Button)).toHaveLength(1)
    expect(component.find(".feature-disabled-marker")).toHaveLength(1)
  })
})
