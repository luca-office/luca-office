import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Card, CardFooter, CardHeader, LoadingIndicator, Text} from "../.."
import {TableOfContentsContainer, TableOfContentsContainerProps} from "../table-of-contents"

const defaultProps: TableOfContentsContainerProps = {
  title: "Title"
}

const getComponent = (props?: Partial<React.PropsWithChildren<TableOfContentsContainerProps>>) => (
  <TableOfContentsContainer {...{...defaultProps, ...props}} />
)

describe("book-table-of-contents", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(1)
  })

  it("has correct structure with extra elements", () => {
    const addSpy = jest.fn()
    const component = shallow(
      getComponent({
        headerButtons: [<Button title={"Test Button"} />],
        addButtonConfig: {labelKey: "placeholder", onClick: addSpy},
        actionFooter: <div className={"test-div"}>foo</div>
      })
    )
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(".test-div")).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(2)
    component.find(Button).last().simulate("click")
    expect(addSpy).toHaveBeenCalled()
  })

  it("correctly renders loading indicator", () => {
    const component = shallow(getComponent({loading: true}))
    expect(component.find(LoadingIndicator)).toHaveLength(1)
  })

  it("correctly renders the placeholder", () => {
    const component = shallow(
      getComponent({
        loading: false,
        showPlaceHolder: true,
        placeholderHeadline: "TestHeadline",
        placeholderHint: "TestHint"
      })
    )

    expect(component.find(Text)).toHaveLength(2)
    expect(component.find(Text).first().contains("TestHeadline")).toBeTruthy()
  })
})
