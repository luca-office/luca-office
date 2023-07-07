import React from "react"
import {BinaryViewerTool, OfficeWindowType} from "../../enums"
import {
  ReferenceBookChapter,
  Scenario,
  ViewReferenceBookArticleEventPayload,
  ViewReferenceBookBinaryPayload
} from "../../models"
import {BinaryViewerState} from "../../redux/state/ui"
import {CustomStyle} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {
  convertReferenceBookChaptersToChapters,
  findSelectedReferenceBookArticle,
  findSelectedReferenceBookChapter,
  getSelectedReferenceBookChapterTitle,
  OpenBinaryEventProps,
  Option,
  searchReferenceBookChapters,
  sendOpenPdfBinaryEvent
} from "../../utils"
import {ReferenceBookTool} from "."

export interface ReferenceBookToolState {
  readonly selectedElementId: Option<UUID>
  readonly openWindows: Array<OfficeWindowType>
}

export interface ReferenceBookToolRemoteState {
  readonly scenarioReferenceBooks: Option<Array<ReferenceBookChapter>>
  readonly scenario: Option<Scenario>
  readonly scenarioLoading: boolean
  readonly scenarioReferenceBooksLoading: boolean
}

export interface ReferenceBookToolSurveyEvents {
  readonly sendViewReferenceBookChapterEvent: (chapterId: string) => void
  readonly sendViewReferenceBookArticleEvent: (payload: ViewReferenceBookArticleEventPayload) => void
  readonly sendSearchReferenceBookEvent: (query: string) => void
  readonly sendOpenImageBinaryEvent: (props: OpenBinaryEventProps) => void
  readonly sendOpenVideoBinaryEvent: (props: OpenBinaryEventProps) => void
  readonly sendOpenToolEvent: (tool: OfficeWindowType) => void
  readonly sendRestoreToolEvent: (tool: OfficeWindowType) => void
  readonly sendViewReferenceBookBinaryEvent: (payload: ViewReferenceBookBinaryPayload) => void
}

export interface ReferenceBookToolStateActions {
  readonly updateSelectedReferenceElementId: (id: Option<UUID>) => void
  readonly openBinary: (binaryId: UUID, url: string, viewerType: keyof BinaryViewerState, title?: string) => void
}

export interface ReferenceBookToolContainerProps extends CustomStyle {
  readonly scenarioId: UUID
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly useState: () => ReferenceBookToolState
  readonly useRemoteState: (scenarioId: UUID) => ReferenceBookToolRemoteState
  readonly useSurveyEvents: (scenarioId: UUID) => ReferenceBookToolSurveyEvents
  readonly useStateActions: () => ReferenceBookToolStateActions
}

export const ReferenceBookToolContainer: React.FC<ReferenceBookToolContainerProps> = ({
  scenarioId,
  onClose,
  onMinimize,
  useState,
  useRemoteState,
  useSurveyEvents,
  useStateActions,
  customStyles
}) => {
  const {t} = useLucaTranslation()
  const {scenarioReferenceBooks, scenario, scenarioLoading, scenarioReferenceBooksLoading} = useRemoteState(scenarioId)

  const {
    sendSearchReferenceBookEvent,
    sendViewReferenceBookArticleEvent,
    sendViewReferenceBookChapterEvent,
    sendOpenImageBinaryEvent,
    sendOpenVideoBinaryEvent,
    sendOpenToolEvent,
    sendRestoreToolEvent,
    sendViewReferenceBookBinaryEvent
  } = useSurveyEvents(scenarioId)

  const {selectedElementId, openWindows} = useState()

  const {openBinary, updateSelectedReferenceElementId} = useStateActions()

  const allReferenceBookChapters = scenarioReferenceBooks.map(chapters => chapters as ReferenceBookChapter[])

  const [searchPhrase, updateSearchPhrase] = React.useState("")

  const selectedChapter = findSelectedReferenceBookChapter(allReferenceBookChapters, selectedElementId)
  const selectedArticle = findSelectedReferenceBookArticle(allReferenceBookChapters, selectedElementId)

  const hideChapters = scenario.map(data => data.shouldHideReferenceBookChapters)
  const filteredReferenceBookChapters =
    searchPhrase && !scenarioReferenceBooksLoading && hideChapters.isDefined()
      ? Option.of(
          searchReferenceBookChapters(
            allReferenceBookChapters.getOrElse([]),
            searchPhrase,
            hideChapters.getOrElse(false)
          )
        )
      : allReferenceBookChapters

  const bookChapters = filteredReferenceBookChapters.map(chapters =>
    convertReferenceBookChaptersToChapters(t, chapters, true)
  )

  const selectedChapterTitle = getSelectedReferenceBookChapterTitle(
    allReferenceBookChapters,
    selectedChapter,
    selectedArticle
  )

  const selectElementId = (id: Option<UUID>) => {
    id.forEach(elementId => {
      const isChapter = scenarioReferenceBooks.getOrElse([]).some(book => book.id === elementId)

      if (isChapter) {
        sendViewReferenceBookChapterEvent(elementId)
      } else {
        selectedChapter.forEach(chapter =>
          sendViewReferenceBookArticleEvent({articleId: elementId, chapterId: chapter.id, scenarioId})
        )
      }
    })

    updateSelectedReferenceElementId(id)
  }

  const openImageFile = (binaryFileId: UUID, url: string, title?: string) => {
    openWindows.includes(BinaryViewerTool.ImageViewer)
      ? sendRestoreToolEvent(BinaryViewerTool.ImageViewer)
      : sendOpenToolEvent(BinaryViewerTool.ImageViewer)

    selectedArticle.forEach(article =>
      sendViewReferenceBookBinaryEvent({
        articleId: article.id,
        binaryFileId,
        chapterId: article.referenceBookChapterId,
        scenarioId
      })
    )

    sendOpenImageBinaryEvent({binaryFileId, binaryFileTitle: title ?? "", binaryFileUrl: url})
    openBinary(binaryFileId, url, "imageViewer", title)
  }

  const openVideoFile = (binaryFileId: UUID, url: string, title?: string) => {
    openWindows.includes(BinaryViewerTool.VideoPlayer)
      ? sendRestoreToolEvent(BinaryViewerTool.VideoPlayer)
      : sendOpenToolEvent(BinaryViewerTool.VideoPlayer)

    selectedArticle.forEach(article =>
      sendViewReferenceBookBinaryEvent({
        articleId: article.id,
        binaryFileId,
        chapterId: article.referenceBookChapterId,
        scenarioId
      })
    )

    sendOpenVideoBinaryEvent({binaryFileId, binaryFileTitle: title ?? "", binaryFileUrl: url})
    openBinary(binaryFileId, url, "videoPlayer", title)
  }

  const openPdfFile = (binaryFileId: UUID, url: string, title?: string) => {
    openWindows.includes(BinaryViewerTool.PDFViewer)
      ? sendRestoreToolEvent(BinaryViewerTool.PDFViewer)
      : sendOpenToolEvent(BinaryViewerTool.PDFViewer)

    selectedArticle.forEach(article =>
      sendViewReferenceBookBinaryEvent({
        articleId: article.id,
        binaryFileId,
        chapterId: article.referenceBookChapterId,
        scenarioId
      })
    )

    sendOpenPdfBinaryEvent({binaryFileId, binaryFileTitle: title ?? "", binaryFileUrl: url})
    openBinary(binaryFileId, url, "pdfViewer", title)
  }

  const handleSearch = (value: string) => {
    sendSearchReferenceBookEvent(value)

    updateSearchPhrase(value)
  }

  const referenceBookToolProps = {
    onClose,
    onMinimize,
    customStyles,
    chapterTitle: selectedChapterTitle,
    dataLoading: scenarioReferenceBooksLoading || scenarioLoading,
    hideChapters: hideChapters.getOrElse(false),
    onSearch: handleSearch,
    openImage: openImageFile,
    openVideo: openVideoFile,
    openPdf: openPdfFile,
    referenceBookChapters: bookChapters,
    selectedArticle: selectedArticle,
    selectedChapter: selectedChapter,
    selectedElementId,
    selectElementId
  }

  return <ReferenceBookTool {...referenceBookToolProps} />
}
