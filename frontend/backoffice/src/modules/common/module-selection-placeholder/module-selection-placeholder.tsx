import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Button, Card, CardFooter, CardHeader, Content, DetailViewHeader, Heading, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {ButtonConfig} from "shared/models"
import {spacing, spacingMedium, TextSize} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"

interface ModuleSelectionPlaceholderProps {
  readonly entityKey: LucaI18nLangKey
  readonly onCreateClick: () => void
  readonly subheaderConfig: {
    readonly labelKey: LucaI18nLangKey
    readonly navigationButton: ButtonConfig
    readonly customStyles?: CSSInterpolation
  }
  readonly disabled?: boolean
}

export const ModuleSelectionPlaceholder: React.FC<ModuleSelectionPlaceholderProps> = ({
  entityKey,
  onCreateClick,
  subheaderConfig,
  disabled = false
}) => {
  const {t} = useLucaTranslation()
  const entityLanguageOptions = {entity: t(entityKey)}

  const subheader = (
    <DetailViewHeader
      labelKey={subheaderConfig.labelKey}
      navigationButtonConfig={subheaderConfig.navigationButton}
      customStyles={[subheaderConfig.customStyles, {position: "relative"}]}
    />
  )
  return (
    <Content customContentContainerStyles={styles.contentContainer} subHeader={subheader}>
      <Card customStyles={{flex: 1}}>
        <CardHeader hasGreyBackground hasShadow>
          <Heading level={HeadingLevel.h3}>{t("module_selection__placeholder_title", entityLanguageOptions)}</Heading>
        </CardHeader>
        <div css={styles.content}>
          <Text size={TextSize.Medium}>{t("module_selection__placeholder_hint", entityLanguageOptions)}</Text>
          <Button disabled={disabled} onClick={onCreateClick} customStyles={styles.button} icon={IconName.Add}>
            {t("module_selection__placeholder_button", entityLanguageOptions)}
          </Button>
        </div>
        <CardFooter />
      </Card>
    </Content>
  )
}

const styles = {
  content: css({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }),
  button: css({
    width: "auto",
    padding: spacing(0, spacingMedium),
    marginTop: spacingMedium
  }),
  contentContainer: css({
    display: "flex",
    flexDirection: "column"
  })
}
