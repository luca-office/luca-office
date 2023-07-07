import {css} from "@emotion/react"
import * as React from "react"
import {Heading, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {fontColorLight, spacingTinier, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export const RaterRatingOverviewPlaceholder: React.FC = () => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.placeholder}>
      <Heading customStyles={[styles.header, styles.text]} level={HeadingLevel.h3}>
        {t("rater_rating__placeholder_title")}
      </Heading>
      <Text customStyles={[styles.description, styles.text]} size={TextSize.Medium}>
        {t("rater_rating__placeholder_description")}
      </Text>
    </div>
  )
}

const styles = {
  placeholder: css({
    display: "grid",
    gridTemplateRows: "repeat(2, minmax(min-content, max-content))",
    gridRowGap: spacingTiny
  }),
  text: css({
    textAlign: "center"
  }),
  header: css({
    marginBottom: spacingTinier
  }),
  description: css({
    color: fontColorLight
  })
}
