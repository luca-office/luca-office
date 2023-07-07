import {css} from "@emotion/react"
import * as React from "react"
import {Card, CardContent, CardHeader, Heading, Icon, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {flex1, fontColorLight, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export const SelectionDetailPlaceholder: React.FunctionComponent = () => {
  const {t} = useLucaTranslation()
  return (
    <Card customStyles={styles.card}>
      <CardHeader hasGreyBackground hasShadow>
        <Icon name={IconName.Bell} hasSpacing={true} />
        <Heading level={HeadingLevel.h3}>{t("questionnaires__selection_nothing_selected")}</Heading>
      </CardHeader>
      <CardContent customStyles={styles.content}>
        <Heading level={HeadingLevel.h3}>{t("questionnaires__selection_nothing_selected")}</Heading>
        <Text size={TextSize.Medium} customStyles={styles.text}>
          {t("questionnaires__selection_nothing_selected_hint")}
        </Text>
      </CardContent>
    </Card>
  )
}
const styles = {
  content: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  }),
  text: css({
    color: fontColorLight
  }),
  card: css({
    border: 0,
    flex: flex1
  })
}
