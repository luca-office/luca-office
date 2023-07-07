import * as React from "react"
import {
  BookTableOfContents,
  OfficeWindow,
  ReferenceBookArticle,
  ReferenceBookChapter,
  WindowActionBar
} from "../../components"
import {ViewerToolsType} from "../../enums"
import {
  ReferenceBookArticle as ReferenceBookArticleProps,
  ReferenceBookChapter as ReferenceBookChapterProps,
  TocChapter
} from "../../models"
import {CustomStyle} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Option} from "../../utils"
import {referenceBookToolStyle as styles} from "./reference-book-tool.style"

export interface AutomatedCriterionReferenceBooksConfig {
  readonly onArticleClick?: (articleId: UUID) => void
}

export interface ReferenceBookToolProps extends CustomStyle {
  readonly chapterTitle: Option<string>
  readonly dataLoading: boolean
  readonly hideChapters: boolean
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly onSearch: (value: string) => void
  readonly openImage: (id: UUID, url: string, title?: string) => void
  readonly openVideo: (id: UUID, url: string, title?: string) => void
  readonly openPdf: (id: UUID, url: string, title?: string) => void
  readonly referenceBookChapters: Option<TocChapter[]>
  readonly selectedArticle: Option<ReferenceBookArticleProps>
  readonly selectedChapter: Option<ReferenceBookChapterProps>
  readonly selectedElementId: Option<UUID>
  readonly selectElementId: (id: Option<UUID>) => void
  readonly automatedCriterionConfig?: AutomatedCriterionReferenceBooksConfig
}

export const ReferenceBookTool: React.FC<ReferenceBookToolProps> = ({
  automatedCriterionConfig,
  chapterTitle,
  customStyles,
  dataLoading,
  hideChapters,
  onClose,
  onMinimize,
  onSearch,
  openImage,
  openVideo,
  openPdf,
  referenceBookChapters,
  selectedArticle,
  selectedChapter,
  selectedElementId,
  selectElementId
}) => {
  const {t} = useLucaTranslation()
  return (
    <OfficeWindow
      customStyles={[styles.window, customStyles]}
      toolType={ViewerToolsType.ReferenceBook}
      onClose={onClose}
      onMinimize={onMinimize}>
      <WindowActionBar onSearchChange={onSearch} searchPlaceHolderKey={"reference_book__search"} />
      <div css={styles.content}>
        <BookTableOfContents
          readonly={true}
          bookChapters={referenceBookChapters.getOrElse([])}
          title={t("reference_book__contents")}
          selectedEntityId={selectedElementId}
          selectEntityId={selectElementId}
          customStyles={[styles.card, styles.tableOfContentsCard]}
          customFooterStyles={automatedCriterionConfig ? styles.footer : undefined}
          hideChapters={hideChapters}
          loading={dataLoading}
          placeholderHeadline={t("reference_book__placeholder_title")}
          placeholderHint={t("reference_book__placeholder")}
          isRootCollapsible={true}
          t={t}
        />
        {selectedArticle
          .map(() => (
            <ReferenceBookArticle
              automatedCriterionConfig={automatedCriterionConfig}
              customStyles={[styles.card, styles.cardContentWrapper]}
              article={selectedArticle}
              dataLoading={dataLoading}
              selectImage={openImage}
              selectVideo={openVideo}
              openPdf={openPdf}
              chapterTitle={hideChapters ? undefined : chapterTitle.getOrElse(t("reference_book__placeholder_title"))}
            />
          ))
          .getOrElse(
            <ReferenceBookChapter
              customStyles={[styles.card, styles.cardContentWrapper]}
              chapter={selectedChapter}
              dataLoading={dataLoading}
              selectArticle={selectElementId}
            />
          )}
      </div>
    </OfficeWindow>
  )
}
