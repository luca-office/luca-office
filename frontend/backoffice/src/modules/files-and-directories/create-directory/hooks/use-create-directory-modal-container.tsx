import {useForm, UseFormMethods} from "react-hook-form"
import {Option} from "shared/utils"
import {DirectoryCreation} from "../../../../graphql/generated/globalTypes"
import {useCreateScenarioDirectory} from "../../../../graphql/hooks/mutations/directory/create-directory"
import {Directory} from "../../../../models"
import {DirectoryCreationForm} from "../../../common/files-and-directories/create-directory/create-directory-modal"

export interface UseCreateDirectoryHook {
  readonly createDirectory: (creation: DirectoryCreation) => Promise<Option<Directory>>
  readonly createDirectoryLoading: boolean
  readonly formMethods: UseFormMethods<DirectoryCreationForm>
}

export const useCreateDirectoryModalContainer = (scenarioId: UUID): UseCreateDirectoryHook => {
  const {createDirectory, createDirectoryLoading} = useCreateScenarioDirectory(scenarioId)
  const formMethods = useForm<DirectoryCreationForm>()

  return {
    createDirectory,
    createDirectoryLoading,
    formMethods
  }
}
