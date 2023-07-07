import * as React from "react"
import {InputType} from "../../../../enums"
import {DeliveryStatus} from "../../../../graphql/generated/globalTypes"
import {ErpOrder} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getDeliveryStatusLabel} from "../common"
import {getBinaryFileIdInput, getCentInput, getDatePicker, getSelect, getTextInput} from "./common-input"

export const getErpOrderInput = ({
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
  sectionScrollSubject,
  isCreating,
  isFloat
}: ErpInputParams<ErpOrder>): React.ReactNode => {
  switch (key) {
    case "id":
      return getTextInput<ErpOrder>({
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
    case "deliveryChargeInCents":
      return getCentInput<ErpOrder>({
        t,
        key,
        formMethods,
        disabled,
        onCopyToClipboard,
        isFloat
      })
    case "customerId":
    case "employeeId":
      return getTextInput<ErpOrder>({
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
    case "cashbackInCents":
    case "discountInCents":
      return getCentInput<ErpOrder>({
        t,
        key,
        formMethods,
        required: false,
        disabled,
        onCopyToClipboard,
        isFloat
      })
    case "note":
      return getTextInput<ErpOrder>({
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
    case "deliveryDate":
      return getDatePicker<ErpOrder>({key, formMethods, disabled, onCopyToClipboard, sectionScrollSubject})
    case "deliveryStatus":
      return getSelect<ErpOrder>({
        key,
        formMethods,
        options: [
          {
            value: DeliveryStatus.Completed,
            label: getDeliveryStatusLabel(t, DeliveryStatus.Completed)
          },
          {
            value: DeliveryStatus.InProcess,
            label: getDeliveryStatusLabel(t, DeliveryStatus.InProcess)
          }
        ],
        disabled,
        onCopyToClipboard
      })
    case "sampleCompanyId":
      return getTextInput<ErpOrder>({
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
      return getBinaryFileIdInput<ErpOrder>({
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
