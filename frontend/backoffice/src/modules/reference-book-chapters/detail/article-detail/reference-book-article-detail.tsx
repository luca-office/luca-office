import partial from "lodash-es/partial"
import * as React from "react"
import {
  Button,
  Card,
  CardHeader,
  DeleteOrArchiveEntityButton,
  Heading,
  Icon,
  Label,
  TableContainer,
  TocEntryPlaceholder
} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {ReferenceBookChapterUpdate, ReferenceBookContentType} from "shared/graphql/generated/globalTypes"
import {useDeleteReferenceBookArticle, useDeleteReferenceBookContent} from "shared/graphql/hooks"
import {BinaryFile, ReferenceBookArticleContent, ReferenceBookChapter} from "shared/models"
import {FontWeight} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option, sortByPosition} from "shared/utils"
import {
  CreationBar,
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  MarkdownText,
  MarkdownTextField,
  OverlayEditCompositeFieldConfig,
  OverlayEditField,
  OverlayEditFieldType,
  ResortModal
} from "../../../../components"
import {PdfBarContainer} from "../../../../components/pdf-bar/pdf-bar"
import {informationStyles as styles} from "../../../scenarios/detail/information/information.style"
import {ReferenceBookImage} from "../../common"
import {ReferenceBookVideo} from "../../common/reference-book-video/reference-book-video"
import {ContentTypeDialog, ReferenceBookBinaryContentModalContainer, ReferenceBookTextContentModal} from "../../edit"
import {useReferenceBookArticleDetail} from "./hooks/use-reference-book-article-detail"
import {bookArticleStyles} from "./reference-book-article-detail.style"

export interface ReferenceBookArticleDetailProps {
  readonly referenceBookChapter: ReferenceBookChapter
  readonly selectedEntityId: Option<string>
  readonly selectEntityId: (id: Option<UUID>) => void
}

export const ReferenceBookArticleDetail: React.FC<ReferenceBookArticleDetailProps> = ({
  referenceBookChapter,
  selectedEntityId,
  selectEntityId
}) => {
  const {t} = useLucaTranslation()
  const {
    articles,
    articleTableProps,
    contentTypeModalVisible,
    createReferenceBookContent,
    dataLoading,
    hideSortModal,
    isPublished,
    navigateToChapterOverview,
    repositionArticleContent,
    repositionReferenceBookContentLoading,
    selectContentType,
    selectedArticle,
    selectedContentType,
    selectedEntityIsAnArticle,
    showSortModal,
    sortableArticleContents,
    sortModalVisible,
    title,
    toggleContentTypeModal,
    updateArticleTitle,
    updateReferenceBook,
    updateTextContent
  } = useReferenceBookArticleDetail(referenceBookChapter, selectedEntityId, selectEntityId)
  const {entities, entityKey, columns, renderRowFooter, onClick: onTableRowClick} = articleTableProps

  const closeContentTypeDialog = () => toggleContentTypeModal(false)
  const closeCreateContentModal = () => selectContentType(Option.none())

  const handleSortButtonClick = () => selectedEntityIsAnArticle && showSortModal()

  const renderContent = (content: ReferenceBookArticleContent) => {
    switch (content.contentType) {
      case ReferenceBookContentType.TextContent:
        return (
          <MarkdownTextField
            scrollId={content.id}
            isEditable={!isPublished}
            dialogTitle={t("reference_books__edit_text_content_title")}
            onConfirm={async text => updateTextContent(content.id, text)}
            key={content.id}
            text={content.text ?? ""}
            placeholder={<TocEntryPlaceholder />}
            customStyles={bookArticleStyles.markdownPlaceholder}
            deleteConfig={{
              entityId: content.id,
              useDeleteHook: partial(useDeleteReferenceBookContent, referenceBookChapter.id),
              modalTitleKey: "reference_books__delete_dialog_title_text",
              modalTextKey: "reference_books__delete_dialog_text_text"
            }}
          />
        )
      case ReferenceBookContentType.ImageContent:
        return (
          <ReferenceBookImage
            scrollId={content.id}
            key={content.id}
            referenceBookChapterId={referenceBookChapter.id}
            contentId={content.id}
            imageUrl={content.imageUrl ?? ""}
            imageFile={Option.of(content.imageBinaryFile as BinaryFile)}
            readonly={isPublished}
          />
        )
      case ReferenceBookContentType.VideoContent:
        return (
          <ReferenceBookVideo
            scrollId={content.id}
            key={content.id}
            referenceBookChapterId={referenceBookChapter.id}
            contentId={content.id}
            videoUrl={content.videoUrl ?? ""}
            videoFile={Option.of(content.videoBinaryFile as BinaryFile)}
            readonly={isPublished}
          />
        )
      case ReferenceBookContentType.PdfContent:
        return (
          <PdfBarContainer
            key={content.id}
            referenceBookChapterId={referenceBookChapter.id}
            title={content.pdfBinaryFile?.filename ?? ""}
            pdfFile={Option.of<BinaryFile>(content.pdfBinaryFile)}
            contentId={content.id}
            readonly={isPublished}
          />
        )
      default:
        return <MarkdownText scrollId={content.id} key={content.id} markdown={content.text || ""} />
    }
  }

  const descriptionField: OverlayEditCompositeFieldConfig = {
    updateId: "description",
    value: referenceBookChapter.description,
    labelKey: "description",
    type: OverlayEditFieldType.TEXTAREA
  }

  return (
    <React.Fragment>
      <Card customStyles={bookArticleStyles.card}>
        <CardHeader customStyles={bookArticleStyles.header} hasShadow hasGreyBackground>
          <div css={[bookArticleStyles.title, bookArticleStyles.titleHeadingWrapper]}>
            <Icon customStyles={bookArticleStyles.icon} name={IconName.Book} />
            <Heading customStyles={bookArticleStyles.titleHeading} level={HeadingLevel.h3}>
              {title}
            </Heading>
          </div>
          {!isPublished && (
            <div css={bookArticleStyles.title}>
              <Button
                disabled={!selectedEntityIsAnArticle}
                variant={ButtonVariant.IconOnly}
                icon={IconName.Sort}
                onClick={handleSortButtonClick}
              />
              {selectedEntityIsAnArticle &&
                selectedEntityId
                  .map(id => (
                    <DeleteOrArchiveEntityButton
                      customStyles={bookArticleStyles.deleteIcon}
                      useDeleteHook={partial(useDeleteReferenceBookArticle, referenceBookChapter.id)}
                      entityId={id}
                      onSuccess={navigateToChapterOverview}
                    />
                  ))
                  .orNull()}
            </div>
          )}
        </CardHeader>

        <div css={bookArticleStyles.content}>
          {selectedArticle
            .map(article => (
              <React.Fragment>
                <Label
                  label={t("title")}
                  icon={!isPublished ? IconName.EditPencil : IconName.LockClosed}
                  customStyles={styles.spacedLabel}
                />
                <InlineEditableHeaderContainer
                  customStyles={[bookArticleStyles.bottomMarginLarge, bookArticleStyles.paddingLeftZero]}
                  disabled={isPublished}
                  text={article.title}
                  onConfirm={updateArticleTitle}
                />
                {sortByPosition(article.contents).map(renderContent)}
                {!isPublished && (
                  <CreationBar
                    disabled={isPublished}
                    onCreate={() => toggleContentTypeModal(true)}
                    title={t("reference_books__creation_bar_title")}
                  />
                )}
              </React.Fragment>
            ))
            .getOrElse(
              !title ? (
                <div css={bookArticleStyles.placeholderContainer}>
                  <div>{t("reference_books__scenario_chapter_placeholder")}</div>
                  <div css={bookArticleStyles.hint}>{t("reference_books__scenario_chapter_content_placeholder")}</div>
                </div>
              ) : (
                <React.Fragment>
                  <Label
                    label={t("title")}
                    icon={!isPublished ? IconName.EditPencil : IconName.LockClosed}
                    customStyles={styles.spacedLabel}
                  />
                  <InlineEditableHeaderContainer
                    customStyles={bookArticleStyles.paddingLeftZero}
                    disabled={isPublished}
                    text={referenceBookChapter.title}
                    onConfirm={(title: string) => updateReferenceBook({title})}
                  />
                  <Label
                    label={t("description")}
                    icon={!isPublished ? IconName.EditPencil : IconName.LockClosed}
                    customStyles={styles.spacedLabel}
                  />
                  <OverlayEditField<ReferenceBookChapterUpdate>
                    customStyles={bookArticleStyles.description}
                    disabled={isPublished}
                    formFields={[descriptionField]}
                    fieldLabelKey={"description"}
                    dialogTitleKey={"projects__overlay_update_description"}
                    onUpdate={({description}) => updateReferenceBook({description})}
                    updateLoading={dataLoading}
                    renderValue={() => (
                      <InlineEditableTextareaContainer
                        text={referenceBookChapter.description}
                        readOnly={true}
                        disabled={isPublished}
                      />
                    )}
                    displayPlain={true}
                  />
                  <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                    {t("reference_books__table_of_contents_count", {count: articles.length})}
                  </Heading>
                  <div css={bookArticleStyles.tableWrapper}>
                    <TableContainer
                      customStyles={bookArticleStyles.table(isPublished)}
                      entities={entities}
                      entityKey={entityKey}
                      customHeaderRowStyles={bookArticleStyles.tableHeaderRow}
                      customRowStyles={() => bookArticleStyles.tableRowHeight}
                      columns={columns}
                      renderRowFooter={renderRowFooter}
                      onClick={onTableRowClick}
                      placeHolderText={t("reference_books__table_of_contents_placeholder")}
                    />
                  </div>
                </React.Fragment>
              )
            )}
        </div>
      </Card>

      {contentTypeModalVisible && (
        <ContentTypeDialog
          onConfirm={type => {
            selectContentType(Option.of(type))
            closeContentTypeDialog()
          }}
          onDismiss={closeContentTypeDialog}
        />
      )}

      {selectedContentType
        .map(type =>
          type === ReferenceBookContentType.TextContent ? (
            <ReferenceBookTextContentModal
              selectedArticleId={selectedEntityId}
              createReferenceBookContent={createReferenceBookContent}
              onDismiss={closeCreateContentModal}
              onSuccess={closeCreateContentModal}
            />
          ) : (
            <ReferenceBookBinaryContentModalContainer
              contentType={type}
              selectedArticleId={selectedEntityId}
              createReferenceBookContent={createReferenceBookContent}
              referenceBookChapterId={referenceBookChapter.id}
              onDismiss={closeCreateContentModal}
              onSuccess={closeCreateContentModal}
            />
          )
        )
        .orNull()}
      {sortModalVisible &&
        sortableArticleContents
          .map(articleContents => (
            <ResortModal
              disabled={repositionReferenceBookContentLoading}
              titleKey={"reference_books__sort_article_content_title"}
              onDismiss={hideSortModal}
              onConfirm={repositionArticleContent}
              tableLabel={t("reference_books__sort_article_content_table_of_contents_label", {
                count: articleContents.length
              })}
              entities={articleContents}
            />
          ))
          .orNull()}
    </React.Fragment>
  )
}
