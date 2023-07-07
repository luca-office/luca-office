import {css} from "@emotion/react"
import * as React from "react"
import {useDispatch} from "react-redux"
import {Icon, ReadonlyActionField, Text} from "shared/components"
import {IconName} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Scenario} from "shared/models"
import {Flex, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface MetaEmailProps {
  readonly scenario: Scenario
  readonly isEditable: boolean
}

export const MetaEmail: React.FC<MetaEmailProps> = ({scenario, isEditable}) => {
  const dispatch = useDispatch()

  const {t} = useLucaTranslation()

  const hasIntroductionEmail = !!scenario.introductionEmailId

  const showCreateModal = () =>
    dispatch(navigateToRouteAction(Route.ScenarioDetailIntroductionEmailCreation, {scenarioId: scenario.id}))
  const navigateToEmail = (emailId: UUID) =>
    dispatch(
      navigateToRouteAction(Route.ScenarioEmails, {
        scenarioId: scenario.id,
        emailId,
        directory: EmailDirectory.Inbox
      })
    )
  const handleClick = () => (hasIntroductionEmail ? navigateToEmail(scenario.introductionEmailId!) : showCreateModal())

  return (
    <ReadonlyActionField
      label={t("scenario_details__general_email")}
      buttonLabel={!hasIntroductionEmail ? t("create_button") : isEditable ? t("edit_button") : t("show_button")}
      disabled={!isEditable && !hasIntroductionEmail}
      onClick={handleClick}
      renderValue={() => (
        <div css={Flex.row}>
          <Icon name={IconName.Email} />
          <Text customStyles={styles.smallPaddingLeft} size={TextSize.Medium}>
            {t(hasIntroductionEmail ? "scenario_details__available" : "scenario_details__unavailable")}
          </Text>
        </div>
      )}
    />
  )
}

const styles = {
  statusLabel: css({
    marginLeft: spacingSmall
  }),
  smallMarginRight: css({
    marginRight: spacingSmall
  }),
  smallPaddingLeft: css({
    paddingLeft: spacingSmall
  })
}
