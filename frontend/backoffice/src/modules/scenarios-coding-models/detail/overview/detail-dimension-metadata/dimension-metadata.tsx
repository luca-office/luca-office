import {css} from "@emotion/react"
import * as React from "react"
import {ReadonlyActionField, Text} from "shared/components"
import {CustomStyle, spacingMedium, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

interface Props {
  readonly dimensionsCount: {
    readonly mainDimension: number
    readonly subDimension: number
    readonly items: number
  }
}

export const DimensionMetadata: React.FC<Props & CustomStyle> = ({dimensionsCount, customStyles}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={[styles.wrapper, customStyles]}>
      <ReadonlyActionField
        label={t("coding_models__detail_main_dimension_label")}
        renderValue={() => (
          <Text size={TextSize.Medium}>{`${dimensionsCount.mainDimension} ${t(
            "coding_models__detail_main_dimension_label"
          )}`}</Text>
        )}
      />
      <ReadonlyActionField
        label={t("coding_models__detail_sub_dimension_label")}
        renderValue={() => (
          <Text size={TextSize.Medium}>{`${dimensionsCount.subDimension} ${t(
            "coding_models__detail_sub_dimension_label"
          )}`}</Text>
        )}
      />
      <ReadonlyActionField
        label={t("coding_models__detail_items_label")}
        renderValue={() => (
          <Text size={TextSize.Medium}>{`${dimensionsCount.items} ${t("coding_models__detail_items_label")}`}</Text>
        )}
      />
    </div>
  )
}

const styles = {
  wrapper: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: spacingMedium
  })
}
