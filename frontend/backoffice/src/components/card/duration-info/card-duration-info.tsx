import {css} from "@emotion/react"
import * as React from "react"
import {Heading, Icon} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {spacingSmall} from "shared/styles"
import {WithLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes} from "shared/utils"

interface Props extends WithLucaTranslation {
  readonly maxDurationInSeconds?: number | null
  readonly placeholder?: number | string
  readonly showIconBeforeText?: boolean
}

export const CardDurationInfo: React.FunctionComponent<Props> = ({
  maxDurationInSeconds,
  placeholder = 0,
  showIconBeforeText,
  t
}) =>
  maxDurationInSeconds !== null ? (
    <div data-testid="card-duration-info" css={styles.headerTime} className="header-time">
      {showIconBeforeText && <Icon customStyles={styles.headerIconLeft} name={IconName.Clock} />}
      <Heading level={HeadingLevel.h3}>
        {`${maxDurationInSeconds !== undefined ? convertSecondsToMinutes(maxDurationInSeconds) : placeholder} ${
          maxDurationInSeconds !== undefined ? t("unit__minutes_short") : ""
        }`}
      </Heading>
      {!showIconBeforeText && <Icon customStyles={styles.headerIcon} name={IconName.Clock} />}
    </div>
  ) : null

const styles = {
  headerTime: css({
    display: "flex",
    alignItems: "center"
  }),
  headerIcon: css({
    marginLeft: spacingSmall
  }),
  headerIconLeft: css({
    marginRight: spacingSmall
  })
}
