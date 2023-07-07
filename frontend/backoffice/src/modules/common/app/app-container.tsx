import {useQuery} from "@apollo/client"
import * as React from "react"
import {CheckLoginQuery} from "shared/graphql/generated/CheckLoginQuery"
import {checkLoginQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {App} from "./app"

export const AppContainer: React.FC = () => {
  const {loading: isLoading, data} = useQuery<CheckLoginQuery>(checkLoginQuery)

  return <App isLoading={isLoading} userAccount={Option.of(data?.checkLogin)} />
}
