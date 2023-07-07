import {BookArticleContentType} from "../enums"

export interface TocArticleContent {
  readonly id: UUID
  readonly isScrollable?: boolean
  readonly position: number
  readonly title: string
  readonly type: BookArticleContentType
}

export interface TocArticle {
  readonly contents?: TocArticleContent[]
  readonly id: UUID
  readonly position: number
  readonly title: string
}

export interface TocChapter {
  readonly articles: TocArticle[]
  readonly id: UUID
  readonly position?: number
  readonly title: string
}
