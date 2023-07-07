import * as React from "react"
import {useDispatch} from "react-redux"
import {FileType} from "shared/enums"
import {FileUpdate} from "shared/graphql/generated/globalTypes"
import {useFilesForSampleCompany, useSampleCompany, useScenario, useUpdateFile} from "shared/graphql/hooks"
import {File} from "shared/models"
import {addFileExtension, fileExtensionForFile, isDefined, Option} from "shared/utils"
import {useDirectoriesForSampleCompany} from "../../../../../graphql/hooks"
import {Directory} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {PreviewInfo} from "../../../../common/files-and-directories/file-detail/file-detail-utils"

export interface UseFileDetailHook {
  readonly updateFile: (update: Partial<FileUpdate>, file: File) => Promise<Option<File>>
  readonly deselectFile: () => void
  readonly filePreviewOption: Option<PreviewInfo>
  readonly setFilePreviewOption: React.Dispatch<React.SetStateAction<Option<PreviewInfo>>>
  readonly isMoveOverlayVisible: boolean
  readonly showMoveOverlay: () => void
  readonly hideMoveOverlay: () => void
  readonly allDirectories: Directory[]
  readonly allFiles: File[]
  readonly dataLoading: boolean
  readonly isSampleCompanyPublished: boolean
  readonly isScenarioPublishedOrFinalized: boolean
}

export const useFileDetail = (sampleCompanyId: UUID, scenarioId?: UUID): UseFileDetailHook => {
  const dispatch = useDispatch()

  const [filePreviewOption, setFilePreviewOption] = React.useState<Option<PreviewInfo>>(Option.none())
  const [isMoveOverlayVisible, setIsMoveOverlayVisible] = React.useState<boolean>(false)

  const {sampleCompany, sampleCompanyLoading} = useSampleCompany(sampleCompanyId)
  const {updateFile, updateFileLoading} = useUpdateFile()
  const {scenario, scenarioLoading} = useScenario(scenarioId || "", scenarioId === undefined)
  const {directories, directoriesLoading} = useDirectoriesForSampleCompany(sampleCompanyId)
  const {files, filesLoading} = useFilesForSampleCompany(sampleCompanyId)

  const allDirectories = directories
    .getOrElse([])
    .map(directory =>
      sampleCompany
        .map(({directoryId, name}) =>
          directory.id === directoryId ? {...directory, name: directory.name || name} : directory
        )
        .getOrElse(directory)
    )

  const isPublished = sampleCompany.exists(({publishedAt}) => isDefined(publishedAt))

  const deselectFile = () =>
    dispatch(
      navigateToRouteAction(
        scenarioId ? Route.ScenarioAssignedSampleCompanyDocumentsDetails : Route.SampleCompanyDocumentDetails,
        {
          scenarioId,
          sampleCompanyId,
          directoryId: sampleCompany.map(company => company.directoryId).orUndefined()
        }
      )
    )

  const showMoveOverlay = () => {
    setIsMoveOverlayVisible(true)
  }
  const hideMoveOverlay = () => {
    setIsMoveOverlayVisible(false)
  }

  const handleUpdateFile = (update: Partial<FileUpdate>, file: File) => {
    if (updateFileLoading) {
      return Promise.reject()
    }

    const binaryFileId =
      file.fileType === FileType.Media
        ? update.binaryFileId !== undefined
          ? update.binaryFileId
          : file.binaryFileId
        : null

    return updateFile(file.id, {
      name: update.name !== undefined ? addFileExtension(update.name, fileExtensionForFile(file)) : file.name,
      binaryFileId,
      relevance: update.relevance !== undefined ? update.relevance : file.relevance,
      tags: update.tags !== undefined ? update.tags : file.tags,
      directoryId: update.directoryId !== undefined ? update.directoryId : file.directoryId
    })
  }

  return {
    updateFile: handleUpdateFile,
    deselectFile,
    filePreviewOption,
    setFilePreviewOption,
    isMoveOverlayVisible,
    showMoveOverlay,
    hideMoveOverlay,
    allDirectories,
    allFiles: files.getOrElse([]),
    dataLoading: directoriesLoading || filesLoading || sampleCompanyLoading || scenarioLoading,
    isSampleCompanyPublished: isPublished,
    isScenarioPublishedOrFinalized: scenario.exists(s => s.publishedAt !== null || s.finalizedAt !== null)
  }
}
