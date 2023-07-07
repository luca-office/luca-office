import {useQuery} from "@apollo/client"
import {ReferenceBookChapter} from "../../../../models"
import {Option} from "../../../../utils"
import {
  ReferenceBookChapterQuery,
  ReferenceBookChapterQueryVariables
} from "../../../generated/ReferenceBookChapterQuery"
import {referenceBookChapterQuery} from "../../../queries"

export interface ReferenceBookProps {
  readonly referenceBookChapter: Option<ReferenceBookChapter>
  readonly referenceBookLoading: boolean
}

export const useReferenceBookChapter = (referenceBookChapterId: UUID): ReferenceBookProps => {
  const {data, loading} = useQuery<ReferenceBookChapterQuery, ReferenceBookChapterQueryVariables>(
    referenceBookChapterQuery,
    {
      variables: {id: referenceBookChapterId}
    }
  )

  return {
    referenceBookChapter: data?.referenceBookChapter
      ? Option.of<ReferenceBookChapter>(data?.referenceBookChapter)
      : Option.none(),
    referenceBookLoading: loading
  }
}
