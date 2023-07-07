import {FileType} from "../../../enums"
import {FileUsageType, MimeType, Relevance} from "../../../graphql/generated/globalTypes"
import {File} from "../../../models"

export const fileMockPNG: File = {
  fileType: FileType.Media,
  id: "123",
  binaryFileId: "fsfjd-sdflkjsd",
  binaryFileUrl: "www.url.de",
  directoryId: "sdöflksd-sdfijsd-sdfds",
  emailId: "dsfpos-weirje-aasd-243q",
  relevance: Relevance.PotentiallyHelpful,
  tags: [],
  usageType: FileUsageType.FileSystem,
  name: "file.png",
  binaryFile: {
    __typename: "BinaryFile",
    filename: "file1.png",
    fileSize: 0,
    createdAt: new Date(2021, 1, 1).toISOString(),
    modifiedAt: new Date(2021, 1, 1).toISOString(),
    id: "2af6deab-4888-422a-9516-4fe40479d5e3",
    mimeType: MimeType.ImagePng,
    url: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3"
  }
}

export const fileMockPDF: File = {
  fileType: FileType.Media,
  id: "12343",
  binaryFileId: "fsfjd-sdflkjsdsdfd",
  binaryFileUrl: "www.url.de",
  directoryId: "sdöflksd-sdfijsd-sdfds",
  emailId: "dsfpos-weirje-aasd-243q",
  relevance: Relevance.PotentiallyHelpful,
  tags: [],
  usageType: FileUsageType.FileSystem,
  name: "file.pdf",
  binaryFile: {
    __typename: "BinaryFile",
    filename: "file1.pdf",
    fileSize: 0,
    createdAt: new Date(2021, 1, 1).toISOString(),
    modifiedAt: new Date(2021, 1, 1).toISOString(),
    id: "2af6deab-4888-422a-9516-4fe40479d5e3",
    mimeType: MimeType.ApplicationPdf,
    url: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3"
  }
}
