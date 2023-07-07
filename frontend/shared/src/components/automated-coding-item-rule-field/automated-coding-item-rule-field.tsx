import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel} from "../../enums"
import {AutomatedCodingItem} from "../../models"
import {CustomStyle, Flex, mediumBoxShadow, spacingSmall} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {languageKeyForAutomatedRule, languageKeyForAutomatedRuleDescription} from "../../utils"
import {Label} from "../label/label"
import {Paper} from "../paper/paper"
import {Heading, Text} from "../typography/typography"

export interface AutomatedCodingItemRuleFieldProps extends CustomStyle {
  readonly automatedCodingItem: AutomatedCodingItem
}

export const AutomatedCodingItemRuleField: React.FC<AutomatedCodingItemRuleFieldProps> = ({
  automatedCodingItem,
  customStyles
}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={customStyles}>
      <Label label={t("coding_models__create_item_label_rating_type_automated_title")} />
      <Paper customStyles={styles.paper}>
        <Heading level={HeadingLevel.h3}>{t(languageKeyForAutomatedRule(automatedCodingItem.rule))}</Heading>
        <div css={styles.textRow}>
          <Text customStyles={styles.text}>{t(languageKeyForAutomatedRuleDescription(automatedCodingItem.rule))}</Text>
        </div>
      </Paper>
    </div>
  )
}

const styles = {
  paper: css({
    boxShadow: mediumBoxShadow
  }),
  editButton: css({
    cursor: "pointer"
  }),
  textRow: css(Flex.row, {
    justifyContent: "space-between"
  }),
  text: css({
    marginTop: spacingSmall
  })
}
