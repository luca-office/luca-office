import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem} from "shared/components"
import {IconName} from "shared/enums"
import {CustomStyle, Flex, flex1, spacing, spacingLarge, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString, Option} from "shared/utils"
import {EditingStatusIndicator} from "../../../../components"
import {UserAccount} from "../../../../models"

export interface ProjectDetailCardFooterProps extends CustomStyle {
  readonly author: Option<UserAccount>
  readonly createdAt: string
  readonly isFinalized: boolean
  readonly hideFooterWrapper?: boolean
}

export const ProjectDetailCardFooter: React.FC<ProjectDetailCardFooterProps> = ({
  author: authorOption,
  createdAt,
  isFinalized,
  hideFooterWrapper,
  customStyles
}) => {
  const {t} = useLucaTranslation()
  const footerContent = (
    <React.Fragment>
      <CardFooterItem
        title={t("detail_card__title_createdAt")}
        icon={IconName.Calendar}
        text={formatDateFromString(createdAt)}
      />
      {authorOption
        .map(author => (
          <CardFooterItem
            customStyles={styles.author}
            title={t("detail_card__title_author")}
            icon={IconName.Profile}
            text={`${author.firstName} ${author.lastName}`}
          />
        ))
        .orNull()}
      <EditingStatusIndicator t={t} isFinalized={isFinalized} customStyles={styles.cardFooterStatus} iconOnly={false} />
    </React.Fragment>
  )
  return !hideFooterWrapper ? (
    <CardFooter customStyles={[styles.cardFooter, customStyles]}>{footerContent}</CardFooter>
  ) : (
    footerContent
  )
}

const styles = {
  cardFooter: css({
    padding: spacing(spacingSmall, spacingLarge)
  }),
  cardFooterStatus: css(Flex.row, {
    flex: flex1,
    justifyContent: "flex-end",
    textAlign: "right"
  }),
  author: css({marginLeft: spacingLarge})
}
