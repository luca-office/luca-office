import {css} from "@emotion/react"
import * as React from "react"
import {Overlay} from "shared/components"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Flex, fontColorLight, spacingHuge} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SubHeaderDetailContainer} from "../../components"
import {Route} from "../../routes"
import {Emails} from "./emails"
import {ScenarioEmailsPreview} from "./preview/scenario-emails-preview"

export interface ScenarioEmailsProps {
  readonly scenarioId?: UUID
  readonly directory?: EmailDirectory
  readonly emailId?: UUID
  readonly isPreviewVisible?: boolean
  readonly setPreviewVisibility?: (isVisible: boolean) => void
}

export const ScenarioEmails: React.FC<ScenarioEmailsProps> = ({
  scenarioId,
  emailId,
  directory,
  isPreviewVisible = false,
  setPreviewVisibility
}) => {
  const {t} = useLucaTranslation()

  return (
    <div>
      <SubHeaderDetailContainer
        returnTo={{
          text: t("scenario_details__header_label"),
          route: Route.ScenarioDetail,
          params: {scenarioId}
        }}
        title={t("email__header_label")}
        buttonText={t("preview")}
        onButtonClick={() => setPreviewVisibility?.(true)}
      />
      {scenarioId && directory ? (
        <>
          <Emails scenarioId={scenarioId} emailId={emailId} directory={directory} />
          {isPreviewVisible && (
            <Overlay>
              <ScenarioEmailsPreview scenarioId={scenarioId} onClose={() => setPreviewVisibility?.(false)} />
            </Overlay>
          )}
        </>
      ) : (
        <div css={[Flex.column, styles.placeholderWrapper]} className={"placeholder"}>
          <div css={styles.placeholder}>{t("email__placeholder")}</div>
        </div>
      )}
    </div>
  )
}

const styles = {
  placeholderWrapper: css({padding: spacingHuge}),
  placeholder: css({color: fontColorLight, margin: "auto"})
}
