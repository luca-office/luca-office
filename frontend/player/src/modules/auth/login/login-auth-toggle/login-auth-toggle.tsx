import * as React from "react"
import {useState} from "react"
import {Card, CardContent, CardHeader, Heading, Label, Paper, RadioButton, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {AuthenticationType} from "shared/graphql/generated/globalTypes"
import {FontWeight, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {styles as loginStyles} from "./../styles"

interface Props {
  readonly authType: AuthenticationType
  readonly children: (authType: AuthenticationType) => React.ReactElement
  readonly navigateToResumption: () => void
  readonly isOpenParticipationSurvey: boolean
}

export const LoginAuthToggle: React.FC<Props> = ({
  authType,
  children,
  navigateToResumption,
  isOpenParticipationSurvey
}) => {
  const {t} = useLucaTranslation()
  const [requestedAuthType, setRequestedAuthType] = useState(AuthenticationType.OnlyRegistered)

  return (
    <>
      <Heading level={HeadingLevel.h3} customStyles={loginStyles.heading} fontWeight={FontWeight.Bold}>
        {t("auth__user_information")}
      </Heading>

      <Paper>
        {authType === AuthenticationType.OnlyRegistered && (
          <>
            <Heading customStyles={loginStyles.heading} level={HeadingLevel.h2}>
              {t("auth__as_registered_user")}
            </Heading>
            <Text customStyles={loginStyles.infoText} size={TextSize.Smaller}>
              {t("auth__as_registered_user_help_text")}
            </Text>
          </>
        )}

        {authType === AuthenticationType.RegisteredOrAnonymous && (
          <div css={loginStyles.loginTypeWrapper}>
            <Card
              isSelected={requestedAuthType === AuthenticationType.OnlyRegistered}
              onClick={() => setRequestedAuthType(AuthenticationType.OnlyRegistered)}
              hasShadow>
              <CardHeader>
                <RadioButton
                  customStyles={loginStyles.cardRadioLabel}
                  selected={requestedAuthType === AuthenticationType.OnlyRegistered}
                  onChange={_ =>
                    setRequestedAuthType(
                      _ ? AuthenticationType.OnlyRegistered : AuthenticationType.RegisteredOrAnonymous
                    )
                  }
                  label={t("auth__as_registered_user")}
                />
              </CardHeader>
              <CardContent customStyles={loginStyles.cardContent}>
                <Text size={TextSize.Small}>{t("auth__as_registered_user_help_text")}</Text>
              </CardContent>
            </Card>
            <Card
              isSelected={requestedAuthType === AuthenticationType.RegisteredOrAnonymous}
              onClick={() => setRequestedAuthType(AuthenticationType.RegisteredOrAnonymous)}
              hasShadow>
              <CardHeader>
                <RadioButton
                  customStyles={loginStyles.cardRadioLabel}
                  selected={requestedAuthType === AuthenticationType.RegisteredOrAnonymous}
                  label={t("auth__as_anon_user")}
                />
              </CardHeader>
              <CardContent customStyles={loginStyles.cardContent}>
                <Text size={TextSize.Small}>{t("auth__as_anon_user_help_text")}</Text>
              </CardContent>
            </Card>
          </div>
        )}

        {children(requestedAuthType)}
      </Paper>

      {!isOpenParticipationSurvey && (
        <>
          <Label customStyles={loginStyles.resumptionWrapper} label={t("auth__project_resumption")} />
          <Paper>
            <div css={loginStyles.resumption}>
              <Text size={TextSize.Medium}>{t("auth__project_resumption_description")}</Text>
              <Heading
                customStyles={loginStyles.resumptionButton}
                level={HeadingLevel.h3}
                fontWeight={FontWeight.Bold}
                onClick={navigateToResumption}
                color="primary">
                {t("auth__project_resumption_navigate_to")}
              </Heading>
            </div>
          </Paper>
        </>
      )}
    </>
  )
}
