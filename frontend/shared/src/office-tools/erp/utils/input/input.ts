import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {Dispatch} from "redux"
import {ErpType} from "../../../../enums"
import {dispatchCopyNotification} from "../../../../hooks"
import {
  BinaryFile,
  ErpComponent,
  ErpComponentErpProduct,
  ErpCustomer,
  ErpEmployee,
  ErpEntity,
  ErpEntityByType,
  ErpInvoice,
  ErpKeyEntity,
  ErpOrder,
  ErpOrderItem,
  ErpProduct,
  ErpSupplier
} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {find, Option, Subject} from "../../../../utils"
import {UseErpForeignKeysHook} from "../../hooks"
import {getAutoCompleteList} from "../auto-complete"
import {getForeignKeys, isForeignKey as checkIsForeignKey} from "../common"
import {isFloat as checkIsFloat} from "../number"
import {getErpComponentForProductInput} from "./erp-component-for-product-input"
import {getErpComponentInput} from "./erp-component-input"
import {getErpCustomerInput} from "./erp-customer-input"
import {getErpEmployeeInput} from "./erp-employee-input"
import {getErpInvoiceInput} from "./erp-invoice-input"
import {getErpOrderInput} from "./erp-order-input"
import {getErpOrderItemInput} from "./erp-order-item-input"
import {getErpProductInput} from "./erp-product-input"
import {getErpSupplierInput} from "./erp-supplier-input"

interface GetErpInputParams<T extends ErpType> {
  readonly t: LucaTFunction
  readonly dispatch: Dispatch<any>
  readonly type: T
  readonly key: keyof ErpEntityByType<T>
  readonly formMethods: UseFormMethods<ErpEntityByType<T>>
  readonly disabled?: boolean
  readonly foreignKeys: ErpKeyEntity<T>[]
  readonly navigateToEntity: (erpType: ErpType, ids: number[]) => void
  readonly autoCompleteLists: TypeOf<UseErpForeignKeysHook, "foreignKeys">
  readonly binaryFile: Option<BinaryFile>
  readonly isCreating?: boolean
  readonly onCopyReferenceToClipboard?: (value: string, propertyName: string) => void
  readonly onOpenAttachment?: (binaryFileId: UUID) => void
  readonly sectionScrollSubject: Subject<void>
}

export const getErpInput = <T extends ErpType>({
  dispatch,
  t,
  type,
  key,
  formMethods,
  disabled = false,
  foreignKeys,
  navigateToEntity,
  autoCompleteLists,
  binaryFile,
  isCreating,
  onCopyReferenceToClipboard,
  onOpenAttachment,
  sectionScrollSubject
}: GetErpInputParams<T>): React.ReactNode => {
  const showPrimaryKeyPlaceholder = isCreating && key === "id"
  const isForeignKey = checkIsForeignKey(
    getForeignKeys(foreignKeys as Array<ErpKeyEntity<ErpType>>),
    key as keyof ErpEntity
  )
  const isFloat = checkIsFloat(type, key)

  const autoCompleteList = getAutoCompleteList(autoCompleteLists, foreignKeys, key)
  const useAutoComplete = !disabled && isForeignKey && !!autoCompleteList.length
  const useNavigateTo = disabled && isForeignKey
  const handleNavigateTo = () =>
    find(foreignKey => foreignKey.key === key, foreignKeys).forEach(foreignKey =>
      navigateToEntity(foreignKey.type, [foreignKey.id])
    )
  const onCopyToClipboard = (value: string | number) => {
    dispatchCopyNotification(dispatch)
    if (isForeignKey) {
      onCopyReferenceToClipboard?.(`${value}`, `${String(key)}`)
    }
  }

  switch (type) {
    case ErpType.Component:
      return getErpComponentInput({
        t,
        key: key as keyof ErpComponent,
        formMethods: formMethods as unknown as UseFormMethods<ErpComponent>,
        disabled,
        binaryFile,
        isCreating,
        showPrimaryKeyPlaceholder,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    case ErpType.Customer:
      return getErpCustomerInput({
        t,
        key: key as keyof ErpCustomer,
        formMethods: formMethods as unknown as UseFormMethods<ErpCustomer>,
        disabled,
        binaryFile,
        isCreating,
        showPrimaryKeyPlaceholder,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    case ErpType.Employee:
      return getErpEmployeeInput({
        t,
        key: key as keyof ErpEmployee,
        formMethods: formMethods as unknown as UseFormMethods<ErpEmployee>,
        disabled,
        binaryFile,
        isCreating,
        showPrimaryKeyPlaceholder,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    case ErpType.Invoice:
      return getErpInvoiceInput({
        t,
        key: key as keyof ErpInvoice,
        formMethods: formMethods as unknown as UseFormMethods<ErpInvoice>,
        disabled,
        binaryFile,
        isCreating,
        showPrimaryKeyPlaceholder,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    case ErpType.Order:
      return getErpOrderInput({
        t,
        key: key as keyof ErpOrder,
        formMethods: formMethods as unknown as UseFormMethods<ErpOrder>,
        disabled,
        binaryFile,
        isCreating,
        showPrimaryKeyPlaceholder,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    case ErpType.OrderItem:
      return getErpOrderItemInput({
        t,
        key: key as keyof ErpOrderItem,
        formMethods: formMethods as unknown as UseFormMethods<ErpOrderItem>,
        disabled,
        binaryFile,
        isCreating,
        showPrimaryKeyPlaceholder,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    case ErpType.Product:
      return getErpProductInput({
        t,
        key: key as keyof ErpProduct,
        formMethods: formMethods as unknown as UseFormMethods<ErpProduct>,
        disabled,
        binaryFile,
        isCreating,
        showPrimaryKeyPlaceholder,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    case ErpType.Supplier:
      return getErpSupplierInput({
        t,
        key: key as keyof ErpSupplier,
        formMethods: formMethods as unknown as UseFormMethods<ErpSupplier>,
        disabled,
        binaryFile,
        isCreating,
        showPrimaryKeyPlaceholder,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    case ErpType.ComponentProduct:
      return getErpComponentForProductInput({
        t,
        key: key as keyof ErpComponentErpProduct,
        formMethods: formMethods as unknown as UseFormMethods<ErpComponentErpProduct>,
        disabled,
        binaryFile,
        isCreating,
        onOpenAttachment,
        onCopyToClipboard,
        sectionScrollSubject,
        isFloat,
        ...(useNavigateTo && {navigateToEntity: handleNavigateTo}),
        ...(useAutoComplete && {autoCompleteList})
      })
    default:
      return null
  }
}
