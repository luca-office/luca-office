import {compact} from "lodash-es"
import {IconName} from "shared/enums"
import {useEmails} from "shared/graphql/hooks"
import {File} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {getDirectoryIcon, iconForFile, Option} from "shared/utils"
import {useDirectoryDetail} from "./use-directory-detail"

export interface FileEntity {
  id: UUID
  title: string
  fileIcon: IconName
  receptionDelayInSeconds: number
  recipient: string | null
  mailIcon: IconName
}

export interface UseFileEmailsHook {
  readonly selectFile: (id: UUID) => void
  readonly fileEntities: FileEntity[]
}

export const useFileEmails = (scenarioId: UUID, files: File[]): UseFileEmailsHook => {
  const {t} = useLucaTranslation()
  const {emails} = useEmails(scenarioId)
  const {selectFile} = useDirectoryDetail(scenarioId)

  const fileEntities = emails
    .map(mails =>
      compact(
        files.flatMap(file =>
          Option.of(mails.find(_ => _.id === file.emailId))
            .map(mail => ({
              id: file.id,
              title: file.name,
              fileIcon: iconForFile(file),
              receptionDelayInSeconds: mail.receptionDelayInSeconds,
              recipient: Option.of(mail.recipient).getOrElse(
                t("files_and_directories__downloads_mail_defaultRecipient")
              ),
              mailIcon: getDirectoryIcon(mail.directory)
            }))
            .orNull()
        )
      )
    )
    .getOrElse([])

  return {
    selectFile,
    fileEntities
  }
}
