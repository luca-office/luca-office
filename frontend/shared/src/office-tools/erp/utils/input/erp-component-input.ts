import * as React from "react"
import {InputType} from "../../../../enums"
import {ErpComponent} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getBinaryFileIdInput, getCentInput, getTextInput} from "./common-input"

export const getErpComponentInput = ({
  t,
  key,
  formMethods,
  disabled,
  navigateToEntity,
  autoCompleteList,
  binaryFile,
  showPrimaryKeyPlaceholder,
  onOpenAttachment,
  onCopyToClipboard,
  isCreating,
  isFloat
}: ErpInputParams<ErpComponent>): React.ReactNode => {
  switch (key) {
    case "id":
      return getTextInput<ErpComponent>({
        t,
        key,
        formMethods,
        type: InputType.number,
        isPrimaryKey: true,
        disabled: true,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "purchasingPriceInCents":
    case "stockCostPerUnitInCents":
    case "stockCostTotalInCents":
      return getCentInput<ErpComponent>({
        t,
        key,
        formMethods,
        disabled,
        onCopyToClipboard,
        isFloat
      })
    case "margin":
    case "supplierId":
    case "packSize":
    case "availableStock":
      return getTextInput<ErpComponent>({
        t,
        key,
        formMethods,
        type: InputType.number,
        disabled,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "name":
    case "category":
    case "unit":
      return getTextInput<ErpComponent>({
        t,
        key,
        formMethods,
        type: InputType.text,
        disabled,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "note":
      return getTextInput<ErpComponent>({
        t,
        key,
        formMethods,
        type: InputType.text,
        disabled,
        required: false,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "sampleCompanyId":
      return getTextInput<ErpComponent>({
        t,
        key,
        formMethods,
        type: InputType.text,
        disabled: true,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "binaryFileId":
      return getBinaryFileIdInput<ErpComponent>({
        binaryFile: binaryFile.orUndefined(),
        formMethods,
        required: false,
        disabled,
        onOpenAttachment
      })
    default:
      return null
  }
}
