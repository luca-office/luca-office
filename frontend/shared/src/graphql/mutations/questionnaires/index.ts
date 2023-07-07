import * as archiveQuestionnaire from "./archive-questionnaire.graphql"
import * as createFreetextCodingCriterion from "./create-freetext-question-coding-criterion.graphql"
import * as createQuestionnaire from "./create-questionnaire.graphql"
import * as createQuestionnaireAnswer from "./create-questionnaire-answer.graphql"
import * as createQuestionnaireQuestion from "./create-questionnaire-question.graphql"
import * as deleteFreetextCodingCriterion from "./delete-freetext-question-coding-criterion.graphql"
import * as deleteQuestionnaire from "./delete-questionnaire.graphql"
import * as deleteQuestionnaireAnswer from "./delete-questionnaire-answer.graphql"
import * as deleteQuestionnaireQuestion from "./delete-questionnaire-question.graphql"
import * as duplicateQuestionnaire from "./duplicate-questionnaire.graphql"
import * as finalizeQuestionnaire from "./finalize-questionnaire.graphql"
import * as publishQuestionnaire from "./publish-questionnaire.graphql"
import * as repositionQuestionnaireAnswer from "./reposition-questionnaire-answer.graphql"
import * as repositionQuestionnaireQuestion from "./reposition-questionnaire-question.graphql"
import * as updateFreetextCodingCriterion from "./update-freetext-question-coding-criterion.graphql"
import * as updateQuestionnaire from "./update-questionnaire.graphql"
import * as updateQuestionnaireAnswer from "./update-questionnaire-answer.graphql"
import * as updateQuestionnaireQuestion from "./update-questionnaire-question.graphql"

export const publishQuestionnaireMutation = publishQuestionnaire
export const archiveQuestionnaireMutation = archiveQuestionnaire
export const createQuestionnaireMutation = createQuestionnaire
export const createQuestionnaireQuestionMutation = createQuestionnaireQuestion
export const deleteQuestionnaireMutation = deleteQuestionnaire
export const deleteQuestionnaireQuestionMutation = deleteQuestionnaireQuestion
export const finalizeQuestionnaireMutation = finalizeQuestionnaire
export const repositionQuestionnaireAnswerMutation = repositionQuestionnaireAnswer
export const repositionQuestionnaireQuestionMutation = repositionQuestionnaireQuestion
export const updateQuestionnaireMutation = updateQuestionnaire
export const duplicateQuestionnaireMutation = duplicateQuestionnaire
export const updateQuestionnaireQuestionMutation = updateQuestionnaireQuestion
export const createQuestionnaireAnswerMutation = createQuestionnaireAnswer
export const deleteQuestionnaireAnswerMutation = deleteQuestionnaireAnswer
export const updateQuestionnaireAnswerMutation = updateQuestionnaireAnswer
export const createFreetextCodingCriterionMutation = createFreetextCodingCriterion
export const deleteFreetextCodingCriterionMutation = deleteFreetextCodingCriterion
export const updateFreetextCodingCriterionMutation = updateFreetextCodingCriterion
