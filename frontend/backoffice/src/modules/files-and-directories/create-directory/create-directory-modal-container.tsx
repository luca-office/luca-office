import * as React from "react"
import {LucaI18nLangKey} from "shared/translations"
import {Option} from "shared/utils"
import {
  CreateDirectoryModal,
  DirectoryCreationForm
} from "../../common/files-and-directories/create-directory/create-directory-modal"
import {useCreateDirectoryModalContainer} from "./hooks/use-create-directory-modal-container"

interface Props {
  readonly onConfirm: (id: UUID) => void
  readonly onDismiss: () => void
  readonly parentDirectoryId: Option<UUID>
  readonly scenarioId: UUID
  readonly titleKey: LucaI18nLangKey
}

export const CreateDirectoryModalContainer: React.FC<Props> = ({
  onConfirm,
  onDismiss,
  parentDirectoryId: parentDirectoryIdOption,
  scenarioId,
  titleKey
}) => {
  const {formMethods, createDirectory, createDirectoryLoading} = useCreateDirectoryModalContainer(scenarioId)

  const onSubmit = (formValues: DirectoryCreationForm) =>
    createDirectory({
      ...formValues,
      parentDirectoryId: parentDirectoryIdOption.orUndefined(),
      scenarioId
    }).then(directoryOption => directoryOption.forEach(directory => onConfirm(directory.id)))

  return (
    <CreateDirectoryModal
      onDismiss={onDismiss}
      formMethods={formMethods}
      onSubmit={onSubmit}
      titleKey={titleKey}
      createDirectoryLoading={createDirectoryLoading}
    />
  )
}
