export interface Directory {
  readonly id: string
  readonly createdAt: string
  readonly modifiedAt: string
  readonly name: string
  readonly parentDirectoryId: string | null
  readonly scenarioId: string | null
  readonly sampleCompanyId: string | null
}
