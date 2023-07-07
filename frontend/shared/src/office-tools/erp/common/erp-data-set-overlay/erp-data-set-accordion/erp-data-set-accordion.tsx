import {css} from "@emotion/react"
import {partial} from "lodash-es"
import * as React from "react"
import {useClipboard} from "use-clipboard-copy"
import {AccordionCard, Icon, Paper, Text, Tooltip} from "../../../../../components"
import {ErpType, IconName} from "../../../../../enums"
import {useLucaClipboard} from "../../../../../hooks"
import {
  Flex,
  foreignKeyColor,
  iconDefaultColor,
  iconDisabledColor,
  inputHeight,
  spacing,
  spacingCard,
  spacingSmall,
  textEllipsis,
  TextSize
} from "../../../../../styles"
import {useLucaTranslation} from "../../../../../translations"
import {getAccordionLabel, getAccordionLabelByKey, getAdditionalAccordionLabel, toDataString} from "../../../utils"

export interface ErpDataSetAccordionProps {
  readonly type: ErpType
  readonly data: Record<string, number[]>
  readonly onClick?: (ids: number[]) => void
  readonly onCopyAll?: () => void
  readonly onCopyToClipboard?: () => void
}

export const ErpDataSetAccordion: React.FC<ErpDataSetAccordionProps> = ({
  type,
  data,
  onClick,
  onCopyAll,
  onCopyToClipboard
}) => {
  const {t} = useLucaTranslation()

  const {copy: copyToClipboard} = useClipboard()

  const dataKeys = Object.keys(data)
  const idsCount = dataKeys.reduce((accumulator, key) => {
    const length = data[key].length
    return length > accumulator ? length : accumulator
  }, 0)
  const indices = [...Array(idsCount)].map((_, index) => index)
  const hasMultipleKeys = dataKeys.length > 1

  const onCopy = (copyData: Record<string, number>, evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation()
    onCopyToClipboard?.()
    copyToClipboard(hasMultipleKeys ? toDataString(copyData) : `${copyData[Object.keys(copyData)[0]]}`)
  }

  const footer = (
    <div css={styles.footer}>
      <div className={"footer-content-wrapper"} onClick={() => onCopyAll?.()}>
        <Tooltip customStyles={styles.footerContent} title={t("clipboard__copy")}>
          <Text size={TextSize.Medium} customStyles={styles.footerLabel}>
            {t("erp_accordion__copy_all")}
          </Text>
          <Icon name={IconName.Duplicate} color={iconDefaultColor} />
        </Tooltip>
      </div>
    </div>
  )

  const renderContent = (index: number) => (
    <div
      className={"entry-wrapper"}
      css={styles.entryWrapper}
      onClick={
        !hasMultipleKeys
          ? () => onClick?.([data[dataKeys[0]][index]])
          : () => onClick?.(dataKeys.flatMap(key => data[key]))
      }>
      <Paper customStyles={styles.entry(dataKeys.length)}>
        {dataKeys.map(key => (
          <React.Fragment key={`erp_accordion_entity_${index}_${key}`}>
            {hasMultipleKeys ? (
              <div css={styles.entryLabelWrapper}>
                <Text customStyles={styles.entryLabel} size={TextSize.Medium}>
                  {getAccordionLabelByKey(t, key)}
                </Text>
                <Text customStyles={styles.entryLabel} size={TextSize.Medium}>
                  {data[key][index]}
                </Text>
              </div>
            ) : (
              <Text customStyles={styles.entryLabel} size={TextSize.Medium}>
                {data[key][index]}
              </Text>
            )}
          </React.Fragment>
        ))}
        <div
          css={styles.copyWrapper}
          className={"copy-wrapper"}
          onClick={partial(
            onCopy,
            dataKeys.reduce(
              (accumulator, key) => ({...accumulator, [key]: data[key][index]}),
              {} as Record<string, number>
            )
          )}>
          <Tooltip title={t("clipboard__copy")}>
            <Icon name={IconName.Duplicate} color={iconDefaultColor} />
          </Tooltip>
        </div>
      </Paper>
    </div>
  )

  return (
    <AccordionCard
      className={"erp-accordion"}
      headerLabel={`${getAccordionLabel(t, type)} (${t("erp_dataset__foreign_key")})`}
      headerLabelIcon={IconName.KeyFilled}
      headerLabelIconColor={iconDisabledColor}
      additionalHeaderLabel={getAdditionalAccordionLabel(t, type, idsCount)}
      footer={footer}>
      {indices.map(index => (
        <React.Fragment key={`erp_accordion_entity_${index}`}>{renderContent(index)}</React.Fragment>
      ))}
    </AccordionCard>
  )
}

const Size = {
  icon: 16
}

const styles = {
  entryWrapper: css({
    "&:not(:first-of-type)": {
      marginTop: spacingSmall
    },
    "&:hover .copy-wrapper": {
      display: "initial"
    }
  }),
  entry: (repeat: number) =>
    css({
      height: inputHeight,
      padding: spacing(0, spacingSmall, 0, spacingCard),
      display: "grid",
      gridColumnGap: spacingSmall,
      gridTemplateColumns: `repeat(${repeat}, 1fr) minmax(${Size.icon}px, max-content)`,
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: foreignKeyColor
    }),
  entryLabelWrapper: css({
    display: "grid",
    gridColumnGap: spacingSmall,
    gridTemplateColumns: `minmax(min-content, max-content) 1fr`
  }),
  entryLabel: css(textEllipsis),
  copyWrapper: css(Flex.row, {
    display: "none",
    cursor: "pointer"
  }),
  footer: css(Flex.row, {
    justifyContent: "flex-end"
  }),
  footerContent: css(Flex.row, {
    cursor: "pointer"
  }),
  footerLabel: css(textEllipsis, {
    marginRight: spacingSmall
  })
}
