import * as React from "react"
import {CustomSelect, Icon, SelectOptionCustomized} from "shared/components"
import {IconName} from "shared/enums"
import {CustomStyle, Flex, textEllipsis} from "shared/styles"
import {find} from "shared/utils"
import {emailBodySettingSelectionStyle as styles} from "./email-body-setting-selection.style"

export interface EmailBodySettingSelectionProps extends CustomStyle {
  readonly label: string
  readonly value: string
  readonly options: SelectOptionCustomized[]
  readonly onChange: (option: SelectOptionCustomized) => void
  readonly disabled?: boolean
}

export const EmailBodySettingSelection: React.FC<EmailBodySettingSelectionProps> = ({
  label,
  options,
  onChange,
  disabled,
  customStyles,
  value
}) => {
  const handleChange = (changedValue: string) => find(({value}) => value === changedValue, options).forEach(onChange)
  return (
    <div css={[Flex.column, customStyles]}>
      <div css={[textEllipsis, styles.label]}>{label}</div>
      {disabled ? (
        <div css={[Flex.row, styles.disabledOption]}>
          <div css={styles.disabledOptionLabel}>
            {find(option => option.value === value, options)
              .map(option => option.label)
              .orNull()}
          </div>
          <Icon title="disabled" customStyles={styles.disabledOptionIcon} name={IconName.LockClosed} />
        </div>
      ) : (
        <div css={styles.dropdownWrapper}>
          <CustomSelect customStyles={styles.dropdown} optionList={options} onChange={handleChange} value={value} />
        </div>
      )}
    </div>
  )
}
