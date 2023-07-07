import {ReferenceBookArticleFragment} from "../graphql/generated/ReferenceBookArticleFragment"
import {
  ReferenceBookChapterFragment,
  ReferenceBookChapterFragment_author
} from "../graphql/generated/ReferenceBookChapterFragment"
import {ReferenceBookContentFragment} from "../graphql/generated/ReferenceBookContentFragment"

export type ReferenceBookChapter = ReferenceBookChapterFragment
export type ReferenceBookArticle = ReferenceBookArticleFragment
export type ReferenceBookArticleContent = ReferenceBookContentFragment
export type ReferenceBookAuthor = ReferenceBookChapterFragment_author
