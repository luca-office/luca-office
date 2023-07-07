import {ApolloClient} from "@apollo/client"
import {RScriptsQuery} from "../graphql/generated/RScriptsQuery"
import {rScriptsQuery} from "../graphql/queries"
import {AutomatedCodingCriterionMetadata, RScript, RScriptScenarioCodingAutomatedCriterion} from "../models"
import {LucaTFunction} from "../translations"
import {find} from "./array"
import {Option} from "./option"

const getRScript = (client: ApolloClient<unknown>, rScriptId: UUID): Promise<Option<RScript>> =>
  client
    .query<RScriptsQuery>({query: rScriptsQuery})
    .then(result => find(rScript => rScript.id === rScriptId, result.data?.rScripts ?? []))

export const getRScriptScenarioCodingAutomatedCriterionData = (
  t: LucaTFunction,
  client: ApolloClient<unknown>,
  criterion: RScriptScenarioCodingAutomatedCriterion
): Promise<AutomatedCodingCriterionMetadata> =>
  getRScript(client, criterion.rScriptId).then(rScriptOption =>
    rScriptOption
      .map(rScript => ({name: t("rating__r_script_used", {rScriptName: rScript.title})}))
      .getOrElse({name: ""})
  )
