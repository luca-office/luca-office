import {CodingDimension, CodingItem, PositionedElement} from "."
import {BinaryType, ErpType, IconName, NodeType} from "../enums"
import {
  AutomatedCodingItemRule,
  InterventionType,
  QuestionScoringType,
  QuestionType
} from "../graphql/generated/globalTypes"

export interface BaseNode extends PositionedElement {
  readonly id: string
  readonly parentId: string | null
  readonly name: string
  readonly type: NodeType
  readonly iconName?: IconName
  readonly isLocked?: boolean
  readonly isScrollable?: boolean
  readonly children?: BaseNode[]
}

export interface FileNode extends BaseNode {
  readonly type: NodeType.File
  readonly tags: string[]
  readonly binaryType: BinaryType | null
  readonly binaryFileId: UUID | null
  readonly binaryFileUrl: string | null
  readonly disabled?: boolean
}

export interface DirectoryNode extends BaseNode {
  readonly type: NodeType.Directory
  children: TreeNodeType[]
}

export type TreeNodeType = FileNode | DirectoryNode

export interface RootNode {
  readonly children: TreeNodeType[]
}

export interface InterventionNode extends BaseNode {
  readonly id: string
  readonly interventionType: InterventionType
  readonly scenarioId: string
  readonly interventionEmailId: string
  readonly erpType?: ErpType
}

export interface QuestionnaireNode extends BaseNode {
  readonly isRated?: boolean
  readonly questionType?: QuestionType
  readonly children?: QuestionnaireNode[]
  readonly scoringType?: QuestionScoringType
}

export interface ReportBaseNode extends BaseNode {
  readonly score: number
  readonly maxScore: number
  readonly scoringType?: QuestionScoringType
}
export interface ReportParticipantsQuestionnaireNode extends BaseNode {
  readonly averageScore: number
  readonly maxScore: number
  readonly scoringType?: QuestionScoringType
}
export interface ReportParticipantQuestionnaireNode extends ReportBaseNode {
  readonly questionType?: QuestionType
}
export interface ReportParticipantScenarioNode extends ReportBaseNode {
  readonly children?: CodingNode[]
  readonly codingItem: CodingItem | null
  readonly codingDimension: CodingDimension | null
}

export interface CodingNode extends BaseNode {
  readonly isRated?: boolean
  readonly canBeEvaluatedAutomatically?: boolean
  readonly children?: CodingNode[]
  readonly automatedCodingItemRule?: AutomatedCodingItemRule
}
