import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {ColumnProps, Heading, TableContainer, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {Salutation} from "shared/graphql/generated/globalTypes"
import {
  backgroundColorDarker,
  boxHeightMediumLarge,
  CustomStyle,
  Flex,
  FontWeight,
  primaryKeyColor,
  spacing,
  spacingHuge,
  spacingMedium,
  textEllipsis,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {salutationToLanguageKey} from "shared/utils"
import {UserAccount} from "../../../../models"
import {UserTableClaimsField} from "./user-table-claims-field/user-table-claims-field"

interface Props extends CustomStyle {
  readonly users: UserAccount[]
  readonly onUserRowClicked: (user: UserAccount) => void
  readonly ownId?: string
}

export const UserTable: React.FC<Props> = ({users, customStyles, onUserRowClicked, ownId}) => {
  const {t} = useLucaTranslation()

  const highlightUser = (user: UserAccount): CSSInterpolation => {
    return styles.highlightRow(user.id === ownId)
  }

  const columns: ColumnProps<UserAccount>[] = [
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("user_management__table_header_username")}
          </Heading>
        </div>
      ),
      key: "username",
      customStyles: styles.columnGrow1,
      customHeaderStyles: styles.columnGrow1,
      sortConfig: {
        isSortable: true,
        key: "lastName"
      },
      content: entity => (
        <Text customStyles={[textEllipsis]} size={TextSize.Medium}>
          {`${entity.firstName} ${entity.lastName}`}
        </Text>
      )
    },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("user_management__table_header_salutation")}
          </Heading>
        </div>
      ),
      key: "salutation",
      sortConfig: {
        isSortable: true,
        key: "salutation",
        customSort: entity => (entity.salutation === Salutation.Mrs ? -1 : entity.salutation === Salutation.Mr ? 1 : 2)
      },
      customStyles: styles.columnSalutation,
      customHeaderStyles: styles.columnSalutation,
      content: entity => (
        <Text customStyles={[textEllipsis]} size={TextSize.Medium}>
          {t(salutationToLanguageKey(entity.salutation))}
        </Text>
      )
    },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("user_management__table_header_e_mail")}
          </Heading>
        </div>
      ),
      key: "email",
      customStyles: styles.columnGrow1,
      customHeaderStyles: styles.columnGrow1,
      sortConfig: {
        isSortable: true,
        key: "email"
      },
      content: entity => (
        <Text customStyles={[textEllipsis]} size={TextSize.Medium}>
          {entity.email}
        </Text>
      )
    },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("user_management__table_header_organisation")}
          </Heading>
        </div>
      ),
      key: "organization",
      customStyles: styles.columnGrow1,
      customHeaderStyles: styles.columnGrow1,
      sortConfig: {
        isSortable: true,
        customSort: user => user.organization.toLowerCase(),
        key: "organization"
      },
      content: entity => (
        <Text customStyles={[textEllipsis]} size={TextSize.Medium}>
          {entity.organization}
        </Text>
      )
    },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("user_management__table_header_rights")}
          </Heading>
        </div>
      ),
      key: "userClaims",
      customStyles: styles.columnGrow4,
      customHeaderStyles: styles.columnGrow4,
      content: entity => (
        <UserTableClaimsField
          mayAdministrateUserAccounts={entity.mayAdministrateUserAccounts}
          mayArchive={entity.mayArchive}
          mayAdministrateRScripts={entity.mayAdministrateRScripts}
          mayFinalizeWithoutPublishing={entity.mayFinalizeWithoutPublishing}
        />
      )
    }
  ]

  return (
    <TableContainer<UserAccount>
      customHeaderRowStyles={styles.headerRow}
      customStyles={customStyles}
      columns={columns}
      entityKey={user => user.id}
      entities={users}
      onClick={onUserRowClicked}
      showFooter={true}
      customEntityWrapperStyles={styles.entityWrapper}
      customTableFooterStyles={styles.footer}
      customRowStyles={highlightUser}
    />
  )
}

const styles = {
  headerRow: css({
    height: boxHeightMediumLarge
  }),
  columnSalutation: css({
    flex: "0 0 100px"
  }),
  columnGrow1: css({
    flexGrow: 1
  }),
  columnGrow2: css({
    flexGrow: 2
  }),
  columnGrow4: css({
    flexGrow: 4
  }),
  footer: css({
    margin: spacing(0, spacingHuge, spacingMedium, spacingHuge)
  }),
  entityWrapper: css({
    flexBasis: 0,
    backgroundColor: backgroundColorDarker
  }),
  highlightRow: (isHighlighted: boolean) =>
    css({
      backgroundColor: isHighlighted ? primaryKeyColor : undefined
    })
}
