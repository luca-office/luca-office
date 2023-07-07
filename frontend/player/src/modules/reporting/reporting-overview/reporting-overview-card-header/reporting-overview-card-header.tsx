import {css} from "@emotion/react"
import * as React from "react"
import {CardHeader, Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {spacingSmall, textEllipsis, TextSize} from "shared/styles"
import {Option} from "shared/utils"

export interface ReportingOverviewCardHeaderProps {
  readonly participantName: Option<string>
}

export const ReportingOverviewCardHeader: React.FC<ReportingOverviewCardHeaderProps> = ({
  participantName: participantNameOption
}) => (
  <CardHeader hasShadow={true} hasGreyBackground={true}>
    <div css={styles.participantName(participantNameOption.isDefined())}>
      <Icon name={IconName.Student} />
      {participantNameOption
        .map(participantName => (
          <Text customStyles={textEllipsis} size={TextSize.Medium}>
            {participantName}
          </Text>
        ))
        .orNull()}
    </div>
  </CardHeader>
)

const styles = {
  participantName: (hasName: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: hasName ? "minmax(min-content, max-content) 1fr" : "minmax(min-content, max-content)",
      gridColumnGap: hasName ? spacingSmall : "initial",
      alignItems: "center"
    })
}
