import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../enums"
import {borderColor, boxHeightMedium, Flex, flex1, fontColor, spacing, spacingSmall, spacingTiny} from "../../styles"
import {range} from "../../utils"
import {CardHeader} from "../card"
import {Icon} from "../icon/icon"
import {HeaderCarouselBaseElement} from "./header-carousel-container"

export interface HeaderCarouselProps {
  readonly activeElement: HeaderCarouselBaseElement
  readonly activeElementIndex: number
  readonly elementsCount: number
  readonly handleLeftClick: () => void
  readonly handleRightClick: () => void
}

export const HeaderCarousel: React.FC<HeaderCarouselProps> = ({
  activeElement,
  activeElementIndex,
  handleLeftClick,
  handleRightClick,
  elementsCount
}) => {
  return (
    <CardHeader hasGreyBackground hasShadow>
      <Icon
        customStyles={styles.headerIcon}
        name={IconName.TriangleLeft}
        onClick={handleLeftClick}
        fillColor={fontColor}
      />
      <div css={[Flex.column, styles.directory]}>
        <div css={styles.titleWrapper}>
          {activeElement.icon && <Icon name={activeElement.icon} />}
          <div css={styles.headerLabel}>{`${activeElement.label}  ${
            activeElement.count !== undefined ? `(${activeElement.count})` : ""
          } `}</div>
        </div>
        <div css={[Flex.row, styles.status]}>
          {range(elementsCount).map(index => (
            <div key={index} data-testid="header-element" css={styles.statusIcon(index === activeElementIndex)} />
          ))}
        </div>
      </div>
      <Icon
        {...{
          customStyles: styles.headerIcon,
          name: IconName.TriangleRight,
          onClick: handleRightClick,
          fillColor: fontColor
        }}
      />
    </CardHeader>
  )
}

const Size = {
  status: 8
}
const Color = {
  status: {selected: "#4f82cf", default: borderColor}
}

const styles = {
  header: css({
    justifyContent: "space-between",
    margin: spacing(0, spacingSmall),
    height: boxHeightMedium
  }),
  titleWrapper: css(Flex.row, {
    justifyContent: "center"
  }),
  directory: css({
    margin: spacing(0, spacingSmall),
    flex: flex1
  }),
  headerLabel: css({
    marginLeft: spacingSmall
  }),
  headerIcon: css({
    cursor: "pointer"
  }),
  status: css({
    justifyContent: "center",
    marginTop: 2,

    "> div:not(:first-of-type)": {
      marginLeft: spacingTiny
    }
  }),
  statusIcon: (isActive: boolean) =>
    css({
      borderRadius: "100%",
      width: Size.status,
      height: Size.status,
      backgroundColor: isActive ? Color.status.selected : Color.status.default
    })
}
