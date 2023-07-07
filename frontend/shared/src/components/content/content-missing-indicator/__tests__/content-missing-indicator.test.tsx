import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardContent} from "../../../card"
import {DetailViewCard} from "../../../detail-view-card/detail-view-card"
import {ContentMissingIndicator} from "../content-missing-indicator"

describe("content-missing-indicator", () => {
  it("renders correctly", () => {
    const component = <ContentMissingIndicator />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = <ContentMissingIndicator />
    const tree = shallow(component)

    expect(tree.find(DetailViewCard)).toHaveLength(1)
    expect(tree.find(DetailViewCard).dive().find(CardContent)).toHaveLength(1)
  })
})
