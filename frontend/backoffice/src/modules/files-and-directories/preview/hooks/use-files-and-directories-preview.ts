import React, {useState} from "react"
import {FileUsageType} from "shared/graphql/generated/globalTypes"
import {
  useFilesForSampleCompanyLazy,
  useFilesForScenario,
  useSampleCompanyLazy,
  useScenario
} from "shared/graphql/hooks"
import {Directory, File, RootNode} from "shared/models"
import {
  filesAndDirsDownloadId,
  getDownloadRoot
} from "shared/office-tools/files-and-directories/utils/files-and-directories-utils"
import {createTree, Option} from "shared/utils"
import {useDirectoriesForSampleCompanyLazy, useDirectoriesForScenario} from "../../../../graphql/hooks"

export interface UseFilesAndDirectoriesPreviewHook {
  readonly selectedDirectoryId: Option<UUID>
  readonly selectedFileId: Option<UUID>
  readonly sampleCompanyTitle?: string
  readonly isLoading: boolean
  readonly directories: Directory[]
  readonly files: File[]
  readonly onSelectDirectory: (id: UUID) => void
  readonly onSelectFile: (id: UUID) => void
  readonly onExpandDirectory: (directoryNodeId: string) => void
  readonly expandedDirectoryIds: UUID[]
  readonly tree: RootNode
}

export const useFilesAndDirectoriesPreview = (scenarioId: UUID) => {
  const {directories: directoriesOption, directoriesLoading} = useDirectoriesForScenario(scenarioId)
  const {files: filesOption, filesLoading} = useFilesForScenario(scenarioId)

  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId)

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
  const {getSampleCompany, sampleCompany: sampleCompanyOption} = useSampleCompanyLazy()

  React.useEffect(() => {
    scenarioOption.forEach(({sampleCompanyId}) => {
      if (sampleCompanyId && scenarioLoading === false) {
        getSampleCompany(sampleCompanyId)
        getDirectoriesForSampleCompany(sampleCompanyId)
        getFilesForSampleCompany(sampleCompanyId)
      }
    })
  }, [scenarioLoading])

  const [selectedDirectoryId, setSelectedDirectoryId] = useState<Option<UUID>>(Option.none())
  const [selectedFileId, setSelectedFileId] = useState<Option<UUID>>(Option.none())
  const [expandedDirectoryIds, setExpandedDirectoryIds] = useState<UUID[]>([])

  const onExpandDirectory = (id: UUID) => {
    if (expandedDirectoryIds.includes(id)) {
      setExpandedDirectoryIds(expandedDirectoryIds.filter(directoryId => directoryId !== id))
    } else {
      setExpandedDirectoryIds([...expandedDirectoryIds, id])
    }
  }

  const allFiles = filesOption
    .getOrElse([])
    .map(file => (file.usageType === FileUsageType.Email ? {...file, directoryId: filesAndDirsDownloadId} : file))

  const directories = [
    getDownloadRoot(scenarioId),
    ...directoriesOption.getOrElse([]),
    ...directoriesForSampleCompanyOption.getOrElse([])
  ]
  const files = [...allFiles, ...filesForSampleCompanyOption.getOrElse([])]

  const tree = createTree(directories, files)

  const onSelectDirectory = (id: UUID) => {
    if (selectedFileId.isDefined()) {
      setSelectedFileId(Option.none())
    }
    setSelectedDirectoryId(Option.of(id))
  }

  const onSelectFile = (id: UUID) => {
    if (selectedDirectoryId.isDefined()) {
      setSelectedDirectoryId(Option.none())
    }
    setSelectedFileId(Option.of(id))
  }

  return {
    selectedDirectoryId,
    selectedFileId,
    isLoading: directoriesLoading || filesLoading || directoriesForSampleCompanyLoading || filesForSampleCompanyLoading,
    directories,
    files,
    onSelectDirectory,
    onSelectFile,
    onExpandDirectory,
    expandedDirectoryIds,
    tree,
    sampleCompanyTitle: sampleCompanyOption.map(sampleCompany => sampleCompany.name).orUndefined()
  }
}
