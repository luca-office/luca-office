import {Dispatch, SetStateAction, useState} from "react"
import {FileType} from "shared/enums"
import {useUpdateFile} from "shared/graphql/hooks"
import {Directory, File} from "shared/models"
import {findPathToRoot, Option} from "shared/utils"
import {useUpdateDirectory} from "../../../../../graphql/hooks/mutations/directory/update-directory"

export interface UseMoveOverlay {
  readonly selectedTargetDirectory: Option<UUID>
  readonly setSelectedTargetDirectory: Dispatch<SetStateAction<Option<string>>>
  readonly changeDirectory: () => void
}

// Use this if you need an id for root and can not use null
export const ROOT = "root_identifier"

export const useMoveOverlay = (
  directoryOption: Option<Directory>,
  fileOption: Option<File>,
  onFilesSuccessfullyMoved: (targetDirectoryIdWithParents: UUID[]) => void,
  directories: Directory[],
  files: File[]
): UseMoveOverlay => {
  const [selectedTargetDirectory, setSelectedTargetDirectory] = useState<Option<UUID>>(Option.none())

  const {updateDirectory} = useUpdateDirectory()
  const {updateFile} = useUpdateFile()

  const handleChangeDirectory = () => {
    directoryOption.forEach(directory =>
      selectedTargetDirectory.forEach(targetDirectory => {
        const parentDirectoryId = targetDirectory === ROOT ? null : targetDirectory

        const parentDirectoryIdWithParents = getTargetDirectoryIdsWithParents(targetDirectory, directories, files)
        updateDirectory(directory.id, {name: directory.name, parentDirectoryId}).then(() =>
          onFilesSuccessfullyMoved(parentDirectoryIdWithParents)
        )
      })
    )

    fileOption.forEach(file =>
      selectedTargetDirectory.forEach(targetDirectory => {
        const parentDirectoryIdWithParents = getTargetDirectoryIdsWithParents(targetDirectory, directories, files)
        updateFile(file.id, {
          binaryFileId: file.fileType === FileType.Media ? file.binaryFileId : null,
          name: file.name,
          relevance: file.relevance,
          tags: file.tags,
          directoryId: targetDirectory
        }).then(() => onFilesSuccessfullyMoved(parentDirectoryIdWithParents))
      })
    )
  }

  return {
    selectedTargetDirectory,
    setSelectedTargetDirectory,
    changeDirectory: handleChangeDirectory
  }
}

const getTargetDirectoryIdsWithParents = (targetDirectoryId: UUID, directories: Directory[], files: File[]) => {
  const pathToRoot = findPathToRoot(targetDirectoryId, directories, files)
  return [...pathToRoot, targetDirectoryId]
}
