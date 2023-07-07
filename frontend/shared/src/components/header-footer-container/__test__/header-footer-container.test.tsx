import {render} from "@testing-library/react"
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Text} from "../.."
import {HeaderFooterContainer} from "../header-footer-container"

describe("Empty Detail View", () => {
  it("renders correctly", () => {
    const component = create(<HeaderFooterContainer />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("renders structure correctly", () => {
    const component = shallow(
      <HeaderFooterContainer>
        <Text>Test</Text>
      </HeaderFooterContainer>
    )

    expect(component.find(Text)).toHaveLength(1)

    expect(component.find(".header-bar")).toHaveLength(1)
    expect(component.find(".content-container")).toHaveLength(1)
    expect(component.find(".footer-bar")).toHaveLength(1)
  })
})
