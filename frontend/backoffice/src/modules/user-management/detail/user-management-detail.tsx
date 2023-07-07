import {css} from "@emotion/react"
import React from "react"
import {SubHeader, TextInput} from "shared/components"
import {IconName, InputType} from "shared/enums"
import {
  backgroundColor,
  boxHeightMedium,
  Flex,
  flex1,
  fontColor,
  inputHeight,
  spacing,
  spacingHuge,
  spacingMedium
} from "shared/styles"
import {Option} from "shared/utils"
import {UserGlobalClaim} from "../../../enums"
import {UserAccount} from "../../../models"
import {EditUserClaimsModalContainer} from "../edit/edit-user-claims-modal-container"
import {FilterUserClaimsCard} from "./filter-user-claims-card/filter-user-claims-card"
import {UserGlobalClaimsState} from "./user-management-detail-container"
import {UserTable} from "./user-table/user-table"

interface Props {
  readonly globalClaims: UserGlobalClaimsState[]
  readonly toggleUserClaim: (claim: UserGlobalClaim) => void
  readonly searchValue: string
  readonly onSearchValueChange: (text: string) => void
  readonly users: UserAccount[]
  readonly userForEditingModal: Option<UserAccount>
  readonly setUserForEditingModal: React.Dispatch<React.SetStateAction<Option<UserAccount>>>
  readonly ownId?: string
}

export const UserManagementDetail = ({
  globalClaims,
  toggleUserClaim,
  searchValue,
  onSearchValueChange,
  userForEditingModal,
  setUserForEditingModal,
  users,
  ownId
}: Props) => {
  return (
    <>
      <div css={styles.wrapper}>
        <SubHeader customStyles={styles.subheader}>
          <FilterUserClaimsCard
            customStyles={styles.filterCard}
            toggleUserClaim={toggleUserClaim}
            globalClaims={globalClaims}
          />
          <TextInput
            customInputStyles={styles.searchInput}
            customStyles={styles.inputWrapper}
            labelKey="subheader__search"
            value={searchValue}
            type={InputType.text}
            icon={IconName.Search}
            onChange={onSearchValueChange}
            placeholderKey={"user_management__filter_search_placeholder"}
          />
        </SubHeader>
        <UserTable
          onUserRowClicked={user => setUserForEditingModal(Option.of(user))}
          customStyles={styles.table}
          ownId={ownId}
          users={users}
        />
      </div>
      {userForEditingModal
        .map(user => (
          <EditUserClaimsModalContainer
            onDismiss={() => setUserForEditingModal(Option.none())}
            onConfirm={() => setUserForEditingModal(Option.none())}
            user={user}
          />
        ))
        .orNull()}
    </>
  )
}

const styles = {
  wrapper: css(Flex.column, {
    height: `calc(100vh - ${boxHeightMedium}px)`
  }),
  subheader: css({
    padding: spacing(spacingMedium, spacingHuge),
    position: "relative"
  }),
  filterCard: css({
    flex: flex1
  }),
  table: css(Flex.column, {
    padding: spacing(spacingMedium, spacingHuge, 0, spacingHuge),
    flex: 1,
    overflow: "auto",
    backgroundColor
  }),
  searchInput: css({
    height: inputHeight,
    color: fontColor,

    "::placeholder": {
      color: fontColor
    }
  }),
  inputWrapper: css({
    flex: 1
  })
}
