import {css} from "@emotion/react"
import * as React from "react"
import {Heading, SubHeader} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {FontWeight} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export const ReportingSubHeader: React.FC = () => {
  const {t} = useLucaTranslation()

  return (
    <SubHeader customStyles={styles.subHeader}>
      <Heading
        customStyles={styles.subHeaderLabel}
        level={HeadingLevel.h3}
        fontWeight={FontWeight.Bold}
        color={"primary"}>
        {t("reporting__overview_header_label")}
      </Heading>
    </SubHeader>
  )
}

const styles = {
  subHeader: css({
    justifyContent: "center"
  }),
  subHeaderLabel: css({
    letterSpacing: 0
  })
}
