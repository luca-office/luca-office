import * as React from "react"
import {Button, Card, CardContent, CardFooter, CardHeader, Heading, Text} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {cardDecorativeBorder, CustomStyle, FontWeight, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {RaterInvitationOverlay} from "../rater-invitation-overlay/rater-invitation-overlay"
import {RaterPaper} from "../rater-paper/rater-paper"
import {useRatersCard} from "./hooks/use-raters-card"
import {ratersCardStyles as styles} from "./raters-card.styles"

export interface RatersCardProps extends CustomStyle {
  readonly surveyId: UUID
}

export const RatersCard: React.FC<RatersCardProps> = ({customStyles, surveyId}) => {
  const {t} = useLucaTranslation()

  const {
    ratersCount,
    raterEntities,
    raterEmails,
    inviteOverlayVisible,
    showInviteOverlay,
    hideInviteOverlay,
    isRatingFinalized
  } = useRatersCard(surveyId)

  const placeholder = (
    <CardContent customStyles={[styles.placeholderWrapper, styles.contentBackground]}>
      <Text customStyles={styles.placeholderText} size={TextSize.Medium}>
        {t("rating_overview__no_raters")}
      </Text>
      <Button customStyles={styles.placeholderButton} onClick={showInviteOverlay} disabled={isRatingFinalized}>
        {t("rating_overview__invite_raters_button_label")}
      </Button>
    </CardContent>
  )

  const raterPapers = (
    <CardContent customStyles={[styles.raterPapersWrapper, styles.contentBackground]}>
      <div css={styles.raterPapersContent}>
        {raterEntities.map(raterEntity => (
          <RaterPaper key={raterEntity.raterId} email={raterEntity.email} inProgress={!raterEntity.finalized} />
        ))}
      </div>
    </CardContent>
  )

  return (
    <React.Fragment>
      <div css={[styles.container, customStyles]}>
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating_overview__rater_count", {count: ratersCount})}
        </Heading>
        <Card customStyles={styles.card}>
          <CardHeader customStyles={cardDecorativeBorder} hasShadow={true} hasGreyBackground={true} />
          {ratersCount > 0 ? raterPapers : placeholder}
          <CardFooter customStyles={styles.footer}>
            <Button
              variant={ButtonVariant.IconOnly}
              icon={IconName.Add}
              onClick={showInviteOverlay}
              disabled={isRatingFinalized}
            />
          </CardFooter>
        </Card>
      </div>
      {inviteOverlayVisible && (
        <RaterInvitationOverlay surveyId={surveyId} existingRaterEmails={raterEmails} onDismiss={hideInviteOverlay} />
      )}
    </React.Fragment>
  )
}
