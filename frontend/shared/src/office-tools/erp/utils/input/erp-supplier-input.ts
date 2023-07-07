import * as React from "react"
import {InputType} from "../../../../enums"
import {ErpSupplier} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getBinaryFileIdInput, getEmailInput, getSalutationSelect, getTextInput} from "./common-input"

export const getErpSupplierInput = ({
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
}: ErpInputParams<ErpSupplier>): React.ReactNode => {
  switch (key) {
    case "id":
      return getTextInput<ErpSupplier>({
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
    case "company":
    case "addressLine":
    case "postalCode":
    case "city":
    case "country":
    case "phone":
      return getTextInput<ErpSupplier>({
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
    case "email":
      return getEmailInput<ErpSupplier>({
        t,
        key,
        formMethods,
        disabled,
        onCopyToClipboard
      })
    case "note":
      return getTextInput<ErpSupplier>({
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
    case "sampleCompanyId":
      return getTextInput<ErpSupplier>({
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
    case "salutation":
      return getSalutationSelect<ErpSupplier>({t, formMethods, disabled, onCopyToClipboard})
    case "binaryFileId":
      return getBinaryFileIdInput<ErpSupplier>({
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
