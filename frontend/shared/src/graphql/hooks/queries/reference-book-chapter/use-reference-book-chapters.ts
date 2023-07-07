import {useQuery} from "@apollo/client"
import {ReferenceBookChapter} from "../../../../models"
import {Option} from "../../../../utils"
import {ReferenceBookChaptersQuery} from "../../../generated/ReferenceBookChaptersQuery"
import {referenceBookChaptersQuery} from "../../../queries"

export interface UseReferenceBookChaptersHook {
  readonly referenceBookChapters: Option<ReferenceBookChapter[]>
  readonly referenceBooksLoading: boolean
}

export const useReferenceBookChapters = (): UseReferenceBookChaptersHook => {
  const {data, loading} = useQuery<ReferenceBookChaptersQuery>(referenceBookChaptersQuery)
  return {
    referenceBookChapters: data && data.referenceBookChapters ? Option.of(data.referenceBookChapters) : Option.none(),
    referenceBooksLoading: loading
  }
}
