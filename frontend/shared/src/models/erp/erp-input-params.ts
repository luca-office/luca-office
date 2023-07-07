import {FieldValue, FieldValues, UseFormMethods} from "react-hook-form"
import {LucaTFunction} from "../../translations"
import {Option, Subject} from "../../utils"
import {BinaryFile} from "../binary-file"

export interface ErpInputParams<T extends FieldValues> {
  readonly t: LucaTFunction
  readonly key: keyof T
  readonly formMethods: UseFormMethods<T>
  readonly disabled: boolean
  readonly autoCompleteList?: string[]
  readonly navigateToEntity?: () => void
  readonly binaryFile: Option<BinaryFile>
  readonly showPrimaryKeyPlaceholder?: boolean
  readonly onOpenAttachment?: (binaryFileId: UUID) => void
  readonly onCopyToClipboard?: (value: string | number) => void
  readonly sectionScrollSubject: Subject<void>
  readonly isCreating?: boolean
  readonly isFloat: boolean
}
