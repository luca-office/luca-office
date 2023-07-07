import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {IconName, NodeType} from "shared/enums"
import {FileUsageType} from "shared/graphql/generated/globalTypes"
import {
  useFilesForSampleCompanyLazy,
  useFilesForScenario,
  useInterventions,
  useSampleCompanyLazy,
  useScenario
} from "shared/graphql/hooks"
import {
  File,
  FileOpeningIntervention,
  RootNode,
  Scenario,
  SpreadsheetCellContentIntervention,
  TextDocumentContentIntervention,
  TreeNodeType
} from "shared/models"
import {
  filesAndDirsDownloadId,
  getDownloadRoot
} from "shared/office-tools/files-and-directories/utils/files-and-directories-utils"
import {useLucaTranslation} from "shared/translations"
import {createTree, exists, findPathToNode, Option} from "shared/utils"
import {useDirectoriesForSampleCompanyLazy, useDirectoriesForScenario} from "../../../graphql/hooks"
import {Directory} from "../../../models"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {
  expandDirectoriesAction,
  toggleExpandDirectoryAction
} from "../../../redux/actions/ui/scenarios/directories-and-files-action"
import {AppState} from "../../../redux/state/app-state"
import {Route} from "../../../routes"
import {getInterventionsForTypeName} from "../../scenario-interventions/utils"

export interface UseFilesAndDirectoriesHook {
  readonly directories: Directory[]
  readonly expandedDirectoryIds: UUID[]
  readonly fileExplorerTree: RootNode
  readonly fileOpeningInterventions: FileOpeningIntervention[]
  readonly textDocumentContentInterventions: TextDocumentContentIntervention[]
  readonly files: File[]
  readonly hideCreateDirectoryModal: () => void
  readonly isCreateDirectoryModalVisible: boolean
  readonly isDirectoryReadonly: (directory: Directory) => boolean
  readonly getIconForRootDirectory: (directoryId: UUID) => IconName
  readonly isFileReadonly: (file: File) => boolean
  readonly isLoading: boolean
  readonly isPreviewVisible: boolean
  readonly navigateToScenarioDetail: () => void
  readonly onExpandDirectory: (directoryNodeId: string) => void
  readonly onSelectNode: (node: TreeNodeType) => void
  readonly scenario: Option<Scenario>
  readonly setPreviewVisibility: (isVisible: boolean) => void
  readonly showCreateDirectoryModal: () => void
  readonly sampleCompanyId?: UUID
  readonly spreadsheetCellContentInterventions: SpreadsheetCellContentIntervention[]
  readonly sampleCompanyDirectoryId?: UUID
}

interface Params {
  readonly scenarioId: UUID
  readonly selectedDirectoryId: Option<UUID>
  readonly selectedFileId: Option<UUID>
}

export const useFilesAndDirectories = ({
  scenarioId,
  selectedDirectoryId: selectedDirectoryIdOption,
  selectedFileId: selectedFileIdOption
}: Params): UseFilesAndDirectoriesHook => {
  const dispatch = useDispatch()
  const {t} = useLucaTranslation()

  const expandedDirectoryIds = useSelector<AppState, UUID[]>(
    state => state.ui.scenarios.directoriesAndFiles.expandedDirectoryIds
  )

  const [isCreateDirectoryModalVisible, updateCreateDirectoryModalVisible] = React.useState<boolean>(false)
  const [isPreviewVisible, setIsPreviewVisible] = React.useState<boolean>(false)

  const {directories: directoriesOption, directoriesLoading} = useDirectoriesForScenario(scenarioId)
  const {files: filesOption, filesLoading} = useFilesForScenario(scenarioId)
  const {scenario, scenarioLoading} = useScenario(scenarioId)
  const {sampleCompany: sampleCompanyOption, getSampleCompany} = useSampleCompanyLazy()
  const {
    directoriesForSampleCompany: directoriesForSampleCompanyOption,
    directoriesForSampleCompanyLoading,
    getDirectoriesForSampleCompany
  } = useDirectoriesForSampleCompanyLazy()
  const {
    filesForSampleCompany: filesForSampleCompanyOption,
    filesForSampleCompanyLoading,
    getFilesForSampleCompany
  } = useFilesForSampleCompanyLazy()

  const {interventions} = useInterventions(scenarioId)

  const directoriesForSampleCompany = directoriesForSampleCompanyOption
    .map(directoriesForSampleCompany =>
      sampleCompanyOption
        .map(sampleCompany =>
          directoriesForSampleCompany.map(directory =>
            directory.id === sampleCompany.directoryId
              ? {...directory, name: directory.name || sampleCompany.name}
              : directory
          )
        )
        .getOrElse(directoriesForSampleCompany)
    )
    .getOrElse([])

  const sampleCompanyDirectoryId = sampleCompanyOption.map(({directoryId}) => directoryId).orUndefined()
  const filesForSampleCompany = filesForSampleCompanyOption.getOrElse([])
  const filesFromMails = filesOption
    .getOrElse([])
    .filter(f => f.usageType === FileUsageType.Email)
    .map(_ => ({..._, directoryId: filesAndDirsDownloadId} as File))

  const directories = [
    getDownloadRoot(scenarioId, t("files_and_directories__downloads_label")),
    ...directoriesOption.getOrElse([]),
    ...directoriesForSampleCompany
  ]
  const files = [
    ...filesFromMails,
    ...filesOption.getOrElse([]).filter(f => f.usageType === FileUsageType.FileSystem),
    ...filesForSampleCompany
  ]

  const fileOpeningInterventions = getInterventionsForTypeName(
    interventions.getOrElse([]),
    "FileOpeningIntervention"
  ) as FileOpeningIntervention[]

  const spreadsheetCellContentInterventions = getInterventionsForTypeName(
    interventions.getOrElse([]),
    "SpreadsheetCellContentIntervention"
  ) as SpreadsheetCellContentIntervention[]

  const textDocumentContentInterventions = getInterventionsForTypeName(
    interventions.getOrElse([]),
    "TextDocumentContentIntervention"
  ) as TextDocumentContentIntervention[]

  const actionLoading =
    directoriesLoading || directoriesForSampleCompanyLoading || filesLoading || filesForSampleCompanyLoading

  const isSampleCompanyRootDirectory = (directoryId: UUID) =>
    sampleCompanyOption.exists(sampleCompany => sampleCompany.directoryId === directoryId)

  const isSampleCompanyFile = (fileId: UUID) => filesForSampleCompany.some(companyFile => companyFile.id === fileId)

  const isSampleCompanyFileOrDirectorySelected = selectedDirectoryIdOption
    .map(directoryId => isSampleCompanyRootDirectory(directoryId))
    .getOrElse(selectedFileIdOption.map(fileId => isSampleCompanyFile(fileId)).getOrElse(false))

  const sampleCompanyId = isSampleCompanyFileOrDirectorySelected
    ? sampleCompanyOption.map(company => company.id).orUndefined()
    : undefined

  const isDirectoryReadonly = (directory: Directory) =>
    directoriesForSampleCompany.includes(directory) || directory.id === filesAndDirsDownloadId

  const getIconForRootDirectory = (directoryId: UUID) =>
    directoryId === filesAndDirsDownloadId
      ? IconName.Download
      : isSampleCompanyRootDirectory(directoryId)
      ? IconName.Database
      : IconName.Folder

  const isFileReadonly = (file: File) => filesForSampleCompany.includes(file)
  const isFileReadonlyByFileId = (fileId: UUID) => exists(file => file.id === fileId, filesForSampleCompany)

  const getTreeNodeTypes = (nodes: TreeNodeType[]): TreeNodeType[] =>
    nodes.map(node =>
      node.type === NodeType.Directory
        ? {...node, children: getTreeNodeTypes(node.children)}
        : {...node, isLocked: node.binaryFileId ? isFileReadonlyByFileId(node.id) : false}
    )

  const fileExplorerTree = React.useMemo(() => {
    const rootNode = createTree(directories, files)
    return {
      ...rootNode,
      children: getTreeNodeTypes(rootNode.children)
    }
  }, [directories, files])

  const onSelectNode = (node: TreeNodeType) => {
    if (node.type === NodeType.Directory) {
      dispatch(navigateToRouteAction(Route.ScenarioDirectoriesDetail, {scenarioId, directoryId: node.id}))
    } else {
      dispatch(navigateToRouteAction(Route.ScenarioFilesDetail, {scenarioId, fileId: node.id}))
    }
  }

  const onExpandDirectory = (directoryNodeId: string) => dispatch(toggleExpandDirectoryAction(directoryNodeId))

  const navigateToScenarioDetail = () => dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId}))

  const showCreateDirectoryModal = () => updateCreateDirectoryModalVisible(true)

  const hideCreateDirectoryModal = () => updateCreateDirectoryModalVisible(false)

  React.useEffect(() => {
    if (!actionLoading) {
      directoriesOption.forEach(directories =>
        filesOption.forEach(files => {
          const pathToRoot = findPathToNode(
            selectedDirectoryIdOption.orElse(selectedFileIdOption).getOrElse(""),
            directories,
            files
          )

          if (pathToRoot.length > 0) {
            dispatch(expandDirectoriesAction(pathToRoot))
          }
        })
      )
    }
  }, [selectedDirectoryIdOption.isEmpty(), directoriesOption.isEmpty(), filesOption.isEmpty()])

  React.useEffect(() => {
    scenario.forEach(({sampleCompanyId}) => {
      if (sampleCompanyId) {
        getSampleCompany(sampleCompanyId)
        getDirectoriesForSampleCompany(sampleCompanyId)
        getFilesForSampleCompany(sampleCompanyId)
      }
    })
  }, [scenarioLoading])

  return {
    directories,
    expandedDirectoryIds,
    fileExplorerTree,
    fileOpeningInterventions,
    files,
    hideCreateDirectoryModal,
    isCreateDirectoryModalVisible,
    isDirectoryReadonly,
    getIconForRootDirectory,
    isFileReadonly,
    isLoading: actionLoading,
    isPreviewVisible,
    sampleCompanyId,
    sampleCompanyDirectoryId,
    navigateToScenarioDetail,
    onExpandDirectory,
    onSelectNode,
    scenario,
    setPreviewVisibility: setIsPreviewVisible,
    showCreateDirectoryModal,
    spreadsheetCellContentInterventions,
    textDocumentContentInterventions
  }
}
