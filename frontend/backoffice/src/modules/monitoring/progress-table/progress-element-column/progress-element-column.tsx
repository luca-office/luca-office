import * as React from "react"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {ParticipantProjectProgress} from "shared/models"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getProjectModuleIcon} from "shared/utils"

export interface ProgressTableColumnProps {
  readonly progressElement: ParticipantProjectProgress
  readonly moduleCount: number
}

export const ProgressElementColumn: React.FunctionComponent<ProgressTableColumnProps> = ({
  progressElement,
  moduleCount
}) => {
  const {t} = useLucaTranslation()
  const currentElement = progressElement.moduleProgress.find(
    progress => progress.status === ProjectModuleProgressType.InProgress
  )
  const completedCount = progressElement.moduleProgress.filter(
    progress => progress.status === ProjectModuleProgressType.Completed
  ).length
  const isCompleted = completedCount === moduleCount
  const hasNotStarted =
    progressElement.moduleProgress.filter(progress => progress.status === undefined).length === moduleCount

  const icon = hasNotStarted
    ? IconName.Sandglass
    : isCompleted
    ? IconName.Check
    : currentElement
    ? getProjectModuleIcon(currentElement?.moduleType)
    : undefined

  return (
    <div css={Flex.row}>
      {icon && <Icon name={icon} hasSpacing={true} />}
      <Text size={TextSize.Medium}>
        {isCompleted
          ? t("dashboard__project_table_progress_done")
          : hasNotStarted
          ? t("dashboard__project_table_progress_none")
          : currentElement?.name}
      </Text>
    </div>
  )
}
