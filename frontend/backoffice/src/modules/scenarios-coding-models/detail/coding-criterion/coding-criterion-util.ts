import {ErpType} from "shared/enums"
import {DocumentViewScenarioCodingAutomatedCriterion} from "shared/models"
import {erpTypeLabel} from "shared/office-tools/erp/utils"
import {LucaTFunction} from "shared/translations"

export const getErpDocumentViewTitle = (criterion: DocumentViewScenarioCodingAutomatedCriterion, t: LucaTFunction) => {
  if (criterion.erpTableType !== null) {
    return `${t("interventions__interventions_erp_number_ac")} ${criterion.erpRowId} (${t(
      erpTypeLabel((criterion.erpTableType as unknown) as ErpType)
    )})`
  } else {
    // eslint-disable-next-line consistent-return
    return undefined
  }
}
