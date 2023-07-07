import {css} from "@emotion/react"
import * as React from "react"
import {Column, CustomSelect, SelectOptionCustomized, Text} from ".."
import backgroundPattern from "../../assets/images/login-patterns.svg?file-loader"
import logoPlusLettering from "../../assets/images/logo-plus-lettering.svg?file-loader"
import {fontColor, gradientPrimary, spacingHuge, spacingLarge, spacingMedium, TextSize} from "../../styles"
import {FALLBACK_LANGUAGE, LucaTFunction, useLucaTranslation} from "../../translations"

interface Props {
  readonly footerText: string
  readonly t: LucaTFunction
  readonly optionList: SelectOptionCustomized[]
  readonly selectedLanguage: string
  readonly onLanguageChange: (language: string) => void
}

export const InfoColumn: React.FC<Props> = ({footerText, selectedLanguage, optionList, onLanguageChange}) => {
  const {t} = useLucaTranslation()

  const defaultLanguageOption = optionList.find(option => selectedLanguage?.includes(option.value))

  return (
    <Column flexGrow={3} customStyles={styles.infoColumn}>
      <div css={styles.infoColumnImage} />
      <div css={styles.infoWrapper}>
        <img css={styles.logo} src={logoPlusLettering} alt="Luca" />
        <Text customStyles={styles.infoText} size={TextSize.Medium}>
          {t("welcome_headline")}
        </Text>
        <Text customStyles={styles.infoText} size={TextSize.Medium}>
          {t("welcome_text")}
        </Text>
        <div css={styles.footer}>
          <CustomSelect
            onChange={onLanguageChange}
            value={defaultLanguageOption?.value ?? FALLBACK_LANGUAGE}
            customStyles={styles.customSelect.styles}
            customIconColor="white"
            customInnerContainerStyle={styles.customSelect.customInnerContainerStyle}
            customSingleValueStyle={styles.customSelect.customSingleValueStyle}
            optionList={optionList}
            customOptionStyle={styles.customSelect.customOptionStyle}
          />
          <Text customStyles={styles.footerText}>{footerText}</Text>
        </div>
      </div>
    </Column>
  )
}

export const styles = {
  infoColumn: css({
    boxSizing: "border-box",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    backgroundImage: gradientPrimary
  }),
  infoColumnImage: css({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${backgroundPattern})`,
    opacity: 0.06
  }),
  infoWrapper: css({
    width: "50%",
    position: "relative",
    zIndex: 1,
    marginTop: "20%",
    display: "flex",
    flexDirection: "column"
  }),
  logo: css({
    width: "100%",
    marginBottom: spacingHuge
  }),
  infoText: css({
    color: "white",
    marginBottom: spacingLarge
  }),
  footer: css({
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: spacingMedium,
    color: "white",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  }),
  footerText: css({
    alignSelf: "center",
    color: "white"
  }),
  customSelect: {
    styles: {border: "none"},
    customInnerContainerStyle: {backgroundColor: "unset !important"},
    customSingleValueStyle: {color: "white"},
    customOptionStyle: {color: fontColor}
  }
}
