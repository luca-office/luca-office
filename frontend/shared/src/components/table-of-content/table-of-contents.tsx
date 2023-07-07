import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {ButtonConfig} from "../../models"
import {Children, CustomStyle, Flex, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Button, Card, CardFooter, CardHeader, Heading, Icon, LoadingIndicator, Text, Tooltip} from ".."
import {tocStyles as styles} from "./table-of-contents-style"

export interface TableOfContentsContainerProps {
  readonly title: string
  readonly actionFooter?: React.ReactNode
  readonly customHeader?: React.ReactNode
  readonly addButtonConfig?: ButtonConfig
  readonly customCardStyles?: CSSInterpolation
  readonly customCardHeaderStyles?: CSSInterpolation
  readonly customCardContentStyles?: CSSInterpolation
  readonly customTocBodyStyles?: CSSInterpolation
  readonly customTocBodyChildrenStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly headerButtons?: React.ReactNode[]
  readonly headerIcon?: IconName
  readonly loading?: boolean
  readonly readonly?: boolean
  readonly showPlaceHolder?: boolean
  readonly placeholderHeadline?: string
  readonly placeholderHint?: string
  readonly titleRightSide?: string
}

export const TableOfContentsContainer: React.FC<TableOfContentsContainerProps & CustomStyle & Children> = ({
  title,
  children,
  customHeader,
  actionFooter,
  addButtonConfig,
  customCardStyles,
  customCardHeaderStyles,
  customCardContentStyles,
  customTocBodyStyles,
  customTocBodyChildrenStyles,
  customFooterStyles,
  headerButtons,
  headerIcon,
  loading,
  readonly,
  showPlaceHolder,
  placeholderHeadline,
  placeholderHint,
  titleRightSide
}) => {
  const {t} = useLucaTranslation()

  const tocBody = (
    <div
      css={[styles.content, showPlaceHolder && styles.cardContentCentered, customTocBodyStyles]}
      className={"book-chapters-list"}>
      <div css={[styles.children, customTocBodyChildrenStyles]}>
        {loading ? (
          <LoadingIndicator />
        ) : showPlaceHolder ? (
          <Text customStyles={styles.placeholder} size={TextSize.Medium}>
            {placeholderHeadline}
            {placeholderHint && (
              <Text size={TextSize.Medium} customStyles={styles.hint}>
                {placeholderHint}
              </Text>
            )}
          </Text>
        ) : (
          children
        )}
      </div>
    </div>
  )

  return (
    <Card customStyles={[styles.card, customCardStyles]}>
      {customHeader ? (
        customHeader
      ) : (
        <CardHeader customStyles={[styles.cardHeader, customCardHeaderStyles]} hasShadow hasGreyBackground>
          <div css={Flex.row}>
            {headerIcon && <Icon customStyles={styles.marginRightMedium} name={headerIcon} />}
            <Heading level={HeadingLevel.h3}>{title}</Heading>
          </div>
          {titleRightSide && <Heading level={HeadingLevel.h3}>{titleRightSide}</Heading>}
          {headerButtons && <div css={styles.headerButtons}>{headerButtons}</div>}
        </CardHeader>
      )}

      <div
        className="toc-body"
        css={[styles.cardContent, showPlaceHolder && styles.cardContentCentered, customCardContentStyles]}>
        {tocBody}
      </div>

      <CardFooter customStyles={[Flex.column, customFooterStyles]}>
        {!readonly && (
          <React.Fragment>
            {addButtonConfig && (
              <Tooltip
                customStyles={{marginRight: "0 !important"}} // use important to overwrite margin from CardFooter
                inactive={!addButtonConfig.tooltipKey}
                title={addButtonConfig.tooltipKey ? t(addButtonConfig.tooltipKey) : ""}>
                <Button
                  onClick={addButtonConfig.onClick}
                  disabled={addButtonConfig.disabled}
                  customStyles={styles.button}
                  icon={addButtonConfig.icon ? addButtonConfig.icon : IconName.Add}>
                  {t(addButtonConfig.labelKey)}
                </Button>
              </Tooltip>
            )}
            {actionFooter}
          </React.Fragment>
        )}
      </CardFooter>
    </Card>
  )
}
