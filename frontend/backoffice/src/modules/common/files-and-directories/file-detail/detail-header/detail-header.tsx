import {css} from "@emotion/react"
import * as React from "react"
import {CardHeader, DeleteOrArchiveEntityButton, Heading, Icon} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {DeleteEntityHook} from "shared/models"
import {Flex, spacing, spacingMedium, spacingSmall, textEllipsis} from "shared/styles"

export interface FileDetailHeaderProps {
  readonly icon: IconName
  readonly title: string
  readonly entityId: UUID
  readonly deleteHook?: (id: string) => DeleteEntityHook
  readonly onDelete?: () => void
  readonly disabled: boolean
}

export const DetailHeader: React.FC<FileDetailHeaderProps> = ({
  icon,
  title,
  entityId,
  deleteHook,
  onDelete,
  disabled
}) => {
  return (
    <CardHeader customStyles={styles.header} hasShadow hasGreyBackground>
      <div css={styles.title}>
        <Icon customStyles={styles.icon} name={icon} />
        <Heading customStyles={textEllipsis} level={HeadingLevel.h3}>
          {title}
        </Heading>
      </div>
      <div css={[Flex.row, {flexShrink: 0}]}>
        {deleteHook && (
          <DeleteOrArchiveEntityButton
            disabled={disabled}
            entityId={entityId}
            useDeleteHook={deleteHook}
            onSuccess={onDelete}
          />
        )}
      </div>
    </CardHeader>
  )
}

const styles = {
  header: css({
    display: "flex",
    justifyContent: "space-between"
  }),
  title: css({
    display: "flex",
    alignItems: "center",
    minWidth: 0
  }),
  viewerButton: css({
    marginRight: spacingSmall,
    flexShrink: 0,
    width: "auto",
    padding: spacing(0, spacingMedium)
  }),
  icon: css({
    marginRight: spacingSmall
  })
}
