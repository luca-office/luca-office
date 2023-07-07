import {MimeType} from "../graphql/generated/globalTypes"

export interface UploadBinary {
  readonly isSpreadsheet: boolean
  readonly data: {
    readonly id: UUID
    readonly createdAt: string
    readonly modifiedAt: string
    readonly filename: string
    readonly fileSize: number
    readonly mimeType: MimeType
  }
}
