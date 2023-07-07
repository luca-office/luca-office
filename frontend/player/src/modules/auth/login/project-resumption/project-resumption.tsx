import {css} from "@emotion/react"
import * as React from "react"
import {
  Button,
  Column,
  Columns,
  FormErrorText,
  InfoColumnContainer,
  Label,
  Paper,
  Text,
  TextInput
} from "shared/components"
import {InputType} from "shared/enums"
import {SurveyInvitation} from "shared/models"
import {Flex, spacingLarge, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {applicationVersion} from "../../../../constants"
import {AuthWelcome} from "../../auth-welcome/auth-welcome"
import {ProjectMetadata} from "../project-metadata/project-metadata"

interface ProjectResumptionProps {
  readonly token: string | null
  readonly surveyInvitation: Option<SurveyInvitation>
  readonly onResumeProjectClick: () => void
  readonly onVerifyTokenClick: () => void
  readonly setToken: React.Dispatch<React.SetStateAction<string | null>>
  readonly tokenErrorMessage: string | null
  readonly appStateInitialized: boolean
}

export const ProjectResumption: React.FC<ProjectResumptionProps> = ({
  token,
  setToken,
  surveyInvitation,
  onResumeProjectClick,
  onVerifyTokenClick,
  tokenErrorMessage,
  appStateInitialized
}) => {
  const {t} = useLucaTranslation()

  return (
    <>
      <Columns customStyles={styles.content}>
        <InfoColumnContainer footerText={applicationVersion} />
        <Column customStyles={styles.loginColumn} flexGrow={4}>
          <AuthWelcome />
          <Label label={t("auth__project_resumption_header")} />
          <Paper>
            <div css={Flex.row}>
              <TextInput
                placeholderKey="auth__entry_code"
                type={InputType.text}
                value={token ?? ""}
                onChange={setToken}
              />
              <Button
                disabled={token === null || token === ""}
                customStyles={styles.tokenButton}
                onClick={onVerifyTokenClick}>
                {t("auth__entry_code_verify")}
              </Button>
            </div>
            <FormErrorText>{tokenErrorMessage}</FormErrorText>
          </Paper>

          {surveyInvitation
            .map(surveyInvitationData => {
              const {endsAt, startsAt, project} = surveyInvitationData.survey

              return (
                <div css={styles.marginTop}>
                  <ProjectMetadata
                    t={t}
                    metadata={{
                      endsAt,
                      startsAt,
                      projectName: project.name,
                      maxDurationInSeconds: project.maxDurationInSeconds
                    }}
                  />
                </div>
              )
            })
            .orNull()}

          <Label customStyles={styles.marginTop} label={t("auth__project_resumption")} />
          <Paper>
            <Text size={TextSize.Medium}>{t("auth__project_resumption_text")}</Text>
            <Button
              isLoading={!surveyInvitation.isEmpty() && !appStateInitialized}
              customStyles={styles.marginTop}
              disabled={surveyInvitation.isEmpty() || tokenErrorMessage !== null || !appStateInitialized}
              onClick={onResumeProjectClick}>
              {!surveyInvitation.isEmpty() && !appStateInitialized ? "" : t("auth__project_resumption_button")}
            </Button>
          </Paper>
        </Column>
      </Columns>
    </>
  )
}

const styles = {
  content: css({
    backgroundColor: "white",
    height: "100vh"
  }),
  marginTop: css({
    marginTop: spacingMedium
  }),
  loginColumn: css({
    height: "fill-available",
    margin: `10% ${spacingLarge}px 0px ${spacingLarge}px`,
    overflow: "auto"
  }),
  tokenButton: css({
    marginLeft: spacingSmall
  })
}
