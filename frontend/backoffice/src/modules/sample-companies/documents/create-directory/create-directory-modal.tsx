import * as React from "react"
import {LucaI18nLangKey} from "shared/translations"
import {Option} from "shared/utils"
import {
  CreateDirectoryModal as CreateDirectoryModalComponent,
  DirectoryCreationForm
} from "../../../common/files-and-directories/create-directory/create-directory-modal"
import {useCreateDirectoryModal} from "./hooks/use-create-directory-modal"

interface Props {
  readonly onConfirm: (id: UUID) => void
  readonly onDismiss: () => void
  readonly parentDirectoryId: Option<UUID>
  readonly sampleCompanyId: UUID
  readonly titleKey: LucaI18nLangKey
}

export const CreateDirectoryModal: React.FC<Props> = ({
  onConfirm,
  onDismiss,
  parentDirectoryId: parentDirectoryIdOption,
  sampleCompanyId,
  titleKey
}) => {
  const {formMethods, createDirectory, createDirectoryLoading} = useCreateDirectoryModal(sampleCompanyId)

  const onSubmit = (formValues: DirectoryCreationForm) =>
    createDirectory({
      ...formValues,
      parentDirectoryId: parentDirectoryIdOption.orUndefined(),
      sampleCompanyId
    }).then(directoryOption => directoryOption.forEach(directory => onConfirm(directory.id)))

  return (
    <CreateDirectoryModalComponent
      onDismiss={onDismiss}
      formMethods={formMethods}
      onSubmit={onSubmit}
      titleKey={titleKey}
      createDirectoryLoading={createDirectoryLoading}
    />
  )
}
