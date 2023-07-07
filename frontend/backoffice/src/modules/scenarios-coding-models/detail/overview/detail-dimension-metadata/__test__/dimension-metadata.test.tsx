// importing from direct file because of issues of babel loader and spyOn
import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ReadonlyActionField} from "shared/components"
import wait from "waait"
import {DimensionMetadata} from "../dimension-metadata"

describe("dimension-metadata", () => {
  it("renders correctly", async () => {
    const component = create(<DimensionMetadata dimensionsCount={{items: 3, subDimension: 10, mainDimension: 100}} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = shallow(<DimensionMetadata dimensionsCount={{items: 3, subDimension: 10, mainDimension: 100}} />)
    await act(() => wait(0))

    expect(component.find(ReadonlyActionField)).toHaveLength(3)
  })
})
