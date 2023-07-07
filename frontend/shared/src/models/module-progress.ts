import {ProjectModuleProgressType, ProjectModuleType} from "../graphql/generated/globalTypes"

export interface ModuleProgress {
  readonly moduleId: UUID
  readonly name: string
  readonly status: ProjectModuleProgressType | undefined
  readonly questionsCount: number
  readonly questionsCompleted: number
  readonly documentsCount: number
  readonly documentsOpened: number
  readonly moduleType: ProjectModuleType
  readonly score?: number
  readonly maxScore?: number
  readonly isScoringOfScenarioCompleted?: boolean
}
