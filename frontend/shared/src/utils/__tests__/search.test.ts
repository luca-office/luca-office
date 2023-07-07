import {referenceBookChapterMock} from "../../components/reference-book-chapters/__mocks__/reference-book-chapter"
import {Option} from ".."
import {
  findSelectedReferenceBookArticle,
  findSelectedReferenceBookChapter,
  searchReferenceBookChapters
} from "../search"

const books = [
  referenceBookChapterMock(),
  {...referenceBookChapterMock("1234"), title: "customword", description: "customdescription"}
]

describe("search", () => {
  it("can searchReferenceBookChapters", () => {
    expect(searchReferenceBookChapters(books, "nothingincluded", false)).toHaveLength(0)
    expect(searchReferenceBookChapters(books, "Venture-Capital", false)).toHaveLength(2)
    expect(searchReferenceBookChapters(books, "customword", false)).toHaveLength(1)
    expect(searchReferenceBookChapters(books, "customword", true)).toHaveLength(0)
    expect(searchReferenceBookChapters(books, "customword", false)[0].articles).toHaveLength(0)
    expect(searchReferenceBookChapters(books, "customdescription", false)).toHaveLength(1)
    expect(searchReferenceBookChapters(books, "customdescription", true)).toHaveLength(0)
    expect(searchReferenceBookChapters(books, "Begriff", false)).toHaveLength(2)
    expect(searchReferenceBookChapters(books, "Begriff", true)).toHaveLength(2)
    expect(searchReferenceBookChapters(books, "Begriff", false)[0].articles).toHaveLength(1)
    expect(searchReferenceBookChapters(books, "Begriff", true)[0].articles).toHaveLength(1)
    expect(searchReferenceBookChapters(books, "", false)).toHaveLength(2)
  })
  it("can findSelectedChapter", () => {
    expect(findSelectedReferenceBookChapter(Option.none(), Option.none()).orUndefined()).toBeUndefined()
    expect(findSelectedReferenceBookChapter(Option.of(books), Option.none()).orUndefined()).toBeUndefined()
    expect(findSelectedReferenceBookChapter(Option.none(), Option.of(books[0].id)).orUndefined()).toBeUndefined()
    expect(
      findSelectedReferenceBookChapter(Option.of(books), Option.of(books[0].articles[0].id)).orUndefined()
    ).toBeUndefined()
    expect(findSelectedReferenceBookChapter(Option.of(books), Option.of(books[0].id)).orUndefined()).toEqual(books[0])
  })
  it("can findSelectedArticle", () => {
    expect(findSelectedReferenceBookArticle(Option.none(), Option.none()).orUndefined()).toBeUndefined()
    expect(findSelectedReferenceBookArticle(Option.of(books), Option.none()).orUndefined()).toBeUndefined()
    expect(
      findSelectedReferenceBookArticle(Option.none(), Option.of(books[0].articles[1].id)).orUndefined()
    ).toBeUndefined()
    expect(findSelectedReferenceBookArticle(Option.of(books), Option.of(books[0].id)).orUndefined()).toBeUndefined()
    expect(
      findSelectedReferenceBookArticle(Option.of(books), Option.of(books[0].articles[1].id)).orUndefined()
    ).toEqual(books[0].articles[1])
  })
})
