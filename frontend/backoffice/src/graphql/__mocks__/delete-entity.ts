export const deleteEntityHookMock = {
  deleteEntity: (...args: any[]) =>
    new Promise<void>(resolve => {
      resolve()
    }),
  deleteEntityLoading: false
}
