export interface ArchiveEntityHook {
  readonly archiveEntity: (id: UUID) => Promise<unknown>
  readonly archiveEntityLoading: boolean
}

export type UseArchiveEntityHook = (id: UUID) => ArchiveEntityHook
