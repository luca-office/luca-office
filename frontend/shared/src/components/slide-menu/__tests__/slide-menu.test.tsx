import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Icon} from "../../icon/icon"
import {SlideMenu, SlideMenuProps, SlideMenuVisibility} from "../slide-menu"

const renderDetailSpy = jest.fn()
const renderTocSpy = jest.fn()

const defaultProps: SlideMenuProps = {
  renderDetailView: visible => {
    renderDetailSpy(visible)
    return <div className={"detail-view"}>test {visible ? "visible" : "hidden"}</div>
  },
  renderToC: visible => {
    renderTocSpy(visible)
    return <div className={"toc"}>test {visible ? "visible" : "hidden"}</div>
  }
}

const getComponent = (props?: Partial<SlideMenuProps>) => <SlideMenu {...defaultProps} {...props} />

describe("tooltip", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly inactive", () => {
    const component = getComponent({inactive: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(getComponent())

    expect(component).toBeDefined()
    expect(component.find(".slide-menu")).toHaveLength(1)
    expect(component.find(".detail-view")).toHaveLength(1)
    expect(component.find(".toc")).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Icon).first().prop("name")).toEqual(IconName.ChevronLeft)
    expect(component.find(Icon).last().prop("name")).toEqual(IconName.ChevronRight)
  })
  it("has correct collapsed views", () => {
    const component = shallow(getComponent())

    expect(component.find(".slide-menu")).toHaveLength(1)
    expect(component.find(".detail-view")).toHaveLength(1)
    expect(component.find(".toc")).toHaveLength(1)
    expect(renderDetailSpy).toHaveBeenCalledWith(false)
    expect(renderTocSpy).toHaveBeenCalledWith(false)
  })
  it("has correct detail views", () => {
    const component = shallow(getComponent({defaultVisibility: SlideMenuVisibility.Detail}))

    expect(component.find(".slide-menu")).toHaveLength(1)
    expect(component.find(".detail-view")).toHaveLength(1)
    expect(component.find(".toc")).toHaveLength(1)
    expect(renderDetailSpy).toHaveBeenCalledWith(true)
    expect(renderTocSpy).toHaveBeenCalledWith(false)
  })
  it("has correct full views", () => {
    const component = shallow(getComponent({defaultVisibility: SlideMenuVisibility.Full}))

    expect(component.find(".slide-menu")).toHaveLength(1)
    expect(component.find(".detail-view")).toHaveLength(1)
    expect(component.find(".toc")).toHaveLength(1)
    expect(renderDetailSpy).toHaveBeenCalledWith(true)
    expect(renderTocSpy).toHaveBeenCalledWith(true)
  })
})
