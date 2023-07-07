import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle, iconDefaultColor} from "../../styles"
import {Card, CardContent, CardFooter, CardHeader, CardProps} from "../card"
import {Icon} from "../icon/icon"
import {accordionCardStyles as styles} from "./accordion-card.styles"
import {useAccordionCard} from "./hooks/use-accordion-card"

export interface AccordionCardProps extends CustomStyle, CardProps {
  readonly headerLabel: string
  readonly headerLabelIcon?: IconName
  readonly headerLabelIconColor?: string
  readonly additionalHeaderLabel?: string
  readonly footer?: React.ReactNode
}

export const AccordionCard: React.FC<AccordionCardProps> = ({
  customStyles,
  isSelected,
  headerLabel,
  headerLabelIcon,
  headerLabelIconColor = iconDefaultColor,
  additionalHeaderLabel,
  footer,
  children,
  ...cardProps
}) => {
  const {contentVisible, showContent, hideContent} = useAccordionCard()

  const hasAdditionalHeaderLabel = !!additionalHeaderLabel
  const hasFooter = !!footer

  const toggleContent = () => (contentVisible ? hideContent() : showContent())

  const renderHeaderLabel = () => {
    const content = <div css={styles.headerLabel(false)}>{headerLabel}</div>
    return !headerLabelIcon ? (
      content
    ) : (
      <div css={styles.headerLabelWrapper}>
        {content}
        <Icon color={headerLabelIconColor} name={headerLabelIcon} />
      </div>
    )
  }

  return (
    <Card customStyles={isSelected ? customStyles : [styles.card, customStyles]} isSelected={isSelected} {...cardProps}>
      <CardHeader customStyles={styles.header} hasGreyBackground={true} hasShadow={true}>
        <div css={styles.headerContent(hasAdditionalHeaderLabel)} onClick={toggleContent}>
          {renderHeaderLabel()}
          {hasAdditionalHeaderLabel && <div css={styles.headerLabel(true)}>{additionalHeaderLabel}</div>}
          <Icon name={contentVisible ? IconName.ArrowTriangleDownFilled : IconName.ArrowTriangleRightFilled} />
        </div>
      </CardHeader>
      {contentVisible && (
        <React.Fragment>
          <CardContent customStyles={styles.content(hasFooter)}>{children}</CardContent>
          {hasFooter && <CardFooter customStyles={styles.footer}>{footer}</CardFooter>}
        </React.Fragment>
      )}
    </Card>
  )
}
