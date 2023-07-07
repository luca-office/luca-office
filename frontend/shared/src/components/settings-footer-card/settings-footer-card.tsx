import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Children, CustomStyle, Flex} from "../../styles"
import {OverviewCard} from "../card"
import {settingsFooterCardStyle as styles} from "./settings-footer-card.style"

export interface SettingsFooterCardProps extends CustomStyle, Children {
  readonly label: string
  readonly text?: string
  readonly customTextStyles?: CSSInterpolation
}

export const SettingsFooterCard: React.FC<SettingsFooterCardProps> = ({
  customStyles,
  customTextStyles,
  label,
  text,
  children
}) => (
  <OverviewCard
    customStyles={[styles.card, customStyles]}
    content={
      <React.Fragment>
        <div css={[Flex.column, styles.contentWrapper]}>
          <div css={styles.label} className={"label"}>
            {label}
          </div>
          {text && (
            <div css={[styles.text, customTextStyles]} className={"text"}>
              {text}
            </div>
          )}
          <div className={"content"}>{children}</div>
        </div>
      </React.Fragment>
    }
  />
)
