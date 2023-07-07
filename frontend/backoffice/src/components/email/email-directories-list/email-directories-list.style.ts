import {css} from "@emotion/react"
import {
  backgroundMenuInactive,
  borderColor,
  borderRadius,
  boxHeightMedium,
  buttonBackgroundDanger,
  deepShadow,
  Flex,
  fontColor,
  fontColorLight,
  primaryColor,
  spacing,
  spacingHuge,
  spacingHuger,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "shared/styles"

const Size = {
  email: 48,
  status: 8
}
const Color = {
  subject: "#797979",
  status: {selected: borderColor, default: buttonBackgroundDanger},
  selected: "#fafcff"
}

export const emailDirectoriesListStyle = {
  loadingIndicator: css({
    margin: "auto"
  }),
  placeholder: css({
    color: fontColorLight,
    margin: "auto",
    // the top padding of email-body wrapper is 24px, while
    // email-directories-list has a top padding of 16px.
    // 2 * spacingSmall is used to put the placeholder on the
    // same height as in the email-body (spacingHuger + spacingSmall)
    marginTop: spacingHuger + 2 * spacingSmall
  }),
  email: (hasIconContainer: boolean) =>
    css(Flex.row, {
      padding: !hasIconContainer
        ? spacing(spacingTiny, spacingHuge + spacingSmall, spacingTiny, spacingSmall)
        : spacing(0, 0, 0, spacingSmall),
      height: Size.email,
      boxSizing: "border-box",
      cursor: "pointer",
      border: "2px solid transparent",
      borderRadius,

      ":hover": {
        boxShadow: deepShadow
      }
    }),
  emailSelected: css({
    borderColor: primaryColor,
    cursor: "default",
    backgroundColor: Color.selected,
    boxShadow: deepShadow
  }),
  emailContent: css(Flex.column, {
    width: "100%"
  }),
  emailIconContainer: (isIntervention: boolean, isSelected: boolean) =>
    css(Flex.column, {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      minWidth: boxHeightMedium,
      width: boxHeightMedium,
      backgroundColor: isIntervention ? backgroundMenuInactive : primaryColor,
      marginLeft: spacingSmall,
      borderTopRightRadius: isSelected ? 0 : borderRadius,
      borderBottomRightRadius: isSelected ? 0 : borderRadius
    }),
  emailSenderOrRecipient: css(textEllipsis, {
    flex: "1 1 auto",
    marginRight: spacingSmall,
    color: fontColor
  }),
  emailSubject: css(textEllipsis, {
    color: Color.subject,
    fontSize: TextSize.Small,
    letterSpacing: 0.13
  }),
  emailTime: css({
    color: fontColor
  }),
  emailStatus: (isRead: boolean) =>
    css({
      marginLeft: spacingSmall,
      borderRadius: "100%",
      width: Size.status,
      height: Size.status,
      background: isRead ? Color.status.selected : Color.status.default
    })
}
