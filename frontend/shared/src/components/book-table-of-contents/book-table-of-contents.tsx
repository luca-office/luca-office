import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {ButtonConfig, TocChapter} from "../../models"
import {CustomStyle} from "../../styles"
import {WithLucaTranslation} from "../../translations"
import {buildReferenceBookChapterTree, Option, sortByPosition} from "../../utils"
import {TableOfContentsEntry} from ".."
import {TableOfContentsContainer} from "../table-of-content/table-of-contents"

export interface BookTableOfContentsProps extends WithLucaTranslation {
  readonly selectedEntityId: Option<UUID>
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly title: string
  readonly actionFooter?: React.ReactNode
  readonly addButtonConfig?: ButtonConfig
  readonly bookChapters: TocChapter[]
  readonly fadeChapters?: boolean
  readonly headerButtons?: React.ReactNode[]
  readonly hideChapters?: boolean
  readonly isArticleContentVisible?: boolean
  readonly isRootCollapsible?: boolean
  readonly loading?: boolean
  readonly placeholderHeadline?: string
  readonly placeholderHint?: string
  readonly readonly?: boolean
  readonly customFooterStyles?: CSSInterpolation
}

export const BookTableOfContents: React.FC<BookTableOfContentsProps & CustomStyle> = ({
  selectedEntityId,
  selectEntityId,
  title,
  actionFooter,
  addButtonConfig,
  bookChapters,
  customStyles,
  fadeChapters,
  headerButtons,
  hideChapters,
  isArticleContentVisible,
  isRootCollapsible,
  loading,
  placeholderHeadline,
  placeholderHint,
  readonly,
  customFooterStyles,
  t
}) => {
  return (
    <TableOfContentsContainer
      title={title}
      loading={loading}
      customCardStyles={customStyles}
      customFooterStyles={customFooterStyles}
      actionFooter={actionFooter}
      addButtonConfig={addButtonConfig}
      headerButtons={headerButtons}
      readonly={readonly}
      showPlaceHolder={!bookChapters.length}
      placeholderHeadline={placeholderHeadline}
      placeholderHint={placeholderHint}>
      {sortByPosition(bookChapters).map(chapter => {
        return (
          <TableOfContentsEntry
            key={chapter.id}
            node={buildReferenceBookChapterTree(chapter, t, isArticleContentVisible)}
            hideParent={hideChapters}
            fadeParent={fadeChapters}
            expandedNodeIds={hideChapters ? bookChapters.map(chapter => chapter.id) : []}
            isCollapsible={bookChapters.length > 1 || isRootCollapsible}
            selectedNode={selectedEntityId}
            selectNode={selectedNode => selectEntityId(selectedNode.map(node => node.id))}
          />
        )
      })}
    </TableOfContentsContainer>
  )
}
