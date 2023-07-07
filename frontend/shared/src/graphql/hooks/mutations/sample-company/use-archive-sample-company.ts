import {useMutation} from "@apollo/client"
import {ArchiveEntityHook, SampleCompany} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  ArchiveSampleCompanyMutation,
  ArchiveSampleCompanyMutation_archiveSampleCompany as ArchivedSampleCompany,
  ArchiveSampleCompanyMutationVariables
} from "../../../generated/ArchiveSampleCompanyMutation"
import {GetSampleCompaniesQuery} from "../../../generated/GetSampleCompaniesQuery"
import {archiveSampleCompanyMutation} from "../../../mutations"
import {sampleCompaniesQuery} from "../../../queries"

export const useArchiveSampleCompany = (): ArchiveEntityHook => {
  const [archiveSampleCompanyHook, {loading}] = useMutation<
    ArchiveSampleCompanyMutation,
    ArchiveSampleCompanyMutationVariables
  >(archiveSampleCompanyMutation)

  return {
    archiveEntity: (id: UUID) =>
      new Promise<Option<ArchivedSampleCompany>>((resolve, reject) => {
        archiveSampleCompanyHook({
          variables: {id},
          update: deleteEntityFromCache<
            GetSampleCompaniesQuery,
            ArchiveSampleCompanyMutation,
            undefined,
            SampleCompany
          >(sampleCompaniesQuery, "sampleCompanies", sampleCompanies => sampleCompanies.id !== id)
        })
          .then(result => resolve(Option.of<ArchivedSampleCompany>(result.data?.archiveSampleCompany)))
          .catch(reject)
      }),
    archiveEntityLoading: loading
  }
}
