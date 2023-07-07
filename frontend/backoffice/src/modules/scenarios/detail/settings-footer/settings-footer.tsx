import * as React from "react"
import {Icon} from "shared/components"
import {IconName, ViewerToolsType} from "shared/enums"
import {Flex, fontColorLight, primaryColor} from "shared/styles"
import {SettingsElementCount} from "../settings/scenario-settings"
import {useSettingsFooter} from "./hooks/use-settings-footer"
import {settingsFooterStyle as styles} from "./settings-footer.style"

export interface ViewerToolScenarioDetail {
  readonly type: ViewerToolsType
  readonly icon: IconName
  readonly isActive: boolean
}
export interface SettingsFooterProps {
  readonly isPreviewDisabled?: boolean
  readonly settingsCount: SettingsElementCount
}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({settingsCount}) => {
  const {viewerTools} = useSettingsFooter(settingsCount)

  return (
    <div css={[Flex.row, styles.controls]}>
      <div css={[Flex.row, styles.controlIcons]}>
        {viewerTools.map((tool, index) => (
          <React.Fragment key={index}>
            {index === 5 && <div css={styles.spacerVertical} />}
            <Icon customStyles={[styles.icon]} name={tool.icon} color={tool.isActive ? primaryColor : fontColorLight} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
