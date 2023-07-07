import {css} from "@emotion/react"
import * as React from "react"
import {DetailedHTMLProps, HTMLAttributes} from "react"
import {CustomStyle, spacingSmall} from "../../styles"

type ColumnsProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

interface ColumnProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  readonly flexGrow?: number
  readonly flexShrink?: number
}

export const Columns: React.FC<ColumnsProps & CustomStyle> = ({children, customStyles}) => (
  <div css={[columnsStyle, customStyles]}>{children}</div>
)

export const Column: React.FC<ColumnProps & CustomStyle> = ({children, flexGrow = 1, flexShrink = 1, customStyles}) => (
  <div css={[columnStyle(flexGrow, flexShrink), customStyles]}>{children}</div>
)

const columnsStyle = css({
  display: "flex",
  alignItems: "center"
})

const columnStyle = (flexGrow: number, flexShrink: number) =>
  css({
    flex: `${flexGrow} ${flexShrink} 0`,

    "&:not(:last-child)": {
      marginRight: spacingSmall
    }
  })
