import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {fakeTranslate} from "../../../../tests/utils/translate-mock"
import {Option} from "../../../utils"
import {BookTableOfContents, BookTableOfContentsProps, Button, Card, CardFooter, CardHeader} from "../.."
import {TableOfContentsContainer, TableOfContentsEntry} from "../../table-of-content"
import {tocBookMock} from "../__mocks__/toc-book-data.mock"

const selectSpy = jest.fn()

const defaultProps: BookTableOfContentsProps = {
  title: "Title",
  bookChapters: tocBookMock,
  selectEntityId: selectSpy,
  selectedEntityId: Option.none(),
  t: fakeTranslate
}

const getComponent = (props?: Partial<React.PropsWithChildren<BookTableOfContentsProps>>) => (
  <BookTableOfContents {...{...defaultProps, ...props}} />
)

describe("book-table-of-contents", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    const tocContainer = component.find(TableOfContentsContainer)
    expect(tocContainer).toHaveLength(1)
    expect(tocContainer.find(TableOfContentsEntry)).toHaveLength(2)

    expect(tocContainer.dive().find(CardHeader)).toHaveLength(1)
    expect(tocContainer.dive().find(CardFooter)).toHaveLength(1)
  })

  it("has correct structure with extra elements", () => {
    const addSpy = jest.fn()
    const component = shallow(
      getComponent({
        addButtonConfig: {labelKey: "placeholder", onClick: addSpy},
        actionFooter: <div className={"test-div"}>foo</div>
      })
    )

    const tocContainer = component.find(TableOfContentsContainer)
    expect(tocContainer).toHaveLength(1)
    expect(tocContainer.find(TableOfContentsEntry)).toHaveLength(2)

    expect(tocContainer.dive().find(Card)).toHaveLength(1)
    expect(tocContainer.dive().find(CardHeader)).toHaveLength(1)
    expect(tocContainer.dive().find(CardFooter)).toHaveLength(1)
    expect(tocContainer.dive().find(".test-div")).toHaveLength(1)
    expect(tocContainer.dive().find(Button)).toHaveLength(1)
    tocContainer.dive().find(Button).simulate("click")
    expect(addSpy).toHaveBeenCalled()
  })
  it("has correct structure with hidden chapters", () => {
    const component = shallow(getComponent({hideChapters: true}))
    const tocContainer = component.find(TableOfContentsContainer)
    expect(tocContainer).toHaveLength(1)
    expect(tocContainer.find(TableOfContentsEntry)).toHaveLength(2)

    expect(tocContainer.dive().find(CardHeader)).toHaveLength(1)
    expect(tocContainer.dive().find(CardFooter)).toHaveLength(1)
  })
})
