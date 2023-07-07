import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Button, CustomSelect, SubHeader, TextInput} from "shared/components"
import {ButtonVariant, IconName, InputType} from "shared/enums"
import {SelectOption} from "shared/models"
import {fontColor, inputHeight, spacing, spacingHeader, spacingLarge, spacingMedium} from "shared/styles"
import {LucaI18nLangKey} from "shared/translations"
import {EntityFilterOption} from "../../enums"

export interface SubHeaderFilterProps {
  readonly typeOptions: SelectOption[]
  readonly sortOptions: SelectOption[]
  readonly stateOptions: SelectOption[]
  readonly searchText: string
  readonly onChange: (type: EntityFilterOption, value: string) => void
  readonly onSearchTextChange: (text: string) => void
  readonly searchPlaceholderKey?: LucaI18nLangKey
  readonly customSubheaderStyles?: CSSInterpolation
  readonly advancedFilters?: boolean
}

export const SubHeaderFilter: React.FC<SubHeaderFilterProps> = ({
  searchText,
  onChange,
  onSearchTextChange,
  sortOptions,
  stateOptions,
  typeOptions,
  searchPlaceholderKey,
  customSubheaderStyles,
  advancedFilters = false
}) => (
  <SubHeader customStyles={[styles.container, styles.subheader, customSubheaderStyles]}>
    {!!typeOptions.length && (
      <CustomSelect
        customStyles={styles.customSelect}
        onChange={value => onChange(EntityFilterOption.TYPE, value)}
        optionList={typeOptions}
        labelKey="subheader__typ"
        value={typeOptions.find(option => !!option.selected)?.value || ""}
      />
    )}
    {!!stateOptions.length && (
      <CustomSelect
        customStyles={styles.customSelect}
        onChange={value => onChange(EntityFilterOption.STATE, value)}
        optionList={stateOptions}
        labelKey="subheader__state"
        value={stateOptions.find(option => !!option.selected)?.value || ""}
      />
    )}
    {!!sortOptions.length && (
      <CustomSelect
        customStyles={styles.customSelect}
        onChange={value => onChange(EntityFilterOption.SORT_BY, value)}
        optionList={sortOptions}
        labelKey="subheader__sort"
        value={sortOptions?.find(option => !!option.selected)?.value || ""}
      />
    )}
    <TextInput
      customInputStyles={styles.searchInput}
      labelKey="subheader__search"
      value={searchText}
      type={InputType.text}
      icon={IconName.Search}
      onChange={onSearchTextChange}
      placeholderKey={searchPlaceholderKey !== undefined ? searchPlaceholderKey : "subheader__search_placeholder"}
    />
    {advancedFilters && (
      <Button
        customStyles={styles.iconButton}
        icon={IconName.Filter}
        variant={ButtonVariant.IconOnly}
        onClick={() => {}}
        disabled={true}
      />
    )}
  </SubHeader>
)

const styles = {
  container: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "> *:not(:last-child)": {
      marginRight: spacingMedium
    }
  }),
  subheader: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 3fr",
    padding: spacing(spacingLarge, spacingHeader, spacingMedium, spacingHeader),
    gap: spacingMedium
  }),
  searchInput: css({
    height: inputHeight,
    color: fontColor
  }),
  customSelect: css({
    width: "100%",

    ".custom-select > div:first-of-type": {
      minHeight: inputHeight,
      height: inputHeight
    }
  }),
  iconButton: css({
    marginTop: "20px"
  })
}
