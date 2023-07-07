import {css} from "@emotion/react"
import * as React from "react"
import {Button, Orly, Text} from "shared/components"
import {IconName} from "shared/enums"
import {spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useRatingActionButton} from "./hooks/use-rating-action-button"

export interface RatingActionButtonProps {
  readonly surveyId: UUID
}

export const RatingActionButton: React.FC<RatingActionButtonProps> = ({surveyId}) => {
  const {t} = useLucaTranslation()

  const {
    dataLoading,
    actionLoading,
    buttonDisabled,
    showOrly,
    onConfirm,
    onCancel,
    isOrlyVisible,
    finalRatingFinalized
  } = useRatingActionButton(surveyId)

  return (
    <React.Fragment>
      <Button
        customStyles={styles.button}
        disabled={dataLoading || actionLoading || buttonDisabled}
        icon={IconName.LockClosed}
        isLoading={actionLoading}
        onClick={showOrly}>
        {t(
          finalRatingFinalized
            ? "rating__rating__action_button_finish_scoring_finalized"
            : "rating__rating__action_button_finish_scoring"
        )}
      </Button>
      {isOrlyVisible && (
        <Orly
          customStyles={styles.orly}
          confirmButtonKey={"finish"}
          titleKey={"rating__rating__action_button_finish_scoring"}
          onConfirm={onConfirm}
          onDismiss={onCancel}
          isConfirmButtonLoading={actionLoading}
          confirmButtonDisabled={actionLoading}
          renderCustomContent={() => (
            <div css={styles.orlyContent}>
              <Text>{t("rating__rating__action_button_finish_scoring_description")}</Text>
              <Text>{t("rating__rating__action_button_finish_scoring_question")}</Text>
            </div>
          )}
        />
      )}
    </React.Fragment>
  )
}

const Sizes = {
  button: 227
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
