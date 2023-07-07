import * as React from "react"
import {useCheckLogin, useInviteSurveyRaters} from "shared/graphql/hooks"
import {ratingsQuery} from "shared/graphql/queries"
import {exists} from "shared/utils"

export interface UseRaterInvitationOverlayHook {
  readonly dataLoading: boolean
  readonly actionLoading: boolean
  readonly inviteRaters: (emails: string[]) => Promise<void>
  readonly setEmails: (emails: string[]) => void
  readonly showRaterWarning: boolean
}

interface UseRaterInvitationOverlayParams {
  readonly surveyId: UUID
  readonly onDismiss: () => void
}

export const useRaterInvitationOverlay = ({
  surveyId,
  onDismiss
}: UseRaterInvitationOverlayParams): UseRaterInvitationOverlayHook => {
  const [emailAddresses, setEmailAddresses] = React.useState<string[]>([])

  const {account, checkLoginLoading: accountLoading} = useCheckLogin()
  const {inviteSurveyRaters, inviteSurveyRatersLoading} = useInviteSurveyRaters(surveyId, [
    {query: ratingsQuery, variables: {surveyId}}
  ])

  const showRaterWarning = account
    .map(({email}) => exists(emailAddress => emailAddress === email, emailAddresses))
    .getOrElse(false)

  const inviteRaters = (emails: string[]) =>
    new Promise<void>((resolve, reject) => {
      inviteSurveyRaters(emails)
        .then(() => {
          onDismiss()
          resolve()
        })
        .catch(reject)
    })

  const setEmails = (emails: string[]) => setEmailAddresses(emails)

  return {
    dataLoading: accountLoading,
    actionLoading: inviteSurveyRatersLoading,
    inviteRaters,
    setEmails,
    showRaterWarning
  }
}
