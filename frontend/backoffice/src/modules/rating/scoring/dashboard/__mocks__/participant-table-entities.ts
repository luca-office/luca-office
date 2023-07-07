import {ParticipantTableEntity} from "../scoring-dashboard-table/scoring-dashboard-table"

export const mockParticipantTableEntities: ParticipantTableEntity[] = [
  {
    id: "1",
    isFinalScore: false,
    isRatingCompleted: false,
    isRatingOfMainRater: false,
    name: "name 1",
    index: 1,
    ratingCounts: {ratableProjectModulesCount: 12, finalRatedProjectModulesCount: 6},
    isRatingOfAllModulesPossible: true,
    isRatingOfSomeModulePossible: true
  },
  {
    id: "2",
    isFinalScore: false,
    isRatingCompleted: false,
    isRatingOfMainRater: false,
    name: "name 3",
    index: 2,
    ratingCounts: {ratableProjectModulesCount: 12, finalRatedProjectModulesCount: 6},
    isRatingOfAllModulesPossible: true,
    isRatingOfSomeModulePossible: true
  },
  {
    id: "3",
    isFinalScore: false,
    isRatingCompleted: false,
    isRatingOfMainRater: false,
    name: "name 3",
    index: 3,
    ratingCounts: {ratableProjectModulesCount: 12, finalRatedProjectModulesCount: 6},
    isRatingOfAllModulesPossible: true,
    isRatingOfSomeModulePossible: true
  }
]
