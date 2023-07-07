import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {
  backgroundMenuInactive,
  borderRadius,
  boxSizeLarge,
  CustomStyle,
  Flex,
  spacing,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {getPercentage} from "../../../../utils"
import {Text} from "../../../typography/typography"

export interface PercentagePaperPrefixProps extends CustomStyle {
  readonly customLabelStyles?: CSSInterpolation
  readonly ratingsCount: number
  readonly ratersCount: number
}

export const PercentagePaperPrefix: React.FC<PercentagePaperPrefixProps> = ({
  customStyles,
  customLabelStyles,
  ratingsCount,
  ratersCount
}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={[styles.content, customStyles]}>
      <Text customStyles={[styles.label, customLabelStyles]} size={TextSize.Medium}>
        {ratersCount === 0 ? t("percentage", {percentage: 0}) : getPercentage(t, ratingsCount, ratersCount)}
      </Text>
    </div>
  )
}

const styles = {
  content: css(Flex.row, {
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: backgroundMenuInactive,
    borderRadius: spacing(borderRadius, 0, 0, borderRadius),
    width: boxSizeLarge,
    padding: spacing(spacingSmall, spacingTiny)
  }),
  label: css(textEllipsis, {
    fontWeight: "bold"
  })
}
