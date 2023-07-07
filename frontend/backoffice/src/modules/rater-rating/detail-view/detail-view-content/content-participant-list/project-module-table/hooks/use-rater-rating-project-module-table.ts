import {ColumnProps} from "shared/components"
import {CodingDimension} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {getRaterRatingProjectModuleColumns} from "../../../../../config/project-module-table.config"
import {RatingProjectModule} from "../../../../../models"

export interface UseRaterRatingProjectModuleTableHook {
  readonly columns: ColumnProps<RatingProjectModule>[]
}

export interface UseRaterRatingProjectModuleTableParams {
  readonly fullyRatedParticipantCount: number
  readonly codingDimensions: CodingDimension[]
}

export const useRaterRatingProjectModuleTable = ({
  fullyRatedParticipantCount,
  codingDimensions
}: UseRaterRatingProjectModuleTableParams): UseRaterRatingProjectModuleTableHook => {
  const {t} = useLucaTranslation()

  const columns: ColumnProps<RatingProjectModule>[] = getRaterRatingProjectModuleColumns(
    t,
    codingDimensions,
    fullyRatedParticipantCount
  )

  return {columns}
}
