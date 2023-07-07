import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {ReactNode} from "react"
import {HeadingLevel, IconName} from "../../enums"
import {CustomStyle, spacingHuge, spacingSmall, textEllipsis} from "../../styles"
import {Icon} from "../icon/icon"
import {TagsOnCards} from "../tags-on-card/tags-on-cards"
import {Heading} from "../typography/typography"
import {Card, CardProps} from "./card"
import {CardHeader, CardText} from "./elements"
import {LabelledCard} from "./labelled-card"

interface Props extends CustomStyle {
  readonly text?: string | JSX.Element
  readonly content?: React.ReactElement | React.ReactNode
  readonly footer?: React.ReactElement
  readonly headerText?: string | JSX.Element
  readonly cardLabel?: string // the title will be displayed above the card itself
  readonly customCardStyles?: CSSInterpolation
  readonly headerIcon?: IconName
  readonly headerInfo?: JSX.Element | ReactNode
  readonly noAnimationOnHover?: boolean
  readonly headerHasShadow?: boolean
  readonly headerGreyBackground?: boolean
  readonly tags?: string[]
}

export const OverviewCard: React.FC<Props & CardProps> = ({
  cardLabel,
  content,
  customStyles,
  customCardStyles,
  footer,
  hasShadow,
  headerGreyBackground,
  headerHasShadow,
  headerIcon,
  headerInfo,
  headerText,
  noAnimationOnHover,
  onClick,
  isSelected,
  text,
  tags
}) => {
  const card = (
    <Card
      onClick={onClick}
      animateOnHover={!noAnimationOnHover}
      isSelected={isSelected}
      hasShadow={typeof hasShadow === "undefined" || hasShadow}
      customStyles={[styles.baseCard(tags !== undefined), !cardLabel && customStyles, cardLabel && customCardStyles]}>
      <div>
        {(headerText || headerIcon || headerInfo) && (
          <CardHeader customStyles={styles.header} hasShadow={headerHasShadow} hasGreyBackground={headerGreyBackground}>
            <div css={styles.headerContainer}>
              {headerIcon && <Icon customStyles={styles.icon} name={headerIcon} />}
              <Heading level={HeadingLevel.h3} customStyles={textEllipsis}>
                {headerText}
              </Heading>
            </div>
            {headerInfo}
          </CardHeader>
        )}
        {content}
        <div>{text && <CardText customStyles={styles.cardText}>{text}</CardText>}</div>
      </div>
      <div>
        {tags && <TagsOnCards tags={tags} />}
        {footer}
      </div>
    </Card>
  )
  return cardLabel ? (
    <LabelledCard label={cardLabel} customStyles={customStyles}>
      {card}
    </LabelledCard>
  ) : (
    card
  )
}

const styles = {
  baseCard: (hasTags: boolean) =>
    css({
      display: "flex",
      height: hasTags ? 184 : 184 - spacingHuge,
      cursor: "pointer",
      flexDirection: "column",
      overflow: "hidden",
      justifyContent: "space-between"
    }),
  header: css({
    justifyContent: "space-between"
  }),
  headerContainer: {
    display: "flex",
    alignItems: "center",
    maxWidth: "70%"
  },
  content: css({
    flex: 1
  }),
  titleWrapper: {},
  icon: css({
    marginRight: spacingSmall
  }),
  // Had to use template string, cause webkit property does not work in object notation. webkitLineClamp will be computed to webkite-line-clamp, without the dash
  cardText: css`
    padding-top: 0px;
    padding-bottom: 0px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    overflow: hidden;
    margin-bottom: ${spacingSmall}px;
  `
}
