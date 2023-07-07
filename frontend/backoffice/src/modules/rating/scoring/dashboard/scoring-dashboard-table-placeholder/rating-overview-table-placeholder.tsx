import {css} from "@emotion/react"
import * as React from "react"
import {useDispatch} from "react-redux"
import {Button, Heading, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {Flex, fontColorLight, spacing, spacingSmall, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface ScoringDashboardTablePlaceholderProps {
  readonly surveyId: UUID
  readonly title?: string
  readonly description?: string
  readonly showNavigationButton?: boolean
}

export const ScoringDashboardTablePlaceholder: React.FC<ScoringDashboardTablePlaceholderProps> = ({
  surveyId,
  title,
  description,
  showNavigationButton = true
}) => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const navigateToRating = () => dispatch(navigateToRouteAction(Route.RaterRatingDetails, {surveyId}))
  return (
    <div css={styles.container}>
      <Heading level={HeadingLevel.h3}>{title ?? t("rating_participant_list_placeholder_title")}</Heading>
      <Text customStyles={styles.description} size={TextSize.Medium}>
        {description ?? t("rating_participant_list_placeholder_description")}
      </Text>
      {showNavigationButton && (
        <Button customStyles={styles.button} icon={IconName.ArrowRight} onClick={navigateToRating}>
          {t("rating_participant_list_placeholder_button")}
        </Button>
      )}
    </div>
  )
}

const Size = {
  placeholder: 600,
  button: 228
}

const styles = {
  container: css(Flex.column, {
    alignItems: "center",
    maxWidth: Size.placeholder
  }),
  description: css({
    color: fontColorLight,
    margin: spacing(spacingTiny, 0, spacingSmall, 0)
  }),
  button: css({
    width: "initial",
    minWidth: Size.button
  })
}
