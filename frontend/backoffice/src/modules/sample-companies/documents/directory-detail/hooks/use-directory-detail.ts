import {Dispatch, SetStateAction, useState} from "react"
import {useDispatch} from "react-redux"
import {FileUsageType, Relevance, TextDocumentCreation} from "shared/graphql/generated/globalTypes"
import {useCreateSampleCompanyFile, useFilesForSampleCompany, useSampleCompany} from "shared/graphql/hooks"
import {useCreateTextDocument} from "shared/graphql/hooks/mutations/text-document/use-create-textdocument"
import {File, SampleCompany, UploadBinary} from "shared/models"
import {TextDocumentCreationInfo} from "shared/models/text-document-creation-info"
import {find, isDefined, Option} from "shared/utils"
import {DirectoryUpdate} from "../../../../../graphql/generated/globalTypes"
import {useDirectoriesForSampleCompany} from "../../../../../graphql/hooks"
import {useUpdateDirectory} from "../../../../../graphql/hooks/mutations/directory/update-directory"
import {Directory} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {expandDirectoriesAction} from "../../../../../redux/actions/ui/scenarios/directories-and-files-action"
import {Route} from "../../../../../routes"

export interface UseDirectoryDetailHook {
  readonly updateInProgress: boolean
  readonly updateDirectory: (id: UUID, update: DirectoryUpdate) => Promise<Option<Directory>>
  readonly selectDirectory: (directoryId: UUID) => void
  readonly selectFile: (fileId: UUID) => void
  readonly deselectDirectory: () => void
  readonly isCreateFileOverlayVisible: boolean
  readonly isCreateSubdirectoryOverlayVisible: boolean
  readonly showCreateFileOverlay: () => void
  readonly hideCreateFileOverlay: () => void
  readonly showCreateSubdirectoryOverlay: () => void
  readonly hideCreateSubdirectoryOverlay: () => void
  readonly handleCreateSubdirectory: (directoryId: UUID, subdirectoryId: UUID) => void
  readonly createFilesFromBinaries: (uploadedBinaries: UploadBinary[], directoryId: UUID) => void
  readonly isUpdateDirectoryOverlayVisible: boolean
  readonly setIsUpdateDirectoryOverlayVisible: Dispatch<SetStateAction<boolean>>
  readonly allDirectories: Directory[]
  readonly allFiles: File[]
  readonly dataLoading: boolean
  readonly sampleCompany: Option<SampleCompany>
  readonly isPublished: boolean
  readonly createTextDocumentFile: (textDocumentCreationInfo: TextDocumentCreationInfo) => void
}

export const useDirectoryDetail = (sampleCompanyId: UUID, scenarioId?: UUID): UseDirectoryDetailHook => {
  const dispatch = useDispatch()

  const {sampleCompany, sampleCompanyLoading} = useSampleCompany(sampleCompanyId)
  const {updateDirectory, updateDirectoryLoading} = useUpdateDirectory()
  const {createSampleCompanyFile: createFile} = useCreateSampleCompanyFile(sampleCompanyId)
  const {directories, directoriesLoading} = useDirectoriesForSampleCompany(sampleCompanyId)
  const {files, filesLoading} = useFilesForSampleCompany(sampleCompanyId)
  const {createTextDocument} = useCreateTextDocument({sampleCompanyId})

  const [isCreateFileOverlayVisible, updateIsCreateFileOverlayVisible] = useState(false)
  const [isCreateSubdirectoryOverlayVisible, updateIsCreateSubdirectoryOverlayVisible] = useState(false)
  const [isUpdateDirectoryOverlayVisible, setIsUpdateDirectoryOverlayVisible] = useState(false)

  const isPublished = sampleCompany.exists(({publishedAt}) => isDefined(publishedAt))

  const showCreateFileOverlay = () => updateIsCreateFileOverlayVisible(true)

  const hideCreateFileOverlay = () => updateIsCreateFileOverlayVisible(false)

  const showCreateSubdirectoryOverlay = () => updateIsCreateSubdirectoryOverlayVisible(true)

  const hideCreateSubdirectoryOverlay = () => updateIsCreateSubdirectoryOverlayVisible(false)

  const handleUpdateDirectory = (id: UUID, update: DirectoryUpdate) => updateDirectory(id, update)

  const navigateToDirectory = (directoryId: UUID) => {
    dispatch(
      navigateToRouteAction(
        scenarioId ? Route.ScenarioAssignedSampleCompanyDocumentsDetails : Route.SampleCompanyDocumentDetails,
        {scenarioId, sampleCompanyId, directoryId}
      )
    )
  }

  const handleCreateSubdirectory = (directoryId: UUID, subdirectoryId: UUID) => {
    hideCreateSubdirectoryOverlay()
    navigateToDirectory(subdirectoryId)
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

  const selectDirectory = (directoryId: UUID) => navigateToDirectory(directoryId)

  const selectFile = (fileId: UUID) =>
    find(file => file.id === fileId, files.getOrElse([])).forEach(file =>
      dispatch(
        navigateToRouteAction(
          scenarioId ? Route.ScenarioAssignedSampleCompanyDocumentsDetailsFile : Route.SampleCompanyDocumentDetailsFile,
          {
            scenarioId,
            sampleCompanyId,
            directoryId: file.directoryId,
            fileId: file.id
          }
        )
      )
    )

  const deselectDirectory = () =>
    dispatch(
      navigateToRouteAction(scenarioId ? Route.ScenarioAssignedSampleCompanyDocuments : Route.SampleCompanyDocuments, {
        scenarioId,
        sampleCompanyId
      })
    )

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

  return {
    updateInProgress: updateDirectoryLoading,
    updateDirectory: handleUpdateDirectory,
    selectDirectory,
    selectFile,
    deselectDirectory,
    isCreateFileOverlayVisible,
    showCreateFileOverlay,
    hideCreateFileOverlay,
    isCreateSubdirectoryOverlayVisible,
    showCreateSubdirectoryOverlay,
    hideCreateSubdirectoryOverlay,
    createFilesFromBinaries,
    handleCreateSubdirectory,
    isUpdateDirectoryOverlayVisible,
    setIsUpdateDirectoryOverlayVisible,
    allDirectories: directories.getOrElse([]),
    allFiles: files.getOrElse([]),
    dataLoading: directoriesLoading || filesLoading || sampleCompanyLoading,
    sampleCompany,
    isPublished,
    createTextDocumentFile
  }
}
