import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {
  buttonBackgroundDanger,
  cardBottomColor,
  Children,
  CustomStyle,
  spacingMedium,
  spacingSmall,
  textEllipsis,
  zIndex1
} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Card, CardHeader, Heading, Icon, OrlyButtonContainer} from ".."

export interface HeaderContentContainerProps extends CustomStyle, Children {
  readonly customContentContainerStyles?: CSSInterpolation
  readonly headerTitleKey?: LucaI18nLangKey
  readonly headerIconName?: IconName
  readonly onConfirm?: () => void
  readonly buttonModalTitleKey?: LucaI18nLangKey
  readonly buttonModalTextKey?: LucaI18nLangKey
  readonly buttonModalConfirmKey?: LucaI18nLangKey
  readonly disabled?: boolean
  readonly hasFooterBar?: boolean
}

export const HeaderContentContainer: React.FC<HeaderContentContainerProps> = ({
  children,
  customStyles,
  customContentContainerStyles,
  headerTitleKey,
  headerIconName,
  onConfirm,
  buttonModalTitleKey,
  buttonModalTextKey,
  buttonModalConfirmKey,
  disabled,
  hasFooterBar
}) => {
  const {t} = useLucaTranslation()

  return (
    <Card customStyles={[styles.card, customStyles]}>
      <CardHeader customStyles={styles.header} hasShadow hasGreyBackground>
        <div css={[styles.title, styles.titleHeadingWrapper]}>
          {headerIconName && <Icon customStyles={styles.icon} name={headerIconName} />}
          {headerTitleKey && (
            <Heading customStyles={styles.titleHeading} level={HeadingLevel.h3}>
              {t(headerTitleKey)}
            </Heading>
          )}
        </div>

        {onConfirm && (
          <div css={styles.title}>
            <OrlyButtonContainer
              customButtonStyles={styles.deleteIcon}
              iconName={IconName.Trash}
              onConfirm={onConfirm}
              disabled={disabled}
              dismissOnConfirm={true}
              modalTitleKey={buttonModalTitleKey}
              modalTextKey={buttonModalTextKey}
              confirmButtonKey={buttonModalConfirmKey}
            />
          </div>
        )}
      </CardHeader>

      <div css={[styles.content, customContentContainerStyles]}>{children}</div>
      {hasFooterBar && <div css={styles.headerContainerFooter} className={"footer-bar"} />}
    </Card>
  )
}

const styles = {
  card: css({
    width: "100%",
    overflow: "auto"
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    zIndex: zIndex1
  }),
  title: css({
    display: "flex",
    alignItems: "center"
  }),
  titleHeadingWrapper: css({
    overflow: "hidden",
    marginRight: spacingSmall
  }),
  titleHeading: css(textEllipsis),
  icon: css({
    marginRight: spacingSmall
  }),
  content: css({
    overflowY: "auto"
  }),
  deleteIcon: css({
    marginLeft: spacingSmall,
    background: buttonBackgroundDanger,
    border: "none"
  }),
  headerContainerFooter: css({
    marginTop: spacingMedium,
    height: spacingMedium,
    backgroundColor: cardBottomColor
  })
}
