import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {
  ActionMeta,
  components,
  CSSObjectWithLabel,
  default as Select,
  MenuPosition,
  MultiValue,
  OnChangeValue,
  SelectComponentsConfig,
  SelectInstance,
  SingleValue,
  StylesConfig
} from "react-select"
import {useClipboard} from "use-clipboard-copy"
import {IconName, IconPosition} from "../../enums"
import {SelectOption} from "../../models"
import {CustomStyle, Flex, fontColor} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {isDefined} from "../../utils/common"
import {FormFieldLabel, Icon, Tooltip, TooltipConfig} from ".."
import {customSelectStyles as inputStyles} from "./custom-select.style"

export interface SelectOptionCustomized extends Omit<SelectOption, "selected"> {
  iconName?: IconName
  iconColor?: string
  iconPosition?: IconPosition
  renderOptionLabel?: (label: string) => React.ReactNode
  readonly showCopyToClipboard?: boolean
}

type SelectComponentRef =
  | ((instance: SelectInstance<SelectOptionCustomized> | null) => void)
  | React.RefObject<SelectInstance<SelectOptionCustomized>>
  | null
  | undefined

interface Props extends CustomStyle {
  readonly onChange: (value: string) => void
  readonly optionList: SelectOptionCustomized[]
  readonly value: string
  readonly disabled?: boolean
  readonly clearable?: boolean
  readonly labelKey?: LucaI18nLangKey
  readonly name?: string
  readonly placeholderKey?: LucaI18nLangKey
  readonly ref?: SelectComponentRef
  readonly searchable?: boolean
  readonly showCopyToClipboard?: boolean
  readonly showIconOnHover?: boolean
  readonly onCopyToClipboard?: (value: string) => void
  readonly customCopyToClipboardIconStyle?: CSSInterpolation
  readonly tooltipConfig?: TooltipConfig
  readonly menuPosition?: MenuPosition
  readonly zIndexOfExpandedMenu?: number
  readonly menuPortalTarget?: HTMLElement | null
  readonly hideDropdownIndicatorWhenDisabled?: boolean
  readonly customInnerContainerStyle?: React.CSSProperties
  readonly customSingleValueStyle?: React.CSSProperties
  readonly customOptionStyle?: React.CSSProperties
  readonly customIconColor?: string
}

export const CustomSelect: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      value,
      onChange,
      labelKey,
      optionList,
      customStyles,
      name,
      placeholderKey,
      searchable,
      clearable,
      onCopyToClipboard,
      tooltipConfig,
      disabled = false,
      showCopyToClipboard = false,
      showIconOnHover = false,
      customCopyToClipboardIconStyle,
      menuPosition = "fixed",
      zIndexOfExpandedMenu,
      menuPortalTarget,
      hideDropdownIndicatorWhenDisabled = false,
      customInnerContainerStyle,
      customSingleValueStyle,
      customOptionStyle,
      customIconColor
    },
    ref
  ) => {
    const {t} = useLucaTranslation()

    const [isHovered, setIsHovered] = React.useState(false)

    const {copy: copyToClipboard} = useClipboard()

    const hasLabel = isDefined(labelKey)

    // const handleChange = (value: OnChangeValue<SelectOptionCustomized, boolean>, actionMeta: ActionMeta<unknown>) => {
    //   if ((value as SelectOptionCustomized)?.value) {
    //     onChange((value as SelectOptionCustomized).value)
    //   }
    // }

    const handleChange = (
      value: SingleValue<SelectOptionCustomized> | MultiValue<SelectOptionCustomized>,
      actionMeta: ActionMeta<SelectOptionCustomized>
    ) => {
      if ((value as SingleValue<SelectOptionCustomized>)?.value) {
        onChange((value as SelectOptionCustomized).value)
      }
    }
    const selectedValue: SelectOptionCustomized | undefined = optionList.find(option => option.value === value)
    const showDuplicateIcon = disabled && (!showIconOnHover || isHovered) && showCopyToClipboard
    const hideDropdownIndicator = disabled && hideDropdownIndicatorWhenDisabled

    const copySelectionToClipboard = () => {
      copyToClipboard(selectedValue?.label)
      onCopyToClipboard?.(selectedValue?.label ?? "")
    }

    const styleConfig: StylesConfig<SelectOptionCustomized, any, any> = {
      control: (styles: CSSObjectWithLabel) => ({
        ...styles,
        ...(inputStyles.control(hasLabel, showDuplicateIcon) as CSSObjectWithLabel),
        ...customInnerContainerStyle
      }),
      indicatorSeparator: (styles: CSSObjectWithLabel) => ({
        ...styles,
        ...(!clearable && !searchable ? {display: "none"} : {})
      }),
      option: (styles: CSSObjectWithLabel, state) => ({
        ...styles,
        ...inputStyles.option,
        ...(state.isSelected ? inputStyles.optionSelected : {}),
        ...(state.isFocused ? inputStyles.optionFocused : {}),
        ...customOptionStyle
      }),
      singleValue: (styles: CSSObjectWithLabel) => ({...styles, ...inputStyles.option, ...customSingleValueStyle})
    }

    // TODO LUCA-2757 remove any
    const componentsConfig: SelectComponentsConfig<SelectOptionCustomized, any, any> = {
      DropdownIndicator: props =>
        !showDuplicateIcon && !hideDropdownIndicator ? (
          <components.DropdownIndicator {...props}>
            <Icon name={IconName.TriangleDown} color={customIconColor !== undefined ? customIconColor : fontColor} />
          </components.DropdownIndicator>
        ) : null,
      Option: props => (
        <components.Option {...props}>
          {props.data.iconName && props.data.iconPosition !== IconPosition.RightAlign && (
            <Icon name={props.data.iconName} color={props.data.iconColor} customStyles={inputStyles.optionIcon} />
          )}
          {props.data.renderOptionLabel ? props.data.renderOptionLabel(props.label) : props.label}
          {props.data.iconName && props.data.iconPosition === IconPosition.RightAlign && (
            <Icon name={props.data.iconName} color={props.data.iconColor} customStyles={inputStyles.optionIconRight} />
          )}
        </components.Option>
      ),
      SingleValue: props => (
        <components.SingleValue className={"single-value"} {...props}>
          {props.data.iconName && (
            <Icon name={props.data.iconName} color={props.data.iconColor} customStyles={inputStyles.optionIcon} />
          )}
          {props.data.renderOptionLabel ? props.data.renderOptionLabel(props.data.label) : props.data.label}
        </components.SingleValue>
      )
    }

    return (
      <div data-testid="custom-select" css={[inputStyles.container(hasLabel), customStyles]}>
        <div css={hasLabel && !!tooltipConfig ? Flex.row : undefined}>
          {hasLabel && <FormFieldLabel textKey={labelKey as LucaI18nLangKey} />}
          {!!tooltipConfig && (
            <Tooltip
              inactive={!tooltipConfig.labelKey}
              title={tooltipConfig.labelKey ? t(tooltipConfig.labelKey) : ""}
              text={tooltipConfig.textKey ? t(tooltipConfig.textKey) : undefined}
              icon={tooltipConfig.iconName}>
              <Icon customStyles={inputStyles.infoIcon} name={IconName.Information} />
            </Tooltip>
          )}
        </div>

        <div
          css={inputStyles.content(zIndexOfExpandedMenu)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Select
            ref={ref}
            className={"custom-select"}
            onChange={handleChange}
            options={optionList}
            value={selectedValue}
            isDisabled={disabled}
            menuPlacement="auto"
            menuPosition={menuPosition}
            name={name}
            placeholder={t(placeholderKey || "select__placeholder")}
            styles={styleConfig}
            components={componentsConfig}
            isSearchable={!!searchable}
            isClearable={!!clearable}
            noOptionsMessage={() => t("select__empty")}
            menuPortalTarget={menuPortalTarget}
          />
          {showDuplicateIcon && (
            <Tooltip customStyles={inputStyles.duplicateIconWrapper} title={t("clipboard__copy")}>
              <Icon
                customStyles={[inputStyles.duplicateIcon, customCopyToClipboardIconStyle]}
                name={IconName.Duplicate}
                onClick={copySelectionToClipboard}
              />
            </Tooltip>
          )}
        </div>
      </div>
    )
  }
)
