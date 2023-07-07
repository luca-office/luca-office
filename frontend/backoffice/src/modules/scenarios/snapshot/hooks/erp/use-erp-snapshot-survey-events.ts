import {noop} from "lodash-es"
import {ErpSurveyEvents} from "shared/models"

export const useErpSnapshotSurveyEvents = (): ErpSurveyEvents => {
  return {
    sendErpCloseRow: noop,
    sendErpCollapseDirectory: noop,
    sendErpCopyCellContentToClipboard: noop,
    sendErpCopyCoreDataAndReferencesToClipboard: noop,
    sendErpCopyCoreDataToClipboard: noop,
    sendErpCopyReferenceToClipboard: noop,
    sendErpDeselectAllRows: noop,
    sendErpDeselectRow: noop,
    sendErpExpandDirectory: noop,
    sendErpNavigateBack: noop,
    sendErpNavigateToReference: noop,
    sendErpOpenAttachment: noop,
    sendErpOpenRow: noop,
    sendErpSearchTable: noop,
    sendErpSelectAllRows: noop,
    sendErpSelectCell: noop,
    sendErpSelectRow: noop,
    sendErpSelectTable: noop,
    sendErpSortTable: noop,
    sendErpUpdateShowOnlySelectedRows: noop
  }
}
