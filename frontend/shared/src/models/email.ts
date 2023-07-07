import {EmailFragment} from "../graphql/generated/EmailFragment"
import {EmailDirectory, Relevance} from "../graphql/generated/globalTypes"

export type Email = EmailFragment

export interface LocalEmail {
  id: string
  sender: string | null
  recipient: string | null
  ccRecipients: string[]
  subject: string
  directory: EmailDirectory
  receptionDelayInSeconds: number
  isRead: boolean
  relevance: Relevance
  message: string
  scenarioId: string
  isVisible: boolean
}
