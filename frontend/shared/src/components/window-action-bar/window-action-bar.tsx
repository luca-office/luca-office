import {css} from "@emotion/react"
import {debounce} from "lodash-es"
import * as React from "react"
import {Button, TextInput} from "../../components"
import {ButtonVariant, IconName, InputType} from "../../enums"
import {
  backgroundColorBright,
  iconDefaultColor,
  inputHeight,
  spacing,
  spacingHuge,
  spacingMedium,
  spacingSmall
} from "../../styles"
import {LucaI18nLangKey} from "../../translations"

export interface ActionButtonConfig {
  readonly label: string
  readonly onClick: () => void
  readonly icon?: IconName
  readonly isDisabled?: boolean
}

export interface WindowActionBarProps {
  readonly onSearchChange: (value: string) => void
  readonly searchPlaceHolderKey?: LucaI18nLangKey
  readonly debounceTime?: number
  readonly actionButtonConfig?: ActionButtonConfig
}

export const WindowActionBar: React.FC<WindowActionBarProps> = ({
  actionButtonConfig,
  onSearchChange,
  debounceTime = 300,
  searchPlaceHolderKey
}) => {
  const debouncedChange = debounce((value: string) => onSearchChange(value), debounceTime)
  const onChange = (value: string) => debouncedChange(value)
  const onActionClick = () => actionButtonConfig?.onClick()

  return (
    <div css={styles.container}>
      {actionButtonConfig && (
        <Button
          variant={ButtonVariant.Primary}
          icon={actionButtonConfig.icon}
          onClick={onActionClick}
          customStyles={styles.button}
          disabled={actionButtonConfig.isDisabled}>
          <span>{actionButtonConfig.label}</span>
        </Button>
      )}
      <TextInput
        onChange={onChange}
        type={InputType.text}
        placeholderKey={searchPlaceHolderKey}
        customStyles={styles.input}
        icon={IconName.Search}
        iconColor={iconDefaultColor}
      />
    </div>
  )
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "row",
    height: "48px",
    padding: spacing(spacingSmall, spacingHuge),
    boxSizing: "border-box",
    backgroundColor: backgroundColorBright,
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
  }),
  button: css({
    flex: 1,
    marginRight: spacingMedium
  }),
  input: css({
    flex: 2,
    height: inputHeight,
    input: {
      height: "100%"
    }
  })
}
