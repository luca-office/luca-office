import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {Icon} from "../../icon/icon"
import {HeaderCarousel, HeaderCarouselProps} from "../header-carousel"

const elements = [
  {
    label: "inbox",
    count: 5,
    icon: IconName.EmailIncoming,
    directory: EmailDirectory.Inbox
  },
  {
    label: "sent",
    count: 3,
    icon: IconName.EmailOutgoing,
    directory: EmailDirectory.Sent
  },
  {
    label: "trash",
    count: 2,
    icon: IconName.Trash,
    directory: EmailDirectory.Trash
  }
]

const defaultProps: HeaderCarouselProps = {
  activeElement: elements[0],
  activeElementIndex: 0,
  elementsCount: 3,
  handleLeftClick: jest.fn(),
  handleRightClick: jest.fn()
}

const getComponent = (props?: Partial<HeaderCarouselProps>) => <HeaderCarousel {...{...defaultProps, ...props}} />

describe("header-carousel", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Icon)).toHaveLength(3)
    expect(tree.find({"data-testid": "header-element"})).toHaveLength(3)
  })
  it("correctly handles navigation", () => {
    const handleLeftClick = jest.fn()
    const handleRightClick = jest.fn()
    const component = getComponent({handleLeftClick, handleRightClick})
    const tree = shallow(component)

    const icons = tree.find(Icon)
    icons.at(0).simulate("click")
    expect(handleLeftClick).toHaveBeenCalledTimes(1)
    icons.at(2).simulate("click")
    expect(handleRightClick).toHaveBeenCalledTimes(1)
  })
})
