import {LocalFile} from "../../hooks/use-upload-file-modal"

export const localFileMock: LocalFile = {
  id: "sdfosdkf",
  file: {
    arrayBuffer: jest.fn(),
    lastModified: 1,
    name: "sdf",
    size: 232,
    type: "application/pdf",
    slice: jest.fn(),
    stream: jest.fn(),
    text: jest.fn(),
    webkitRelativePath: "/mock"
  }
}
