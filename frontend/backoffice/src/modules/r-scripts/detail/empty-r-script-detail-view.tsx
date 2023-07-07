import {css} from "@emotion/react"
import * as React from "react"
import {Card, CardContent, CardFooter, CardHeader, Text} from "shared/components"
import {CustomStyle, fontColorLight, spacingLarge, spacingTiny, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"

interface Props {
  readonly t: LucaTFunction
}

export const EmptyRScriptDetailView: React.FC<Props & CustomStyle> = ({t, customStyles}) => (
  <Card customStyles={customStyles}>
    <CardHeader hasShadow hasGreyBackground>
      {t("r_scripts__details_empty_header_label")}
    </CardHeader>
    <CardContent customStyles={styles.content}>
      <Text size={TextSize.Medium}>{t("r_scripts__details_empty_heading")}</Text>
      <Text size={TextSize.Medium} customStyles={styles.placeholderText}>
        {t("r_scripts__details_empty_text")}
      </Text>
    </CardContent>
    <CardFooter />
  </Card>
)

const styles = {
  content: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: spacingLarge,
    boxSizing: "border-box"
  }),
  placeholderText: css({
    marginTop: spacingTiny,
    color: fontColorLight
  })
}
