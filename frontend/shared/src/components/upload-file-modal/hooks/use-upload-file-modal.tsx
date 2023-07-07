import {Dispatch, SetStateAction, useState} from "react"
import {UploadFileType as FileType} from "../../../enums"
import {LocalTextDocument, UploadBinary} from "../../../models"
import {createUUID, uploadBinary} from "../../../utils"

export interface LocalFile {
  readonly id: UUID
  readonly file: File
}

export interface UseUploadFileModalHook {
  readonly acceptedFileTypes: FileType[]
  readonly deselectFile: (file: LocalFile) => void
  readonly isUploading: boolean
  readonly selectedFiles: LocalFile[]
  readonly selectFiles: (files: File[]) => void
  readonly selectedTextDocuments: LocalTextDocument[]
  readonly selectTextDocument: (textDocument: LocalTextDocument) => void
  readonly deselectTextDocument: (textDocument: LocalTextDocument) => void
  readonly setAcceptedFileTypes: Dispatch<SetStateAction<FileType[]>>
  readonly uploadBinaries: () => void
}

export interface UseUploadFileModalParams {
  readonly onUploadSuccess: (binaries: UploadBinary[], files: File[]) => void
  readonly defaultSelectedFileTypes?: FileType[]
  readonly isLimitedToSingleItem: boolean
  readonly onUploadedFailed?: () => void
  readonly createTextDocumentFile?: (textDocument: LocalTextDocument) => void
}

export const useUploadFileModal = ({
  onUploadSuccess,
  defaultSelectedFileTypes,
  isLimitedToSingleItem,
  onUploadedFailed,
  createTextDocumentFile
}: UseUploadFileModalParams): UseUploadFileModalHook => {
  const [acceptedFileTypes, setAcceptedFileTypes] = useState<FileType[]>(defaultSelectedFileTypes ?? [])
  const [selectedFiles, setSelectedFiles] = useState<LocalFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedTextDocuments, setSelectedTextDocuments] = useState<LocalTextDocument[]>([])

  const selectFiles = (files: File[]) => {
    const newFiles = [...selectedFiles, ...files.map(file => ({id: createUUID(), file}))]
    setSelectedFiles(isLimitedToSingleItem ? newFiles.splice(0, 1) : newFiles)
  }

  const selectTextDocument = (document: LocalTextDocument) => {
    const newDocuments = [...selectedTextDocuments, document]
    setSelectedTextDocuments(isLimitedToSingleItem ? newDocuments.splice(0, 1) : newDocuments)
  }

  const deselectTextDocument = (document: LocalTextDocument) => {
    setSelectedTextDocuments(selectedTextDocuments.filter(textDocument => textDocument.id !== document.id))
  }

  const deselectFile = (fileToBeDeselected: LocalFile) =>
    setSelectedFiles(selectedFiles.filter(localFile => localFile.id !== fileToBeDeselected.id))

  const uploadBinaries = () => {
    setIsUploading(true)
    const files = selectedFiles.map(localFile => localFile.file)
    Promise.all(files.map(uploadBinary))
      .then(uploadedBinaries => {
        setIsUploading(false)
        onUploadSuccess(uploadedBinaries, files)
      })
      .catch(() => onUploadedFailed?.())
    createTextDocumentFile && selectedTextDocuments.map(textDocument => createTextDocumentFile(textDocument))
  }

  return {
    deselectFile,
    isUploading,
    selectedFiles,
    acceptedFileTypes,
    selectFiles,
    setAcceptedFileTypes,
    uploadBinaries,
    selectedTextDocuments,
    deselectTextDocument,
    selectTextDocument
  }
}
