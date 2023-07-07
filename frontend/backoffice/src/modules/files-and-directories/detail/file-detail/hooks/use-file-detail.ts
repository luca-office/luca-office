import {Dispatch, SetStateAction, useState} from "react"
import {useDispatch} from "react-redux"
import {InterventionGroupType} from "shared/enums"
import {FileUpdate} from "shared/graphql/generated/globalTypes"
import {useFilesForScenario, useScenario, useUpdateFile} from "shared/graphql/hooks"
import {CellIndex, File} from "shared/models"
import {useLucaTranslation, WithLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {useDirectoriesForScenario} from "../../../../../graphql/hooks"
import {Directory} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {expandDirectoriesAction} from "../../../../../redux/actions/ui/scenarios/directories-and-files-action"
import {Route} from "../../../../../routes"
import {PreviewInfo} from "../../../../common/files-and-directories/file-detail/file-detail-utils"

export interface UseFileDetailHook extends WithLucaTranslation {
  readonly allDirectories: Directory[]
  readonly allFiles: File[]
  readonly dataLoading: boolean
  readonly deselectFile: () => void
  readonly expandDirectoryId: (id: UUID) => void
  readonly isCreateInterventionModalVisible: boolean
  readonly isUpdateDirectoryOverlayVisible: boolean
  readonly isChooseTextDocumentsInterventionTypeModelVisible: boolean
  readonly isCreateTextDocumentsInterventionModalVisible: boolean
  readonly navigateToIntervention: () => void
  readonly navigateToSampleCompany: () => void
  readonly previewInfoOption: Option<PreviewInfo>
  readonly scenarioDurationInSeconds: number
  readonly selectedInterventionCellIndex: CellIndex
  readonly setIsCreateInterventionModalVisible: Dispatch<SetStateAction<boolean>>
  readonly setIsUpdateDirectoryOverlayVisible: Dispatch<SetStateAction<boolean>>
  readonly setSelectedInterventionCellIndex: Dispatch<SetStateAction<CellIndex>>
  readonly setPreviewInfoOption: Dispatch<SetStateAction<Option<PreviewInfo>>>
  readonly setIsChooseTextDocumentsInterventionTypeModelVisible: (isVisible: boolean) => void
  readonly setIsCreateTextDocumentsInterventionModalVisible: (isVisible: boolean) => void
  readonly updateFile: (id: string, update: FileUpdate) => Promise<Option<File>>
  readonly updateInProgress: boolean
}

export const useFileDetail = (scenarioId: UUID, fileId: UUID, sampleCompanyId?: UUID): UseFileDetailHook => {
  const {updateFile, updateFileLoading} = useUpdateFile()
  const {directories, directoriesLoading} = useDirectoriesForScenario(scenarioId)
  const {files, filesLoading} = useFilesForScenario(scenarioId)
  const {scenario: scenarioOption} = useScenario(scenarioId)

  const [isUpdateDirectoryOverlayVisible, setIsUpdateDirectoryOverlayVisible] = useState(false)
  const [isCreateInterventionModalVisible, setIsCreateInterventionModalVisible] = useState(false)
  const [selectedInterventionCellIndex, setSelectedInterventionCellIndex] = useState<CellIndex>({
    columnIndex: 0,
    rowIndex: 0
  })
  const [
    isChooseTextDocumentsInterventionTypeModelVisible,
    setIsChooseTextDocumentsInterventionTypeModelVisible
  ] = useState(false)

  const [isCreateTextDocumentsInterventionModalVisible, setIsCreateTextDocumentsInterventionModalVisible] = useState(
    false
  )

  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const expandDirectoryId = (directoryId: UUID) => {
    dispatch(expandDirectoriesAction([directoryId]))
  }

  const [previewInfoOption, setPreviewInfoOption] = useState<Option<PreviewInfo>>(Option.none())

  const handleUpdateFile = (id: string, update: FileUpdate) => updateFile(id, update)
  const deselectFile = () => dispatch(navigateToRouteAction(Route.ScenarioFiles, {scenarioId}))

  const navigateToIntervention = () => {
    dispatch(
      navigateToRouteAction(Route.ScenarioInterventionsGroupEntityDetail, {
        scenarioId,
        groupType: InterventionGroupType.File,
        headerGroupType: InterventionGroupType.File,
        groupEntityId: fileId
      })
    )
  }
  const navigateToSampleCompany = () =>
    dispatch(navigateToRouteAction(Route.ScenarioAssignedSampleCompanyDetail, {sampleCompanyId, scenarioId}))

  return {
    allDirectories: directories.getOrElse([]),
    allFiles: files.getOrElse([]),
    dataLoading: directoriesLoading || filesLoading,
    deselectFile,
    expandDirectoryId,
    isCreateInterventionModalVisible,
    isUpdateDirectoryOverlayVisible,
    isChooseTextDocumentsInterventionTypeModelVisible,
    isCreateTextDocumentsInterventionModalVisible,
    navigateToIntervention,
    navigateToSampleCompany,
    previewInfoOption,
    scenarioDurationInSeconds: scenarioOption.map(scenario => scenario.maxDurationInSeconds).getOrElse(0) || 0,
    selectedInterventionCellIndex,
    setSelectedInterventionCellIndex,
    setIsCreateInterventionModalVisible,
    setIsUpdateDirectoryOverlayVisible,
    setPreviewInfoOption,
    setIsChooseTextDocumentsInterventionTypeModelVisible,
    setIsCreateTextDocumentsInterventionModalVisible,
    t,
    updateFile: handleUpdateFile,
    updateInProgress: updateFileLoading
  }
}
