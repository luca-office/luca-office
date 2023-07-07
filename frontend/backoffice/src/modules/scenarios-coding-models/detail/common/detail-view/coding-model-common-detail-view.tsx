import {css} from "@emotion/react"
import * as React from "react"
import {
  Card,
  CardHeader,
  deleteEntityButtonStyles,
  DeleteOrArchiveEntityButton,
  Heading,
  Label
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {CodingModelCreation} from "shared/graphql/generated/globalTypes"
import {fontColorLight, spacingLarge, spacingMedium, spacingSmall} from "shared/styles"
import {
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  OverlayEditField,
  OverlayEditFieldType
} from "../../../../../components"
import {CodingModelDetailViewFooter} from "../coding-model-detail-view-footer"
import {CodingModelCommonDetailViewComponentProps} from "./coding-model-common-detail-view-container"

export const CodingModelCommonDetailView: React.FC<CodingModelCommonDetailViewComponentProps> = ({
  description,
  handleUpdate,
  headerTitleKey,
  descriptionPlaceholderKey,
  maxScore,
  renderCustomContent,
  editDescriptionDialogTitleKey,
  isReadOnly,
  navigate,
  t,
  headerDeleteButtonConfig,
  title
}) => {
  return (
    <Card customStyles={{overflowY: "auto"}}>
      <CardHeader customStyles={styles.header} hasGreyBackground hasShadow>
        <Heading level={HeadingLevel.h3}>{t(headerTitleKey)}</Heading>
        {headerDeleteButtonConfig && (
          <DeleteOrArchiveEntityButton
            disabled={isReadOnly}
            customStyles={styles.deleteEntityButton}
            iconColor={fontColorLight}
            entityId={headerDeleteButtonConfig.entityId}
            customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
            onSuccess={() =>
              navigate({
                route: headerDeleteButtonConfig.navigateTo.route,
                payload: headerDeleteButtonConfig.navigateTo.payload
              })
            }
            useDeleteHook={() => headerDeleteButtonConfig.deleteEntityHook}
          />
        )}
      </CardHeader>
      <div css={styles.content}>
        <div css={styles.title}>
          <Label label={t("title")} icon={isReadOnly ? IconName.LockClosed : IconName.EditPencil} />
          <InlineEditableHeaderContainer
            onConfirm={title => handleUpdate({title})}
            text={title}
            disabled={isReadOnly}
            customStyles={styles.inlineField}
          />
        </div>
        <Label label={t("description")} icon={isReadOnly ? IconName.LockClosed : IconName.EditPencil} />
        <OverlayEditField<CodingModelCreation>
          formFields={[
            {
              updateId: "description",
              value: description,
              labelKey: "description",
              type: OverlayEditFieldType.TEXTAREA
            }
          ]}
          fieldLabelKey={"description"}
          customStyles={styles.descriptionField}
          dialogTitleKey={editDescriptionDialogTitleKey}
          onUpdate={value => handleUpdate({description: value.description})}
          updateLoading={false}
          disabled={isReadOnly}
          renderValue={() => (
            <InlineEditableTextareaContainer
              placeholder={t(descriptionPlaceholderKey)}
              text={description}
              disabled={isReadOnly}
              readOnly={true}
            />
          )}
          displayPlain={true}
        />

        {renderCustomContent?.()}
      </div>
      <CodingModelDetailViewFooter totalScore={maxScore} />
    </Card>
  )
}

const styles = {
  header: css({
    justifyContent: "space-between"
  }),
  content: css({
    padding: spacingMedium,
    height: "100%",
    overflowY: "auto"
  }),
  title: css({
    marginBottom: spacingLarge
  }),
  deleteEntityButton: css({
    cursor: "pointer"
  }),
  inlineField: css({
    marginLeft: -spacingSmall
  }),
  descriptionField: css({
    minHeight: 58,
    marginLeft: -spacingSmall
  })
}
