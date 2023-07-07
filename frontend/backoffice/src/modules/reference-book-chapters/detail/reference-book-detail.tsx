import * as React from "react"
import {BookTableOfContents, Content, DetailViewHeader, Overlay} from "shared/components"
import {IconName} from "shared/enums"
import {useArchiveReferenceBookChapter, useDeleteReferenceBookChapter} from "shared/graphql/hooks"
import {ButtonConfig, NavigationConfig} from "shared/models"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {Route} from "../../../routes"
import {ReferenceBookArticleDetail} from "./article-detail/reference-book-article-detail"
import {ReferenceBookDetailFooter} from "./detail-footer/reference-book-detail-footer"
import {useReferenceBookDetail} from "./hooks/use-reference-book-detail"
import {ReferenceBookDetailPreview} from "./preview/reference-book-detail-preview"
import {referenceBookDetailStyles as refBookDetailStyles} from "./reference-book-detail.style"

export interface ReferenceBookDetailProps {
  readonly articleId?: UUID
  readonly articleNavigationConfig?: NavigationConfig<Route>
  readonly disabled?: boolean
  readonly navigationButtonLabelKey?: LucaI18nLangKey
  readonly navigationDetailsConfig?: NavigationConfig<Route>
  readonly navigationOverviewConfig?: NavigationConfig<Route>
  readonly referenceBookChapterId: UUID
}

export const ReferenceBookDetail: React.FC<ReferenceBookDetailProps> = ({
  articleId,
  articleNavigationConfig,
  disabled = false,
  navigationButtonLabelKey,
  navigationDetailsConfig,
  navigationOverviewConfig,
  referenceBookChapterId
}) => {
  const {t} = useLucaTranslation()
  const {
    bookChapters,
    dataLoading,
    duplicateReferenceBook,
    navigateToArticleCreation,
    navigateToOverview,
    publishReferenceBook: finalizeReferenceBook,
    referenceBookChapter: referenceBookOption,
    selectEntityId,
    selectedEntityId,
    showPreview,
    hidePreview,
    isPreviewVisible,
    userMayArchive
  } = useReferenceBookDetail({
    referenceBookChapterId,
    articleId,
    navigationOverviewConfig,
    navigationDetailsConfig,
    articleNavigationConfig
  })

  const handleOperationClick = () =>
    referenceBookOption.map(reference => {
      if (!reference.publishedAt) {
        finalizeReferenceBook()
      } else {
        duplicateReferenceBook()
      }
    })

  const isPublished = referenceBookOption.exists(referenceBookChapter => referenceBookChapter.publishedAt !== null)

  const header = (
    <DetailViewHeader
      customStyles={refBookDetailStyles.header}
      labelKey={"reference_books__sub_header_title"}
      navigationButtonConfig={{
        labelKey: navigationButtonLabelKey ?? "reference_books__sub_header_overview",
        onClick: navigateToOverview
      }}
      operationButtonConfig={
        isPublished
          ? {
              icon: IconName.Duplicate,
              labelKey: "reference_books__duplicate_button",
              onClick: handleOperationClick,
              disabled
            }
          : {
              icon: IconName.Publish,
              labelKey: "reference_books__publish_button",
              onClick: handleOperationClick,
              disabled,
              orlyConfirmKey: "reference_books__header_orly_publish_button",
              orlyTextKey: "reference_books__header_orly_publish_text",
              orlyTitleKey: "reference_books__header_orly_publish_title",
              tooltipConfig: {labelKey: "reference_books__header_button_publish_tooltip"}
            }
      }
      deleteOrArchiveButtonConfig={{
        entityId: referenceBookChapterId,
        deleteHook: isPublished ? undefined : useDeleteReferenceBookChapter,
        archiveHook: isPublished ? useArchiveReferenceBookChapter : undefined,
        disabled: disabled,
        invisible: isPublished && !userMayArchive,
        onSuccess: navigateToOverview
      }}
    />
  )

  const footer = referenceBookOption
    .map(referenceBookChapter => (
      <ReferenceBookDetailFooter
        customStyles={refBookDetailStyles.footer}
        buttonText={t("preview")}
        creationDate={new Date(referenceBookChapter.createdAt)}
        author={`${referenceBookChapter.author?.firstName} ${referenceBookChapter.author?.lastName}`}
        onButtonClick={showPreview}
      />
    ))
    .orNull()

  const addButtonConfig: ButtonConfig = {
    labelKey: "reference_books__add_new_article",
    onClick: navigateToArticleCreation
  }

  return (
    <Content
      customContentContainerStyles={refBookDetailStyles.contentContainer}
      loading={dataLoading}
      isContentMissing={referenceBookOption.isEmpty()}
      subHeader={header}
      actionBar={footer}>
      {referenceBookOption
        .map(referenceBookChapter => (
          <div css={refBookDetailStyles.content}>
            <BookTableOfContents
              customStyles={refBookDetailStyles.tableOfContent}
              title={t("reference_books__table_of_contents")}
              bookChapters={bookChapters}
              addButtonConfig={!referenceBookChapter.publishedAt ? addButtonConfig : undefined}
              selectedEntityId={selectedEntityId}
              selectEntityId={selectEntityId}
              isArticleContentVisible={true}
              t={t}
            />
            <ReferenceBookArticleDetail
              referenceBookChapter={referenceBookChapter}
              selectedEntityId={selectedEntityId}
              selectEntityId={selectEntityId}
            />
            {isPreviewVisible && (
              <Overlay>
                <ReferenceBookDetailPreview referenceBookChapterId={referenceBookChapterId} onClose={hidePreview} />
              </Overlay>
            )}
          </div>
        ))
        .orNull()}
    </Content>
  )
}
