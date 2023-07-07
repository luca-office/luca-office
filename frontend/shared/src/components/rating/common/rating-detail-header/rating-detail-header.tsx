import {css} from "@emotion/react"
import * as React from "react"
import {ButtonVariant, IconName} from "../../../../enums"
import {boxHeightMediumLarge, CustomStyle, Flex, spacingSmall, TextSize, zIndex0} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {Button} from "../../../button/button"
import {CardHeader} from "../../../card"
import {Icon} from "../../../icon/icon"
import {Text} from "../../../typography/typography"

export interface RatingDetailHeaderProps extends CustomStyle {
  readonly navigateToNextParticipant: () => void
  readonly navigateToPreviousParticipant: () => void
  readonly participantIndex: number
  readonly participantName: string
  readonly participantsCount: number
  readonly hideParticipantNavigationButtons?: boolean
  readonly showParticipantsCount?: boolean
}

export const RatingDetailHeader: React.FunctionComponent<RatingDetailHeaderProps> = ({
  customStyles,
  participantName,
  participantIndex,
  participantsCount,
  navigateToNextParticipant,
  navigateToPreviousParticipant,
  hideParticipantNavigationButtons,
  showParticipantsCount = true
}) => {
  const {t} = useLucaTranslation()
  return (
    <CardHeader customStyles={[styles.wrapper, customStyles]} hasShadow={true} hasGreyBackground={true}>
      <Icon name={IconName.Student} hasSpacing={true} customSpacing={spacingSmall} />
      <Text size={TextSize.Medium}>
        {showParticipantsCount
          ? t("rating__labeled_count", {
              label: participantName,
              countFrom: participantsCount > 0 ? participantIndex + 1 : 0,
              countTo: participantsCount
            })
          : participantName}
      </Text>
      {!hideParticipantNavigationButtons && (
        <div css={styles.buttons}>
          <Button
            onClick={navigateToPreviousParticipant}
            icon={IconName.ArrowTriangleLeft}
            variant={ButtonVariant.IconOnly}
          />
          <Button
            onClick={navigateToNextParticipant}
            icon={IconName.ArrowTriangleRight}
            variant={ButtonVariant.IconOnly}
          />
        </div>
      )}
    </CardHeader>
  )
}

const styles = {
  wrapper: css(Flex.row, {
    height: boxHeightMediumLarge,
    zIndex: zIndex0
  }),
  buttons: css({
    marginLeft: "auto",
    display: "grid",
    gridColumnGap: spacingSmall,
    gridTemplateColumns: "1fr 1fr"
  })
}
