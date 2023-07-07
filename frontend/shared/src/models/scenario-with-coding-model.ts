import {CodingModel, UserAccount} from "."

export interface ScenarioExtendedWithCodingModel {
  readonly id: UUID
  readonly name: string
  readonly maxDurationInSeconds: number | null
  readonly createdAt: string
  readonly description: string
  readonly finalizedAt: string | null
  readonly publishedAt: string | null
  readonly codingModel: CodingModel
  readonly author: Pick<UserAccount, "id" | "lastName">
}
