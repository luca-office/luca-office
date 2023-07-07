// importing from direct file because of issues of babel loader and spyOn
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardContent, CardFooter, CardHeader, ContentImage, LoadingIndicator, Text} from "../../../../components"
import {ReferenceBookContentType} from "../../../../enums"
import {ReferenceBookArticle as ReferenceBookArticleModel, ReferenceBookChapter} from "../../../../models"
import {Option} from "../../../../utils"
import {referenceBookChapterMock} from "../../__mocks__/reference-book-chapter"
import {ReferenceBookArticle, ReferenceBookArticleProps} from "../reference-book-article"

const chapter: ReferenceBookChapter = referenceBookChapterMock()
const selectSpy = jest.fn()

const defaultProps: ReferenceBookArticleProps = {
  dataLoading: false,
  selectImage: selectSpy,
  chapterTitle: "my test chapter",
  article: Option.of(chapter.articles[0])
}

const getComponent = (props?: Partial<ReferenceBookArticleProps>) => (
  <ReferenceBookArticle {...defaultProps} {...props} />
)

describe("reference-book-article", () => {
  it("renders correctly", async () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = shallow(getComponent())

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(LoadingIndicator)).toHaveLength(0)
    expect(component.find(CardContent).find(ContentImage)).toHaveLength(
      defaultProps.article
        .map(
          (article: ReferenceBookArticleModel) =>
            article.contents.filter(content => content.contentType === ReferenceBookContentType.ImageContent).length
        )
        .getOrElse(0)
    )
    expect(component.find(CardContent).find(Text)).toHaveLength(
      defaultProps.article
        .map(
          (article: ReferenceBookArticleModel) =>
            article.contents.filter(content => content.contentType === ReferenceBookContentType.TextContent).length
        )
        // By default title is always there
        .getOrElse(0) + 1
    )
  })
  it("has correct structure (loading)", async () => {
    const component = shallow(getComponent({dataLoading: true}))

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(LoadingIndicator)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(2)
  })
})
