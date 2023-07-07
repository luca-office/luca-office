import {css} from "@emotion/react"
import * as React from "react"
import {backgroundColorDarker, CustomStyle} from "../../styles"

interface Props extends CustomStyle {
  readonly url: string
}

export const ImageView: React.FC<Props> = ({customStyles, url}) => (
  <div css={[customStyles, styles.image(url)]} className="image" />
)

const styles = {
  image: (url: string) =>
    css({
      backgroundImage: `url(${url})`,
      backgroundColor: backgroundColorDarker,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain"
    })
}
