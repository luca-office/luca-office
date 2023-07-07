import {css} from "@emotion/react"
import * as React from "react"
import {Button, Column, Columns, Heading, InfoColumnContainer, Label, Paper, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {Flex, flex0, FontWeight, spacingLarge, spacingMedium, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {applicationVersion} from "../../../constants"
import {AuthWelcome} from "../auth-welcome/auth-welcome"
import {styles} from "../styles"

interface Props {
  readonly navigateToResumption: () => void
  readonly startOpenParticipation: () => void
}

export const OpenParticipationResumptionOrStart: React.FC<Props> = ({navigateToResumption, startOpenParticipation}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={styles.contentWrapper}>
      <Columns customStyles={styles.content}>
        <InfoColumnContainer footerText={applicationVersion} />
        <Column customStyles={styles.loginColumn} flexGrow={4}>
          <AuthWelcome />

          <Label customStyles={openParticipationStyles.resumptionWrapper} label={t("project__start_confirm")} />
          <Paper>
            <div css={openParticipationStyles.resumption}>
              <Text size={TextSize.Medium}>{t("auth__project_start_description")}</Text>
              <Button onClick={startOpenParticipation}> {t("auth__project_project_start_navigate_to")}</Button>
            </div>
          </Paper>

          <Label customStyles={openParticipationStyles.resumptionWrapper} label={t("auth__project_resumption")} />
          <Paper>
            <div css={openParticipationStyles.resumption}>
              <Text size={TextSize.Medium}>{t("auth__project_resumption_description")}</Text>
              <Heading
                customStyles={openParticipationStyles.resumptionButton}
                level={HeadingLevel.h3}
                fontWeight={FontWeight.Bold}
                onClick={navigateToResumption}
                color="primary">
                {t("auth__project_resumption_navigate_to")}
              </Heading>
            </div>
          </Paper>
        </Column>
      </Columns>
    </div>
  )
}

export const openParticipationStyles = {
  resumption: css(Flex.row, {
    justifyContent: "space-between"
  }),
  resumptionButton: css({
    cursor: "pointer",
    flex: flex0,
    padding: spacingMedium
  }),
  resumptionWrapper: css({
    marginTop: spacingLarge
  })
}
