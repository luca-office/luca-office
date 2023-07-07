import {useDispatch} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {ViewReferenceBookArticleEventPayload, ViewReferenceBookBinaryPayload} from "shared/models"
import {ReferenceBookToolSurveyEvents} from "shared/office-tools/reference-book"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {OpenBinaryEventProps} from "shared/utils"
import {createPreviewEvent} from "../../utils"

export const useReferenceBookToolSurveyEvents = (scenarioId: UUID): ReferenceBookToolSurveyEvents => {
  const dispatch = useDispatch()

  const sendViewReferenceBookChapterEvent = (chapterId: string) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.ViewReferenceBookChapter, {scenarioId, chapterId}))
    )

  const sendViewReferenceBookArticleEvent = (payload: ViewReferenceBookArticleEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.ViewReferenceBookArticle, payload)))

  const sendSearchReferenceBookEvent = (query: string) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.SearchReferenceBook, {scenarioId, query})))

  const sendOpenImageBinaryEvent = (props: OpenBinaryEventProps) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenImageBinary, {scenarioId, ...props})))

  const sendOpenVideoBinaryEvent = (props: OpenBinaryEventProps) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenVideoBinary, {scenarioId, ...props})))

  const sendOpenToolEvent = (tool: OfficeWindowType) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenTool, {scenarioId, tool})))

  const sendRestoreToolEvent = (tool: OfficeWindowType) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.RestoreTool, {scenarioId, tool})))

  const sendViewReferenceBookBinaryEvent = (payload: ViewReferenceBookBinaryPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.ViewReferenceBookBinary, payload)))

  return {
    sendViewReferenceBookChapterEvent,
    sendViewReferenceBookArticleEvent,
    sendSearchReferenceBookEvent,
    sendOpenImageBinaryEvent,
    sendOpenVideoBinaryEvent,
    sendOpenToolEvent,
    sendRestoreToolEvent,
    sendViewReferenceBookBinaryEvent
  }
}
