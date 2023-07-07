import {Intervention, RuntimeSurveyAnswerSelectionIntervention} from "shared/models"

export const isRuntimeSurveyIntervention = (
  intervention: Intervention
): intervention is RuntimeSurveyAnswerSelectionIntervention =>
  intervention.__typename === "RuntimeSurveyAnswerSelectionIntervention"

export const doesNotContainEmptyValues = (value: string) => value.split(";").every(value => value.trim() !== "")
