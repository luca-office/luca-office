import {round, sortBy} from "lodash-es"
import {DocumentActivity} from "./acitvity-overview-config"
import {Activity} from "./get-document-activity-from-survey-events"
import {UsageEvent} from "./get-tool-usage-for-all-participants"

export interface AllParticipantsActivity {
  readonly time: number
  readonly numOpenDocuments: number
}

export interface AllDocumentActivity {
  readonly documentActivity: DocumentActivity
  readonly activities: AllParticipantsActivity[]
  readonly totalActivity: number
}

type ParticipantDocumentActivities = Array<Map<DocumentActivity, Activity[]>>

export const getDocumentActivityForAllParticipants = (participantDocumentActivities: ParticipantDocumentActivities) => {
  const allDocumentActivities: AllDocumentActivity[] = [
    {documentActivity: DocumentActivity.IrrelevantDocuments, activities: [], totalActivity: 0},
    {documentActivity: DocumentActivity.RequiredDocuments, activities: [], totalActivity: 0},
    {documentActivity: DocumentActivity.Inactivity, activities: [], totalActivity: 0}
  ]

  return allDocumentActivities.map(documentActivity => {
    const documentActivities: {time: number; type: UsageEvent}[] = []
    let totalActivity = 0
    participantDocumentActivities.forEach(participant => {
      participant.get(documentActivity.documentActivity)?.forEach(activity => {
        documentActivities.push({time: activity.opened, type: UsageEvent.OpenEvent})
        documentActivities.push({time: activity.closed, type: UsageEvent.CloseEvent})
        totalActivity += round((activity.closed - activity.opened) / participantDocumentActivities.length, 0)
      })
    })

    const sortedDocumentActivities = sortBy(documentActivities, "time")

    const numOpenDocuments = [{time: 0, numOpenDocuments: 0}]
    sortedDocumentActivities.forEach((activity, i) => {
      numOpenDocuments.push({
        time: activity.time,
        numOpenDocuments:
          activity.type === UsageEvent.OpenEvent
            ? numOpenDocuments[i].numOpenDocuments + 1
            : numOpenDocuments[i].numOpenDocuments - 1
      })
    })

    return {
      documentActivity: documentActivity.documentActivity,
      activities: numOpenDocuments,
      totalActivity: totalActivity
    }
  })
}
