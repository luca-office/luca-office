import * as React from "react"
import {InputType} from "../../../../enums"
import {ErpOrderItem} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getBinaryFileIdInput, getCentInput, getTextInput} from "./common-input"

export const getErpOrderItemInput = ({
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
}: ErpInputParams<ErpOrderItem>): React.ReactNode => {
  switch (key) {
    case "id":
      return getTextInput<ErpOrderItem>({
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
    case "totalNetInCents":
      return getCentInput<ErpOrderItem>({
        t,
        key,
        formMethods,
        disabled,
        onCopyToClipboard,
        isFloat
      })
    case "quantity":
    case "orderId":
    case "productId":
      return getTextInput<ErpOrderItem>({
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
    case "sampleCompanyId":
      return getTextInput<ErpOrderItem>({
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
      return getBinaryFileIdInput<ErpOrderItem>({
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
