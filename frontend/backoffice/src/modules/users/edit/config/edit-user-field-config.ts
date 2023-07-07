import {Salutation} from "shared/graphql/generated/globalTypes"
import {LucaTFunction} from "shared/translations"
import {salutationToLanguageKey} from "shared/utils"
import {OverlayEditCompositeFieldConfig, OverlayEditFieldType} from "../../../../components"
import {UserAccount} from "../../../../models"

export const getNameFields = (user: UserAccount): OverlayEditCompositeFieldConfig[] => [
  {
    updateId: "firstName",
    labelKey: "account__field_firstname",
    type: OverlayEditFieldType.TEXT,
    value: user.firstName
  },
  {
    updateId: "lastName",
    labelKey: "account__field_surname",
    type: OverlayEditFieldType.TEXT,
    value: user.lastName
  }
]

export const getOrganizationField = (user: UserAccount): OverlayEditCompositeFieldConfig[] => [
  {
    updateId: "organization",
    labelKey: "account__field_organization",
    placeholderKey: "account__placeholder_organization",
    type: OverlayEditFieldType.TEXT,
    value: user.organization
  }
]

export const getSalutationFields = (user: UserAccount, t: LucaTFunction): OverlayEditCompositeFieldConfig[] => [
  {
    updateId: "salutation",
    labelKey: "account__field_salutation",
    type: OverlayEditFieldType.SELECT,
    value: user.salutation,
    options: [
      {label: t(salutationToLanguageKey(Salutation.Mr)), value: Salutation.Mr},
      {label: t(salutationToLanguageKey(Salutation.Mrs)), value: Salutation.Mrs},
      {label: t(salutationToLanguageKey(Salutation.NonBinary)), value: Salutation.NonBinary}
    ]
  }
]
