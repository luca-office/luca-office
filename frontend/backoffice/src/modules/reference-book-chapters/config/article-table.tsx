import partial from "lodash-es/partial"
import * as React from "react"
import {
  Button,
  Column,
  Columns,
  deleteEntityButtonStyles,
  DeleteOrArchiveEntityButton,
  Icon,
  TableContainerProps
} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {ReferenceBookContentType} from "shared/graphql/generated/globalTypes"
import {useDeleteReferenceBookArticle} from "shared/graphql/hooks"
import {ReferenceBookArticle} from "shared/models"
import {fontColor} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {Option} from "shared/utils"
import {TableActionBar} from "../../../components"
import {articleTableStyle as styles} from "./article-table.style"

const isMoveArticleUpwardsDisabled = (articles: ReferenceBookArticle[], article: ReferenceBookArticle) =>
  articles.indexOf(article) === 0
const isMoveArticleDownwardsDisabled = (articles: ReferenceBookArticle[], article: ReferenceBookArticle) =>
  articles.indexOf(article) === articles.length - 1

const getArticleContentsCount = (article: ReferenceBookArticle, contentType: ReferenceBookContentType) =>
  article?.contents?.filter(content => content.contentType === contentType).length || 0

export const getBookArticleTableProps = ({
  articles,
  isArticleActionbarVisible,
  isPublished,
  moveArticleDownwards,
  moveArticleUpwards,
  navigateToArticleCreation,
  referenceBookChapterId,
  repositionArticleLoading,
  selectEntityId,
  setIsArticleActionbarVisible,
  t
}: {
  readonly articles: ReferenceBookArticle[]
  readonly isArticleActionbarVisible: boolean
  readonly isPublished: boolean
  readonly moveArticleDownwards: (article: ReferenceBookArticle) => void
  readonly moveArticleUpwards: (article: ReferenceBookArticle) => void
  readonly navigateToArticleCreation: () => void
  readonly referenceBookChapterId: UUID
  readonly repositionArticleLoading: boolean
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly setIsArticleActionbarVisible: (isVisible: boolean) => void
  readonly t: LucaTFunction
}): TableContainerProps<ReferenceBookArticle> => ({
  entities: articles,
  entityKey: article => article.id,
  onClick: article => selectEntityId(Option.of(article.id)),
  columns: [
    {
      header: (
        <Columns>
          <Column flexGrow={0} flexShrink={0}>
            <Icon name={IconName.BookPage} />
          </Column>
          <Column>{t("reference_books__article_table_header_article")}</Column>
        </Columns>
      ),
      key: "icon",
      content: article => (
        <Columns>
          <Column flexGrow={0} flexShrink={0}>
            <Icon name={IconName.BookPage} />
          </Column>
          <Column>{article.title}</Column>
        </Columns>
      )
    },
    {
      header: <Icon name={IconName.AlignmentLeft} />,
      key: "texts",
      content: article => getArticleContentsCount(article, ReferenceBookContentType.TextContent),
      customStyles: styles.smallCell
    },
    {
      header: <Icon name={IconName.Images} />,
      key: "images",
      content: article => getArticleContentsCount(article, ReferenceBookContentType.ImageContent),
      customStyles: styles.smallCell
    },
    {
      header: <Icon name={IconName.Film} />,
      key: "videos",
      content: article => getArticleContentsCount(article, ReferenceBookContentType.VideoContent),
      customStyles: styles.smallCell
    },
    {
      header: <Icon name={IconName.PDF} />,
      key: "pdf",
      content: article => getArticleContentsCount(article, ReferenceBookContentType.PdfContent),
      customStyles: styles.smallCell
    },
    {
      header: (
        <Button
          icon={IconName.Sort}
          variant={ButtonVariant.IconOnly}
          onClick={() => setIsArticleActionbarVisible(!isArticleActionbarVisible)}
          disabled={isPublished}
        />
      ),
      key: "sort",
      content: () => null,
      customStyles: [styles.controlCell, styles.sort]
    },
    {
      header: (
        <Button
          icon={IconName.Add}
          variant={ButtonVariant.IconOnly}
          onClick={navigateToArticleCreation}
          disabled={isPublished}
        />
      ),
      key: "operation",
      content: (article: ReferenceBookArticle) => (
        <DeleteOrArchiveEntityButton
          useDeleteHook={partial(useDeleteReferenceBookArticle, referenceBookChapterId)}
          entityId={article.id}
          disabled={isPublished}
          stopEventPropagation={true}
          customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
          iconColor={fontColor}
          stopEventPropagationOnOverlayClick={true}
        />
      ),
      customStyles: [styles.controlCell, styles.operation]
    }
  ],
  renderRowFooter: isArticleActionbarVisible
    ? article => (
        <TableActionBar
          onMoveUpwards={() => moveArticleUpwards(article)}
          onMoveDownwards={() => moveArticleDownwards(article)}
          upwardMoveDisabled={repositionArticleLoading || isMoveArticleUpwardsDisabled(articles, article)}
          downwardMoveDisabled={repositionArticleLoading || isMoveArticleDownwardsDisabled(articles, article)}
        />
      )
    : undefined
})
