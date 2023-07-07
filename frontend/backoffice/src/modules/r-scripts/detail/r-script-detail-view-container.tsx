import * as React from "react"
import {useForm} from "react-hook-form"
import {RScriptUpdate} from "shared/graphql/generated/globalTypes"
import {RScript} from "shared/models"
import {CustomStyle} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {RScriptDetailView} from "./r-script-detail-view"

export interface Props {
  readonly t: LucaTFunction
  readonly rScript: RScript
  readonly isUpdateLoading: boolean
  readonly updateRScript: (update: RScriptUpdate) => Promise<unknown>
  readonly deleteRScript: () => void
  readonly archiveRScript: () => void
}

export type RScriptForm = Pick<RScriptUpdate, "gitCommitHash" | "version">

export const RScriptDetailViewContainer: React.FC<Props & CustomStyle> = ({
  archiveRScript,
  deleteRScript,
  isUpdateLoading,
  rScript,
  t,
  updateRScript,
  customStyles
}) => {
  const formMethods = useForm<RScriptForm>({
    mode: "onBlur"
  })

  React.useEffect(() => {
    formMethods.reset({version: rScript.version, gitCommitHash: rScript.gitCommitHash})
  }, [rScript])

  return (
    <RScriptDetailView
      deleteRScript={deleteRScript}
      updateRScript={updateRScript}
      archiveRScript={archiveRScript}
      formMethods={formMethods}
      t={t}
      rScript={rScript}
      isUpdateLoading={isUpdateLoading}
      customStyles={customStyles}
    />
  )
}
