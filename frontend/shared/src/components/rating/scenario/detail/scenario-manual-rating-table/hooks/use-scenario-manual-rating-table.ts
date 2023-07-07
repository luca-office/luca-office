import {differenceBy, isEqual} from "lodash-es"
import * as React from "react"
import {QuestionScoringType} from "../../../../../../graphql/generated/globalTypes"
import {
  useCreateScenarioRatingCriterionSelection,
  useDeleteScenarioRatingCriterionSelection,
  useUpdateScenarioCodingItemRating
} from "../../../../../../graphql/hooks"
import {CodingCriterion, ScenarioCodingItemRating} from "../../../../../../models"
import {exists, isDefined, Option} from "../../../../../../utils"
import {RatingCodingCriterion, ScenarioCriterionSelection} from "../../../../models"
import {WAIT_INTERVAL} from "../../config"
import {
  getCriterionSelections,
  getManualCriterionSelection,
  haveManualCriterionSelectionsChanged as checkHaveCriterionSelectionsChanged
} from "../../utils"

export interface UseScenarioManualRatingTableHook {
  readonly actionLoading: boolean
  readonly noCriterionFulfilled: boolean
  readonly isSelected: (codingCriterion: RatingCodingCriterion) => boolean
  readonly updateCriterionSelection: (codingCriterion: RatingCodingCriterion, selected: boolean) => void
  readonly setNoCriterionFulfilled: () => void
  readonly hasRatingChanged: boolean
  readonly applyRatingChanges: () => Promise<void>
}

interface UseScenarioManualRatingTableParams {
  readonly scenarioCodingItemRating: Option<ScenarioCodingItemRating>
  readonly scoringType: QuestionScoringType
  readonly codingCriteria: CodingCriterion[]
  readonly ratingId: Option<UUID>
}

export const useScenarioManualRatingTable = ({
  scenarioCodingItemRating,
  scoringType,
  codingCriteria,
  ratingId: ratingIdOption
}: UseScenarioManualRatingTableParams): UseScenarioManualRatingTableHook => {
  const createScenarioRatingCriterionSelectionTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const deleteScenarioRatingCriterionSelectionTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const updateScenarioRatingTimer = React.useRef<ReturnType<typeof setTimeout>>()

  const isMounted = React.useRef(false)

  const scenarioCodingItemRatingRef = React.useRef<ScenarioCodingItemRating | null>(null)
  const codingCriteriaRef = React.useRef<CodingCriterion[]>([])

  if (!isEqual(scenarioCodingItemRatingRef.current, scenarioCodingItemRating.orNull())) {
    scenarioCodingItemRatingRef.current = scenarioCodingItemRating.orNull()
  }

  if (!isEqual(codingCriteriaRef.current, codingCriteria)) {
    codingCriteriaRef.current = codingCriteria
  }

  const [
    createScenarioRatingCriterionSelectionLoading,
    setCreateScenarioRatingCriterionSelectionLoading
  ] = React.useState(false)
  const [
    deleteScenarioRatingCriterionSelectionLoading,
    setDeleteScenarioRatingCriterionSelectionLoading
  ] = React.useState(false)
  const [updateCodingItemLoading, setUpdateCodingItemLoading] = React.useState(false)

  const [criterionSelections, setCriterionSelections] = React.useState<ScenarioCriterionSelection[]>([])
  const [noCriterionFulfilled, setNoCriterionFulfilled] = React.useState<boolean>(
    scenarioCodingItemRating.map(codingItemRating => codingItemRating.noCriterionFulfilled).getOrElse(false)
  )

  const {updateScenarioCodingItemRating} = useUpdateScenarioCodingItemRating()
  const {createScenarioRatingCriterionSelection} = useCreateScenarioRatingCriterionSelection()
  const {deleteScenarioRatingCriterionSelection} = useDeleteScenarioRatingCriterionSelection()

  const haveCriterionSelectionsChanged = React.useMemo(
    () => checkHaveCriterionSelectionsChanged(scenarioCodingItemRating, criterionSelections),
    [scenarioCodingItemRatingRef.current, criterionSelections]
  )

  const hasNoCriterionFulfilledChanged =
    scenarioCodingItemRatingRef.current?.noCriterionFulfilled !== noCriterionFulfilled
  const hasRatingChanged = haveCriterionSelectionsChanged || hasNoCriterionFulfilledChanged

  const markCreateScenarioRatingCriterionSelectionAsNoLongerLoading = () => {
    if (createScenarioRatingCriterionSelectionTimer.current) {
      clearTimeout(createScenarioRatingCriterionSelectionTimer.current)
    }
    createScenarioRatingCriterionSelectionTimer.current = setTimeout(
      () => isMounted.current && setCreateScenarioRatingCriterionSelectionLoading(false),
      WAIT_INTERVAL
    )
  }
  const markDeleteScenarioRatingCriterionSelectionAsNoLongerLoading = () => {
    if (deleteScenarioRatingCriterionSelectionTimer.current) {
      clearTimeout(deleteScenarioRatingCriterionSelectionTimer.current)
    }
    deleteScenarioRatingCriterionSelectionTimer.current = setTimeout(
      () => isMounted.current && setDeleteScenarioRatingCriterionSelectionLoading(false),
      WAIT_INTERVAL
    )
  }
  const markUpdateCodingItemAsNoLongerLoading = () => {
    if (updateScenarioRatingTimer.current) {
      clearTimeout(updateScenarioRatingTimer.current)
    }
    updateScenarioRatingTimer.current = setTimeout(
      () => isMounted.current && setUpdateCodingItemLoading(false),
      WAIT_INTERVAL
    )
  }

  const isSelected = (codingCriterion: RatingCodingCriterion) =>
    exists(criterionSelection => criterionSelection.manualCriterionId === codingCriterion.id, criterionSelections)

  const updateCriterionSelection = (codingCriterion: RatingCodingCriterion, selected: boolean) => {
    const criterionSelection = getManualCriterionSelection(criterionSelections, codingCriterion as CodingCriterion)

    if (!selected) {
      criterionSelection.forEach(selection =>
        setCriterionSelections(
          criterionSelections.filter(({manualCriterionId}) => manualCriterionId !== selection.manualCriterionId)
        )
      )
      return
    }

    if (criterionSelection.isEmpty()) {
      scenarioCodingItemRating.forEach(({id: scenarioCodingItemRatingId}) => {
        if (scoringType === QuestionScoringType.Holistic) {
          setCriterionSelections([
            {automatedCriterionId: null, manualCriterionId: codingCriterion.id, scenarioCodingItemRatingId}
          ])
        } else {
          setCriterionSelections([
            ...criterionSelections,
            {automatedCriterionId: null, manualCriterionId: codingCriterion.id, scenarioCodingItemRatingId}
          ])
        }
      })
    }

    setNoCriterionFulfilled(false)
  }

  const handleSetNoCriterionFulfilled = () => {
    setCriterionSelections([])
    setNoCriterionFulfilled(true)
  }

  const applyRatingChanges = () =>
    new Promise<void>((resolve, reject) =>
      scenarioCodingItemRating.forEach(({id: scenarioCodingItemRatingId}) => {
        const promises: Promise<void>[] = []

        if (hasNoCriterionFulfilledChanged) {
          ratingIdOption.forEach(ratingId => {
            setUpdateCodingItemLoading(true)
            promises.push(
              updateScenarioCodingItemRating({
                ratingId,
                scenarioCodingItemRatingId,
                update: {noCriterionFulfilled}
              }).then(markUpdateCodingItemAsNoLongerLoading)
            )
          })
        }

        const initialCriterionSelections = scenarioCodingItemRating
          .map(rating => getCriterionSelections(rating, codingCriteria))
          .getOrElse([])

        if (noCriterionFulfilled) {
          setDeleteScenarioRatingCriterionSelectionLoading(true)
          promises.push(
            Promise.all(
              initialCriterionSelections.map(selection =>
                deleteScenarioRatingCriterionSelection({
                  scenarioCodingItemRatingId,
                  manualCriterionId: selection.manualCriterionId
                })
              )
            ).then(markDeleteScenarioRatingCriterionSelectionAsNoLongerLoading)
          )

          Promise.all(promises)
            .then(() => resolve())
            .catch(reject)
          return
        }

        if (!haveCriterionSelectionsChanged) {
          Promise.all(promises)
            .then(() => resolve())
            .catch(reject)
          return
        }

        setDeleteScenarioRatingCriterionSelectionLoading(true)
        const deletedCriterionSelections = differenceBy(
          initialCriterionSelections,
          criterionSelections,
          selection => selection.manualCriterionId
        )
        promises.push(
          Promise.all(
            deletedCriterionSelections.map(selection =>
              deleteScenarioRatingCriterionSelection({
                scenarioCodingItemRatingId,
                manualCriterionId: selection.manualCriterionId
              })
            )
          ).then(markDeleteScenarioRatingCriterionSelectionAsNoLongerLoading)
        )

        setCreateScenarioRatingCriterionSelectionLoading(true)
        const createdCriterionSelections = criterionSelections.filter(
          criterionSelection => !isDefined(criterionSelection.createdAt)
        )
        promises.push(
          Promise.all(
            createdCriterionSelections.map(selection =>
              createScenarioRatingCriterionSelection({
                scenarioCodingItemRatingId,
                manualCriterionId: selection.manualCriterionId
              })
            )
          ).then(markCreateScenarioRatingCriterionSelectionAsNoLongerLoading)
        )

        Promise.all(promises)
          .then(() => resolve())
          .catch(reject)
      })
    )

  React.useEffect(() => {
    if (scenarioCodingItemRatingRef.current) {
      setCriterionSelections(getCriterionSelections(scenarioCodingItemRatingRef.current, codingCriteriaRef.current))
    }
  }, [scenarioCodingItemRatingRef.current, codingCriteriaRef.current])

  React.useEffect(() => {
    setNoCriterionFulfilled(scenarioCodingItemRatingRef.current?.noCriterionFulfilled ?? false)
  }, [scenarioCodingItemRatingRef.current])

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    actionLoading:
      createScenarioRatingCriterionSelectionLoading ||
      deleteScenarioRatingCriterionSelectionLoading ||
      updateCodingItemLoading,
    noCriterionFulfilled,
    isSelected,
    updateCriterionSelection,
    setNoCriterionFulfilled: handleSetNoCriterionFulfilled,
    hasRatingChanged,
    applyRatingChanges
  }
}
