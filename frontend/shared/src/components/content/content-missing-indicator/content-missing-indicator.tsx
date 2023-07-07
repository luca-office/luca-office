import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {spacingMedium, TextSize} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {CardContent} from "../../card"
import {DetailViewCard} from "../../detail-view-card/detail-view-card"
import {Text} from "../../typography/typography"

interface ContentMissingIndicatorProps {
  readonly customLabelledCardStyles?: CSSInterpolation
}

/**
 * used as placeholder in detail views if entity could not be fetched / is not existing
 */
export const ContentMissingIndicator: React.FC<ContentMissingIndicatorProps> = ({customLabelledCardStyles}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={styles.placeholderGeneral}>
      <DetailViewCard
        customLabelledCardStyles={customLabelledCardStyles}
        label={t("content__not_found_headline")}
        content={
          <CardContent>
            <Text size={TextSize.Small}>{t("content__not_found")}</Text>
          </CardContent>
        }
      />
    </div>
  )
}

const styles = {
  placeholderGeneral: css({
    padding: spacingMedium,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center"
  })
}
