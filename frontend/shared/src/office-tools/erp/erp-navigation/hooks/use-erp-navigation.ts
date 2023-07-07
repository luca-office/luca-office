import React from "react"
import {ErpNavigationEntryId, ErpNavigationEntryType, IconName, NodeType} from "../../../../enums"
import {BaseNode, ErpEntry} from "../../../../models"
import {Option} from "../../../../utils"

export interface UseErpNavigationHook {
  readonly selectedNode: Option<UUID>
  readonly setSelectedNode: React.Dispatch<React.SetStateAction<Option<UUID>>>
  readonly hideLockedEntries: boolean
  readonly toggleHideLockedEntries: () => void
  readonly baseNodes: BaseNode[]
  readonly expandedNodeIds: UUID[]
}

export const useErpNavigation = (
  navigationEntries: Array<ErpEntry>,
  defaultSelectedNode: Option<string>
): UseErpNavigationHook => {
  const [selectedNode, setSelectedNode] = React.useState<Option<string>>(defaultSelectedNode)
  const [hideLockedEntries, setHideLockedEntries] = React.useState(false)

  const baseNodes = React.useMemo(() => buildErpTree(navigationEntries, null, hideLockedEntries), [
    navigationEntries,
    hideLockedEntries
  ])

  return {
    selectedNode,
    setSelectedNode,
    hideLockedEntries,
    toggleHideLockedEntries: () => setHideLockedEntries(!hideLockedEntries),
    baseNodes,
    expandedNodeIds: getExpandedNodeIds(baseNodes, selectedNode)
  }
}

export const buildErpTree = (
  entries: ErpEntry[],
  parentId: ErpNavigationEntryId | null,
  hideLockedEntries: boolean
): Array<BaseNode> => {
  return entries
    .map(entry => {
      const isTableEntry = entry.type === ErpNavigationEntryType.Table

      return {
        id: entry.id,
        name: entry.label,
        parentId,
        type: isTableEntry ? NodeType.Table : NodeType.Directory,
        iconName: isTableEntry ? IconName.TableCalculation : IconName.Folder,
        isLocked: entry.isLocked,
        children:
          entry.type === ErpNavigationEntryType.Folder
            ? buildErpTree(entry.children, entry.id, hideLockedEntries)
            : undefined
      }
    })
    .filter(node => !node.isLocked || !hideLockedEntries)
}

export const getExpandedNodeIds = (nodes: BaseNode[], id: Option<string>) => {
  let path: string[] = []

  const flattenedNodes = nodes.reduce<BaseNode[]>((prev, current) => [...prev, ...flattenTree(current)], [])

  const generatePath = (nodeId: string, nodes: BaseNode[]) => {
    let selectedNode = nodes.find(node => node.id === nodeId)

    if (selectedNode) {
      // add node to path
      path = [...path, selectedNode?.id]

      if (selectedNode.parentId === null) {
        //is toplevel
        return
      } else {
        generatePath(selectedNode?.parentId, nodes)
      }
    } else {
      return
    }
  }

  id.forEach(id => generatePath(id, flattenedNodes))

  return path
}

const flattenTree = (root: BaseNode) => {
  // Create an empty array to hold the flattened nodes
  const flat: BaseNode[] = []

  // Create a helper function that recursively visits each node in the tree
  function visit(node: BaseNode) {
    // Add the current node to the array
    flat.push(node)

    // Recursively visit each of the node's children
    if (node.children) node.children.forEach(visit)
  }

  // Start the traversal at the root node
  visit(root)

  // Return the flattened array of nodes
  return flat
}
