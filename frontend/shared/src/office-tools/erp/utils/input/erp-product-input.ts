import * as React from "react"
import {InputType} from "../../../../enums"
import {ErpProduct} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getBinaryFileIdInput, getCentInput, getTextInput} from "./common-input"

export const getErpProductInput = ({
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
}: ErpInputParams<ErpProduct>): React.ReactNode => {
  switch (key) {
    case "id":
      return getTextInput<ErpProduct>({
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
    case "netPriceInCents":
    case "stockCostPerUnitInCents":
    case "stockCostTotalInCents":
      return getCentInput<ErpProduct>({
        t,
        key,
        formMethods,
        disabled,
        onCopyToClipboard,
        isFloat
      })
    case "taxRate":
    case "packSize":
    case "availableStock":
      return getTextInput<ErpProduct>({
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
    case "unit":
      return getTextInput<ErpProduct>({
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
      return getTextInput<ErpProduct>({
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
      return getTextInput<ErpProduct>({
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
      return getBinaryFileIdInput<ErpProduct>({
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
