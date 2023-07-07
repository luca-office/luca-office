export interface DeleteEntityHook {
  readonly deleteEntity: (id: UUID) => Promise<void>
  readonly deleteEntityLoading: boolean
}

export type UseDeleteEntityHook = (id: UUID) => DeleteEntityHook
