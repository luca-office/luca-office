import {BinaryFile} from "../../models"
import {MimeType} from "../generated/globalTypes"

export const binaryFileMock: BinaryFile = {
  __typename: "BinaryFile",
  id: "cb61882e-ef31-4603-b9e7-b9272e3b7651",
  mimeType: MimeType.ApplicationPdf,
  url: "mock-url",
  createdAt: "",
  modifiedAt: "null",
  fileSize: 0,
  filename: ""
}
