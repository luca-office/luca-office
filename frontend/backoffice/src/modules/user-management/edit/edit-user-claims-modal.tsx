import {css} from "@emotion/react"
import React from "react"
import {
  Column,
  Columns,
  Icon,
  Label,
  Modal,
  Paper,
  ReadonlyActionField,
  SelectableCard,
  SelectionIconType,
  Text,
  Tooltip
} from "shared/components"
import {IconName} from "shared/enums"
import {
  cardBottomColor,
  Flex,
  headerBoxShadow,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingTiny,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {salutationToLanguageKey} from "shared/utils"
import {UserGlobalClaim} from "../../../enums"
import {borderRadius} from "../../../styles/common"
import {UserGlobalClaimsState} from "../detail/user-management-detail-container"
import {isClaimSelected} from "../utils/user-management"
import {EditUserClaimsModalContainerProps} from "./edit-user-claims-modal-container"

export interface EditUserClaimsModalProps extends EditUserClaimsModalContainerProps {
  readonly onClaimClick: (claim: UserGlobalClaim) => void
  readonly userClaims: UserGlobalClaimsState[]
  readonly isCurrentUser: boolean
  readonly isUpdateLoading: boolean
}

export const EditUserClaimsModal: React.FC<EditUserClaimsModalProps> = ({
  user,
  onConfirm,
  onDismiss,
  userClaims,
  onClaimClick,
  isCurrentUser,
  isUpdateLoading
}) => {
  const {t} = useLucaTranslation()

  return (
    <Modal
      onConfirm={onConfirm}
      customStyles={styles.modal}
      onDismiss={onDismiss}
      customHeaderStyles={styles.header}
      customFooterStyles={styles.footer}
      isConfirmButtonLoading={isUpdateLoading}
      title={`${user.firstName} ${user.lastName} (${t(salutationToLanguageKey(user.salutation))})`}>
      <div css={styles.content}>
        <div css={[Flex.row, styles.spacerTop]}>
          <Label label={t("user_management__user_information_label")} />
          <Icon customStyles={styles.icon} name={IconName.LockClosed} />
        </div>
        <Paper>
          <Columns customStyles={styles.spacerTop}>
            <Column>
              <ReadonlyActionField
                label={t("user_management__table_header_username")}
                renderValue={() => <Text size={TextSize.Medium}>{`${user.firstName} ${user.lastName}`}</Text>}
              />
            </Column>
            <Column>
              <ReadonlyActionField
                label={t("salutation")}
                renderValue={() => <Text size={TextSize.Medium}>{t(salutationToLanguageKey(user.salutation))}</Text>}
              />
            </Column>
            <Column>
              <ReadonlyActionField
                label={t("email")}
                renderValue={() => <Text size={TextSize.Medium}>{user.email}</Text>}
              />
            </Column>
          </Columns>
          <Columns customStyles={styles.spacerTop}>
            <Column customStyles={styles.organization}>
              <ReadonlyActionField
                label={t("organization")}
                renderValue={() => <Text size={TextSize.Medium}>{user.organization}</Text>}
              />
            </Column>
          </Columns>
        </Paper>
        <div css={[Flex.row, styles.spacerTop]}>
          <Label label={t("user_management__filter_header")} />
          <Icon customStyles={styles.icon} name={IconName.EditPencil} />
        </div>
        <div css={styles.userClaims}>
          <Tooltip
            inactive={!(isCurrentUser && user.mayAdministrateUserAccounts)}
            title={t("user_management__edit_user_claims_manage_tooltip")}>
            <SelectableCard
              disabled={isCurrentUser && user.mayAdministrateUserAccounts}
              customStyles={styles.selectableCard}
              onClick={() => onClaimClick(UserGlobalClaim.UserManagement)}
              iconName={IconName.User}
              selectionIconType={SelectionIconType.CHECK}
              selected={isClaimSelected(UserGlobalClaim.UserManagement, userClaims)}
              title={t("user_management__filter_label_management")}
              text={t("user_management__edit_user_claims_manage")}
            />
          </Tooltip>
          <SelectableCard
            customStyles={styles.selectableCard}
            onClick={() => onClaimClick(UserGlobalClaim.Archive)}
            iconName={IconName.Archive}
            selectionIconType={SelectionIconType.CHECK}
            selected={isClaimSelected(UserGlobalClaim.Archive, userClaims)}
            title={t("user_management__filter_label_archive")}
            text={t("user_management__edit_user_claims_archive")}
          />
          <SelectableCard
            customStyles={styles.selectableCard}
            onClick={() => onClaimClick(UserGlobalClaim.FinalizeWithoutPublishing)}
            iconName={IconName.LockClosed}
            selectionIconType={SelectionIconType.CHECK}
            selected={isClaimSelected(UserGlobalClaim.FinalizeWithoutPublishing, userClaims)}
            title={t("user_management__filter_label_finalize")}
            text={t("user_management__edit_user_claims_finalize")}
          />
          <SelectableCard
            customStyles={styles.selectableCard}
            onClick={() => onClaimClick(UserGlobalClaim.RScripts)}
            iconName={IconName.PaperCode}
            selectionIconType={SelectionIconType.CHECK}
            selected={isClaimSelected(UserGlobalClaim.RScripts, userClaims)}
            title={t("user_management__filter_label_r_scripts")}
            text={t("user_management__edit_user_claims_r_scripts")}
          />
        </div>
      </div>
    </Modal>
  )
}

const styles = {
  modal: css({
    width: "75vw",
    margin: "auto",
    padding: 0
  }),
  content: css({
    padding: spacingMedium,
    paddingTop: 0
  }),
  icon: css({
    marginLeft: spacingTiny
  }),
  header: css({
    boxShadow: headerBoxShadow,
    backgroundColor: cardBottomColor,
    padding: spacing(spacingMedium, spacingLarge),
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius
  }),
  footer: css({
    padding: spacingMedium,
    width: "auto",
    paddingTop: 0
  }),
  spacerTop: css({
    marginTop: spacingMedium
  }),
  organization: css({
    marginBottom: spacingMedium
  }),
  selectableCard: css({
    minHeight: 90
  }),
  userClaims: css({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: spacingMedium,
    marginBottom: spacingMedium
  })
}
