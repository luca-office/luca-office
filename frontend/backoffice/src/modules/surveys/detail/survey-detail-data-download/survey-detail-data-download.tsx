import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {noop} from "lodash-es"
import * as React from "react"
import {Button, Card, CardContent, Heading, Icon, Modal, Overlay, Text, Tooltip} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {Survey} from "shared/models"
import {
  CustomStyle,
  errorColor,
  Flex,
  flex0,
  flex1,
  fontColor,
  fontFamily,
  FontWeight,
  spacingCard,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {baseUrl, isDefined} from "shared/utils"
import {useSurveyDetailDataDownload} from "./hooks/use-survey-detail-data-download"

export interface SurveyDetailDataDownloadProps extends CustomStyle {
  readonly survey: Survey
}

export const SurveyDetailDataDownload: React.FunctionComponent<SurveyDetailDataDownloadProps> = ({
  customStyles,
  survey
}) => {
  const {t} = useLucaTranslation()

  const modalConfirmButtonLabel = t("projects__survey_details_data_download_modal_button")

  const [downloadBinaries, setDownloadBinaries] = React.useState(false)
  const {isConfirmModalVisible, showConfirmModal, hideConfirmModal} = useSurveyDetailDataDownload()

  const disableSurveyDataDownload = !(survey.invitationsCount > 0)

  const renderDownloadButton = (onClick: () => void, disabled?: boolean) => (
    <Button icon={IconName.Download} onClick={onClick} variant={ButtonVariant.IconOnly} disabled={disabled} />
  )

  const renderDownloadButtonWithLabel = (onClick: () => void, label: string) => (
    <Button icon={IconName.Download} onClick={onClick} customStyles={styles.buttonWithLabel}>
      {label}
    </Button>
  )

  const renderDownloadLink = ({
    customDownloadLinkStyles,
    onClick,
    downloadBinaries,
    label,
    disabled
  }: {
    customDownloadLinkStyles?: CSSInterpolation
    onClick?: () => void
    downloadBinaries?: boolean
    label?: string
    disabled?: boolean
  }) => (
    <a
      css={[styles.link, customDownloadLinkStyles]}
      href={`${baseUrl}/binary/survey/${survey.id}${downloadBinaries ? "/binaries" : ""}`}>
      {isDefined(label)
        ? renderDownloadButtonWithLabel(onClick ?? noop, label)
        : renderDownloadButton(onClick ?? noop, disabled)}
    </a>
  )

  const renderDownloadLabel = (label: string, toolTipTitle: string, toolTipText: string) => (
    <div css={styles.downloadLabel}>
      {label}
      <Tooltip title={toolTipTitle} text={toolTipText}>
        <Icon name={IconName.Information} customStyles={styles.downloadLabelIcon} />
      </Tooltip>
    </div>
  )

  return (
    <React.Fragment>
      <div css={[styles.container, customStyles]}>
        <div css={styles.header(survey.isTestSurvey)}>
          <Heading
            customStyles={styles.headerLabel(survey.isTestSurvey)}
            level={HeadingLevel.h3}
            fontWeight={FontWeight.Bold}>
            {t("projects__survey_details_data")}
          </Heading>
          {survey.isTestSurvey && (
            <Tooltip
              icon={IconName.Information}
              title={t("projects__survey_details_data_tooltip_title")}
              text={t("projects__survey_details_data_tooltip_text")}>
              <Icon customStyles={styles.headerIcon} name={IconName.Information} color={errorColor} />
            </Tooltip>
          )}
        </div>
        <Card hasShadow>
          <CardContent customStyles={styles.content}>
            <div css={styles.downloadField}>
              {renderDownloadLabel(
                t("projects__survey_details_survey_data"),
                t("projects__survey_details_survey_data"),
                t("projects__survey_details_survey_data_tooltip")
              )}
              {survey.isTestSurvey
                ? renderDownloadButton(() => {
                    setDownloadBinaries(false)
                    showConfirmModal()
                  }, disableSurveyDataDownload)
                : renderDownloadLink({disabled: disableSurveyDataDownload})}
            </div>
            <div css={styles.downloadField}>
              {renderDownloadLabel(
                t("projects__survey_details_media"),
                t("projects__survey_details_media"),
                t("projects__survey_details_media_tooltip")
              )}
              {survey.isTestSurvey
                ? renderDownloadButton(() => {
                    setDownloadBinaries(true)
                    showConfirmModal()
                  })
                : renderDownloadLink({downloadBinaries: true})}
            </div>
          </CardContent>
        </Card>
      </div>
      {isConfirmModalVisible && (
        <Overlay>
          <Modal
            customStyles={styles.downloadModal}
            customContentStyles={styles.downloadModalContent}
            title={t("projects__survey_details_data_download_modal_title")}
            onConfirm={noop}
            hideFooter={true}
            onDismiss={hideConfirmModal}>
            <Text customStyles={styles.downloadModalText}>{t("projects__survey_details_data_tooltip_text")}</Text>
            {renderDownloadLink({
              customDownloadLinkStyles: styles.downloadModalButton,
              onClick: hideConfirmModal,
              label: modalConfirmButtonLabel,
              downloadBinaries: downloadBinaries
            })}
          </Modal>
        </Overlay>
      )}
    </React.Fragment>
  )
}

const Size = {
  downloadModal: {width: 535, height: 150}
}

const styles = {
  container: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  header: (isTestSurvey: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: isTestSurvey
        ? "minmax(0, max-content) minmax(min-content, max-content)"
        : "minmax(0, max-content)",
      gridColumnGap: spacingTiny,
      alignItems: "center"
    }),
  headerLabel: (isTestSurvey: boolean) =>
    css(textEllipsis, {
      color: isTestSurvey ? errorColor : fontColor
    }),
  headerIcon: css({
    cursor: "pointer"
  }),
  content: css({
    width: "auto",
    padding: spacingMedium
  }),
  buttonWithLabel: css({
    marginTop: spacingSmall,
    width: "100%",
    paddingLeft: spacingCard,
    paddingRight: spacingCard
  }),
  link: css({
    textDecoration: "none"
  }),
  downloadModal: css({
    width: Size.downloadModal.width,
    minHeight: Size.downloadModal.height
  }),
  downloadModalContent: css(Flex.column),
  downloadModalText: css({
    flex: flex1
  }),
  downloadModalButton: css({
    flex: flex0,
    alignSelf: "center"
  }),
  downloadField: css(Flex.row, {
    justifyContent: "space-between"
  }),
  downloadLabel: css(Flex.row, {
    fontWeight: "normal",
    color: fontColor,
    fontFamily: fontFamily
  }),
  downloadLabelIcon: css({
    marginLeft: spacingTiny
  })
}
