import * as React from "react"
import {InputType} from "../../../../enums"
import {EmploymentMode, FamilyStatus} from "../../../../graphql/generated/globalTypes"
import {ErpEmployee} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getEmploymentModeLabel, getFamilyStatusLabel} from "../common"
import {
  getBinaryFileIdInput,
  getDatePicker,
  getEmailInput,
  getSalutationSelect,
  getSelect,
  getTextInput
} from "./common-input"

export const getErpEmployeeInput = ({
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
}: ErpInputParams<ErpEmployee>): React.ReactNode => {
  switch (key) {
    case "id":
      return getTextInput<ErpEmployee>({
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
    case "childCount":
      return getTextInput<ErpEmployee>({
        t,
        key,
        formMethods,
        type: InputType.number,
        required: false,
        disabled,
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
    case "department":
    case "jobTitle":
    case "site":
    case "taxClass":
      return getTextInput<ErpEmployee>({
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
    case "phone":
    case "graduation":
    case "furtherEducation":
    case "note":
      return getTextInput<ErpEmployee>({
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
      return getEmailInput<ErpEmployee>({
        t,
        key,
        formMethods,
        required: false,
        disabled,
        onCopyToClipboard
      })
    case "employedAt":
      return getDatePicker<ErpEmployee>({key, formMethods, disabled, onCopyToClipboard, sectionScrollSubject})
    case "employmentEndsAt":
      return getDatePicker<ErpEmployee>({
        key,
        formMethods,
        required: false,
        disabled,
        onCopyToClipboard,
        sectionScrollSubject
      })
    case "salutation":
      return getSalutationSelect<ErpEmployee>({t, formMethods, disabled, onCopyToClipboard})
    case "employmentMode":
      return getSelect<ErpEmployee>({
        key,
        formMethods,
        options: [
          {
            value: EmploymentMode.Assistance,
            label: getEmploymentModeLabel(t, EmploymentMode.Assistance)
          },
          {
            value: EmploymentMode.FullTime,
            label: getEmploymentModeLabel(t, EmploymentMode.FullTime)
          },
          {
            value: EmploymentMode.PartTime,
            label: getEmploymentModeLabel(t, EmploymentMode.PartTime)
          },
          {
            value: EmploymentMode.Student,
            label: getEmploymentModeLabel(t, EmploymentMode.Student)
          }
        ],
        disabled,
        onCopyToClipboard
      })
    case "familyStatus":
      return getSelect<ErpEmployee>({
        key,
        formMethods,
        options: [
          {
            value: FamilyStatus.Divorced,
            label: getFamilyStatusLabel(t, FamilyStatus.Divorced)
          },
          {
            value: FamilyStatus.Married,
            label: getFamilyStatusLabel(t, FamilyStatus.Married)
          },
          {
            value: FamilyStatus.Single,
            label: getFamilyStatusLabel(t, FamilyStatus.Single)
          }
        ],
        disabled,
        onCopyToClipboard
      })
    case "sampleCompanyId":
      return getTextInput<ErpEmployee>({
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
      return getBinaryFileIdInput<ErpEmployee>({
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
