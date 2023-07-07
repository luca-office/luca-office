import {css} from "@emotion/react"
import * as React from "react"
import {Button, CardFooterItem} from "shared/components"
import {IconName} from "shared/enums"
import {Questionnaire} from "shared/models"
import {spacingLarge} from "shared/styles"
import {WithLucaTranslation} from "shared/translations"
import {formatDateFromString, Option} from "shared/utils"

export interface QuestionnaireDetailActionBarProps extends WithLucaTranslation {
  readonly questionnaire: Option<Questionnaire>
  readonly openPreview: () => void
}

export const QuestionnaireDetailActionBar: React.FC<QuestionnaireDetailActionBarProps> = ({
  openPreview,
  questionnaire: questionnaireOption,
  t
}) =>
  questionnaireOption
    .map(questionnaire => (
      <React.Fragment>
        <CardFooterItem
          title={t("detail_card__title_createdAt")}
          icon={IconName.Calendar}
          text={formatDateFromString(questionnaire.createdAt)}
        />
        <CardFooterItem
          customStyles={styles.author}
          title={t("detail_card__title_author")}
          icon={IconName.Profile}
          text={`${questionnaire.author.firstName} ${questionnaire.author.lastName}`}
        />
        <Button onClick={openPreview} customStyles={styles.preview}>
          {t("preview")}
        </Button>
      </React.Fragment>
    ))
    .orNull()

const styles = {
  author: css({
    marginLeft: spacingLarge
  }),
  preview: css({
    marginLeft: "auto",
    justifySelf: "flex-end"
  })
}
