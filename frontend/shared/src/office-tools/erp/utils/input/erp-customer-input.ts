import * as React from "react"
import {InputType} from "../../../../enums"
import {ErpCustomer} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getBinaryFileIdInput, getEmailInput, getSalutationSelect, getTextInput} from "./common-input"

export const getErpCustomerInput = ({
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
}: ErpInputParams<ErpCustomer>): React.ReactNode => {
  switch (key) {
    case "id":
      return getTextInput<ErpCustomer>({
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
    case "firstName":
    case "lastName":
    case "addressLine":
    case "postalCode":
    case "city":
    case "country":
      return getTextInput<ErpCustomer>({
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
    case "company":
    case "phone":
    case "note":
      return getTextInput<ErpCustomer>({
        t,
        key,
        formMethods,
        type: InputType.text,
        required: false,
        disabled,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "email":
      return getEmailInput<ErpCustomer>({
        t,
        key,
        formMethods,
        required: false,
        disabled,
        onCopyToClipboard
      })
    case "salutation":
      return getSalutationSelect<ErpCustomer>({t, formMethods, disabled, onCopyToClipboard})
    case "sampleCompanyId":
      return getTextInput<ErpCustomer>({
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
      return getBinaryFileIdInput<ErpCustomer>({
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
