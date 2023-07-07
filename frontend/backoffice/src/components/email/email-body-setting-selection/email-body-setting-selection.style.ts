import {css} from "@emotion/react"
import {
  borderColor,
  borderRadiusSmall,
  fontColorLight,
  FontWeight,
  inputHeight,
  spacing,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

const Size = {
  label: 20
}

export const emailBodySettingSelectionStyle = {
  label: css({
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,
    height: Size.label,
    lineHeight: `${Size.label}px`,
    letterSpacing: 0.15,
    marginBottom: spacingTiny
  }),
  dropdownWrapper: css({
    "> div > select": {
      width: "100%"
    }
  }),
  dropdown: css({
    width: "100%"
  }),
  disabledOption: css({
    padding: spacing(0, spacingSmall + spacingTiny / 2),
    borderRadius: borderRadiusSmall,
    border: `1px solid ${borderColor}`,
    fontSize: TextSize.Medium,
    height: inputHeight,
    lineHeight: `${inputHeight}px`
  }),
  disabledOptionLabel: css({
    flex: 1,
    marginRight: spacingSmall
  }),
  disabledOptionIcon: css({
    position: "relative",

    "> svg": {
      position: "absolute",
      width: "100%",
      height: "100%",

      "> g > g": {
        stroke: fontColorLight
      }
    }
  })
}
