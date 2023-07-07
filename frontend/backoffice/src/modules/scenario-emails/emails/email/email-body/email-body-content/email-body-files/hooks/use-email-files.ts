import React from "react"
import {FileUsageType, Relevance, TextDocumentCreation} from "shared/graphql/generated/globalTypes"
import {useCreateFile, useDeleteFileFromScenario, useFilesForScenario} from "shared/graphql/hooks"
import {useCreateTextDocument} from "shared/graphql/hooks/mutations/text-document/use-create-textdocument"
import {DeleteEntityHook, Email, File as AppFile, UploadBinary} from "shared/models"

export interface UseEmailFilesHook {
  readonly files: AppFile[]
  readonly filesLoading: boolean
  readonly uploadVisible: boolean
  readonly deleteFileHook: () => DeleteEntityHook
  readonly uploadBinaries: (binaries: UploadBinary[]) => void
  readonly showUpload: () => void
  readonly hideUpload: () => void
  readonly createTextDocumentFile: (textDocument: TextDocumentCreation, title: string) => void
}

export const useEmailFiles = (email: Email): UseEmailFilesHook => {
  const {id, scenarioId} = email
  const [showUpload, setShowUpload] = React.useState(false)
  const {createFile} = useCreateFile({scenarioId})
  const {files: scenarioFiles, filesLoading} = useFilesForScenario(scenarioId)
  const deleteFileFromScenario = useDeleteFileFromScenario(scenarioId)
  const files = scenarioFiles
    .map(file => file.filter(f => f.usageType === FileUsageType.Email && f.emailId === email.id))
    .getOrElse([])
  const {createTextDocument} = useCreateTextDocument({scenarioId})

  const uploadBinaries = (binaries: UploadBinary[]) => {
    Promise.all(
      binaries.map(binary =>
        createFile({
          name: binary.data.filename,
          relevance: Relevance.PotentiallyHelpful,
          tags: [],
          emailId: id,
          usageType: FileUsageType.Email,
          ...{[binary.isSpreadsheet ? "spreadsheetId" : "binaryFileId"]: binary.data.id}
        })
      )
    )
      .catch(err => {
        console.error(err)
      })
      .finally(() => setShowUpload(false))
  }

  const createTextDocumentFile = (textDocument: TextDocumentCreation, title: string) => {
    createTextDocument(textDocument).then(textDocumentOption =>
      textDocumentOption.forEach(textDocument =>
        createFile({
          name: title,
          relevance: Relevance.PotentiallyHelpful,
          tags: [],
          usageType: FileUsageType.Email,
          textDocumentId: textDocument.id,
          emailId: email.id
        })
      )
    )
  }

  return {
    hideUpload: () => setShowUpload(false),
    showUpload: () => setShowUpload(true),
    uploadVisible: showUpload,
    deleteFileHook: () => deleteFileFromScenario,
    files,
    filesLoading,
    uploadBinaries,
    createTextDocumentFile
  }
}
