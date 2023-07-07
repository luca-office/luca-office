import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle, fontColor} from "../../styles"
import {Icon} from "../icon/icon"
import {slideMenuStyles as styles} from "./slide-menu.style"

export interface SlideMenuProps extends CustomStyle {
  readonly renderDetailView: (visible: boolean) => React.ReactNode
  readonly renderToC: (visible: boolean) => React.ReactNode
  readonly defaultVisibility?: SlideMenuVisibility
  readonly inactive?: boolean
}

export enum SlideMenuVisibility {
  Collapsed,
  Detail,
  Full
}

const wideScreenBreakPoint = 1080

export const SlideMenu: React.FC<SlideMenuProps> = ({
  defaultVisibility,
  renderDetailView,
  renderToC,
  inactive,
  customStyles
}) => {
  const [visibility, setVisibility] = React.useState<SlideMenuVisibility>(
    defaultVisibility || SlideMenuVisibility.Collapsed
  )
  const changeVisibility = (expand: boolean) => {
    switch (visibility) {
      case SlideMenuVisibility.Collapsed:
        return expand ? setVisibility(SlideMenuVisibility.Detail) : undefined
      case SlideMenuVisibility.Detail:
        return setVisibility(expand ? SlideMenuVisibility.Full : SlideMenuVisibility.Collapsed)
      case SlideMenuVisibility.Full:
        return !expand ? setVisibility(SlideMenuVisibility.Detail) : undefined
      default:
        return
    }
  }

  const iconColor = inactive ? fontColor : "white"
  const showAsPopup = window.innerWidth < wideScreenBreakPoint

  return (
    <div className="slide-menu" css={[styles.wrapper(visibility, showAsPopup), customStyles]}>
      <div css={styles.content(visibility, !inactive)}>
        {renderToC(visibility === SlideMenuVisibility.Full)}
        {renderDetailView(visibility !== SlideMenuVisibility.Collapsed)}
      </div>
      <div css={styles.control(!inactive)}>
        <div
          css={[styles.controlButton, visibility === SlideMenuVisibility.Collapsed && styles.controlButtonDisabled]}
          onClick={() => changeVisibility(false)}>
          <Icon name={IconName.ChevronLeft} color={iconColor} />
        </div>
        <div
          css={[styles.controlButton, visibility === SlideMenuVisibility.Full && styles.controlButtonDisabled]}
          onClick={() => changeVisibility(true)}>
          <Icon name={IconName.ChevronRight} color={iconColor} />
        </div>
      </div>
    </div>
  )
}
