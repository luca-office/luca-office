import {flatten, range} from "lodash-es"
import {
  checkLoginMock,
  codingCriteriaMock,
  codingDimensionsMock,
  codingItemMock,
  codingModelsMock,
  evaluationResultsForAutomatedCodingItemsMock,
  freetextQuestionRatingsMock,
  projectModulesMock,
  projectModulesMockWithQuestionnaire,
  projectsMock,
  ratingsMock,
  scenarioCodingAutomatedCriteriaMock,
  scenarioCodingItemRatingMock,
  scenarioManualCodingItemRatingsMock,
  surveyIdMock,
  surveyInvitationsMock,
  surveysMock,
  userAccountsMock
} from "../../src/graphql/__mocks__"
import {QuestionScoringType, QuestionType} from "../../src/graphql/generated/globalTypes"
import {
  createFreetextQuestionRatingMutation,
  createScenarioCodingItemRatingMutation,
  createScenarioRatingCriterionSelectionMutation,
  deleteScenarioRatingCriterionSelectionMutation,
  updateScenarioCodingItemRatingMutation
} from "../../src/graphql/mutations"
import {
  automatedCodingCriteriaQuery,
  checkLoginQuery,
  codingCriteriaQuery,
  codingDimensionsQuery,
  evaluationResultsForAutomatedCodingItemQuery,
  freeTextAnswerForParticipantQuery,
  freetextQuestionRatingsQuery,
  projectModulesQuery,
  projectQuery,
  questionnaireQuery,
  ratingsQuery,
  scenarioCodingItemRatingsQuery,
  selectedAnswersForParticipantQuery,
  surveyInvitationsProgressQuery,
  surveyInvitationsQuery,
  surveyQuery,
  surveyUserAccountsQuery
} from "../../src/graphql/queries"
import {scenarioIdMock} from "../../tests/__mocks__"
import {MockedResponse} from "@apollo/client/testing"

const reportingDefaultScoringMockedResponse: MockedResponse[] = [
  {
    request: {
      query: surveyInvitationsQuery,
      variables: {surveyId: surveyIdMock}
    },
    result: {
      data: {
        surveyInvitations: surveyInvitationsMock
      }
    }
  },
  {
    request: {
      query: surveyQuery,
      variables: {id: surveyIdMock}
    },
    result: {
      data: {
        survey: {...surveysMock[0], id: surveyIdMock}
      }
    }
  },
  {
    request: {
      query: checkLoginQuery
    },
    result: {
      data: {
        checkLogin: checkLoginMock
      }
    }
  },
  {
    request: {
      query: ratingsQuery,
      variables: {surveyId: surveyIdMock}
    },
    result: {
      data: {
        ratings: ratingsMock
      }
    }
  }
]

export const reportingScenarioScoringMockedResponse: MockedResponse[] = [
  ...reportingDefaultScoringMockedResponse,
  ...projectsMock.map(({id: projectId}) => ({
    request: {
      query: projectModulesQuery,
      variables: {projectId}
    },
    result: {
      data: {
        projectModules: projectModulesMock.map(mock => ({...mock, projectId}))
      }
    }
  })),
  {
    request: {
      query: projectQuery,
      variables: {id: projectModulesMock[0].projectId}
    },
    result: {
      data: {
        project: projectsMock[0]
      }
    }
  },
  {
    request: {
      query: surveyInvitationsProgressQuery,
      variables: {surveyId: surveyIdMock}
    },
    result: {
      data: {
        surveyInvitations: surveyInvitationsMock
      }
    }
  },
  ...codingModelsMock.map(({id: modelId}) => ({
    request: {
      query: codingDimensionsQuery,
      variables: {modelId}
    },
    result: {
      data: {
        codingDimensions: codingDimensionsMock.map(mock => ({...mock, codingModelId: modelId}))
      }
    }
  })),
  ...flatten(codingDimensionsMock.map(codingDimensionMock => codingDimensionMock.items)).reduce(
    (accumulator, codingItem) => {
      return [
        ...accumulator,
        {
          request: {
            query: automatedCodingCriteriaQuery,
            variables: {itemId: codingItem.id}
          },
          result: {
            data: {
              scenarioCodingAutomatedCriteria: scenarioCodingAutomatedCriteriaMock.map(mock => ({
                ...mock,
                itemId: codingItem.id
              }))
            }
          }
        },
        {
          request: {
            query: codingCriteriaQuery,
            variables: {itemId: codingItem.id}
          },
          result: {
            data: {
              codingCriteria: codingCriteriaMock.map(mock => ({
                ...mock,
                itemId: codingItem.id
              }))
            }
          }
        },
        {
          request: {
            query: automatedCodingCriteriaQuery,
            variables: {itemId: codingItem.id}
          },
          result: {
            data: {
              scenarioCodingAutomatedCriteria: scenarioCodingAutomatedCriteriaMock.map(mock => ({
                ...mock,
                itemId: codingItem.id
              }))
            }
          }
        },
        {
          request: {
            query: evaluationResultsForAutomatedCodingItemQuery,
            variables: {
              id: codingItem.id,
              surveyInvitationId: surveyInvitationsMock[0].id,
              scenarioId: scenarioIdMock
            }
          },
          result: {
            data: {
              evaluationResultsForAutomatedCodingItem: evaluationResultsForAutomatedCodingItemsMock
            }
          }
        }
      ]
    },
    [] as MockedResponse[]
  ),
  ...ratingsMock.reduce(
    (accumulator, rating) => [
      ...accumulator,
      {
        request: {
          query: scenarioCodingItemRatingsQuery,
          variables: {ratingId: rating.id}
        },
        result: {
          data: {
            scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock.map(mock => ({
              ...mock,
              ratingId: rating.id
            }))
          }
        }
      },
      {
        request: {
          query: createScenarioCodingItemRatingMutation,
          variables: {
            creation: {
              ratingId: rating.id,
              surveyInvitationId: surveyInvitationsMock[0].id,
              codingItemId: codingItemMock.id
            }
          }
        },
        result: {
          data: {
            createScenarioCodingItemRating: {
              ...scenarioManualCodingItemRatingsMock,
              ratingId: rating.id,
              surveyInvitationId: surveyInvitationsMock[0].id,
              codingItemId: codingItemMock.id
            }
          }
        }
      }
    ],
    [] as MockedResponse[]
  ),
  {
    request: {
      query: createScenarioRatingCriterionSelectionMutation,
      variables: {
        creation: {
          scenarioCodingItemRatingId: ratingsMock[0].id,
          manualCriterionId: codingCriteriaMock[0].id,
          automatedCriterionId: null
        }
      }
    },
    result: {
      data: {
        createScenarioRatingCriterionSelection: {
          __typename: "ScenarioRatingCriterionSelection",
          createdAt: new Date(2020, 10, 5).toISOString(),
          manualCriterionId: codingCriteriaMock[0].id,
          automatedCriterionId: null,
          scenarioCodingItemRatingId: ratingsMock[0].id
        }
      }
    }
  },
  {
    request: {
      query: deleteScenarioRatingCriterionSelectionMutation,
      variables: {
        scenarioCodingItemRatingId: ratingsMock[0].id,
        manualCriterionId: codingCriteriaMock[0].id,
        automatedCriterionId: null
      }
    },
    result: {
      data: {
        deleteScenarioRatingCriterionSelection: {
          __typename: "ScenarioRatingCriterionSelection",
          createdAt: new Date(2020, 10, 5).toISOString(),
          manualCriterionId: codingCriteriaMock[0].id,
          automatedCriterionId: null,
          scenarioCodingItemRatingId: ratingsMock[0].id
        }
      }
    }
  },
  {
    request: {
      query: updateScenarioCodingItemRatingMutation,
      variables: {
        id: scenarioCodingItemRatingMock.id,
        update: {noCriterionFulfilled: scenarioCodingItemRatingMock.noCriterionFulfilled}
      }
    },
    result: {
      data: {
        updateScenarioCodingItemRating: scenarioCodingItemRatingMock
      }
    }
  }
]

export const reportingQuestionnaireScoringMockedResponse: MockedResponse[] = [
  ...reportingDefaultScoringMockedResponse,
  ...projectsMock.map(({id: projectId}) => ({
    request: {
      query: projectModulesQuery,
      variables: {projectId}
    },
    result: {
      data: {
        projectModules: projectModulesMockWithQuestionnaire.map(mock => ({...mock, projectId}))
      }
    }
  })),
  {
    request: {
      query: projectQuery,
      variables: {id: projectModulesMockWithQuestionnaire[3].projectId}
    },
    result: {
      data: {
        project: projectsMock[0]
      }
    }
  },
  {
    request: {
      query: questionnaireQuery,
      variables: {id: projectModulesMockWithQuestionnaire[3].questionnaireId}
    },
    result: {
      data: {
        questionnaire: {
          ...projectModulesMockWithQuestionnaire[3].questionnaire,
          questions: projectModulesMockWithQuestionnaire[3].questionnaire?.questions.map(question => ({
            ...question,
            scoringType:
              question.questionType === QuestionType.SingleChoice ||
              question.questionType === QuestionType.MultipleChoice
                ? QuestionScoringType.Analytical
                : QuestionScoringType.Holistic
          }))
        }
      }
    }
  },
  ...surveyInvitationsMock.reduce(
    (accumulator, surveyInvitation) => [
      ...accumulator,
      ...flatten(range(2).map(() => projectModulesMockWithQuestionnaire[3].questionnaire?.questions ?? [])).map(
        question => ({
          request: {
            query: selectedAnswersForParticipantQuery,
            variables: {questionId: question.id, surveyInvitationId: surveyInvitation.id}
          },
          result: {
            data: {
              selectedAnswersForParticipant: [
                ...(question.answers[0] !== undefined ? [question.answers[0].id] : []),
                ...(question.answers[1] !== undefined ? [question.answers[1].id] : [])
              ]
            }
          }
        })
      )
    ],
    [] as MockedResponse[]
  ),
  {
    request: {
      query: surveyUserAccountsQuery,
      variables: {surveyId: surveyIdMock}
    },
    result: {
      data: {
        userAccountsForSurvey: userAccountsMock
      }
    }
  },
  ...surveyInvitationsMock.reduce(
    (accumulator, surveyInvitation) => [
      ...accumulator,
      ...(projectModulesMockWithQuestionnaire[3].questionnaire?.questions ?? []).map(question => ({
        request: {
          query: freeTextAnswerForParticipantQuery,
          variables: {questionId: question.id, surveyInvitationId: surveyInvitation.id}
        },
        result: {
          data: {
            freeTextAnswerForParticipant: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."
          }
        }
      }))
    ],
    [] as MockedResponse[]
  ),
  ...surveyInvitationsMock.reduce(
    (accumulator, surveyInvitation) => [
      ...accumulator,
      ...ratingsMock.reduce((ratingsAccumulator, rating) => {
        const questions = projectModulesMockWithQuestionnaire[3].questionnaire?.questions ?? []
        return [
          ...ratingsAccumulator,
          ...flatten(
            questions.map(question => [
              {
                request: {
                  query: createFreetextQuestionRatingMutation,
                  variables: {
                    creation: {
                      ratingId: rating.id,
                      questionId: question.id,
                      surveyInvitationId: surveyInvitation.id,
                      noCriterionFulfilled: false
                    }
                  }
                },
                result: {
                  data: {
                    createFreetextQuestionRating: freetextQuestionRatingsMock.map(mock => ({
                      ...mock,
                      ratingId: rating.id,
                      questionId: question.id,
                      surveyInvitationId: surveyInvitation.id
                    }))
                  }
                }
              },
              {
                request: {
                  query: freetextQuestionRatingsQuery,
                  variables: {ratingId: rating.id}
                },
                result: {
                  data: {
                    freetextQuestionRatings: freetextQuestionRatingsMock.map(mock => ({
                      ...mock,
                      ratingId: rating.id,
                      questionId: question.id,
                      surveyInvitationId: surveyInvitation.id
                    }))
                  }
                }
              }
            ])
          )
        ]
      }, [] as MockedResponse[])
    ],
    [] as MockedResponse[]
  )
]
