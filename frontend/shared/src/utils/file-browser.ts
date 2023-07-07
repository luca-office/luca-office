import {BinaryType, FileType, NodeType} from "../enums"
import {MimeType} from "../graphql/generated/globalTypes"
import {Directory, DirectoryNode, File, FileNode, RootNode, TreeNodeType} from "../models"
import {find} from "./array"
import {Option} from "./option"

export const createTree = (
  directories: Directory[],
  files: File[],
  isPreviewForInputValueCodingCriterion?: boolean
): RootNode => {
  const directoryNodes = directories.map(directoryToNode)
  const fileNodes = files.map(file => fileToNode({file, isPreviewForInputValueCodingCriterion}))

  const parentIdMap = directoryNodes.reduce<{[directoryId: string]: number}>(
    (accumulator, current, i) => ({...accumulator, [current.id]: i}),
    {}
  )

  const rootNode: RootNode = {children: []}

  directoryNodes.forEach(directory => {
    if (directory.parentId === null) {
      rootNode.children.push(directory)
    } else {
      const parentDirectory = directoryNodes[parentIdMap[directory.parentId]]
      parentDirectory.children = [...(parentDirectory.children || []), directory]
    }
  })

  fileNodes.forEach(file => {
    if (file.parentId !== null) {
      const parentDirectory = directoryNodes[parentIdMap[file.parentId]]

      if (parentDirectory !== undefined) {
        parentDirectory.children = [...(parentDirectory.children || []), file]
      }
    }
  })

  return rootNode
}

const directoryToNode = (directory: Directory): DirectoryNode => ({
  id: directory.id,
  parentId: directory.parentDirectoryId,
  name: directory.name,
  type: NodeType.Directory,
  children: []
})

export interface FileToNodeProps {
  file: File
  isPreviewForInputValueCodingCriterion?: boolean
}

const fileToNode = ({file, isPreviewForInputValueCodingCriterion}: FileToNodeProps): FileNode => ({
  type: NodeType.File,
  id: file.id,
  parentId: file.directoryId,
  name: file.name,
  tags: file.tags,
  disabled:
    isPreviewForInputValueCodingCriterion === true &&
    (file.fileType === FileType.Media || file.fileType === FileType.TextDocument),
  binaryType: file.fileType === FileType.Media ? toBinaryType(file.binaryFile.mimeType) : null,
  binaryFileId: file.fileType === FileType.Media ? file.binaryFileId : null,
  binaryFileUrl: file.fileType === FileType.Media ? file.binaryFileUrl : null
})

export const toBinaryType = (mimeType: MimeType): BinaryType => {
  switch (mimeType) {
    case MimeType.ApplicationPdf:
      return BinaryType.PDF
    case MimeType.VideoMp4:
      return BinaryType.Video
    case MimeType.ImageJpeg:
    case MimeType.ImagePng:
    case MimeType.ImageSvg:
    case MimeType.ImageGif:
      return BinaryType.Image
    default:
      return BinaryType.PDF
  }
}

export const getParentDirectory = (
  selectedNodeId: string,
  directories: Directory[],
  files: File[]
): Option<DirectoryNode> => {
  const directoryNodes = directories.map(directoryToNode)
  const fileNodes = files.map(file => fileToNode({file}))

  const filesAndDirectories = [...directoryNodes, ...fileNodes]
  const currentDirectoryOption = find(node => node.id === selectedNodeId, filesAndDirectories)
  const parentDirectoryOption = currentDirectoryOption.map(currentDirectory =>
    find(directory => directory.id === currentDirectory.parentId, filesAndDirectories)
  )

  const returnedOption: Option<TreeNodeType> = parentDirectoryOption.flatMap(directory => directory)

  const filteredOption: Option<DirectoryNode> = returnedOption.filter(
    dir => dir.type === NodeType.Directory
  ) as Option<DirectoryNode>

  return filteredOption
}

/**
 *
 * @param selectedNodeId
 * @param directories
 * @param files
 * @param targetDirectoryId if not defined path to root is used
 */
export const findPathToNode = (
  selectedNodeId: string,
  directories: Directory[],
  files: File[],
  targetDirectoryId?: string
): string[] => {
  const directoryNodes = directories.map(directoryToNode)
  const fileNodes = files.map(file => fileToNode({file}))

  const parentIdMap = directoryNodes.reduce(
    (accumulator, current, i) => ({...accumulator, [current.id]: i}),
    {} as {[index: string]: number}
  )

  const firstParentId = [...directoryNodes, ...fileNodes].find(node => node.id === selectedNodeId)?.parentId

  const path: string[] = []

  let nextParentId: string | null | undefined = firstParentId

  while (nextParentId !== null && nextParentId !== undefined && nextParentId !== targetDirectoryId) {
    path.push(nextParentId)
    nextParentId = directoryNodes[parentIdMap[nextParentId]].parentId
  }

  return path
}

export const findPathToRoot = (selectedNodeId: string, directories: Directory[], files: File[]) =>
  findPathToNode(selectedNodeId, directories, files)

export const countFileChildren = (node: DirectoryNode, countSubDirectoryFiles = true): number =>
  node.children.reduce(
    (accumulator, currentNode) =>
      currentNode.type === NodeType.File
        ? accumulator + 1
        : currentNode.type === NodeType.Directory
        ? accumulator + (countSubDirectoryFiles ? countFileChildren(currentNode, countSubDirectoryFiles) : 1)
        : accumulator,
    0
  )

export const countDirectoryChildren = (node: DirectoryNode): number =>
  node.children.reduce((accumulator, currentNode) => {
    if (currentNode.type === NodeType.Directory) return accumulator + 1 + countDirectoryChildren(currentNode)
    if (currentNode.type === NodeType.File) return accumulator
    return accumulator
  }, 0)
