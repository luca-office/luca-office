import {css} from "@emotion/react"
import {
  backgroundColorBright,
  backgroundColorLight,
  borderRadiusLarge,
  fontColor,
  fontColorLight,
  headerBoxShadow,
  primaryColor,
  primaryColorHover,
  TextSize
} from "../../styles"

export const calenderStyle = css({
  // General
  ".react-calendar": {
    borderRadius: borderRadiusLarge
  },

  // Navigation
  ".react-calendar__navigation": {
    backgroundColor: backgroundColorLight,
    borderRadius: "4px 4px 0px 0px",
    boxShadow: headerBoxShadow
  },
  ".react-calendar__navigation__label": {
    fontSize: TextSize.Medium
  },
  ".react-calendar__navigation__arrow": {
    color: fontColor
  },
  ".react-calendar__navigation__arrow:disabled": {
    backgroundColor: backgroundColorLight,
    color: fontColorLight
  },
  ".react-calendar__navigation__prev-button": {},
  ".react-calendar__navigation__prev2-button": {},
  ".react-calendar__navigation__next-button": {},
  ".react-calendar__navigation__next2-button": {},

  // Calender Content
  ".react-calendar__tile:disabled": {
    backgroundColor: backgroundColorBright,
    color: fontColorLight
  },
  ".react-calendar__month-view__weekdays": {
    color: fontColor
  },
  ".react-calendar__tile--now": {
    backgroundColor: backgroundColorBright
  },
  ".react-calendar__month-view__days__day--weekend": {
    color: primaryColor
  },
  ".react-calendar__tile--range": {
    backgroundColor: primaryColorHover,
    color: fontColor
  },
  ".react-calendar__tile--rangeStart, .react-calendar__tile--rangeEnd": {
    backgroundColor: primaryColor,
    color: backgroundColorBright
  }
})
