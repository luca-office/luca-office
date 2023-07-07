import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Text, Tooltip} from "shared/components"
import {IconName} from "shared/enums"
import {DirectoryNode} from "shared/models"
import {Flex, fontColorLight, FontWeight, primaryColor, spacingTiny, textEllipsis, TextSize} from "shared/styles"
import {WithLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"

export interface PathActionFieldProps extends WithLucaTranslation {
  readonly parentDirectory: Option<DirectoryNode>
  readonly disabled: boolean
  readonly onMoveClick: () => void
  readonly directoryLabel?: string
  readonly tooltipLabel?: string
}

export const PathActionField: React.FC<PathActionFieldProps> = ({
  parentDirectory,
  onMoveClick,
  disabled,
  t,
  directoryLabel = t("files_and_directories__move_directory_main_directory"),
  tooltipLabel = t("files_and_directories__disabled_tooltip")
}) => (
  <Tooltip title={tooltipLabel} inactive={!disabled}>
    <div css={styles.directoryPathWrapper}>
      <div css={[Flex.row, {minWidth: 0}]}>
        <Icon customStyles={styles.icon} name={parentDirectory.isEmpty() ? IconName.HardDrive : IconName.Folder} />
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {parentDirectory.map(directory => directory.name).getOrElse(directoryLabel)}
        </Text>
      </div>
      <Text
        onClick={() => !disabled && onMoveClick()}
        customStyles={styles.directoryPath(disabled)}
        size={TextSize.Medium}>
        {t("files_and_directories__move_directory")}
      </Text>
    </div>
  </Tooltip>
)

const styles = {
  directoryPathWrapper: css([
    Flex.row,
    {
      justifyContent: "space-between"
    }
  ]),
  icon: css({
    marginRight: spacingTiny
  }),
  directoryPath: (isDisabled: boolean) =>
    css({
      color: isDisabled ? fontColorLight : primaryColor,
      fontWeight: FontWeight.Bold,
      cursor: isDisabled ? "not-allowed" : "pointer"
    }),
  contentList: css({
    marginTop: spacingTiny
  })
}
