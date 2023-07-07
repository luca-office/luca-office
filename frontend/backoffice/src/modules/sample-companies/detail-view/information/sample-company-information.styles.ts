import {css} from "@emotion/react"
import {buttonBackgroundDanger, Flex} from "shared/styles"

const Sizes = {
  gridColumn: 268
}

export const sampleCompanyInformationStyles = {
  container: css({
    display: "grid",
    gridTemplateColumns: `3fr ${Sizes.gridColumn}px`,
    alignItems: "start"
  }),
  cardContent: (isSelectedForScenario: boolean) =>
    css({
      ".card-content": {
        padding: !isSelectedForScenario ? 0 : "inital"
      }
    }),
  main: css(Flex.column, {
    flex: "1 1 auto",
    height: "100%"
  }),
  trashButton: css({
    background: buttonBackgroundDanger,
    border: "none"
  }),
  binary: css(Flex.column, {
    flexBasis: Sizes.gridColumn,
    overflow: "hidden"
  })
}
