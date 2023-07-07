import {ModuleProgress} from "./module-progress"

export interface ParticipantProjectProgress {
  readonly id: UUID
  readonly displayName: string
  readonly moduleProgress: ModuleProgress[]
  readonly salutation?: string
  readonly token?: string
}
