import {css} from "@emotion/react"
import {noop} from "lodash-es"
import * as React from "react"
import {
  Button,
  Column,
  Columns,
  Label,
  Modal,
  ReadonlyActionField,
  SelectableCard,
  SelectionIconType,
  Text,
  TextInput
} from "shared/components"
import {ButtonVariant, IconName, InputType} from "shared/enums"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {CodingDimension} from "shared/models"
import {Flex, spacingHuge, spacingHuger, spacingMedium, spacingSmall, textEllipsis, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {AutomatedRulesCards} from "../../detail/coding-item/automated-rules-cards/automated-rules-cards"
import {useCreateItemModal} from "./hooks/use-create-item-modal"

interface Props {
  readonly onConfirm: () => void
  readonly onDismiss: () => void
  readonly parentDimension: CodingDimension
  readonly scenarioId: UUID
  readonly codingModelId: UUID
}

export const CreateItemModal: React.FC<Props> = ({
  onConfirm,
  onDismiss,
  parentDimension,
  scenarioId,
  codingModelId
}) => {
  const {t} = useLucaTranslation()
  const {
    formMethods,
    createManualCodingItem,
    createAutomatedCodingItem,
    setSelectedScoringType,
    selectedScoringType,
    isAutomatedRatingSelected,
    isSecondStepActive,
    setSelectedRule,
    selectedRule,
    setIsAutomatedRatingSelected,
    setIsSecondStepActive,
    actionsLoading
  } = useCreateItemModal(parentDimension.id, scenarioId, codingModelId)

  const {register, errors, handleSubmit, trigger} = formMethods

  const handleConfirmClick = () => {
    if (isAutomatedRatingSelected && !isSecondStepActive) {
      trigger("title").then(isValid => isValid && setIsSecondStepActive(true))
    } else if (isSecondStepActive) {
      handleSubmit(creation => {
        createAutomatedCodingItem({scoringType: selectedScoringType, title: creation.title}).then(onConfirm)
      })()
    } else {
      handleSubmit(creation => {
        createManualCodingItem({scoringType: selectedScoringType, title: creation.title}).then(onConfirm)
      })()
    }
  }

  const firstStep = (
    <div css={styles.step(isSecondStepActive)}>
      <Columns>
        <Column flexGrow={2} flexShrink={0} customStyles={styles.titleColumn}>
          <TextInput
            name="title"
            ref={register({
              required: true
            })}
            labelKey="title"
            hasValidationError={errors.title !== undefined}
            placeholderKey="title"
            type={InputType.text}
            autoFocus={true}
          />
        </Column>
        <Column flexGrow={1} flexShrink={0} customStyles={styles.dimensionColumn}>
          <ReadonlyActionField
            customContentStyles={styles.actionFieldContent}
            label={t("coding_models__create_item_label_parent")}
            customStyles={styles.actionField}
            renderValue={() => (
              <Text customStyles={textEllipsis} size={TextSize.Medium}>
                {parentDimension.title}
              </Text>
            )}
          />
        </Column>
      </Columns>

      <div css={styles.row}>
        <Label label={t("coding_models__create_item_label_rating_method")} />
        <Columns>
          <Column>
            <SelectableCard
              selected={!isAutomatedRatingSelected}
              onClick={() => setIsAutomatedRatingSelected(false)}
              customStyles={styles.typeCard}
              selectionIconType={SelectionIconType.RADIO}
              text={t("coding_models__create_item_label_rating_method_manual_text")}
              title={t("coding_models__create_item_label_rating_method_manual_title")}
              iconName={IconName.Mouse}
            />
          </Column>
          <Column>
            <SelectableCard
              customStyles={styles.typeCard}
              selected={isAutomatedRatingSelected}
              onClick={() => {
                setIsAutomatedRatingSelected(true)
                setSelectedScoringType(ScoringType.Analytical)
              }}
              selectionIconType={SelectionIconType.RADIO}
              text={t("coding_models__create_item_label_rating_method_automatic_text")}
              title={t("coding_models__create_item_label_rating_method_automatic_title")}
              iconName={IconName.Gear}
            />
          </Column>
        </Columns>
      </div>
      <div css={[styles.row, styles.ratingTypeWrapper]}>
        <Label label={t("coding_models__create_item_label_rating_type")} />
        <Columns>
          <Column>
            <SelectableCard
              disabled={isAutomatedRatingSelected}
              customStyles={styles.typeCard}
              selectionIconType={SelectionIconType.RADIO}
              selected={selectedScoringType === ScoringType.Holistic}
              onClick={() => setSelectedScoringType(ScoringType.Holistic)}
              text={t("coding_models__create_item_label_rating_type_holistic_text")}
              title={t("coding_models__create_item_label_rating_type_holistic_title")}
              iconName={IconName.SingleChoice}
            />
          </Column>
          <Column>
            <SelectableCard
              customStyles={styles.typeCard}
              selected={selectedScoringType === ScoringType.Analytical}
              selectionIconType={SelectionIconType.RADIO}
              onClick={() => setSelectedScoringType(ScoringType.Analytical)}
              text={t("coding_models__create_item_label_rating_type_analytic_text")}
              title={t("coding_models__create_item_label_rating_type_analytic_title")}
              iconName={IconName.MultipleChoice}
            />
          </Column>
        </Columns>
      </div>
    </div>
  )

  const secondStep = (
    <div css={[styles.row, styles.ratingTypeWrapper, styles.step(!isSecondStepActive)]}>
      <AutomatedRulesCards selectedRule={selectedRule} setSelectedRule={setSelectedRule} />
    </div>
  )

  const renderModalFooter = () => (
    <div css={styles.modalFooter}>
      <div>
        {isSecondStepActive && (
          <Button
            onClick={() => setIsSecondStepActive(false)}
            icon={IconName.ArrowLeft}
            variant={ButtonVariant.IconOnly}></Button>
        )}
      </div>
      <div css={Flex.row}>
        <Button variant={ButtonVariant.Secondary} onClick={onDismiss}>
          {t("cancel_button")}
        </Button>
        <Button
          disabled={actionsLoading}
          isLoading={actionsLoading}
          onClick={handleConfirmClick}
          customStyles={styles.modalConfirmButton}>
          {t(isAutomatedRatingSelected && !isSecondStepActive ? "continue_button" : "create_button")}
        </Button>
      </div>
    </div>
  )

  return (
    <Modal
      confirmButtonKey={isAutomatedRatingSelected ? "continue_button" : "create_button"}
      customStyles={styles.modal}
      renderFooter={renderModalFooter}
      title={t("coding_models__create_item_title")}
      onDismiss={onDismiss}
      onConfirm={noop}>
      <Text customStyles={styles.hint} size={TextSize.Small}>
        {t(isSecondStepActive ? "coding_models__create_automated_item_hint" : "coding_models__create_item_hint")}
      </Text>
      {firstStep}
      {secondStep}
    </Modal>
  )
}

const styles = {
  modal: css({
    width: "60vw"
  }),
  modalConfirmButton: css({
    marginLeft: spacingSmall
  }),
  step: (shouldHide: boolean) =>
    css({
      display: shouldHide ? "none" : "block"
    }),
  modalFooter: css(Flex.row, {
    justifyContent: "space-between"
  }),
  hint: css({
    marginBottom: spacingMedium
  }),
  dimensionColumn: css({
    width: "33.33%"
  }),
  titleColumn: css({
    width: "66.66%"
  }),
  actionField: css({
    width: "100%"
  }),
  actionFieldContent: css({
    minWidth: 0
  }),
  row: css({
    marginTop: spacingHuge
  }),
  ratingTypeWrapper: css({
    marginBottom: spacingHuger
  }),
  secondRow: css({
    flexGrow: 0,
    flexBasis: "33%"
  }),
  secondRowWrapper: css({
    marginTop: spacingMedium
  }),
  typeCard: css({
    height: 100
  })
}
