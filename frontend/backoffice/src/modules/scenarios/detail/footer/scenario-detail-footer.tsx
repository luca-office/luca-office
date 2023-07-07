import {css} from "@emotion/react"
import * as React from "react"
import {Button, CardFooterItem} from "shared/components"
import {IconName} from "shared/enums"
import {
  backgroundColorBright,
  CustomStyle,
  Flex,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString} from "shared/utils"
import {UserAccount} from "../../../../models"

export interface ScenarioDetailFooterProps extends CustomStyle {
  readonly author: UserAccount
  readonly createdAt: string
  readonly openPreview: () => void
}

export const ScenarioDetailFooter: React.FC<ScenarioDetailFooterProps> = ({author, createdAt, openPreview}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={styles.cardFooter}>
      <div css={Flex.row}>
        <CardFooterItem
          title={t("detail_card__title_createdAt")}
          icon={IconName.Calendar}
          text={formatDateFromString(createdAt)}
        />
        <CardFooterItem
          customStyles={styles.author}
          title={t("detail_card__title_author")}
          icon={IconName.Profile}
          text={`${author.firstName} ${author.lastName}`}
        />
      </div>
      <Button onClick={openPreview}>{t("preview")}</Button>
    </div>
  )
}

const styles = {
  cardFooter: css(Flex.row, {
    padding: spacing(spacingMedium, spacingHuge),
    justifyContent: "space-between",
    backgroundColor: backgroundColorBright
  }),
  author: css({
    marginLeft: spacingLarge
  })
}
