import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {
  backgroundColorBright,
  headerBoxShadow,
  headerHeight,
  spacing,
  spacingHeader,
  spacingSmall,
  zIndex1
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"

export interface ReportingHeaderProps {
  readonly participantName: Option<string>
}

export const ReportingHeader: React.FC<ReportingHeaderProps> = ({participantName: participantNameOption}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={styles.header}>
      <div css={styles.headerAppNameWrapper}>
        <Icon name={IconName.LucaLogo} />
        <Text>{t("header__app_title")}</Text>
      </div>
      <Text customStyles={styles.headerLabel}>{t("navigation__projects")}</Text>
      <div css={styles.headerParticipantWrapper(participantNameOption.isDefined())}>
        {participantNameOption
          .map(participantName => <Text customStyles={styles.headerParticipantName}>{participantName}</Text>)
          .orNull()}
        <Icon name={IconName.User} />
      </div>
    </div>
  )
}

const styles = {
  header: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: spacingSmall,
    alignItems: "center",
    height: headerHeight,
    boxShadow: headerBoxShadow,
    backgroundColor: backgroundColorBright,
    zIndex: zIndex1,
    padding: spacing(0, spacingHeader)
  }),
  headerAppNameWrapper: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  headerLabel: css({
    textAlign: "center"
  }),
  headerParticipantWrapper: (hasName: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: hasName ? "1fr minmax(min-content, max-content)" : "minmax(min-content, max-content)",
      gridColumnGap: hasName ? spacingSmall : "initial",
      alignItems: "center"
    }),
  headerParticipantName: css({
    textAlign: "right"
  })
}
