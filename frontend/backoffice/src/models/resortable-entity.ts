import {BinaryType, IconName} from "shared/enums"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {PositionedElement, Questionnaire, Scenario} from "shared/models"

export interface ResortableEntity extends PositionedElement {
  readonly binarySrc?: string
  readonly binaryType?: BinaryType
  readonly moduleType?: ProjectModuleType
  readonly scenario?: Scenario
  readonly questionnaire?: Questionnaire
  readonly color?: string
  readonly icon?: IconName
  readonly id: UUID
  readonly title: string
}
