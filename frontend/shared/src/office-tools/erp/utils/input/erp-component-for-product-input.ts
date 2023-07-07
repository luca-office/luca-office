import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {InputType} from "../../../../enums"
import {ErpComponentErpProduct, ErpEntity} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getTextInput} from "./common-input"

export const getErpComponentForProductInput = ({
  t,
  key,
  formMethods,
  disabled,
  navigateToEntity,
  autoCompleteList,
  isCreating = false,
  onCopyToClipboard,
  isFloat
}: ErpInputParams<ErpComponentErpProduct>): React.ReactNode => {
  switch (key) {
    case "componentId":
    case "productId":
      return getTextInput({
        t,
        key: key as keyof ErpEntity,
        formMethods: (formMethods as unknown) as UseFormMethods<ErpEntity>,
        type: InputType.number,
        disabled: !isCreating,
        required: isCreating,
        navigateToEntity,
        autoCompleteList,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "quantity":
      return getTextInput({
        t,
        key: key as keyof ErpEntity,
        formMethods: (formMethods as unknown) as UseFormMethods<ErpEntity>,
        type: InputType.number,
        disabled,
        navigateToEntity,
        autoCompleteList,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "sampleCompanyId":
      return getTextInput({
        t,
        key: key as keyof ErpEntity,
        formMethods: (formMethods as unknown) as UseFormMethods<ErpEntity>,
        type: InputType.text,
        disabled: true,
        navigateToEntity,
        autoCompleteList,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    default:
      return null
  }
}
