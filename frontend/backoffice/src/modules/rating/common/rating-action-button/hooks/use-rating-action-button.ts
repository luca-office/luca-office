import * as React from "react"
import {useFinalizeRating, useRatings, useSurveyInvitations} from "shared/graphql/hooks"
import {every, find, isDefined} from "shared/utils"
import {useProjectModuleRating} from "../../../hooks"

export interface UseRatingActionButtonHook {
  readonly dataLoading: boolean
  readonly actionLoading: boolean
  readonly buttonDisabled: boolean
  readonly showOrly: () => void
  readonly onCancel: () => void
  readonly onConfirm: () => void
  readonly isOrlyVisible: boolean
  readonly finalRatingFinalized: boolean
}

export const useRatingActionButton = (surveyId: UUID): UseRatingActionButtonHook => {
  const [isOrlyVisible, setIsOrlyVisible] = React.useState(false)

  const {ratings: allRatings, ratingsLoading: allRatingsLoading} = useRatings(surveyId)
  const {finalizeRating, finalizeRatingLoading} = useFinalizeRating(surveyId)
  const {surveyInvitationsLoading, surveyInvitations} = useSurveyInvitations(surveyId)
  const {loading: allProjectModulesRatedDataLoading, areAllProjectModulesRated} = useProjectModuleRating(surveyId, true)

  const finalRating = find(({isFinalScore}) => isFinalScore, allRatings)

  const allParticipantsRated = surveyInvitations.length === 0 || every(areAllProjectModulesRated, surveyInvitations)
  const finalRatingFinalized = finalRating.exists(rating => isDefined(rating.finalizedAt))
  const canRatingBeFinalized = !finalRatingFinalized && allParticipantsRated

  const showOrly = () => setIsOrlyVisible(true)

  const hideOrly = () => setIsOrlyVisible(false)

  const onConfirm = () =>
    canRatingBeFinalized && finalRating.forEach(rating => finalizeRating(rating.id).then(() => hideOrly()))

  return {
    dataLoading: allRatingsLoading || allProjectModulesRatedDataLoading || surveyInvitationsLoading,
    actionLoading: finalizeRatingLoading,
    buttonDisabled: !canRatingBeFinalized,
    finalRatingFinalized,
    showOrly,
    onConfirm,
    onCancel: hideOrly,
    isOrlyVisible
  }
}
