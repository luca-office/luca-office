import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Text} from "../../../../typography/typography"
import {PercentagePaperPrefix, PercentagePaperPrefixProps} from "../percentage-paper-prefix"

const defaultProps: PercentagePaperPrefixProps = {
  ratingsCount: 8,
  ratersCount: 12
}

const getComponent = (props?: Partial<PercentagePaperPrefixProps>) => (
  <PercentagePaperPrefix {...{...defaultProps, ...props}} />
)

describe("percentage-paper-prefix", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(Text)).toHaveLength(1)
  })
})
