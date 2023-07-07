// importing from direct file because of issues of babel loader and spyOn
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardFooter, CardHeader, Heading, LoadingIndicator, Table, Text} from "../../../../components"
import {ReferenceBookChapter as ReferenceBookChapterModel} from "../../../../models"
import {Option} from "../../../../utils"
import {TableContainer} from "../../../table/table-container"
import {referenceBookChapterMock} from "../../__mocks__/reference-book-chapter"
import {ReferenceBookChapter, ReferenceBookChapterProps} from "../reference-book-chapter"

const chapter: ReferenceBookChapterModel = referenceBookChapterMock()
const selectSpy = jest.fn()

const defaultProps: ReferenceBookChapterProps = {
  dataLoading: false,
  selectArticle: selectSpy,
  chapter: Option.of(chapter)
}

const getComponent = (props?: Partial<ReferenceBookChapterProps>) => (
  <ReferenceBookChapter {...defaultProps} {...props} />
)

describe("reference-book-chapter", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(getComponent())

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(LoadingIndicator)).toHaveLength(0)
    expect(component.find(Heading)).toHaveLength(2)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(TableContainer)).toHaveLength(1)
    expect(component.find(TableContainer).dive().find(Table).dive().find(".entity-row")).toHaveLength(
      chapter.articles.length
    )
  })
  it("has correct structure (nothing selected)", () => {
    const component = shallow(getComponent({chapter: Option.none()}))
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardHeader).html()).toContain("reference_book__title_placeholder")
    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(0)
  })
  it("has correct structure (loading)", () => {
    const component = shallow(getComponent({dataLoading: true}))

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(LoadingIndicator)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(0)
  })
  it("executes actions correctly", () => {
    const component = shallow(getComponent())

    component.find(TableContainer).dive().find(Table).dive().find(".entity-row").first().simulate("click")
    expect(selectSpy).toHaveBeenCalledTimes(1)
  })
})
