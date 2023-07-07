import * as React from "react"
import {useDispatch} from "react-redux"
import {Payload} from "redux-first-router"
import {NodeType} from "shared/enums"
import {useFilesForSampleCompany, useSampleCompany} from "shared/graphql/hooks"
import {Directory, DirectoryNode, File, RootNode, TreeNodeType} from "shared/models"
import {createTree, find, getParentDirectory, isDefined, Option} from "shared/utils"
import {useDirectoriesForSampleCompany} from "../../../../graphql/hooks"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"

export interface SubRouteConfig {
  readonly backRoute: Route
  readonly backRoutePayload?: Payload
  readonly directoriesRoute: Route
  readonly directoriesRoutePayload?: Payload
  readonly filesRoute: Route
  readonly filesRoutePayload?: Payload
}

export interface UseSampleCompanyDocumentsHook {
  readonly loading: boolean
  readonly navigateToPrevious: () => void
  readonly onSelectNode: (node: TreeNodeType) => void
  readonly tree: Option<RootNode>
  readonly expandedDirectoryIds: UUID[]
  readonly selectedFile: Option<File>
  readonly isFileDisabled: (fileId: UUID) => boolean
  readonly getParentDirectory: (nodeId: UUID) => Option<DirectoryNode>
  readonly isCreateDirectoryModalVisible: boolean
  readonly showCreateDirectoryModal: () => void
  readonly hideCreateDirectoryModal: () => void
  readonly selectedDirectory: Option<Directory>
  readonly subDirectories: Option<Directory[]>
  readonly filesInSelectedDirectory: Option<File[]>
  readonly isRootDirectorySelected: boolean
  readonly introFileId: Option<UUID>
  readonly logoFileId: Option<UUID>
}

export const useSampleCompanyDocuments = (
  sampleCompanyId: UUID,
  directoryId?: UUID,
  fileId?: UUID,
  scenarioId?: UUID,
  subRouteConfig?: SubRouteConfig
): UseSampleCompanyDocumentsHook => {
  const dispatch = useDispatch()

  const [expandedDirectoryIds, setExpandedDirectoryIds] = React.useState<UUID[]>([])
  const [isCreateDirectoryModalVisible, setIsCreateDirectoryModalVisible] = React.useState<boolean>(false)

  const {sampleCompany, sampleCompanyLoading} = useSampleCompany(sampleCompanyId)
  const {directories: directoriesOption, directoriesLoading} = useDirectoriesForSampleCompany(sampleCompanyId)
  const {files: filesOption, filesLoading} = useFilesForSampleCompany(sampleCompanyId)

  React.useEffect(() => {
    directoriesOption
      .flatMap(directories => find(directory => !isDefined(directory.parentDirectoryId), directories))
      .forEach(rootDirectory => !expandedDirectoryIds.length && setExpandedDirectoryIds([rootDirectory.id]))
  }, [directoriesLoading])

  const isFileDisabled = (fileId: UUID) =>
    sampleCompany
      .map(({logoFileId, profileFileId}) => fileId === logoFileId || fileId === profileFileId)
      .getOrElse(false)

  const navigateToPrevious = () => {
    if (subRouteConfig) {
      dispatch<AppAction>(
        navigateToRouteAction(subRouteConfig.backRoute, {
          ...subRouteConfig.backRoutePayload,
          scenarioId,
          sampleCompanyId
        })
      )
    } else {
      dispatch<AppAction>(navigateToRouteAction(Route.SampleCompanyDetail, {sampleCompanyId}))
    }
  }

  const selectedDirectory = find(({id}) => id === directoryId, directoriesOption.getOrElse([])).map(directory =>
    sampleCompany.map(({name}) => ({...directory, name: directory.name || name})).getOrElse(directory)
  )
  const selectedFile = find(({id}) => id === fileId, filesOption.getOrElse([]))
  const tree = directoriesOption.flatMap(directories =>
    filesOption.map<RootNode>(files => {
      const rootNode = createTree(directories, files)
      return {
        ...rootNode,
        children: rootNode.children.map(node =>
          node.type === NodeType.Directory
            ? {
                ...node,
                name: sampleCompany.map(({name}) => node.name || name).getOrElse(node.name),
                children: node.children.map(file => ({
                  ...file,
                  isLocked: isFileDisabled(file.id)
                }))
              }
            : node
        )
      }
    })
  )
  const onSelectNode = (node: TreeNodeType) => {
    if (node.type === NodeType.File) {
      dispatch(
        navigateToRouteAction(subRouteConfig ? subRouteConfig.filesRoute : Route.SampleCompanyDocumentDetailsFile, {
          ...subRouteConfig?.filesRoutePayload,
          scenarioId: scenarioId,
          sampleCompanyId: sampleCompanyId,
          directoryId: node.parentId,
          fileId: node.id
        })
      )
      return
    }

    setExpandedDirectoryIds(
      expandedDirectoryIds.includes(node.id)
        ? expandedDirectoryIds.filter(id => id !== node.id)
        : [...expandedDirectoryIds, node.id]
    )
    dispatch(
      navigateToRouteAction(subRouteConfig ? subRouteConfig.directoriesRoute : Route.SampleCompanyDocumentDetails, {
        ...subRouteConfig?.directoriesRoutePayload,
        scenarioId: scenarioId,
        sampleCompanyId: sampleCompanyId,
        directoryId: node.id
      })
    )
  }

  const subDirectories = selectedDirectory.map(directory =>
    directoriesOption.getOrElse([]).filter(({parentDirectoryId}) => parentDirectoryId === directory.id)
  )

  const filesInSelectedDirectory = selectedDirectory.map(directory =>
    filesOption.getOrElse([]).filter(file => file.directoryId === directory.id)
  )

  const isRootDirectorySelected = sampleCompany
    .flatMap(({directoryId}) => selectedDirectory.map(({id}) => id === directoryId))
    .getOrElse(false)

  const showCreateDirectoryModal = () => {
    setIsCreateDirectoryModalVisible(true)
  }

  const hideCreateDirectoryModal = () => {
    setIsCreateDirectoryModalVisible(false)
  }

  const handleGetParentDirectory = (nodeId: UUID) => {
    const parentDirectory = getParentDirectory(nodeId, directoriesOption.getOrElse([]), filesOption.getOrElse([]))
    return sampleCompany
      .flatMap(({name}) => parentDirectory.map(directory => ({...directory, name: directory.name || name})))
      .orElse(parentDirectory)
  }

  return {
    loading: directoriesLoading || filesLoading || sampleCompanyLoading,
    navigateToPrevious,
    onSelectNode,
    tree,
    expandedDirectoryIds,
    selectedFile,
    isFileDisabled,
    getParentDirectory: handleGetParentDirectory,
    isCreateDirectoryModalVisible,
    showCreateDirectoryModal,
    hideCreateDirectoryModal,
    selectedDirectory,
    subDirectories,
    filesInSelectedDirectory,
    isRootDirectorySelected,
    introFileId: sampleCompany.map<UUID>(company => company.profileFileId as UUID),
    logoFileId: sampleCompany.map<UUID>(company => company.logoFileId as UUID)
  }
}
