import {css} from "@emotion/react"
import * as React from "react"
import {Controller, useForm} from "react-hook-form"
import {IconName, RatingActionOption} from "../../../../enums"
import {Flex, flex1, fontColorBright, spacingSmall, spacingTinier} from "../../../../styles"
import {LucaI18nLangKey, LucaTFunction, useLucaTranslation} from "../../../../translations"
import {Button} from "../../../button/button"
import {Icon} from "../../../icon/icon"
import {getRootPortalContainer} from "../../../react-portal/portal-utils"
import {CustomSelect} from "../../../select/custom-select"
import {Tooltip} from "../../../tooltip/tooltip"

const actionOptions = (t: LucaTFunction, isScenario: boolean) => [
  {value: RatingActionOption.None, label: t("rating__rating__action_no_label")},
  {value: RatingActionOption.NextAttendee, label: t("rating__rating__action_next_attendee_label")},
  ...[
    isScenario
      ? {value: RatingActionOption.NextItem, label: t("rating__rating__action_next_item_label")}
      : {value: RatingActionOption.NextQuestion, label: t("rating__rating__action_next_question_label")}
  ]
]

export interface RatingDetailActionElementForm {
  readonly nextAction: RatingActionOption
}

export interface RatingDetailActionElementProps {
  readonly isScenario: boolean
  readonly onClick: (action: RatingActionOption) => void
  readonly disabled?: boolean
  readonly ratingDetailAction?: RatingActionOption
  readonly onRatingDetailActionChange?: (ratingDetailAction: RatingActionOption) => void
  readonly tooltipKey?: LucaI18nLangKey
}

export const RatingDetailActionElement: React.FC<RatingDetailActionElementProps> = ({
  isScenario,
  onClick,
  disabled,
  ratingDetailAction,
  onRatingDetailActionChange,
  tooltipKey
}) => {
  const {t} = useLucaTranslation()

  const formMethods = useForm<RatingDetailActionElementForm>({
    defaultValues: {nextAction: ratingDetailAction ?? RatingActionOption.None}
  })
  const currentFormValues = formMethods.watch()

  const handleClick = (formValues: RatingDetailActionElementForm) => {
    onClick(formValues.nextAction)
  }
  const {handleSubmit, control} = formMethods

  const handleChange = (
    onChange: (ratingDetailAction: RatingActionOption) => void,
    ratingAction: RatingActionOption
  ) => {
    onRatingDetailActionChange?.(ratingAction)
    onChange(ratingAction)
  }

  const prevRatingDetailAction = React.useRef<RatingActionOption>()
  React.useEffect(() => {
    if (
      prevRatingDetailAction.current &&
      ratingDetailAction !== prevRatingDetailAction.current &&
      ratingDetailAction !== currentFormValues.nextAction
    ) {
      formMethods.setValue("nextAction", ratingDetailAction)
    }
    prevRatingDetailAction.current = ratingDetailAction
  }, [ratingDetailAction, prevRatingDetailAction, currentFormValues])

  return (
    <div css={styles.wrapper}>
      <div css={styles.innerWrapper}>
        <div css={[styles.columnContainer, styles.marginRight]}>
          <Controller
            render={({onChange, value}) => (
              <CustomSelect
                customStyles={styles.customSelect}
                onChange={ratingDetailAction => handleChange(onChange, ratingDetailAction as RatingActionOption)}
                value={value}
                labelKey={"rating__rating__action_dropdown_label"}
                optionList={actionOptions(t, isScenario)}
                tooltipConfig={{
                  labelKey: "rating__rating__action_dropdown_label",
                  textKey: "rating__rating__action_dropdown_tooltip_text",
                  iconName: IconName.Information
                }}
                menuPortalTarget={getRootPortalContainer()}
              />
            )}
            control={control}
            rules={{required: true}}
            name="nextAction"
          />
        </div>
        <div css={styles.columnContainer}>
          <Tooltip
            title={tooltipKey ? t(tooltipKey) : disabled ? t("rating__rating__action_button_tooltip") : ""}
            inactive={!disabled}>
            <Button onClick={handleSubmit(handleClick)} disabled={disabled}>
              {disabled ? (
                <>
                  <Icon name={IconName.Check} color={fontColorBright} hasSpacing={true} customSpacing={spacingSmall} />
                  {t("confirmed")}
                </>
              ) : (
                t("confirm")
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

const Sizes = {
  wrapper: 72,
  customSelect: 200
}

const styles = {
  wrapper: css(Flex.row, {
    flex: flex1,
    margin: "auto",
    height: Sizes.wrapper
  }),
  innerWrapper: css(Flex.row, {
    alignItems: "flex-end"
  }),
  columnContainer: css(Flex.column, {
    height: "100%",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end"
  }),
  headline: css({
    marginBottom: spacingTinier
  }),
  marginRight: css({
    marginRight: spacingSmall
  }),
  customSelect: css({
    width: Sizes.customSelect
  })
}
