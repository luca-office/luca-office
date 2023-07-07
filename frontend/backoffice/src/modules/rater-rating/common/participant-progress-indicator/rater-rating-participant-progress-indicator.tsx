import * as React from "react"
import {ModuleProgressIndicator} from "shared/components"
import {ProgressIndicatorStatus} from "shared/enums"
import {SurveyInvitationLight} from "shared/models"
import {find} from "shared/utils"
import {RatingProjectModule} from "../../models"

export interface RaterRatingParticipantProgressIndicatorProps {
  readonly projectModules: RatingProjectModule[]
  readonly surveyInvitation: SurveyInvitationLight
}

export const RaterRatingParticipantProgressIndicator: React.FC<RaterRatingParticipantProgressIndicatorProps> = ({
  projectModules,
  surveyInvitation
}) => {
  const projectModulesProgress = projectModules.map(module =>
    find(({participantId}) => participantId === surveyInvitation.id, module.ratingsByParticipants)
      .map(({isFullyRated, isNotRatable}) =>
        isFullyRated || isNotRatable ? ProgressIndicatorStatus.Completed : ProgressIndicatorStatus.Open
      )
      .getOrElse(ProgressIndicatorStatus.Open)
  )

  return <ModuleProgressIndicator progressEntities={projectModulesProgress} />
}
