import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, Text} from "shared/components"
import {Flex, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

interface Props {
  readonly totalScore: number
}

export const CodingModelDetailViewFooter: React.FC<Props> = ({totalScore}) => {
  const {t} = useLucaTranslation()
  return (
    <CardFooter>
      <div css={[Flex.row, styles.footer]}>
        <Text size={TextSize.Medium}>{t("coding_models__detail_maximum_score_long")}</Text>
        <div css={Flex.row}>
          <Text customStyles={styles.iconButton} size={TextSize.Medium}>
            {totalScore} {t("coding_models__detail_score")}
          </Text>
        </div>
      </div>
    </CardFooter>
  )
}

const styles = {
  footer: css({
    justifyContent: "space-between",
    width: "100%",
    paddingRight: spacingMedium,
    paddingLeft: spacingSmall
  }),
  iconButton: css({
    marginRight: spacingSmall
  })
}
