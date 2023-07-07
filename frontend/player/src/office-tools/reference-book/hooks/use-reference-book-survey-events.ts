import {OfficeWindowType} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {ViewReferenceBookArticleEventPayload, ViewReferenceBookBinaryPayload} from "shared/models"
import {ReferenceBookToolSurveyEvents} from "shared/office-tools/reference-book"
import {
  OpenBinaryEventProps,
  sendBaseSurveyEvent,
  sendOpenImageBinaryEvent,
  sendOpenToolEvent,
  sendOpenVideoBinaryEvent,
  sendRestoreToolEvent,
  sendScenarioSurveyEvent
} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useReferenceBookToolSurveyEvents = (scenarioId: UUID): ReferenceBookToolSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const withSurveyParams = (handler: (surveyId: UUID, invitation: UUID, scenarioId: UUID) => void) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => handler(surveyId, invitationId, scenarioId))
    )

  const sendViewReferenceBookChapterEvent = (chapterId: string) =>
    withSurveyParams((surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
      sendScenarioSurveyEvent({
        surveyId,
        invitationId,
        scenarioId,
        eventType: SurveyEventType.ViewReferenceBookChapter,
        data: {
          scenarioId,
          chapterId
        }
      })
    )

  const sendViewReferenceBookArticleEvent = (payload: ViewReferenceBookArticleEventPayload) =>
    withSurveyParams((surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
      sendScenarioSurveyEvent({
        surveyId,
        invitationId,
        scenarioId,
        eventType: SurveyEventType.ViewReferenceBookArticle,
        data: {
          ...payload,
          scenarioId
        }
      })
    )

  const sendViewReferenceBookBinaryEvent = (payload: ViewReferenceBookBinaryPayload) =>
    withSurveyParams((surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
      sendBaseSurveyEvent<ViewReferenceBookBinaryPayload>({
        surveyId,
        invitationId,
        eventType: SurveyEventType.ViewReferenceBookBinary,
        data: {
          ...payload,
          scenarioId
        }
      })
    )

  const sendSearchReferenceBookEvent = (query: string) =>
    withSurveyParams((surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
      sendScenarioSurveyEvent({
        surveyId,
        invitationId,
        scenarioId,
        eventType: SurveyEventType.SearchReferenceBook,
        data: {
          scenarioId,
          query
        }
      })
    )

  const sendOpenImageBinaryEventInternal = (props: OpenBinaryEventProps) =>
    withSurveyParams(sendOpenImageBinaryEvent(props))

  const sendOpenVideoBinaryEventInternal = (props: OpenBinaryEventProps) =>
    withSurveyParams(sendOpenVideoBinaryEvent(props))

  const sendOpenToolEventInternal = (tool: OfficeWindowType) => withSurveyParams(sendOpenToolEvent(tool))

  const sendRestoreToolEventInternal = (tool: OfficeWindowType) => withSurveyParams(sendRestoreToolEvent(tool))

  return {
    sendViewReferenceBookChapterEvent,
    sendViewReferenceBookArticleEvent,
    sendSearchReferenceBookEvent,
    sendOpenImageBinaryEvent: sendOpenImageBinaryEventInternal,
    sendOpenVideoBinaryEvent: sendOpenVideoBinaryEventInternal,
    sendOpenToolEvent: sendOpenToolEventInternal,
    sendRestoreToolEvent: sendRestoreToolEventInternal,
    sendViewReferenceBookBinaryEvent
  }
}
