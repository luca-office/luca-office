import {css} from "@emotion/react"
import * as React from "react"
import {TableContainer} from "shared/components"
import {CodingDimension} from "shared/models"
import {spacingSmall} from "shared/styles"
import {RatingProjectModule} from "../../../../models"
import {useRaterRatingProjectModuleTable} from "./hooks/use-rater-rating-project-module-table"

export interface RaterRatingProjectModuleTableProps {
  readonly fullyRatedParticipantCount: number
  readonly codingDimensions: CodingDimension[]
  readonly ratingProjectModules: RatingProjectModule[]
}

export const RaterRatingProjectModuleTable: React.FC<RaterRatingProjectModuleTableProps> = ({
  fullyRatedParticipantCount,
  codingDimensions,
  ratingProjectModules
}) => {
  const {columns} = useRaterRatingProjectModuleTable({
    fullyRatedParticipantCount,
    codingDimensions
  })
  return (
    <TableContainer<RatingProjectModule>
      customHeaderRowStyles={styles.headerRow}
      entities={ratingProjectModules}
      columns={columns}
      entityKey={({id}) => id}
    />
  )
}

const styles = {
  headerRow: css({
    padding: spacingSmall
  })
}
