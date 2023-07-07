import {useForm, UseFormMethods} from "react-hook-form"
import {Directory} from "shared/models"
import {Option} from "shared/utils"
import {DirectoryCreation} from "../../../../../graphql/generated/globalTypes"
import {useCreateSampleCompanyDirectory} from "../../../../../graphql/hooks/mutations/directory/create-directory"
import {DirectoryCreationForm} from "../../../../common/files-and-directories/create-directory/create-directory-modal"

export interface UseCreateDirectoryHook {
  readonly createDirectory: (creation: DirectoryCreation) => Promise<Option<Directory>>
  readonly createDirectoryLoading: boolean
  readonly formMethods: UseFormMethods<DirectoryCreationForm>
}

export const useCreateDirectoryModal = (sampleCompanyId: UUID): UseCreateDirectoryHook => {
  const {createDirectory, createDirectoryLoading} = useCreateSampleCompanyDirectory(sampleCompanyId)
  const formMethods = useForm<DirectoryCreationForm>()

  return {
    createDirectory,
    createDirectoryLoading,
    formMethods
  }
}
