import {css} from "@emotion/react"
import * as React from "react"
import {Payload} from "redux-first-router"
import {
  Button,
  deleteEntityButtonStyles,
  Heading,
  Icon,
  OrlyButtonContainer,
  OrlyButtonProps,
  SubHeader
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {Route as SharedRoute} from "shared/routes"
import {CustomStyle, FontWeight, primaryColor, spacing, spacingHeader, spacingMedium, spacingSmall} from "shared/styles"
import {Route} from "../../routes"
import {SubHeaderDetailContainerProps} from "./sub-header-detail-container"

export interface SubHeaderDetailProps {
  readonly navigate: (route: Route | SharedRoute, params?: Payload) => void
  readonly buttonDisabled?: boolean
  readonly deleteButtonConfig?: OrlyButtonProps
}

export const SubHeaderDetail: React.FC<SubHeaderDetailContainerProps & SubHeaderDetailProps & CustomStyle> = ({
  returnTo,
  title,
  buttonText,
  onButtonClick,
  buttonVariant,
  navigate,
  buttonDisabled,
  customStyles,
  deleteButtonConfig
}) => (
  <SubHeader customStyles={[styles.header, customStyles]}>
    <div onClick={() => navigate(returnTo.route, returnTo.params)} css={styles.backButton}>
      <Icon customStyles={styles.icon} name={IconName.ArrowLeft} />
      <Heading level={HeadingLevel.h3}>{returnTo.text}</Heading>
    </div>
    <div css={styles.headline}>
      <Heading customStyles={styles.title} fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
        {title}
      </Heading>
    </div>
    {!!onButtonClick && !!buttonText && (
      <Button
        disabled={buttonDisabled}
        onClick={onButtonClick}
        variant={buttonVariant}
        customStyles={styles.actionButton}>
        {buttonText}
      </Button>
    )}
    {deleteButtonConfig && (
      <OrlyButtonContainer
        customButtonStyles={deleteEntityButtonStyles.trashButton}
        iconName={IconName.Trash}
        {...deleteButtonConfig}
      />
    )}
  </SubHeader>
)

const styles = {
  header: css({
    position: "relative"
  }),
  backButton: css({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    flex: "0 0 25%",
    position: "absolute",
    left: spacingHeader
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  headline: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto"
  }),
  title: css({
    color: primaryColor
  }),
  actionButton: css({
    padding: spacing(0, spacingMedium),
    width: 292,
    position: "absolute",
    right: spacingHeader
  })
}
