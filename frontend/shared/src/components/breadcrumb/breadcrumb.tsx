import {css} from "@emotion/react"
import * as React from "react"

export const Breadcrumb: React.FC = () => <div css={styles.breadcrumb} className={"breadcrumb"} />

const styles = {
  breadcrumb: css({
    "&:after": {
      display: "block",
      content: '"..."'
    }
  })
}
