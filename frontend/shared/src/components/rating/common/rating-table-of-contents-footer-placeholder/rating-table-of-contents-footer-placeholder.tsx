import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../../../enums"
import {Flex, spacingSmall, textEllipsis} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {Icon} from "../../../icon/icon"
import {Text} from "../../../typography/typography"

export const RatingTableOfContentsFooterPlaceholder: React.FC = () => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.content}>
      <div css={styles.infoWrapper}>
        <Icon name={IconName.Alert2} />
        <Text customStyles={textEllipsis}>{t("common__no_data")}</Text>
      </div>
      <Text customStyles={textEllipsis}>{`(${t("rating__not_possible")})`}</Text>
    </div>
  )
}

const styles = {
  content: css(Flex.row, {
    justifyContent: "space-between"
  }),
  infoWrapper: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) minmax(0, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center",
    marginRight: spacingSmall
  })
}
