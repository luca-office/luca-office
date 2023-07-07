export type ProjectModuleScore = {
  score: number | null
  maxScore: number | null
  questionnaireId: UUID | null
  scenarioId: UUID | null
  isScenarioScoringCompleted?: boolean
}
