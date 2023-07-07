import {css} from "@emotion/react"
import * as React from "react"
import {Button, Orly, Text} from "shared/components"
import {IconName} from "shared/enums"
import {spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useRaterRatingActionButton} from "./hooks/use-rater-rating-action-button"

export interface RaterRatingActionButtonProps {
  readonly surveyId: UUID
  readonly userAccountId: UUID
  readonly disabled?: boolean
}

export const RaterRatingActionButton: React.FC<RaterRatingActionButtonProps> = ({
  surveyId,
  userAccountId,
  disabled = false
}) => {
  const {t} = useLucaTranslation()
  const {
    dataLoading,
    actionLoading,
    isFinalized,
    isOrlyVisible,
    showOrly,
    onConfirm,
    onCancel
  } = useRaterRatingActionButton(surveyId, userAccountId)

  const isButtonDisabled = disabled || isFinalized || dataLoading || actionLoading
  return (
    <React.Fragment>
      <Button
        customStyles={styles.button}
        disabled={isButtonDisabled}
        icon={IconName.Check}
        isLoading={dataLoading || actionLoading}
        onClick={showOrly}>
        {t("rater_rating__action_button_finish_rating")}
      </Button>
      {isOrlyVisible && (
        <Orly
          customStyles={styles.orly}
          confirmButtonKey={"finish"}
          titleKey={"rater_rating__action_button_finish_rating"}
          onConfirm={onConfirm}
          onDismiss={onCancel}
          isConfirmButtonLoading={actionLoading}
          confirmButtonDisabled={actionLoading}
          renderCustomContent={() => (
            <div css={styles.orlyContent}>
              <Text>{t("rater_rating__action_button_finish_rating_description")}</Text>
              <Text>{t("rater_rating__action_button_finish_rating_question")}</Text>
            </div>
          )}
        />
      )}
    </React.Fragment>
  )
}

const Sizes = {
  button: 275
}

const styles = {
  button: css({
    minWidth: Sizes.button
  }),
  orly: css({
    width: 600
  }),
  orlyContent: css({
    display: "grid",
    gridTemplateRows: "repeat(2, 1fr)",
    gridRowGap: spacingMedium
  })
}
