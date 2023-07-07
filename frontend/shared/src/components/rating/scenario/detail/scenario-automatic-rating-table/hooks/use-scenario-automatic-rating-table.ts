import {differenceBy, isEqual} from "lodash-es"
import * as React from "react"
import {QuestionScoringType} from "../../../../../../graphql/generated/globalTypes"
import {
  useCreateScenarioRatingCriterionSelection,
  useDeleteScenarioRatingCriterionSelection,
  useEvaluationResultsForAutomatedCodingItemLazy,
  useUpdateScenarioCodingItemRating
} from "../../../../../../graphql/hooks"
import {
  AutomatedCodingCriterion,
  AutomatedCodingCriterionEvaluationResult,
  CodingItem,
  Scenario,
  ScenarioCodingItemRating
} from "../../../../../../models"
import {every, exists, isDefined, Option} from "../../../../../../utils"
import {RatingCodingCriterion, ScenarioCriterionSelection} from "../../../../models"
import {WAIT_INTERVAL} from "../../config"
import {
  getAutomatedCriterionSelection,
  getCriterionSelections,
  haveAutomatedCriterionSelectionsChanged as checkHaveCriterionSelectionsChanged
} from "../../utils"

export interface UseScenarioAutomaticRatingTableHook {
  readonly actionLoading: boolean
  readonly updateCriterionSelection: (codingCriterion: RatingCodingCriterion, selected: boolean) => void
  readonly applyRatingChanges: () => Promise<void>
  readonly isSelected: (codingCriterion: RatingCodingCriterion) => boolean
  readonly hasRatingChanged: boolean
  readonly dataLoading: boolean
  readonly isComputerRaterSelection: (criterion: RatingCodingCriterion) => boolean
  readonly setNoCriterionFulfilled: () => void
  readonly noCriterionFulfilled: boolean
  readonly wasNoCriterionFulfilledByComputerRater: boolean
}

export interface UseScenarioAutomaticRatingTableParams {
  readonly scenarioCodingItemRating: Option<ScenarioCodingItemRating>
  readonly scoringType: QuestionScoringType
  readonly codingItem?: CodingItem
  readonly surveyInvitationId?: UUID
  readonly scenario: Scenario
  readonly codingCriteria: AutomatedCodingCriterion[]
  readonly ratingId: Option<UUID>
}

export const useScenarioAutomaticRatingTable = ({
  scenarioCodingItemRating,
  scoringType,
  codingItem,
  surveyInvitationId,
  scenario,
  codingCriteria,
  ratingId: ratingIdOption
}: UseScenarioAutomaticRatingTableParams): UseScenarioAutomaticRatingTableHook => {
  const isMounted = React.useRef(false)
  const createCriterionSelectionTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const deleteCriterionSelectionTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const updateScenarioRatingTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const scenarioCodingItemRatingRef = React.useRef<ScenarioCodingItemRating | null>(null)
  const codingItemRef = React.useRef<CodingItem>()
  const codingCriteriaRef = React.useRef<AutomatedCodingCriterion[]>()
  const evaluationResultsForAutomatedCodingItemRef = React.useRef<AutomatedCodingCriterionEvaluationResult[]>()

  if (!isEqual(scenarioCodingItemRatingRef.current, scenarioCodingItemRating.orNull())) {
    scenarioCodingItemRatingRef.current = scenarioCodingItemRating.orNull()
  }

  if (!isEqual(codingItemRef.current, codingItem)) {
    codingItemRef.current = codingItem
  }

  if (!isEqual(codingCriteriaRef.current, codingCriteria)) {
    codingCriteriaRef.current = codingCriteria
  }

  const [createCriterionSelectionLoading, setCreateCriterionSelectionLoading] = React.useState(false)
  const [deleteCriterionSelectionLoading, setDeleteCriterionSelectionLoading] = React.useState(false)
  const [updateCodingItemLoading, setUpdateCodingItemLoading] = React.useState(false)
  const [criterionSelections, setCriterionSelections] = React.useState<ScenarioCriterionSelection[]>([])
  const [noCriterionFulfilled, setNoCriterionFulfilled] = React.useState(
    scenarioCodingItemRating.map(codingItemRating => codingItemRating.noCriterionFulfilled).getOrElse(false)
  )

  const {createScenarioRatingCriterionSelection: createCriterionSelection} = useCreateScenarioRatingCriterionSelection()
  const {deleteScenarioRatingCriterionSelection: deleteCriterionSelection} = useDeleteScenarioRatingCriterionSelection()
  const {
    evaluationResultsForAutomatedCodingItem,
    evaluationResultsForAutomatedCodingItemLoading,
    getEvaluationResultsForAutomatedCodingItem
  } = useEvaluationResultsForAutomatedCodingItemLazy()
  const {updateScenarioCodingItemRating} = useUpdateScenarioCodingItemRating()

  if (!isEqual(evaluationResultsForAutomatedCodingItemRef.current, evaluationResultsForAutomatedCodingItem)) {
    evaluationResultsForAutomatedCodingItemRef.current = evaluationResultsForAutomatedCodingItem
  }

  const haveCriterionSelectionsChanged = React.useMemo(
    () => checkHaveCriterionSelectionsChanged(scenarioCodingItemRating, criterionSelections),
    [scenarioCodingItemRatingRef.current, criterionSelections]
  )
  const hasNoCriterionFulfilledChanged =
    scenarioCodingItemRatingRef.current?.noCriterionFulfilled !== noCriterionFulfilled
  const hasRatingChanged = haveCriterionSelectionsChanged || hasNoCriterionFulfilledChanged

  const wasNoCriterionFulfilledByComputerRater = every(
    ({isFulfilled}) => !isFulfilled,
    evaluationResultsForAutomatedCodingItem
  )

  const isComputerRaterSelection = (codingCriterion: RatingCodingCriterion) =>
    codingItem !== undefined &&
    exists(
      ({criterionId, isFulfilled}) => codingCriterion.id === criterionId && isFulfilled,
      evaluationResultsForAutomatedCodingItem
    )

  const isSelected = (codingCriterion: RatingCodingCriterion) =>
    exists(criterionSelection => criterionSelection.automatedCriterionId === codingCriterion.id, criterionSelections)

  const markCreateCriterionSelectionAsNoLongerLoading = () => {
    if (createCriterionSelectionTimer.current) {
      clearTimeout(createCriterionSelectionTimer.current)
    }
    createCriterionSelectionTimer.current = setTimeout(
      () => isMounted.current && setCreateCriterionSelectionLoading(false),
      WAIT_INTERVAL
    )
  }
  const markDeleteCriterionSelectionAsNoLongerLoading = () => {
    if (deleteCriterionSelectionTimer.current) {
      clearTimeout(deleteCriterionSelectionTimer.current)
    }
    deleteCriterionSelectionTimer.current = setTimeout(
      () => isMounted.current && setDeleteCriterionSelectionLoading(false),
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

  const updateCriterionSelection = (codingCriterion: RatingCodingCriterion, selected: boolean) => {
    const criterionSelection = getAutomatedCriterionSelection(
      criterionSelections,
      codingCriterion as AutomatedCodingCriterion
    )

    if (!selected) {
      criterionSelection.forEach(selection =>
        setCriterionSelections(
          criterionSelections.filter(
            ({automatedCriterionId}) => automatedCriterionId !== selection.automatedCriterionId
          )
        )
      )
      return
    }

    if (criterionSelection.isEmpty()) {
      scenarioCodingItemRating.forEach(({id: scenarioCodingItemRatingId}) => {
        if (scoringType === QuestionScoringType.Holistic) {
          setCriterionSelections([
            {manualCriterionId: null, automatedCriterionId: codingCriterion.id, scenarioCodingItemRatingId}
          ])
        } else {
          setCriterionSelections([
            ...criterionSelections,
            {manualCriterionId: null, automatedCriterionId: codingCriterion.id, scenarioCodingItemRatingId}
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
    new Promise<void>((resolve, reject) => {
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
          setDeleteCriterionSelectionLoading(true)
          promises.push(
            Promise.all(
              initialCriterionSelections.map(selection =>
                deleteCriterionSelection({
                  scenarioCodingItemRatingId,
                  automatedCriterionId: selection.automatedCriterionId
                })
              )
            ).then(markDeleteCriterionSelectionAsNoLongerLoading)
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

        setDeleteCriterionSelectionLoading(true)
        const deletedCriterionSelections = differenceBy(
          initialCriterionSelections,
          criterionSelections,
          selection => selection.automatedCriterionId
        )
        promises.push(
          Promise.all(
            deletedCriterionSelections.map(selection =>
              deleteCriterionSelection({
                scenarioCodingItemRatingId,
                automatedCriterionId: selection.automatedCriterionId
              })
            )
          ).then(markDeleteCriterionSelectionAsNoLongerLoading)
        )

        setCreateCriterionSelectionLoading(true)
        const createdCriterionSelections = criterionSelections.filter(
          criterionSelection => !isDefined(criterionSelection.createdAt)
        )
        promises.push(
          Promise.all(
            createdCriterionSelections.map(selection =>
              createCriterionSelection({
                scenarioCodingItemRatingId,
                automatedCriterionId: selection.automatedCriterionId
              })
            )
          ).then(markCreateCriterionSelectionAsNoLongerLoading)
        )

        Promise.all(promises)
          .then(() => resolve())
          .catch(reject)
      })
    })

  React.useEffect(() => {
    if (
      scenarioCodingItemRatingRef.current !== null &&
      codingCriteriaRef.current !== undefined &&
      codingItemRef.current !== undefined
    ) {
      const selections = getCriterionSelections(scenarioCodingItemRatingRef.current, codingCriteriaRef.current)
      const computerRaterSelections = codingCriteriaRef.current.filter(
        codingCriterion =>
          isComputerRaterSelection(codingCriterion) &&
          !exists(({automatedCriterionId}) => automatedCriterionId === codingCriterion.id, selections)
      )

      const allSelections =
        selections.length > 0
          ? selections
          : computerRaterSelections.map(codingCriterion => ({
              scenarioCodingItemRatingId: `${scenarioCodingItemRatingRef.current?.id}`,
              manualCriterionId: null,
              automatedCriterionId: codingCriterion.id
            }))
      setCriterionSelections(!scenarioCodingItemRatingRef.current?.noCriterionFulfilled ? allSelections : [])
    }
  }, [
    scenarioCodingItemRatingRef.current,
    codingCriteriaRef.current,
    evaluationResultsForAutomatedCodingItemRef.current,
    codingItemRef.current
  ])

  React.useEffect(() => {
    setNoCriterionFulfilled(scenarioCodingItemRatingRef.current?.noCriterionFulfilled ?? false)
  }, [scenarioCodingItemRatingRef.current])

  React.useEffect(() => {
    if (codingItem !== undefined && surveyInvitationId !== undefined) {
      getEvaluationResultsForAutomatedCodingItem({
        codingItemId: codingItem.id,
        surveyInvitationId,
        scenarioId: scenario.id
      })
    }
  }, [codingItem, surveyInvitationId, scenario])

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    actionLoading: createCriterionSelectionLoading || deleteCriterionSelectionLoading || updateCodingItemLoading,
    updateCriterionSelection,
    applyRatingChanges,
    isSelected,
    hasRatingChanged,
    dataLoading: evaluationResultsForAutomatedCodingItemLoading,
    isComputerRaterSelection,
    setNoCriterionFulfilled: handleSetNoCriterionFulfilled,
    noCriterionFulfilled,
    wasNoCriterionFulfilledByComputerRater
  }
}
