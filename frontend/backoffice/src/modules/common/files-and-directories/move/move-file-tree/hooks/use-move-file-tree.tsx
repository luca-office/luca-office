import {useState} from "react"

export interface UseMoveFileTreeHook {
  readonly expandedDirectories: string[]
  readonly toggleExpandedDirectory: (id: UUID) => void
}

export const useMoveFileTree = (): UseMoveFileTreeHook => {
  const [expandedDirectories, setExpandedDirectories] = useState<string[]>([])

  const toggleExpandedDirectory = (id: UUID) =>
    setExpandedDirectories(
      expandedDirectories.includes(id) ? expandedDirectories.filter(id => id !== id) : expandedDirectories.concat(id)
    )

  return {
    expandedDirectories,
    toggleExpandedDirectory
  }
}
