interface TreeSearchBaseType {
  readonly id: string
  readonly children?: this[] | null
}

export const searchTree = <T extends TreeSearchBaseType>(node: T, nodeId: string): T | null => {
  if (node.id === nodeId) {
    return node
  } else if (node.children !== null && node.children !== undefined) {
    let result: T | null = null
    for (let index = 0; result === null && index < node.children.length; index++) {
      result = searchTree(node.children[index], nodeId)
    }

    return result
  }
  return null
}
