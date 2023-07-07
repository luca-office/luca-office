import * as React from "react"
import {Option, uploadExcelFile} from "../../../../../utils"
import {useFetchErpEntities} from "../../../hooks"

export interface UseErpExcelImportDialogHook {
  readonly file: Option<File>
  readonly selectFile: (files: File[]) => void
  readonly deselectFile: () => void
  readonly uploading: boolean
  readonly uploadSuccessful: boolean
  readonly uploadError: null | string
  readonly uploadFile: () => void
  readonly fileUploaded: boolean
}

export const useErpExcelImportDialog = (sampleCompanyId: UUID, onDismiss: () => void): UseErpExcelImportDialogHook => {
  const [uploading, setUploading] = React.useState<boolean>(false)
  const [fileUploaded, setFileUploaded] = React.useState<boolean>(false)
  const [uploadSuccessful, setUploadSuccessful] = React.useState<boolean>(false)
  const [uploadError, setUploadError] = React.useState<null | string>(null)
  const [file, setFile] = React.useState<Option<File>>(Option.none())

  const {refetchAllErpEntities} = useFetchErpEntities(sampleCompanyId)

  const uploadFile = (file: File): Promise<void> => {
    setUploadSuccessful(false)
    setFileUploaded(false)
    setUploading(true)
    return new Promise<void>((resolve, reject) =>
      uploadExcelFile(sampleCompanyId, file)
        .then(refetchAllErpEntities)
        .then(() => {
          setUploading(false)
          setUploadSuccessful(true)
          setUploadError(null)
          setFileUploaded(true)
          resolve()
        })
        .catch(reject)
    )
  }

  const selectFile = (files: File[]) => setFile(Option.of(files[0]))
  const deselectFile = () => {
    setUploadSuccessful(false)
    setUploadError(null)
    setFileUploaded(false)
    setFile(Option.none())
  }

  const handleFileUpload = () =>
    file.forEach(f =>
      uploadFile(f)
        .then(() => onDismiss())
        .catch(err => {
          setUploadError(err.message)
          setUploading(false)
          setUploadSuccessful(false)
          setFileUploaded(true)
        })
    )

  return {
    file,
    selectFile,
    deselectFile,
    uploading,
    uploadSuccessful,
    uploadFile: handleFileUpload,
    fileUploaded,
    uploadError
  }
}
