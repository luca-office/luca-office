import * as React from "react"
import {Card, Heading, ReadonlyActionField, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {UserAccountUpdate} from "shared/graphql/generated/globalTypes"
import {useLucaTranslation} from "shared/translations"
import {salutationToLanguageKey} from "shared/utils"
import {OverlayEditField, SubHeaderDetailContainer} from "../../../components"
import {UserAccount} from "../../../models"
import {Route} from "../../../routes"
import {getNameFields, getOrganizationField, getSalutationFields} from "./config/edit-user-field-config"
import {editUserStyle} from "./edit-user.style"
import {GlobalRightsField} from "./global-rights-field"
import {useEditUser} from "./hooks"

/**
 * This component serves as the base for user editing
 * Currently it is bound to my account, it can be extended by user id via route url in addition to this
 * @constructor
 */
export const EditUser: React.FC = () => {
  const {userAccount, updateAccount, updateLoading} = useEditUser()
  const {t} = useLucaTranslation()
  const renderValue = (value: string) => () => <span>{value}</span>
  const submitUpdate = (update: UserAccountUpdate) =>
    userAccount.forEach(user =>
      updateAccount(user.id, {
        lastName: update.lastName || user.lastName,
        firstName: update.firstName || user.firstName,
        organization: update.organization || user.organization,
        salutation: update.salutation || user.salutation,
        mayAdministrateUserAccounts: user.mayAdministrateUserAccounts,
        mayArchive: user.mayArchive,
        mayFinalizeWithoutPublishing: user.mayFinalizeWithoutPublishing,
        mayAdministrateRScripts: user.mayAdministrateRScripts
      })
    )

  return (
    <div className="edit-user">
      <SubHeaderDetailContainer
        returnTo={{text: t("navigation__scenarios"), route: Route.Scenarios}}
        title={<span>{t("navigation__my_account")}</span>}
      />
      <Card customStyles={editUserStyle.container}>
        <Heading level={HeadingLevel.h3}>{t("account__headline")}</Heading>
        <Text customStyles={editUserStyle.header}>{t("account__hint")}</Text>
        {userAccount
          .map(user => {
            return (
              <React.Fragment>
                <div css={editUserStyle.combinedField}>
                  <OverlayEditField<UserAccount>
                    fieldLabelKey={"account__field_name"}
                    renderValue={renderValue(`${user.lastName}, ${user.firstName}`)}
                    dialogTitleKey={"account__dialog_name"}
                    updateLoading={updateLoading}
                    formFields={getNameFields(user)}
                    onUpdate={submitUpdate}
                  />
                  <ReadonlyActionField label={t("account__field_email")} renderValue={renderValue(user.email)} />
                </div>
                <OverlayEditField<UserAccount>
                  fieldLabelKey={"account__field_salutation"}
                  renderValue={renderValue(t(salutationToLanguageKey(user.salutation)))}
                  dialogTitleKey={"salutation"}
                  updateLoading={updateLoading}
                  formFields={getSalutationFields(user, t)}
                  onUpdate={submitUpdate}
                  customStyles={editUserStyle.field}
                />
                <OverlayEditField<UserAccount>
                  fieldLabelKey={"account__field_organization"}
                  renderValue={renderValue(user.organization)}
                  dialogTitleKey={"account__dialog_organization"}
                  updateLoading={updateLoading}
                  formFields={getOrganizationField(user)}
                  onUpdate={submitUpdate}
                  customStyles={editUserStyle.field}
                />
                <GlobalRightsField user={user} />
              </React.Fragment>
            )
          })
          .orNull()}
      </Card>
    </div>
  )
}
