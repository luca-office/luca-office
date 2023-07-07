import {
  Intervention,
  InterventionWithTimeOffset,
  LatestStartedProjectModule,
  LocalEmail,
  OfficeModule
} from "../../../models"
import {Option} from "../../../utils"
import {getElapsedTimeOfLaterStartToSurveyInSeconds} from "../../../utils/latest-started-project-module"

interface HandleInterventionsForLaterStartOfSurveyConfig {
  readonly activeModule: Option<OfficeModule>
  readonly latestStartedProjectModule: Option<LatestStartedProjectModule>
  readonly interventions: Intervention[]
  readonly delayInterventionEmail: (intervention: InterventionWithTimeOffset) => void
}

export const handleInterventionsForLaterStartOfSurvey = ({
  activeModule,
  latestStartedProjectModule,
  interventions,
  delayInterventionEmail
}: HandleInterventionsForLaterStartOfSurveyConfig) => {
  const elapsedTimeOfModuleInSeconds = getElapsedTimeOfLaterStartToSurveyInSeconds(
    activeModule,
    latestStartedProjectModule
  )

  interventions
    .filter(
      intervention =>
        intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention" &&
        intervention.timeOffsetInSeconds > elapsedTimeOfModuleInSeconds
    )
    .forEach(intervention => {
      intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention" &&
        delayInterventionEmail({
          ...intervention,
          timeOffsetInSeconds: intervention.timeOffsetInSeconds - elapsedTimeOfModuleInSeconds
        }) // fix type error that intervention has no timeoffset, despite the filter of corresponding typename
    })
}

interface HandleEmailsForLaterStartOfSurveyConfig {
  readonly activeModule: Option<OfficeModule>
  readonly latestStartedProjectModule: Option<LatestStartedProjectModule>
  readonly interventionEmailIds: UUID[]
  readonly allLocalEmails: LocalEmail[]
  readonly delayEmail: (localMail: LocalEmail) => void
  readonly setEmails: (localMails: LocalEmail[]) => void
}

export const handleEmailsForLaterStartOfSurvey = ({
  activeModule,
  latestStartedProjectModule,
  allLocalEmails,
  interventionEmailIds,
  delayEmail,
  setEmails
}: HandleEmailsForLaterStartOfSurveyConfig) => {
  const elapsedTimeOfModuleInSeconds = getElapsedTimeOfLaterStartToSurveyInSeconds(
    activeModule,
    latestStartedProjectModule
  )

  const mailsWithAdjustedReceptionDelayAndWithoutInterventions = allLocalEmails
    .map(mail => ({
      ...mail,
      receptionDelayInSeconds: mail.receptionDelayInSeconds - elapsedTimeOfModuleInSeconds
    }))
    .filter(mail => !interventionEmailIds.includes(mail.id))

  setEmails(mailsWithAdjustedReceptionDelayAndWithoutInterventions.filter(email => email.receptionDelayInSeconds <= 0))

  const delayedEmails = mailsWithAdjustedReceptionDelayAndWithoutInterventions.filter(
    email => email.receptionDelayInSeconds > 0
  )

  delayedEmails.forEach(email => delayEmail(email))
}
