import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardFooter, CardFooterItem} from "shared/components"
import {userAccountMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {EditingStatusIndicator} from "../../../../../components"
import {UserAccount} from "../../../../../models"
import {ProjectDetailCardFooter, ProjectDetailCardFooterProps} from "../project-detail-card-footer"

const defaultProps: ProjectDetailCardFooterProps = {
  author: Option.of((userAccountMock as unknown) as UserAccount),
  createdAt: "2021-02-17T08:22:04.805Z",
  isFinalized: true
}

const getComponent = (props?: Partial<ProjectDetailCardFooterProps>) => (
  <ProjectDetailCardFooter {...{...defaultProps, ...props}} />
)

describe("project-detail-card-footer", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(CardFooterItem)).toHaveLength(2)
    expect(tree.find(EditingStatusIndicator)).toHaveLength(1)
    expect(tree.find(CardFooter)).toHaveLength(1)
  })
  it("has correct structure without wrapper", () => {
    const component = getComponent({hideFooterWrapper: true})
    const tree = shallow(component)

    expect(tree.find(CardFooterItem)).toHaveLength(2)
    expect(tree.find(EditingStatusIndicator)).toHaveLength(1)
    expect(tree.find(CardFooter)).toHaveLength(0)
  })
  it("has correct structure without author, not finalized", () => {
    const component = getComponent({isFinalized: false, author: Option.none()})
    const tree = shallow(component)

    expect(tree.find(CardFooterItem)).toHaveLength(1)
    expect(tree.find(EditingStatusIndicator)).toHaveLength(1)
    expect(tree.find(CardFooter)).toHaveLength(1)
  })
})
