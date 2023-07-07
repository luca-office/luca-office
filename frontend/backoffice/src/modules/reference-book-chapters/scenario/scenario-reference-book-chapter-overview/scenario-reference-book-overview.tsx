import {css} from "@emotion/react"
import * as React from "react"
import {
  BookTableOfContents,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardText,
  Checkbox,
  Content,
  DeleteOrArchiveEntityButton,
  Heading,
  Overlay,
  PdfViewer,
  ReferenceBookArticle,
  ReferenceBookChapter,
  Tooltip
} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {buttonHeight, headerButtonWidth, spacingMedium, tocFooterHeight} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getSelectedReferenceBookChapterTitle, Option} from "shared/utils"
import {ResortModal, SubHeaderDetailContainer} from "../../../../components"
import {Route} from "../../../../routes"
import {ReferenceBookPreview} from "../preview/reference-book-preview"
import {useScenarioReferenceBookOverview} from "./hooks/use-scenario-reference-book-overview"

export interface ScenarioReferenceBookOverviewProps {
  readonly scenarioId: UUID
  readonly referenceBookChapterId?: UUID
  readonly articleId?: UUID
}

export const ScenarioReferenceBookOverview: React.FunctionComponent<ScenarioReferenceBookOverviewProps> = ({
  scenarioId,
  referenceBookChapterId,
  articleId
}) => {
  const {t} = useLucaTranslation()
  const {
    addChapter,
    removeChapter,
    isBundled,
    hideSortOverlay,
    loading,
    showPreview,
    hidePreview,
    isPreviewVisible,
    repositionChapter,
    repositionChapterLoading,
    scenarioReferenceBooks,
    scenarioChapters,
    selectedEntityId,
    selectEntityId,
    selectedArticle,
    selectedReferenceBook,
    handleBundleChapters,
    showSortOverlay,
    sortableChapters,
    sortChaptersOverlayVisible,
    isScenarioReadOnly,
    openPdf,
    hidePdf,
    selectedPdf
  } = useScenarioReferenceBookOverview(scenarioId, referenceBookChapterId, articleId)

  const tableHeaderControls = [
    <Tooltip title={t("files_and_directories__disabled_tooltip")} inactive={!isScenarioReadOnly} key={"sort"}>
      <Button
        icon={IconName.Sort}
        variant={ButtonVariant.IconOnly}
        onClick={showSortOverlay}
        disabled={!sortableChapters.length || isScenarioReadOnly}
      />
    </Tooltip>
  ]

  const header = (
    <SubHeaderDetailContainer
      returnTo={{
        text: t("scenario_details__header_label"),
        route: Route.ScenarioDetail,
        params: {scenarioId}
      }}
      title={t("reference_books__header_label")}
      buttonText={t("preview")}
      onButtonClick={showPreview}
      customStyles={styles.wideButton}
    />
  )

  const footer = (
    <Card hasShadow={true} customStyles={styles.footer}>
      <CardHeader customStyles={styles.footerHeader}>
        <Heading level={HeadingLevel.h3}>{t("reference_books__scenario_chapter_setting_title")}</Heading>
        <Tooltip inactive={!isScenarioReadOnly} title={t("files_and_directories__disabled_tooltip")}>
          <Checkbox
            disabled={isScenarioReadOnly}
            checked={isBundled}
            onChange={event => handleBundleChapters(event.target.checked)}
          />
        </Tooltip>
      </CardHeader>
      <CardContent>
        <CardText customStyles={styles.footerContent}>{t("reference_books__scenario_chapter_setting_hint")}</CardText>
      </CardContent>
    </Card>
  )

  return (
    <React.Fragment>
      <Content subHeader={header}>
        <div css={styles.gridWrapper}>
          <BookTableOfContents
            loading={loading}
            title={t("reference_books__table_of_contents")}
            selectedEntityId={selectedEntityId}
            selectEntityId={selectEntityId}
            bookChapters={scenarioChapters.getOrElse([])}
            fadeChapters={isBundled}
            customStyles={styles.content(scenarioReferenceBooks.getOrElse([]).length > 0)}
            customFooterStyles={styles.tocFooter}
            placeholderHeadline={t("reference_books__scenario_no_chapters_added")}
            placeholderHint={t("reference_books__scenario_please_add_chapters")}
            actionFooter={footer}
            addButtonConfig={{
              labelKey: "reference_books__scenario_add_chapter",
              onClick: addChapter,
              disabled: isScenarioReadOnly || loading,
              tooltipKey: isScenarioReadOnly ? "files_and_directories__disabled_tooltip" : undefined
            }}
            headerButtons={tableHeaderControls}
            t={t}
          />
          {selectedArticle.isDefined() ? (
            <ReferenceBookArticle
              article={selectedArticle}
              dataLoading={loading}
              chapterTitle={getSelectedReferenceBookChapterTitle(
                scenarioReferenceBooks,
                selectedReferenceBook,
                selectedArticle
              ).orUndefined()}
              openPdf={openPdf}
            />
          ) : (
            <ReferenceBookChapter
              isBundled={isBundled}
              chapter={selectedReferenceBook}
              dataLoading={loading}
              selectArticle={selectEntityId}
              headerInfo={
                isBundled && selectedReferenceBook.isDefined()
                  ? t("reference_books__chapters_bundled_header_info")
                  : undefined
              }
              headerChild={
                selectedReferenceBook.orUndefined() && (
                  <DeleteOrArchiveEntityButton
                    entityId={selectedReferenceBook.map(referenceBookChapter => referenceBookChapter.id).getOrElse("")}
                    useDeleteHook={removeChapter}
                    customStyles={styles.deleteButton}
                  />
                )
              }
            />
          )}
        </div>
      </Content>
      {sortChaptersOverlayVisible && (
        <ResortModal
          disabled={repositionChapterLoading}
          entities={sortableChapters}
          onConfirm={repositionChapter}
          onDismiss={hideSortOverlay}
          tableLabel={t("reference_books__sort_chapters_table_of_contents_label", {count: sortableChapters.length})}
          titleKey={"reference_books__sort_chapters_title"}
        />
      )}
      {isPreviewVisible && (
        <Overlay>
          <ReferenceBookPreview
            customStyles={styles.preview}
            scenarioId={scenarioId}
            onClose={hidePreview}
            isBundled={isBundled}
          />
        </Overlay>
      )}
      {selectedPdf
        .map(pdf => (
          <Overlay>
            <PdfViewer
              customStyles={styles.pdfViewer}
              binaries={[{id: pdf.id, title: pdf.title, path: pdf.path}]}
              onClose={hidePdf}
              selectedBinaryId={Option.of(pdf.id)}
            />
          </Overlay>
        ))
        .orNull()}
    </React.Fragment>
  )
}

const styles = {
  gridWrapper: css({
    flex: "1 1 auto",
    display: "grid",
    gap: spacingMedium,
    gridTemplateColumns: "350px minmax(0, 4fr)"
  }),
  content: (centerContent: boolean) =>
    css({
      height: `calc(100vh - ${buttonHeight}px - ${tocFooterHeight}px)`,

      "> div[class$='-content']": centerContent
        ? {overflow: "auto"}
        : {overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center"}
    }),
  footer: css({
    marginTop: spacingMedium
  }),
  footerHeader: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }),
  footerContent: css({
    paddingTop: 0
  }),
  tocFooter: css({
    height: "auto"
  }),
  deleteButton: css({
    marginLeft: spacingMedium
  }),
  wideButton: css({
    button: {
      width: headerButtonWidth
    }
  }),
  preview: css({width: "90%", height: "90%"}),
  pdfViewer: css({
    height: "80vh",
    width: "80vh"
  })
}
