import {Dispatch, SetStateAction, useState} from "react"
import {useDispatch} from "react-redux"
import {FileUsageType, Relevance, TextDocumentCreation} from "shared/graphql/generated/globalTypes"
import {useCreateFile, useFilesForScenario} from "shared/graphql/hooks"
import {useCreateTextDocument} from "shared/graphql/hooks/mutations/text-document/use-create-textdocument"
import {File, UploadBinary} from "shared/models"
import {TextDocumentCreationInfo} from "shared/models/text-document-creation-info"
import {Option} from "shared/utils"
import {DirectoryUpdate} from "../../../../../graphql/generated/globalTypes"
import {useDirectoriesForScenario} from "../../../../../graphql/hooks"
import {useUpdateDirectory} from "../../../../../graphql/hooks/mutations/directory/update-directory"
import {Directory} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {expandDirectoriesAction} from "../../../../../redux/actions/ui/scenarios/directories-and-files-action"
import {Route} from "../../../../../routes"

export interface UseDirectoryDetailHook {
  readonly allDirectories: Directory[]
  readonly allFiles: File[]
  readonly createFilesFromBinaries: (uploadedBinaries: UploadBinary[], directoryId: UUID) => void
  readonly dataLoading: boolean
  readonly deselectDirectory: () => void
  readonly expandDirectoryId: (id: UUID) => void
  readonly handleCreateSubdirectory: (directoryId: UUID, subdirectoryId: UUID) => void
  readonly hideCreateFileOverlay: () => void
  readonly hideCreateSubdirectoryOverlay: () => void
  readonly isCreateFileOverlayVisible: boolean
  readonly isCreateSubdirectoryOverlayVisible: boolean
  readonly isUpdateDirectoryOverlayVisible: boolean
  readonly navigateToSampleCompany: () => void
  readonly selectDirectory: (directoryId: UUID) => void
  readonly selectFile: (fileId: UUID) => void
  readonly setIsUpdateDirectoryOverlayVisible: Dispatch<SetStateAction<boolean>>
  readonly showCreateFileOverlay: () => void
  readonly showCreateSubdirectoryOverlay: () => void
  readonly updateDirectory: (id: UUID, update: DirectoryUpdate) => Promise<Option<Directory>>
  readonly updateInProgress: boolean
  readonly createTextDocumentFile: (textDocumentCreationInfo: TextDocumentCreationInfo) => void
}

export const useDirectoryDetail = (scenarioId: UUID, sampleCompanyId?: UUID): UseDirectoryDetailHook => {
  const dispatch = useDispatch()

  const {updateDirectory, updateDirectoryLoading} = useUpdateDirectory()
  const {createFile} = useCreateFile({scenarioId})
  const {directories, directoriesLoading} = useDirectoriesForScenario(scenarioId)
  const {files, filesLoading} = useFilesForScenario(scenarioId)
  const {createTextDocument} = useCreateTextDocument({scenarioId})

  const [isCreateFileOverlayVisible, updateIsCreateFileOverlayVisible] = useState(false)
  const [isCreateSubdirectoryOverlayVisible, updateIsCreateSubdirectoryOverlayVisible] = useState(false)
  const [isUpdateDirectoryOverlayVisible, setIsUpdateDirectoryOverlayVisible] = useState(false)

  const expandDirectoryId = (directoryId: UUID) => {
    dispatch(expandDirectoriesAction([directoryId]))
  }

  const showCreateFileOverlay = () => updateIsCreateFileOverlayVisible(true)

  const hideCreateFileOverlay = () => updateIsCreateFileOverlayVisible(false)

  const showCreateSubdirectoryOverlay = () => updateIsCreateSubdirectoryOverlayVisible(true)

  const hideCreateSubdirectoryOverlay = () => updateIsCreateSubdirectoryOverlayVisible(false)

  const handleUpdateDirectory = (id: UUID, update: DirectoryUpdate) => updateDirectory(id, update)

  const handleCreateSubdirectory = (directoryId: UUID, subdirectoryId: UUID) => {
    hideCreateSubdirectoryOverlay()
    dispatch(navigateToRouteAction(Route.ScenarioDirectoriesDetail, {scenarioId, directoryId: subdirectoryId}))
    dispatch(expandDirectoriesAction([directoryId]))
  }

  const createFilesFromBinaries = (uploadedBinaries: UploadBinary[], directoryId: UUID) => {
    Promise.all(
      uploadedBinaries.map(binary =>
        createFile({
          name: binary.data.filename,
          relevance: Relevance.PotentiallyHelpful,
          tags: [],
          usageType: FileUsageType.FileSystem,
          directoryId,
          ...{[binary.isSpreadsheet ? "spreadsheetId" : "binaryFileId"]: binary.data.id}
        })
      )
    )
      .then(hideCreateFileOverlay)
      .catch(err => console.error(err))
  }

  const createTextDocumentFile = (textDocumentCreationInfo: TextDocumentCreationInfo) => {
    createTextDocument(textDocumentCreationInfo.textDocument).then(textDocumentOption =>
      textDocumentOption.forEach(textDocument =>
        createFile({
          name: textDocumentCreationInfo.title,
          relevance: Relevance.PotentiallyHelpful,
          tags: [],
          usageType: FileUsageType.FileSystem,
          textDocumentId: textDocument.id,
          directoryId: textDocumentCreationInfo.directoryId
        })
      )
    )
  }

  const selectDirectory = (directoryId: UUID) =>
    dispatch(navigateToRouteAction(Route.ScenarioDirectoriesDetail, {scenarioId, directoryId}))

  const selectFile = (fileId: UUID) =>
    dispatch(
      navigateToRouteAction(Route.ScenarioFilesDetail, {
        scenarioId,
        fileId
      })
    )

  const deselectDirectory = () => dispatch(navigateToRouteAction(Route.ScenarioFiles, {scenarioId}))
  const navigateToSampleCompany = () =>
    dispatch(navigateToRouteAction(Route.ScenarioAssignedSampleCompanyDetail, {sampleCompanyId, scenarioId}))

  return {
    allDirectories: directories.getOrElse([]),
    allFiles: files.getOrElse([]),
    createFilesFromBinaries,
    dataLoading: directoriesLoading || filesLoading,
    deselectDirectory,
    expandDirectoryId,
    handleCreateSubdirectory,
    hideCreateFileOverlay,
    hideCreateSubdirectoryOverlay,
    isCreateFileOverlayVisible,
    isCreateSubdirectoryOverlayVisible,
    isUpdateDirectoryOverlayVisible,
    navigateToSampleCompany,
    selectDirectory,
    selectFile,
    setIsUpdateDirectoryOverlayVisible,
    showCreateFileOverlay,
    showCreateSubdirectoryOverlay,
    updateDirectory: handleUpdateDirectory,
    updateInProgress: updateDirectoryLoading,
    createTextDocumentFile
  }
}
