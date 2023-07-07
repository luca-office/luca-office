import {css} from "@emotion/react"
import * as React from "react"
import {useClipboard} from "use-clipboard-copy"
import {Text, Tooltip} from "../../components"
import {errorColor, Flex, primaryColor, spacingMedium, spacingSmall, textEllipsis, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Option} from "../../utils"

export interface CalculatorDisplayProps {
  readonly operation: Option<string>
  readonly result: Option<string>
  readonly hasInvalidInput: boolean
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({operation, result, hasInvalidInput}) => {
  const {t} = useLucaTranslation()

  const {copy} = useClipboard()
  const onResultClick = () => !hasInvalidInput && result.forEach(copy)

  return (
    <div css={[Flex.column, styles.container]}>
      <Text customStyles={styles.operation}>{operation && operation.orNull()}</Text>
      <Tooltip title={t("calculator__copy_to_clipboard")} inactive={hasInvalidInput} withPortal={true}>
        <div css={styles.resultRow(hasInvalidInput)} onClick={onResultClick}>
          <Text customStyles={styles.resultIcon} className={"result"}>
            =
          </Text>

          <Text customStyles={styles.result(hasInvalidInput)} className={"result"}>
            {hasInvalidInput ? t("calculator__invalid_input") : result && result.orNull()}
          </Text>
        </div>
      </Tooltip>
    </div>
  )
}

const styles = {
  container: css({
    marginBottom: spacingMedium
  }),
  operation: css(textEllipsis, {
    marginBottom: spacingSmall,
    fontSize: 24,
    letterSpacing: 0.23,
    height: 31,
    textAlign: "right"
  }),
  resultIcon: css({
    flex: 0,
    marginRight: spacingMedium,
    fontSize: TextSize.Huge,
    letterSpacing: 0.34
  }),
  resultRow: (isInvalid: boolean) =>
    css(Flex.row, {
      cursor: isInvalid ? "default" : "pointer",
      ...(!isInvalid && {
        "&:hover > .result": {
          color: primaryColor
        }
      })
    }),
  result: (isInvalid: boolean) =>
    css(textEllipsis, {
      flex: 1,
      fontSize: isInvalid ? TextSize.Large : TextSize.Huge,
      letterSpacing: 0.34,
      textAlign: "right",
      color: isInvalid ? errorColor : undefined
    })
}
