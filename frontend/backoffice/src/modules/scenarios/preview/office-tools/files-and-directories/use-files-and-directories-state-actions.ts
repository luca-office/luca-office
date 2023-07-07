import {useDispatch} from "react-redux"
import {FilesAndDirectoriesStateActions} from "shared/office-tools/files-and-directories"
import {openBinary} from "shared/redux/actions/ui/binary-viewer-action"
import {
  expandDirectoriesAction,
  resetEmailFileDownloadCounterAction,
  selectDirectoryAction,
  selectFileAction,
  toggleExpandDirectoryAction
} from "shared/redux/actions/ui/files-and-directories-action"
import {openSpreadsheet} from "shared/redux/actions/ui/spreadsheet-viewer-action"
import {openTextDocument} from "shared/redux/actions/ui/text-document-viewer-action"
import {BinaryViewerState} from "shared/redux/state/ui"

export const useFilesAndDirectoriesStateActions = (): FilesAndDirectoriesStateActions => {
  const dispatch = useDispatch()

  const expandDirectories = (directoryIds: Array<string>) => dispatch(expandDirectoriesAction(directoryIds))

  const selectDirectory = (directoryId: string) => dispatch(selectDirectoryAction(directoryId))

  const selectFile = (fileId: string) => dispatch(selectFileAction(fileId))

  const toggleExpandDirectory = (directoryId: string) => dispatch(toggleExpandDirectoryAction(directoryId))

  const openBinaryInternal = (binaryId: string, url: string, viewerType: keyof BinaryViewerState, title?: string) =>
    dispatch(openBinary(binaryId, url, viewerType, title))

  const openSpreadsheetInternal = (spreadsheetId: string, title?: string) =>
    dispatch(openSpreadsheet(spreadsheetId, title))

  const openTextDocumentInternal = (textDocumentId: string) => dispatch(openTextDocument(textDocumentId))

  const resetEmailFileDownloadCounter = () => dispatch(resetEmailFileDownloadCounterAction())

  return {
    expandDirectories,
    selectDirectory,
    selectFile,
    toggleExpandDirectory,
    openBinary: openBinaryInternal,
    openSpreadsheet: openSpreadsheetInternal,
    openTextDocument: openTextDocumentInternal,
    resetEmailFileDownloadCounter
  }
}
